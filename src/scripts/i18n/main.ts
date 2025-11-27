import * as fs from "fs"

import {
  getBuiltFile,
  postBuildProjectFileTranslation,
} from "./lib/crowdin/build"
// Crowdin operations
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
import {
  awaitQaCompletion,
  downloadQaCompletionResult,
  listStringIdsForFile,
  postQaCompletions,
  type QaCompletionJob,
  type QaIssue,
  summarizeQaIssues,
} from "./lib/crowdin/qa-completions"
import { postCreateBranchFrom } from "./lib/github/branches"
import { getDestinationFromPath, putCommitFile } from "./lib/github/commits"
// GitHub operations
import {
  downloadGitHubFile,
  getAllEnglishFiles,
  getFileMetadata,
} from "./lib/github/files"
import { postPullRequest } from "./lib/github/pull-requests"
import type {
  CrowdinAddFileResponse,
  CrowdinFileData,
  CrowdinPreTranslateResponse,
} from "./lib/types"
// Utilities
import { mapCrowdinCodeToInternal } from "./lib/utils/mapping"
import { config } from "./config"
import { MAX_STRINGS_PER_REQUEST } from "./config"
import { runSanitizer } from "./post_import_sanitize"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Build and commit translations after pre-translation completes
 */
async function buildAndCommitTranslations(
  preTranslateJobCompletedResponse: CrowdinPreTranslateResponse
) {
  if (preTranslateJobCompletedResponse.status !== "finished") {
    console.error(
      "[BUILD] ❌ Pre-translation did not finish successfully. Full response:",
      preTranslateJobCompletedResponse
    )
    throw new Error(
      `Pre-translation ended with unexpected status: ${preTranslateJobCompletedResponse.status}`
    )
  }

  console.log(`[BUILD] ✓ Pre-translation completed successfully!`)
  console.log(`[BUILD] Progress: ${preTranslateJobCompletedResponse.progress}%`)
  console.log(
    `[BUILD] Full response:`,
    JSON.stringify(preTranslateJobCompletedResponse, null, 2)
  )

  const { languageIds, fileIds } = preTranslateJobCompletedResponse.attributes

  // Get Crowdin project files for path mapping
  const crowdinProjectFiles = await getCrowdinProjectFiles()

  // Build mapping for commit phase using existing Crowdin files
  const fileIdToPathMapping: Record<number, string> = {}
  for (const fid of fileIds) {
    const existing = crowdinProjectFiles.find((f) => f.id === fid)
    if (existing) fileIdToPathMapping[fid] = existing.path

    if (!fileIdToPathMapping[fid]) {
      console.warn(
        `[WARN] Missing path mapping for fileId=${fid} (may impact destination path calculation)`
      )
    }
  }

  // Build mapping between Crowdin IDs and internal codes
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: mapCrowdinCodeToInternal(crowdinId),
  }))

  const { branch } = await postCreateBranchFrom(config.baseBranch)
  console.log(`\n[BRANCH] ✓ Created branch: ${branch}`)

  // For each language
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    console.log(
      `\n[BUILD] ========== Building translations for language: ${crowdinId} (internal: ${internalLanguageCode}) ==========`
    )

    // Build, download and commit each file
    for (const fileId of fileIds) {
      console.log(`\n[BUILD] --- Processing fileId: ${fileId} ---`)
      const crowdinPath = fileIdToPathMapping[fileId]
      console.log(`[BUILD] Crowdin path: ${crowdinPath}`)

      // 1- Build
      console.log(
        `[BUILD] Requesting build for fileId=${fileId}, language=${crowdinId}`
      )
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId,
        config.projectId
      )
      console.log(`[BUILD] ✓ Build complete, download URL: ${downloadUrl}`)

      // 2- Download
      console.log(`[BUILD] Downloading translated file...`)
      const { buffer } = await getBuiltFile(downloadUrl)
      console.log(`[BUILD] Downloaded ${buffer.length} bytes`)

      // 3a- Get destination path
      const destinationPath = getDestinationFromPath(
        crowdinPath,
        internalLanguageCode
      )
      console.log(`[BUILD] Destination path: ${destinationPath}`)

      // 3b- Commit
      console.log(`[BUILD] Committing to branch: ${branch}`)
      await putCommitFile(buffer, destinationPath, branch)
      console.log(`[BUILD] ✓ Committed successfully`)
    }
  }

  // Run post-import sanitizer BEFORE creating PR (may produce additional commits)
  console.log(
    `\n[SANITIZE] ========== Running post-import sanitizer before PR ==========`
  )
  const sanitizeResult = runSanitizer(config.allCrowdinCodes)
  const changedFiles = sanitizeResult.changedFiles || []
  if (changedFiles.length) {
    console.log(`[SANITIZE] Files changed by sanitizer: ${changedFiles.length}`)
    for (const abs of changedFiles) {
      const relPath = abs.startsWith(process.cwd())
        ? abs.slice(process.cwd().length + 1)
        : abs
      try {
        const buf = fs.readFileSync(abs)
        await putCommitFile(buf, relPath, branch)
        console.log(`[SANITIZE] ✓ Committed sanitized file: ${relPath}`)
      } catch (e) {
        console.warn(
          `[SANITIZE] Failed to commit sanitized file ${relPath}:`,
          e
        )
      }
    }
  } else {
    console.log("[SANITIZE] No sanitation changes to commit")
  }

  console.log(`\n[PR] ========== Creating Pull Request ==========`)
  console.log(`[PR] Head branch: ${branch}`)
  console.log(`[PR] Base branch: ${config.baseBranch}`)

  const pr = await postPullRequest(branch, config.baseBranch)

  console.log(`\n[SUCCESS] ========== Translation import complete! ==========`)
  console.log(`[SUCCESS] Pull Request URL: ${pr.html_url}`)
  console.log(`[SUCCESS] PR Number: #${pr.number}`)
  console.log(pr)
}

/**
 * Main orchestration function
 */
async function main(options?: { allLangs: boolean }) {
  console.log(`[DEBUG] Starting main function with options:`, options)
  console.log(`[DEBUG] Environment config:`, {
    projectId: config.projectId,
    baseBranch: config.baseBranch,
    jsonRoot: config.jsonRoot,
    mdRoot: config.mdRoot,
    allCrowdinCodes: config.allCrowdinCodes,
  })

  // Check if resuming from existing pre-translation
  if (config.existingPreTranslationId) {
    console.log(
      `\n[RESUME] ========== Resuming from pre-translation ID: ${config.existingPreTranslationId} ==========`
    )
    console.log(`[RESUME] Checking status of existing pre-translation...`)

    const preTranslateJobCompletedResponse = await getPreTranslationStatus(
      config.existingPreTranslationId
    )

    if (preTranslateJobCompletedResponse.status === "in_progress") {
      console.log(
        `[RESUME] Pre-translation still in progress (${preTranslateJobCompletedResponse.progress}%). Waiting for completion...`
      )
      const completedResponse = await awaitPreTranslationCompleted(
        config.existingPreTranslationId
      )
      return await buildAndCommitTranslations(completedResponse)
    } else if (preTranslateJobCompletedResponse.status === "finished") {
      console.log(
        `[RESUME] Pre-translation already finished. Building translations...`
      )
      return await buildAndCommitTranslations(preTranslateJobCompletedResponse)
    } else {
      throw new Error(
        `Pre-translation ${config.existingPreTranslationId} has unexpected status: ${preTranslateJobCompletedResponse.status}`
      )
    }
  }

  // Normal flow: Start new pre-translation
  console.log(`\n[START] ========== Starting new pre-translation ==========`)

  // Fetch English files with limit + start offset
  const allEnglishFiles = await getAllEnglishFiles(
    config.fileLimit,
    config.startOffset
  )
  console.log(
    `[DEBUG] Found ${allEnglishFiles.length} English files from GitHub (offset=${config.startOffset}, limit=${config.fileLimit})`
  )

  const fileMetadata = await getFileMetadata(allEnglishFiles)
  console.log(`[DEBUG] Generated metadata for ${fileMetadata.length} files`)
  console.log(`[DEBUG] First file metadata:`, fileMetadata[0])

  const crowdinProjectFiles = await getCrowdinProjectFiles()
  console.log(
    `[DEBUG] Found ${crowdinProjectFiles.length} files in Crowdin project`
  )

  // Iterate through each file and upload
  const fileIdsSet = new Set<number>()
  const processedFileIdToPath: Record<number, string> = {}
  const englishBuffers: Record<number, Buffer> = {}

  for (const file of fileMetadata) {
    console.log(`[DEBUG] Processing file: ${file.filePath}`)
    await (async () => {
      let foundFile: CrowdinFileData | undefined
      try {
        foundFile = findCrowdinFile(file, crowdinProjectFiles)
      } catch {
        console.log("File not found in Crowdin, attempting to add new file")
      }

      let crowdinFileResponse: CrowdinAddFileResponse | undefined
      let effectiveFileId: number
      let effectivePath: string

      if (foundFile) {
        // File exists - DO NOT update to preserve parsed string structure
        console.log(
          `[SKIP-UPDATE] File already exists in Crowdin with ID: ${foundFile.id}, using existing structure`
        )
        console.log(
          `[SKIP-UPDATE] Skipping upload/update to preserve existing parsed strings`
        )
        effectiveFileId = foundFile.id
        effectivePath = foundFile.path

        // Still download English for buffer comparison later
        console.log(
          `[DOWNLOAD] Downloading English source for buffer comparison: ${file.download_url}`
        )
        const fileBuffer = await downloadGitHubFile(file.download_url)
        englishBuffers[effectiveFileId] = fileBuffer
      } else {
        // File doesn't exist - create it
        console.log(`[UPLOAD] File NOT found in Crowdin, creating new file`)
        console.log(
          `[UPLOAD] Downloading English source from: ${file.download_url}`
        )
        const fileBuffer = await downloadGitHubFile(file.download_url)
        console.log(`[UPLOAD] Downloaded ${fileBuffer.length} bytes`)

        const storageInfo = await postFileToStorage(
          fileBuffer,
          file["Crowdin-API-FileName"]
        )
        console.log(
          `[UPLOAD] Uploaded to Crowdin storage with ID: ${storageInfo.id}`
        )

        // Derive full parent directory path (exclude filename)
        const parts = file.filePath.split("/").filter(Boolean)
        parts.pop() // remove filename
        const parentDirPath = parts.join("/") || "/"
        console.log(
          `[UPLOAD] Creating new Crowdin file in directory path: ${parentDirPath}`
        )
        crowdinFileResponse = await postCrowdinFile(
          storageInfo.id,
          file["Crowdin-API-FileName"],
          parentDirPath
        )
        console.log(
          `[UPLOAD] ✓ Created new Crowdin file with ID: ${crowdinFileResponse.id}`
        )

        effectiveFileId = crowdinFileResponse.id
        effectivePath = crowdinFileResponse.path
        englishBuffers[effectiveFileId] = fileBuffer

        // Wait for new file parsing
        const delayMs = 10000
        console.log(
          `[UPLOAD] ⏱️  Waiting ${delayMs / 1000}s for Crowdin to parse new file...`
        )
        await delay(delayMs)
        console.log(`[UPLOAD] ✓ Parsing delay complete`)
      }

      fileIdsSet.add(effectiveFileId)
      if (effectivePath) processedFileIdToPath[effectiveFileId] = effectivePath
    })()
  }

  // Unhide any hidden/duplicate strings before pre-translation
  console.log(
    `\n[UNHIDE] ========== Unhiding strings in ${fileIdsSet.size} files ==========`
  )
  for (const fileId of Array.from(fileIdsSet)) {
    await unhideStringsInFile(fileId)
  }

  console.log(
    `\n[PRE-TRANSLATE] ========== Requesting AI Pre-Translation ==========`
  )
  console.log(`[PRE-TRANSLATE] FileIds to translate:`, Array.from(fileIdsSet))
  console.log(`[PRE-TRANSLATE] Target languages:`, config.allCrowdinCodes)
  console.log(`[PRE-TRANSLATE] AI Prompt ID:`, config.preTranslatePromptId)

  const applyPreTranslationResponse = await postApplyPreTranslation(
    Array.from(fileIdsSet),
    options?.allLangs ? config.allCrowdinCodes : config.allCrowdinCodes
  )
  console.log(
    `[PRE-TRANSLATE] ✓ Pre-translation job created with ID: ${applyPreTranslationResponse.identifier}`
  )
  console.log(
    `[PRE-TRANSLATE] Initial status:`,
    applyPreTranslationResponse.status
  )

  console.log(`\n[PRE-TRANSLATE] Waiting for job to complete...`)
  const preTranslateJobCompletedResponse = await awaitPreTranslationCompleted(
    applyPreTranslationResponse.identifier
  )

  if (preTranslateJobCompletedResponse.status !== "finished") {
    console.error(
      "[PRE-TRANSLATE] ❌ Pre-translation did not finish successfully. Full response:",
      preTranslateJobCompletedResponse
    )
    throw new Error(
      `Pre-translation ended with unexpected status: ${preTranslateJobCompletedResponse.status}`
    )
  }

  console.log(`[PRE-TRANSLATE] ✓ Job completed successfully!`)
  console.log(
    `[PRE-TRANSLATE] Progress: ${preTranslateJobCompletedResponse.progress}%`
  )
  console.log(
    `[PRE-TRANSLATE] Full response:`,
    JSON.stringify(preTranslateJobCompletedResponse, null, 2)
  )

  // QA via Crowdin AI Prompt Completions
  console.log(`\n[QA-CHECK] ========== AI QA via Prompt Completions ==========`)
  const qaSummaries: string[] = []
  const { languageIds: qaLanguageIds, fileIds: qaFileIds } =
    preTranslateJobCompletedResponse.attributes

  // Build stringId lists per file
  const fileStringMap: Record<number, number[]> = {}
  for (const fid of qaFileIds) {
    try {
      fileStringMap[fid] = await listStringIdsForFile(fid)
    } catch (e) {
      console.warn(`[QA-CHECK] Failed listing strings for fileId=${fid}:`, e)
      fileStringMap[fid] = []
    }
  }

  const sourceLanguageId = "en"

  // For each language, run QA per file (naturally batches and ties issues to specific files)
  for (const lang of qaLanguageIds) {
    console.log(
      `[QA-CHECK] Running QA for ${lang} across ${qaFileIds.length} files`
    )
    const allIssues: QaIssue[] = []
    let skipped = false

    for (const fid of qaFileIds) {
      const stringIds = fileStringMap[fid] || []
      if (!stringIds.length) {
        console.log(`[QA-CHECK] Skipping fileId=${fid} (no strings)`)
        continue
      }

      console.log(
        `[QA-CHECK] QA for ${lang} fileId=${fid} (${stringIds.length} strings)`
      )

      // Chunk large files to stay within API limits
      const chunks =
        stringIds.length > MAX_STRINGS_PER_REQUEST
          ? Array.from(
              { length: Math.ceil(stringIds.length / MAX_STRINGS_PER_REQUEST) },
              (_, i) =>
                stringIds.slice(
                  i * MAX_STRINGS_PER_REQUEST,
                  (i + 1) * MAX_STRINGS_PER_REQUEST
                )
            )
          : [stringIds]

      for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
        const chunk = chunks[chunkIdx]
        if (chunks.length > 1) {
          console.log(
            `[QA-CHECK]   Chunk ${chunkIdx + 1}/${chunks.length} (${chunk.length} strings)`
          )
        }

        let job: QaCompletionJob | undefined
        try {
          job = await postQaCompletions(config.qaPromptId, {
            projectId: config.projectId,
            sourceLanguageId,
            targetLanguageId: lang,
            stringIds: chunk,
          })
        } catch (e) {
          const msg = String((e as Error).message || e)
          console.warn(
            `[QA-CHECK] Failed for fileId=${fid} chunk ${chunkIdx + 1}: ${msg}`
          )
          if (msg.includes("403")) {
            // If 403, skip entire language (endpoint not accessible)
            qaSummaries.push(
              `QA for ${lang}: skipped (endpoint not accessible - may require Enterprise or AI credits).`
            )
            skipped = true
            break
          }
          continue
        }

        const finished = await awaitQaCompletion(job.id)
        if (finished.status !== "finished") {
          console.warn(
            `[QA-CHECK] Completion for fileId=${fid} chunk ${chunkIdx + 1} status=${finished.status}`
          )
          continue
        }
        const issues = await downloadQaCompletionResult(job.id)
        allIssues.push(...issues)
      }

      if (skipped) break
    }

    if (
      !skipped &&
      (allIssues.length > 0 || Object.keys(fileStringMap).length > 0)
    ) {
      const summary = summarizeQaIssues(allIssues, processedFileIdToPath, lang)
      qaSummaries.push(summary)
    }
  }

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
    if (!fileIdToPathMapping[fid]) {
      console.warn(
        `[WARN] Missing path mapping for fileId=${fid} (may impact destination path calculation)`
      )
    }
  }

  // Build mapping between Crowdin IDs and internal codes
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: mapCrowdinCodeToInternal(crowdinId),
  }))

  const { branch } = await postCreateBranchFrom(config.baseBranch)
  console.log(`\n[BRANCH] ✓ Created branch: ${branch}`)

  // For each language
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    console.log(
      `\n[BUILD] ========== Building translations for language: ${crowdinId} (internal: ${internalLanguageCode}) ==========`
    )

    // Build, download and commit each file
    for (const fileId of fileIds) {
      console.log(`\n[BUILD] --- Processing fileId: ${fileId} ---`)
      const crowdinPath = fileIdToPathMapping[fileId]
      console.log(`[BUILD] Crowdin path: ${crowdinPath}`)

      // 1- Build
      console.log(
        `[BUILD] Requesting build for fileId=${fileId}, language=${crowdinId}`
      )
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId,
        config.projectId
      )
      console.log(`[BUILD] ✓ Build complete, download URL: ${downloadUrl}`)

      // 2- Download
      console.log(`[BUILD] Downloading translated file...`)
      const { buffer } = await getBuiltFile(downloadUrl)
      console.log(`[BUILD] Downloaded ${buffer.length} bytes`)

      // Check if translation differs from English
      const originalEnglish = englishBuffers[fileId]
      if (originalEnglish) {
        console.log(
          `[BUILD] Original English size: ${originalEnglish.length} bytes`
        )
        if (originalEnglish.compare(buffer) === 0) {
          console.warn(
            `[BUILD] ⚠️  Skipping commit - content identical to English (no translation occurred)`
          )
          continue
        } else {
          console.log(`[BUILD] ✓ Translation differs from English, will commit`)
        }
      }

      // 3a- Get destination path
      const destinationPath = getDestinationFromPath(
        crowdinPath,
        internalLanguageCode
      )
      console.log(`[BUILD] Destination path: ${destinationPath}`)

      // 3b- Commit
      console.log(`[BUILD] Committing to branch: ${branch}`)
      await putCommitFile(buffer, destinationPath, branch)
      console.log(`[BUILD] ✓ Committed successfully`)
    }
  }

  // Run post-import sanitizer BEFORE creating PR
  console.log(
    `\n[SANITIZE] ========== Running post-import sanitizer before PR ==========`
  )
  const sanitizeResult = runSanitizer(config.allCrowdinCodes)
  const changedFiles = sanitizeResult.changedFiles || []
  if (changedFiles.length) {
    console.log(`[SANITIZE] Files changed by sanitizer: ${changedFiles.length}`)
    for (const abs of changedFiles) {
      const relPath = abs.startsWith(process.cwd())
        ? abs.slice(process.cwd().length + 1)
        : abs
      try {
        const buf = fs.readFileSync(abs)
        await putCommitFile(buf, relPath, branch)
        console.log(`[SANITIZE] ✓ Committed sanitized file: ${relPath}`)
      } catch (e) {
        console.warn(
          `[SANITIZE] Failed to commit sanitized file ${relPath}:`,
          e
        )
      }
    }
  } else {
    console.log("[SANITIZE] No sanitation changes to commit")
  }

  console.log(`\n[PR] ========== Creating Pull Request ==========`)
  console.log(`[PR] Head branch: ${branch}`)
  console.log(`[PR] Base branch: ${config.baseBranch}`)

  const prBody = qaSummaries.length
    ? `Automated Crowdin translation import\n\nQA Summary:\n\n${qaSummaries.join("\n\n")}`
    : "Automated Crowdin translation import"
  const pr = await postPullRequest(branch, config.baseBranch, prBody)

  console.log(`\n[SUCCESS] ========== Translation import complete! ==========`)
  console.log(`[SUCCESS] Pull Request URL: ${pr.html_url}`)
  console.log(`[SUCCESS] PR Number: #${pr.number}`)
  console.log(pr)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
