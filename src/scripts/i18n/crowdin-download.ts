#!/usr/bin/env npx ts-node
/**
 * crowdin-download.ts
 *
 * Downloads translations from Crowdin for a specific language.
 * Builds the translations and saves them to a zip file.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-download.ts
 *
 * Environment:
 *   CROWDIN_API_KEY or I18N_CROWDIN_API_KEY - Crowdin API token
 *   CROWDIN_PROJECT_ID - Crowdin project ID (default: 834930)
 *   TARGET_LANGUAGE - Language code to download (e.g., "es-EM")
 *
 * Output:
 *   translations-{language}.zip
 */

import { mkdirSync, writeFileSync } from "fs"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

// Configuration
const BUILD_POLL_INTERVAL_MS = 10_000 // 10 seconds
const BUILD_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

/**
 * Build translations for a specific language.
 */
async function buildTranslations(languageId: string): Promise<number> {
  const projectId = crowdinClient.projectId

  console.log(`[DOWNLOAD] Starting build for language: ${languageId}`)

  const response = await crowdinClient.translations.buildProject(projectId, {
    targetLanguageIds: [languageId],
    skipUntranslatedStrings: false,
  })

  const buildId = response.data.id
  console.log(`[DOWNLOAD] Build started with ID: ${buildId}`)

  return buildId
}

/**
 * Poll for build completion.
 */
async function waitForBuild(buildId: number): Promise<void> {
  const projectId = crowdinClient.projectId
  const startTime = Date.now()

  for (;;) {
    const response = await crowdinClient.translations.checkBuildStatus(
      projectId,
      buildId
    )
    const status = response.data.status
    const progress = response.data.progress

    console.log(`[DOWNLOAD] Build status: ${status} | Progress: ${progress}%`)

    if (status === "finished") {
      console.log("[DOWNLOAD] Build completed!")
      return
    }

    if (status === "canceled" || status === "failed") {
      throw new Error(`Build ${status}`)
    }

    if (Date.now() - startTime > BUILD_TIMEOUT_MS) {
      throw new Error("Build timeout")
    }

    await new Promise((resolve) => setTimeout(resolve, BUILD_POLL_INTERVAL_MS))
  }
}

/**
 * Download the built translations.
 */
async function downloadBuild(buildId: number): Promise<Buffer> {
  const projectId = crowdinClient.projectId

  console.log("[DOWNLOAD] Getting download URL...")

  const response = await crowdinClient.translations.downloadTranslations(
    projectId,
    buildId
  )

  const downloadUrl = response.data.url
  console.log("[DOWNLOAD] Downloading translations...")

  const downloadResponse = await fetch(downloadUrl)
  if (!downloadResponse.ok) {
    throw new Error(`Download failed: ${downloadResponse.status}`)
  }

  const buffer = Buffer.from(await downloadResponse.arrayBuffer())
  console.log(`[DOWNLOAD] Downloaded ${buffer.length} bytes`)

  return buffer
}

/**
 * Build translations for a single file (used for per-file downloads).
 */
async function buildFileTranslation(
  fileId: number,
  languageId: string
): Promise<{ url: string }> {
  const projectId = crowdinClient.projectId

  const response = await crowdinClient.translations.buildProjectFileTranslation(
    projectId,
    fileId,
    { targetLanguageId: languageId }
  )

  return { url: response.data.url }
}

/**
 * Get all file IDs from the project.
 */
async function getAllFileIds(): Promise<
  { id: number; path: string; name: string }[]
> {
  const projectId = crowdinClient.projectId
  const files: { id: number; path: string; name: string }[] = []

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const data = response.data as {
      data: { id: number; path: string; name: string }
    }[]

    for (const { data: file } of data) {
      files.push({ id: file.id, path: file.path, name: file.name })
    }

    hasMore = data.length === limit
    offset += limit
  }

  return files
}

async function main() {
  console.log("[DOWNLOAD] Starting Crowdin translation download...")

  // Load environment
  const env = loadEnv()

  // Get target language (single language for this script)
  const targetLanguage = env.targetLanguage || env.targetLanguages[0]
  if (!targetLanguage) {
    console.error("[DOWNLOAD] No TARGET_LANGUAGE specified!")
    process.exit(1)
  }

  console.log(`[DOWNLOAD] Project ID: ${env.crowdinProjectId}`)
  console.log(`[DOWNLOAD] Target language: ${targetLanguage}`)

  // Build translations
  const buildId = await buildTranslations(targetLanguage)

  // Wait for build to complete
  await waitForBuild(buildId)

  // Download translations
  const buffer = await downloadBuild(buildId)

  // Save to file
  const outputPath = `translations-${targetLanguage}.zip`
  writeFileSync(outputPath, buffer)
  console.log(`[DOWNLOAD] Saved to ${outputPath}`)

  // Also create output directory for extracted files
  const outputDir = `translations-${targetLanguage}`
  mkdirSync(outputDir, { recursive: true })
  console.log(`[DOWNLOAD] Output directory: ${outputDir}`)

  console.log("[DOWNLOAD] Download complete!")
}

// Export for use in other scripts
export { buildFileTranslation, getAllFileIds }

main().catch((error) => {
  console.error("[DOWNLOAD] Fatal error:", error)
  process.exit(1)
})
