// File preparation workflow phase

import * as fs from "fs"
import * as path from "path"

import { config, crowdinBearerHeaders } from "../../config"
import { createEphemeralPrompt } from "../crowdin/ephemeral-prompts"
import {
  findCrowdinFile,
  postCrowdinFile,
  postFileToStorage,
  unhideStringsInFile,
} from "../crowdin/files"
import { getPromptInfo } from "../crowdin/prompt"
import { getCurrentUser } from "../crowdin/user"
import {
  downloadGitHubFile,
  getAllEnglishFiles,
  getFileMetadata,
} from "../github/files"
import { formatGlossaryForPrompt, getGlossaryForLanguage } from "../supabase"
import type { CrowdinFileData } from "../types"

import type { FilePreparationResult, WorkflowContext } from "./types"
import { debugLog, delay, logSection } from "./utils"

/**
 * Update existing file in Crowdin with latest English content
 */
async function updateCrowdinFile(
  file: {
    filePath: string
    download_url: string
    "Crowdin-API-FileName": string
  },
  foundFile: CrowdinFileData
): Promise<{ fileId: number; path: string; buffer: Buffer }> {
  console.log(
    `Updating existing file in Crowdin: ${file.filePath} (ID: ${foundFile.id})`
  )

  const fileBuffer = await downloadGitHubFile(file.download_url)
  const storageInfo = await postFileToStorage(
    fileBuffer,
    file["Crowdin-API-FileName"]
  )

  // Update the file content using PUT
  const updateUrl = `https://api.crowdin.com/api/v2/projects/${config.projectId}/files/${foundFile.id}`
  const updateBody = { storageId: storageInfo.id }

  const updateResp = await fetch(updateUrl, {
    method: "PUT",
    headers: {
      ...crowdinBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBody),
  })

  if (!updateResp.ok) {
    const text = await updateResp.text().catch(() => "")
    throw new Error(
      `Failed to update Crowdin file ${foundFile.id} (${updateResp.status}): ${text}`
    )
  }

  console.log(`✓ Updated Crowdin file (ID: ${foundFile.id})`)

  // Wait for file parsing after update
  const delayMs = 10000
  debugLog(`Waiting ${delayMs / 1000}s for Crowdin to re-parse updated file...`)
  await delay(delayMs)

  return {
    fileId: foundFile.id,
    path: foundFile.path,
    buffer: fileBuffer,
  }
}

/**
 * Create new file in Crowdin
 */
async function createCrowdinFile(file: {
  filePath: string
  download_url: string
  "Crowdin-API-FileName": string
}): Promise<{ fileId: number; path: string; buffer: Buffer }> {
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

  console.log(`✓ Created new Crowdin file (ID: ${crowdinFileResponse.id})`)

  // Wait for new file parsing
  const delayMs = 10000
  debugLog(`Waiting ${delayMs / 1000}s for Crowdin to parse new file...`)
  await delay(delayMs)

  return {
    fileId: crowdinFileResponse.id,
    path: crowdinFileResponse.path,
    buffer: fileBuffer,
  }
}

/**
 * Upload/update English files to Crowdin and prepare for translation
 */
export async function prepareEnglishFiles(
  context: WorkflowContext
): Promise<FilePreparationResult> {
  const { allInternalCodes } = config
  const {
    crowdinProjectFiles,
    fileIdsSet,
    processedFileIdToPath,
    englishBuffers,
    glossary,
  } = context

  logSection("Starting New Pre-Translation")

  // Create ephemeral prompt with glossary terms baked in
  const currentUser = await getCurrentUser()

  // Get AI provider/model settings from the static prompt
  const staticPromptInfo = await getPromptInfo(
    currentUser.id,
    config.preTranslatePromptId
  )
  debugLog(
    `Static prompt AI settings: provider=${staticPromptInfo.aiProviderId}, model=${staticPromptInfo.aiModelId}`
  )

  const promptPath = path.join(
    process.cwd(),
    "src/scripts/i18n/lib/crowdin/pre-translate-prompt.txt"
  )
  const basePrompt = fs.readFileSync(promptPath, "utf8")

  // Get glossary for target language and append to prompt
  const targetLang = allInternalCodes[0]
  const glossaryTerms = getGlossaryForLanguage(glossary, targetLang)
  const glossarySection = formatGlossaryForPrompt(glossaryTerms, "informal")

  const fullPrompt = glossarySection
    ? `${basePrompt}\n\n---\n\n${glossarySection}`
    : basePrompt

  if (glossaryTerms.size > 0) {
    console.log(
      `[GLOSSARY] Injecting ${glossaryTerms.size} terms for ${targetLang} into prompt`
    )
  }

  // Create ephemeral prompt for this job (copy AI provider from static prompt)
  const { promptId: ephemeralPromptId } = await createEphemeralPrompt({
    userId: currentUser.id,
    languageCode: targetLang,
    promptKey: "glossary",
    promptText: fullPrompt,
    aiProviderId: staticPromptInfo.aiProviderId ?? undefined,
    aiModelId: staticPromptInfo.aiModelId ?? undefined,
  })

  // Store ephemeral prompt ID and user ID in context for pre-translation and cleanup
  context.ephemeralPromptId = ephemeralPromptId
  context.crowdinUserId = currentUser.id
  console.log(`✓ Created ephemeral prompt (ID: ${ephemeralPromptId})`)

  // Fetch English files
  const allEnglishFiles = await getAllEnglishFiles()

  if (!allEnglishFiles.length) {
    console.log("No files to translate, exiting")
    process.exit(0)
  }

  debugLog(`Found ${allEnglishFiles.length} English files`)
  debugLog(`Found ${crowdinProjectFiles.length} files in Crowdin project`)

  const fileMetadata = await getFileMetadata(allEnglishFiles)

  // Track failed files for summary
  const failedFiles: Array<{ path: string; error: string }> = []
  let successCount = 0

  // Iterate through each file and upload/update
  for (const file of fileMetadata) {
    debugLog(`Processing file: ${file.filePath}`)

    try {
      // findCrowdinFile returns null if file doesn't exist (will be created)
      const foundFile = findCrowdinFile(file, crowdinProjectFiles)

      const result = foundFile
        ? await updateCrowdinFile(file, foundFile)
        : await createCrowdinFile(file)

      fileIdsSet.add(result.fileId)
      if (result.path) {
        processedFileIdToPath[result.fileId] = result.path
      }
      englishBuffers[result.fileId] = result.buffer
      successCount++
    } catch (error) {
      // Log and continue - don't let one file failure kill the entire job
      const message = error instanceof Error ? error.message : String(error)
      failedFiles.push({ path: file.filePath, error: message })
      console.warn(`[WARN] Skipping ${file.filePath}: ${message}`)
    }
  }

  // Log summary of failed files
  if (failedFiles.length > 0) {
    console.log(`\n[SUMMARY] ${failedFiles.length} files skipped:`)
    failedFiles.forEach((f) => console.log(`  - ${f.path}`))
  }

  // Exit 1 only if ALL files failed
  if (successCount === 0 && failedFiles.length > 0) {
    console.error("[ERROR] All files failed to process")
    process.exit(1)
  }

  console.log(
    `\n[INFO] Processed ${successCount} files successfully${failedFiles.length > 0 ? `, ${failedFiles.length} skipped` : ""}`
  )

  // Unhide any hidden/duplicate strings before pre-translation
  logSection(`Unhiding Strings in ${fileIdsSet.size} Files`)
  for (const fileId of Array.from(fileIdsSet)) {
    await unhideStringsInFile(fileId)
  }

  return {
    fileIdsSet,
    processedFileIdToPath,
    englishBuffers,
  }
}
