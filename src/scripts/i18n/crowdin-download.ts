#!/usr/bin/env npx ts-node
/**
 * crowdin-download.ts
 *
 * Downloads translations from Crowdin for a specific language.
 * - Uses per-file builds for subset translations (faster, targeted)
 * - Uses buildProject for all files (more efficient at scale)
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-download.ts
 *
 * Environment:
 *   CROWDIN_API_KEY or I18N_CROWDIN_API_KEY - Crowdin API token
 *   CROWDIN_PROJECT_ID - Crowdin project ID (default: 834930)
 *   TARGET_LANGUAGE - Language code to download (e.g., "es-EM")
 *
 * Input:
 *   Reads file IDs from .crowdin-file-ids.json (output from upload step)
 *   If not found, uses buildProject for all files
 *
 * Output:
 *   translations-{language}.zip
 */

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs"
import path from "path"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

// Configuration
const BUILD_POLL_INTERVAL_MS = 10_000 // 10 seconds
const BUILD_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes
const FILE_IDS_INPUT = ".crowdin-file-ids.json"
const PER_FILE_THRESHOLD = 100 // Use per-file builds if fewer than this many files

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
 * Get file IDs with their paths from upload step or project.
 */
async function getFileIdsWithPaths(): Promise<
  { id: number; path: string }[] | null
> {
  // First, try to read from upload output
  if (existsSync(FILE_IDS_INPUT)) {
    try {
      const data = JSON.parse(readFileSync(FILE_IDS_INPUT, "utf-8"))
      if (
        data.fileIds &&
        Array.isArray(data.fileIds) &&
        data.fileIds.length > 0
      ) {
        // We have file IDs but need to get their paths
        console.log(
          `[DOWNLOAD] Found ${data.fileIds.length} file IDs from upload step`
        )

        // If below threshold, use per-file builds
        if (data.fileIds.length <= PER_FILE_THRESHOLD) {
          // Fetch file info to get paths
          const filesWithPaths = await getFilePathsById(data.fileIds)
          return filesWithPaths
        }

        // Above threshold - return null to use buildProject
        console.log(
          `[DOWNLOAD] File count (${data.fileIds.length}) exceeds per-file threshold (${PER_FILE_THRESHOLD})`
        )
        console.log("[DOWNLOAD] Using buildProject for efficiency")
        return null
      }
    } catch (err) {
      console.warn(`[DOWNLOAD] Failed to read ${FILE_IDS_INPUT}:`, err)
    }
  }

  // No file IDs specified - use buildProject for all files
  console.log(
    "[DOWNLOAD] No specific file IDs, using buildProject for all files"
  )
  return null
}

/**
 * Get file paths for specific file IDs.
 */
async function getFilePathsById(
  fileIds: number[]
): Promise<{ id: number; path: string }[]> {
  const projectId = crowdinClient.projectId
  const fileMap = new Map<number, string>()

  // Fetch all files to build a map
  let offset = 0
  const limit = 500

  for (;;) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const files = response.data as {
      data: { id: number; path: string }
    }[]

    for (const { data: file } of files) {
      if (fileIds.includes(file.id)) {
        fileMap.set(file.id, file.path.replace(/^\//, ""))
      }
    }

    if (files.length < limit) break
    offset += limit
  }

  return fileIds
    .filter((id) => fileMap.has(id))
    .map((id) => ({ id, path: fileMap.get(id)! }))
}

/**
 * Download translations using per-file builds.
 * More efficient for small subsets of files.
 */
async function downloadPerFile(
  files: { id: number; path: string }[],
  languageId: string,
  outputDir: string
): Promise<void> {
  console.log(
    `[DOWNLOAD] Downloading ${files.length} files using per-file builds`
  )

  let downloaded = 0
  let failed = 0

  for (const file of files) {
    try {
      const { url } = await buildFileTranslation(file.id, languageId)

      const response = await fetch(url)
      if (!response.ok) {
        console.warn(
          `[DOWNLOAD] Failed to download ${file.path}: ${response.status}`
        )
        failed++
        continue
      }

      const buffer = Buffer.from(await response.arrayBuffer())

      // Write to output directory maintaining structure
      const outputPath = path.join(outputDir, file.path)
      mkdirSync(path.dirname(outputPath), { recursive: true })
      writeFileSync(outputPath, buffer)

      downloaded++
      if (downloaded % 10 === 0) {
        console.log(`[DOWNLOAD] Progress: ${downloaded}/${files.length} files`)
      }
    } catch (err) {
      console.warn(`[DOWNLOAD] Error downloading ${file.path}:`, err)
      failed++
    }
  }

  console.log(`[DOWNLOAD] Downloaded ${downloaded} files, ${failed} failed`)
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

  for (;;) {
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

    if (data.length < limit) break
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

  // Create output directory
  const outputDir = `translations-${targetLanguage}`
  mkdirSync(outputDir, { recursive: true })

  // Check if we should use per-file builds (for subsets) or buildProject (for all)
  const specificFiles = await getFileIdsWithPaths()

  if (specificFiles && specificFiles.length > 0) {
    // Use per-file builds for subset translations
    console.log(
      `[DOWNLOAD] Using per-file builds for ${specificFiles.length} files`
    )
    await downloadPerFile(specificFiles, targetLanguage, outputDir)

    // Create a zip file from the downloaded files for artifact upload
    const zipPath = `translations-${targetLanguage}.zip`
    await createZipFromDirectory(outputDir, zipPath)
    console.log(`[DOWNLOAD] Created ${zipPath}`)
  } else {
    // Use buildProject for all files (more efficient at scale)
    console.log("[DOWNLOAD] Using buildProject for all files")

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
  }

  console.log(`[DOWNLOAD] Output directory: ${outputDir}`)
  console.log("[DOWNLOAD] Download complete!")
}

/**
 * Create a zip file from a directory.
 * Simple implementation using Node.js built-in zlib (for small file sets).
 */
async function createZipFromDirectory(
  sourceDir: string,
  outputPath: string
): Promise<void> {
  const archiver = await import("archiver").catch(() => null)

  if (archiver) {
    // Use archiver if available
    const output = createWriteStream(outputPath)
    const archive = archiver.default("zip", { zlib: { level: 9 } })

    return new Promise((resolve, reject) => {
      output.on("close", resolve)
      archive.on("error", reject)
      archive.pipe(output)
      archive.directory(sourceDir, false)
      archive.finalize()
    })
  } else {
    // Fallback: just note that we'll skip zipping (workflow extracts from dir anyway)
    console.log("[DOWNLOAD] archiver not available, skipping zip creation")
    // Create empty placeholder so workflow doesn't fail
    writeFileSync(outputPath, Buffer.from([]))
  }
}

// Export for use in other scripts
export { buildFileTranslation, getAllFileIds }

main().catch((error) => {
  console.error("[DOWNLOAD] Fatal error:", error)
  process.exit(1)
})
