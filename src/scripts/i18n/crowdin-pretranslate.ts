#!/usr/bin/env npx ts-node
/**
 * crowdin-pretranslate.ts
 *
 * Starts a pre-translation job on Crowdin using AI translation.
 * Outputs the job ID for polling by crowdin-poll.ts.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-pretranslate.ts
 *
 * Environment:
 *   CROWDIN_API_KEY or I18N_CROWDIN_API_KEY - Crowdin API token
 *   CROWDIN_PROJECT_ID - Crowdin project ID (default: 834930)
 *   TARGET_LANGUAGE - Single language code (e.g., "es-EM")
 *   TARGET_LANGUAGES - Comma-separated language codes
 *   PRE_TRANSLATE_PROMPT_ID - AI prompt ID (default: 168584)
 *
 * Output:
 *   Writes job ID to pretranslate-job-id.txt and stdout
 */

import { writeFileSync } from "fs"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

const JOB_ID_FILE = "pretranslate-job-id.txt"

/**
 * Get all file IDs from the Crowdin project.
 */
async function getAllFileIds(): Promise<number[]> {
  const projectId = crowdinClient.projectId
  const fileIds: number[] = []

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const files = response.data as { data: { id: number } }[]

    for (const { data: file } of files) {
      fileIds.push(file.id)
    }

    hasMore = files.length === limit
    offset += limit
  }

  return fileIds
}

/**
 * Unhide all hidden strings in a file.
 * Hidden strings (duplicates) cannot be translated.
 */
async function unhideStringsInFile(fileId: number): Promise<number> {
  const projectId = crowdinClient.projectId
  let unhiddenCount = 0

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceStrings.listProjectStrings(
      projectId,
      { fileId, limit, offset }
    )
    const strings = response.data as {
      data: { id: number; isHidden: boolean }
    }[]

    for (const { data: str } of strings) {
      if (str.isHidden) {
        try {
          await crowdinClient.sourceStrings.editString(projectId, str.id, [
            { op: "replace", path: "/isHidden", value: false },
          ])
          unhiddenCount++
        } catch (error) {
          console.warn(`[PRETRANSLATE] Failed to unhide string ${str.id}`)
        }
      }
    }

    hasMore = strings.length === limit
    offset += limit
  }

  return unhiddenCount
}

/**
 * Start a pre-translation job.
 */
async function startPreTranslation(
  fileIds: number[],
  languageIds: string[],
  aiPromptId: number
): Promise<string> {
  const projectId = crowdinClient.projectId

  console.log(`[PRETRANSLATE] Starting pre-translation...`)
  console.log(`[PRETRANSLATE] Files: ${fileIds.length}`)
  console.log(`[PRETRANSLATE] Languages: ${languageIds.join(", ")}`)
  console.log(`[PRETRANSLATE] AI Prompt ID: ${aiPromptId}`)

  const response = await crowdinClient.translations.applyPreTranslation(
    projectId,
    {
      languageIds,
      fileIds,
      method: "ai",
      aiPromptId,
    }
  )

  const jobId = response.data.identifier
  console.log(`[PRETRANSLATE] Job started with ID: ${jobId}`)

  return jobId
}

async function main() {
  console.log("[PRETRANSLATE] Starting Crowdin pre-translation...")

  // Load environment
  const env = loadEnv()
  console.log(`[PRETRANSLATE] Project ID: ${env.crowdinProjectId}`)
  console.log(
    `[PRETRANSLATE] Target languages: ${env.targetLanguages.join(", ")}`
  )

  // Get all file IDs
  console.log("[PRETRANSLATE] Fetching project files...")
  const fileIds = await getAllFileIds()
  console.log(`[PRETRANSLATE] Found ${fileIds.length} files`)

  if (fileIds.length === 0) {
    console.error("[PRETRANSLATE] No files found in project!")
    process.exit(1)
  }

  // Unhide strings in all files
  console.log("[PRETRANSLATE] Unhiding hidden strings...")
  let totalUnhidden = 0
  for (const fileId of fileIds) {
    const count = await unhideStringsInFile(fileId)
    totalUnhidden += count
  }
  if (totalUnhidden > 0) {
    console.log(`[PRETRANSLATE] Unhidden ${totalUnhidden} strings`)
  }

  // Start pre-translation
  const jobId = await startPreTranslation(
    fileIds,
    env.targetLanguages,
    env.preTranslatePromptId
  )

  // Save job ID for polling
  writeFileSync(JOB_ID_FILE, jobId)
  console.log(`[PRETRANSLATE] Job ID saved to ${JOB_ID_FILE}`)

  // Output job ID to stdout (for GitHub Actions)
  console.log(jobId)
}

main().catch((error) => {
  console.error("[PRETRANSLATE] Fatal error:", error)
  process.exit(1)
})
