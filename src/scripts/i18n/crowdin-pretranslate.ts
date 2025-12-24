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
 * Input:
 *   Reads file IDs from .crowdin-file-ids.json (output from upload step)
 *   Falls back to all project files if not found
 *
 * Output:
 *   Writes job ID to pretranslate-job-id.txt and stdout
 */

import { existsSync, readFileSync, writeFileSync } from "fs"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

const JOB_ID_FILE = "pretranslate-job-id.txt"
const FILE_IDS_INPUT = ".crowdin-file-ids.json"

/**
 * Get file IDs from upload step output or fetch all from project.
 */
async function getFileIds(): Promise<number[]> {
  // First, try to read from upload output
  if (existsSync(FILE_IDS_INPUT)) {
    try {
      const data = JSON.parse(readFileSync(FILE_IDS_INPUT, "utf-8"))
      if (
        data.fileIds &&
        Array.isArray(data.fileIds) &&
        data.fileIds.length > 0
      ) {
        console.log(
          `[PRETRANSLATE] Using ${data.fileIds.length} file IDs from upload step`
        )
        return data.fileIds
      }
    } catch (err) {
      console.warn(`[PRETRANSLATE] Failed to read ${FILE_IDS_INPUT}:`, err)
    }
  }

  // Fall back to fetching all files from project
  console.log(
    "[PRETRANSLATE] No file IDs from upload, fetching all project files..."
  )
  return getAllFileIds()
}

/**
 * Get all file IDs from the Crowdin project.
 */
async function getAllFileIds(): Promise<number[]> {
  const projectId = crowdinClient.projectId
  const fileIds: number[] = []

  let offset = 0
  const limit = 500

  for (;;) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const files = response.data as { data: { id: number } }[]

    for (const { data: file } of files) {
      fileIds.push(file.id)
    }

    if (files.length < limit) break
    offset += limit
  }

  return fileIds
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

  // Get file IDs (from upload step or all project files)
  const fileIds = await getFileIds()
  console.log(`[PRETRANSLATE] Processing ${fileIds.length} files`)

  if (fileIds.length === 0) {
    console.error("[PRETRANSLATE] No files to process!")
    process.exit(1)
  }

  // Note: String unhiding is now done in crowdin-upload.ts to avoid duplicating work

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
