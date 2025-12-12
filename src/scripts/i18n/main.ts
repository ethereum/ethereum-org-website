import * as fs from "fs"
import * as path from "path"

import {
  getBuiltFile,
  postBuildProjectFileTranslation,
} from "./lib/crowdin/build"
import {
  findCrowdinFile,
  getCrowdinProjectFiles,
  postCrowdinFile,
  postFileToStorage,
  unhideStringsInFile,
} from "./lib/crowdin/files"
import {
  awaitPreTranslationCompleted,
  getPreTranslationStatus,
  postApplyPreTranslation,
} from "./lib/crowdin/pre-translate"
import { getPromptInfo, updatePromptFromFile } from "./lib/crowdin/prompt"
import { postCreateBranchFrom } from "./lib/github/branches"
import { getDestinationFromPath, putCommitFile } from "./lib/github/commits"
import {
  downloadGitHubFile,
  getAllEnglishFiles,
  getFileMetadata,
} from "./lib/github/files"
import { postPullRequest } from "./lib/github/pull-requests"
import type { CrowdinFileData, CrowdinPreTranslateResponse } from "./lib/types"
import { mapCrowdinCodeToInternal } from "./lib/utils/mapping"
import { config, crowdinBearerHeaders } from "./config"
import { runSanitizer } from "./post_import_sanitize"

// Small helper for async waits
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * Write pre-translation artifact for GitHub Actions
 */
function writePreTranslationArtifact(
  preTranslationId: string,
  fileCount: number,
  languages: string[]
) {
  const artifactData = {
    preTranslationId,
    timestamp: new Date().toISOString(),
    fileCount,
    languages,
    targetPath: config.targetPath || null,
  }

  const artifactDir = path.join(process.cwd(), "artifacts")
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true })
  }

  const artifactPath = path.join(artifactDir, "pre-translation-info.json")
  fs.writeFileSync(artifactPath, JSON.stringify(artifactData, null, 2))

  console.log(`\n[ARTIFACT] Pre-translation info written to ${artifactPath}`)
  console.log(`[ARTIFACT] Pre-translation ID: ${preTranslationId}`)
  console.log(
    `[ARTIFACT] To resume this job later, use: PRETRANSLATION_ID=${preTranslationId}`
  )
}

/**
 * Main orchestration function
 */
async function main() {
  const { verbose, targetPath, existingPreTranslationId } = config

  console.log(`\n========== Crowdin AI Translation Import ==========`)
  console.log(`Target languages: ${config.allCrowdinCodes.join(", ")}`)
  if (targetPath) {
    const isFile = targetPath.endsWith(".md") || targetPath.endsWith(".json")
    console.log(`Mode: ${isFile ? "Single file" : "Directory"} (${targetPath})`)
  } else {
    console.log(`Mode: Full translation (all files)`)
  }

  // Shared state
  const crowdinProjectFiles = await getCrowdinProjectFiles()
  const fileIdsSet = new Set<number>()
  const processedFileIdToPath: Record<number, string> = {}
  const englishBuffers: Record<number, Buffer> = {}

  // If resuming, determine completed pre-translation response; otherwise start new
  let preTranslateJobCompletedResponse: CrowdinPreTranslateResponse

  if (existingPreTranslationId) {
    console.log(
      `\n========== Resuming Pre-Translation ${existingPreTranslationId} ==========`
    )
    const statusResp = await getPreTranslationStatus(existingPreTranslationId)

    if (statusResp.status === "in_progress") {
      console.log(
        `Pre-translation in progress (${statusResp.progress}%), waiting for completion...`
      )
      preTranslateJobCompletedResponse = await awaitPreTranslationCompleted(
        existingPreTranslationId
      )
    } else if (statusResp.status === "finished") {
      console.log(`Pre-translation already finished, proceeding to download...`)
      preTranslateJobCompletedResponse = statusResp
    } else {
      throw new Error(
        `Pre-translation ${existingPreTranslationId} has unexpected status: ${statusResp.status}`
      )
    }
  } else {
    // Normal flow: Start new pre-translation
    console.log(`\n========== Starting New Pre-Translation ==========`)

    // Ensure Crowdin AI prompt content is synced from repo canonical file
    const userId = process.env.I18N_CROWDIN_USER_ID
    if (userId) {
      try {
        const promptPath = path.join(
          process.cwd(),
          "src/scripts/i18n/lib/crowdin/pre-translate-prompt.txt"
        )
        await updatePromptFromFile(
          Number(userId),
          config.preTranslatePromptId,
          promptPath
        )
        console.log("✓ Updated Crowdin pre-translate prompt from repo file")
      } catch (e) {
        console.warn("Failed to update prompt, continuing:", e)
      }
    }

    // Fetch English files
    const allEnglishFiles = await getAllEnglishFiles()

    if (!allEnglishFiles.length) {
      console.log("No files to translate, exiting")
      return
    }

    if (verbose) {
      console.log(`[DEBUG] Found ${allEnglishFiles.length} English files`)
      console.log(
        `[DEBUG] Found ${crowdinProjectFiles.length} files in Crowdin project`
      )
    }

    const fileMetadata = await getFileMetadata(allEnglishFiles)

    // Iterate through each file and upload
    for (const file of fileMetadata) {
      if (verbose) {
        console.log(`[DEBUG] Processing file: ${file.filePath}`)
      }

      let foundFile: CrowdinFileData | undefined
      try {
        foundFile = findCrowdinFile(file, crowdinProjectFiles)
      } catch {
        if (verbose) {
          console.log("File not found in Crowdin, will add new file")
        }
      }

      let effectiveFileId: number
      let effectivePath: string

      if (foundFile) {
        // File exists - UPDATE it to ensure Crowdin has the latest English version
        console.log(
          `Updating existing file in Crowdin: ${file.filePath} (ID: ${foundFile.id})`
        )
        const fileBuffer = await downloadGitHubFile(file.download_url)

        const storageInfo = await postFileToStorage(
          fileBuffer,
          file["Crowdin-API-FileName"]
        )

        // Update the existing file using PUT /files/{fileId}
        const updateUrl = `https://api.crowdin.com/api/v2/projects/${config.projectId}/files/${foundFile.id}`
        const updateResp = await fetch(updateUrl, {
          method: "PUT",
          headers: {
            ...crowdinBearerHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ storageId: storageInfo.id }),
        })

        if (!updateResp.ok) {
          const text = await updateResp.text().catch(() => "")
          throw new Error(
            `Failed to update Crowdin file ${foundFile.id} (${updateResp.status}): ${text}`
          )
        }

        console.log(`✓ Updated Crowdin file (ID: ${foundFile.id})`)

        effectiveFileId = foundFile.id
        effectivePath = foundFile.path
        englishBuffers[effectiveFileId] = fileBuffer

        // Wait for file parsing after update
        const delayMs = 10000
        if (verbose) {
          console.log(
            `[DEBUG] Waiting ${delayMs / 1000}s for Crowdin to re-parse updated file...`
          )
        }
        await delay(delayMs)
      } else {
        // File doesn't exist - create it
        console.log(`Creating new file in Crowdin: ${file.filePath}`)
        const fileBuffer = await downloadGitHubFile(file.download_url)

        const storageInfo = await postFileToStorage(
          fileBuffer,
          file["Crowdin-API-FileName"]
        )

        // Derive full parent directory path (exclude filename)
        const parts = file.filePath.split("/").filter(Boolean)
        parts.pop() // remove filename
        const parentDirPath = parts.join("/") || "/"

        const crowdinFileResponse = await postCrowdinFile(
          storageInfo.id,
          file["Crowdin-API-FileName"],
          parentDirPath
        )

        console.log(
          `✓ Created new Crowdin file (ID: ${crowdinFileResponse.id})`
        )

        effectiveFileId = crowdinFileResponse.id
        effectivePath = crowdinFileResponse.path
        englishBuffers[effectiveFileId] = fileBuffer

        // Wait for new file parsing
        const delayMs = 10000
        if (verbose) {
          console.log(
            `[DEBUG] Waiting ${delayMs / 1000}s for Crowdin to parse new file...`
          )
        }
        await delay(delayMs)
      }

      fileIdsSet.add(effectiveFileId)
      if (effectivePath) processedFileIdToPath[effectiveFileId] = effectivePath
    }

    // Unhide any hidden/duplicate strings before pre-translation
    console.log(
      `\n========== Unhiding Strings in ${fileIdsSet.size} Files ==========`
    )
    for (const fileId of Array.from(fileIdsSet)) {
      await unhideStringsInFile(fileId)
    }

    console.log(`\n========== Requesting AI Pre-Translation ==========`)
    console.log(`Files to translate: ${fileIdsSet.size}`)
    console.log(`Target languages: ${config.allCrowdinCodes.join(", ")}`)
    console.log(`AI Prompt ID: ${config.preTranslatePromptId}`)

    const applyPreTranslationResponse = await postApplyPreTranslation(
      Array.from(fileIdsSet),
      config.allCrowdinCodes
    )

    console.log(
      `✓ Pre-translation job created (ID: ${applyPreTranslationResponse.identifier})`
    )

    // Write artifact with pre-translation ID
    writePreTranslationArtifact(
      applyPreTranslationResponse.identifier,
      fileIdsSet.size,
      config.allCrowdinCodes
    )

    // If no targetPath specified (full translation), exit now and let Crowdin work
    if (!targetPath) {
      console.log(`\n========== Full Translation Job Started ==========`)
      console.log(
        `This is a large job that will take significant time to complete.`
      )
      console.log(
        `The workflow will exit now. Resume later with the pre-translation ID above.`
      )
      console.log(
        `Check Crowdin dashboard for progress: https://crowdin.com/project/ethereum-org`
      )
      return
    }

    // For file/directory mode, wait for completion
    console.log(`\nWaiting for pre-translation to complete...`)
    preTranslateJobCompletedResponse = await awaitPreTranslationCompleted(
      applyPreTranslationResponse.identifier
    )

    if (preTranslateJobCompletedResponse.status !== "finished") {
      throw new Error(
        `Pre-translation ended with unexpected status: ${preTranslateJobCompletedResponse.status}`
      )
    }

    console.log(`✓ Pre-translation completed successfully!`)
  }

  // Build and download translations
  const { languageIds, fileIds } = preTranslateJobCompletedResponse.attributes

  // Build mapping for commit phase
  const fileIdToPathMapping: Record<number, string> = {}
  for (const fid of fileIds) {
    if (processedFileIdToPath[fid]) {
      fileIdToPathMapping[fid] = processedFileIdToPath[fid]
    } else {
      const existing = crowdinProjectFiles.find((f) => f.id === fid)
      if (existing) fileIdToPathMapping[fid] = existing.path
    }
    if (!fileIdToPathMapping[fid] && verbose) {
      console.warn(`[WARN] Missing path mapping for fileId=${fid}`)
    }
  }

  // Build mapping between Crowdin IDs and internal codes
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: mapCrowdinCodeToInternal(crowdinId),
  }))

  console.log(`\n========== Creating Translation PR ==========`)

  const { branch } = await postCreateBranchFrom(
    config.baseBranch,
    "crowdin-translations"
  )
  console.log(`✓ Created branch: ${branch}`)

  // Track all committed files with their content for sanitizer
  const committedFiles: Array<{ path: string; content: string }> = []

  // For each language
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    console.log(
      `\n--- Building translations for ${crowdinId} (${internalLanguageCode}) ---`
    )

    // Build, download and commit each file
    for (const fileId of fileIds) {
      const crowdinPath = fileIdToPathMapping[fileId]

      if (verbose) {
        console.log(`[DEBUG] Processing fileId: ${fileId} (${crowdinPath})`)
      }

      // 1- Build
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId,
        config.projectId
      )

      // 2- Download
      const { buffer } = await getBuiltFile(downloadUrl)

      if (verbose) {
        console.log(`[DEBUG] Downloaded ${buffer.length} bytes`)
      }

      // Check if translation differs from English
      const originalEnglish = englishBuffers[fileId]
      if (originalEnglish && originalEnglish.compare(buffer) === 0) {
        if (verbose) {
          console.warn(
            `[DEBUG] Skipping commit - content identical to English (no translation)`
          )
        }
        continue
      }

      // 3- Get destination path and commit
      const destinationPath = getDestinationFromPath(
        crowdinPath,
        internalLanguageCode
      )

      if (verbose) {
        console.log(`[DEBUG] Committing to: ${destinationPath}`)
      }

      await putCommitFile(buffer, destinationPath, branch)

      // Track this file's path and content for sanitizer
      committedFiles.push({
        path: destinationPath,
        content: buffer.toString("utf8"),
      })
    }

    console.log(`✓ Committed translations for ${internalLanguageCode}`)
  }

  // Run post-import sanitizer only on files that were just committed
  console.log(`\n========== Running Post-Import Sanitizer ==========`)
  console.log(`[SANITIZE] Processing ${committedFiles.length} committed files`)
  const sanitizeResult = runSanitizer(committedFiles)
  const changedFiles = sanitizeResult.changedFiles || []

  if (changedFiles.length) {
    console.log(`Sanitizer modified ${changedFiles.length} files`)
    for (const file of changedFiles) {
      const relPath = file.path
      try {
        const buf = Buffer.from(file.content, "utf8")
        await putCommitFile(buf, relPath, branch)
        if (verbose) {
          console.log(`[DEBUG] Committed sanitized file: ${relPath}`)
        }
      } catch (e) {
        console.warn(`Failed to commit sanitized file ${relPath}:`, e)
      }
    }
    console.log(`✓ Committed ${changedFiles.length} sanitized files`)
  } else {
    console.log("No sanitization changes needed")
  }

  // Create PR
  console.log(`\n========== Creating Pull Request ==========`)

  // Fetch AI model name dynamically
  let aiModelName = "LLM"
  const userId = process.env.I18N_CROWDIN_USER_ID
  if (userId) {
    try {
      const promptInfo = await getPromptInfo(
        Number(userId),
        config.preTranslatePromptId
      )
      aiModelName = promptInfo.aiModelId || "LLM"
    } catch (e) {
      console.warn("Could not fetch AI model name from Crowdin:", e)
    }
  }

  const langCodes = languagePairs.map((p) => p.internalLanguageCode).join(", ")
  const prBody = `## Description\n\nThis PR contains automated ${aiModelName} translations from Crowdin\n\n### File translated\n\n${changedFiles.map(({ path }) => `- ${path}\n`)}\n### Languages translated\n\n- ${langCodes}`

  const pr = await postPullRequest(branch, config.baseBranch, prBody)

  console.log(`\n========== SUCCESS ==========`)
  console.log(`Pull Request created: ${pr.html_url}`)
  console.log(`PR Number: #${pr.number}`)
  console.log(`Languages: ${langCodes}`)
  console.log(`Files: ${fileIds.length}`)
}

main().catch((err) => {
  console.error("\n========== ERROR ==========")
  console.error(err)
  process.exit(1)
})
