#!/usr/bin/env npx ts-node
/**
 * crowdin-upload.ts
 *
 * Uploads English source files to Crowdin with hash-based caching.
 * Only uploads files that have changed since the last sync.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-upload.ts
 *
 * Environment:
 *   CROWDIN_API_KEY or I18N_CROWDIN_API_KEY - Crowdin API token
 *   CROWDIN_PROJECT_ID - Crowdin project ID (default: 834930)
 */

import { createHash } from "crypto"
import { existsSync, readFileSync, writeFileSync } from "fs"
import path from "path"

import { glob } from "glob"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

// Configuration
const CACHE_FILE = ".crowdin-upload-cache.json"
const CONCURRENT_UPLOADS = 5 // Respect API rate limits
const CONTENT_PATHS = ["public/content/**/*.md", "src/intl/en/**/*.json"]

interface UploadCache {
  [filePath: string]: {
    hash: string
    crowdinFileId: number
    uploadedAt: string
  }
}

interface CrowdinDirectory {
  id: number
  name: string
  directoryId?: number
}

/**
 * Compute SHA-256 hash of file contents.
 */
function hashFile(filePath: string): string {
  const content = readFileSync(filePath)
  return createHash("sha256").update(content).digest("hex")
}

/**
 * Load upload cache from disk.
 */
function loadCache(): UploadCache {
  if (existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"))
    } catch {
      console.warn(`[UPLOAD] Failed to parse cache file, starting fresh`)
    }
  }
  return {}
}

/**
 * Save upload cache to disk.
 */
function saveCache(cache: UploadCache): void {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

/**
 * Get all Crowdin directories for the project.
 */
async function getCrowdinDirectories(): Promise<Map<string, number>> {
  const projectId = crowdinClient.projectId
  const dirMap = new Map<string, number>()

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceFiles.listProjectDirectories(
      projectId,
      { limit, offset }
    )
    const dirs = response.data as { data: CrowdinDirectory }[]

    for (const { data: dir } of dirs) {
      // Build full path by traversing parent directories
      // For now, just use name - we'll build paths incrementally
      dirMap.set(dir.name, dir.id)
    }

    hasMore = dirs.length === limit
    offset += limit
  }

  return dirMap
}

/**
 * Ensure a directory path exists in Crowdin, creating segments as needed.
 */
async function ensureDirectory(
  dirPath: string,
  existingDirs: Map<string, number>
): Promise<number> {
  const projectId = crowdinClient.projectId
  const segments = dirPath.split("/").filter(Boolean)

  let parentId: number | undefined
  let currentPath = ""

  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment

    // Check if directory exists
    const existingId = existingDirs.get(currentPath)
    if (existingId) {
      parentId = existingId
      continue
    }

    // Create directory
    try {
      const response = await crowdinClient.sourceFiles.createDirectory(
        projectId,
        {
          name: segment,
          directoryId: parentId,
        }
      )
      const newId = response.data.id
      existingDirs.set(currentPath, newId)
      parentId = newId
      console.log(`[UPLOAD] Created directory: ${currentPath}`)
    } catch (error: unknown) {
      const err = error as { code?: string }
      // Directory might already exist (race condition)
      if (err.code === "409") {
        // Refresh and retry
        const dirs = await getCrowdinDirectories()
        const id = dirs.get(currentPath)
        if (id) {
          existingDirs.set(currentPath, id)
          parentId = id
        }
      } else {
        throw error
      }
    }
  }

  return parentId!
}

/**
 * Get existing Crowdin files for the project.
 */
async function getCrowdinFiles(): Promise<
  Map<string, { id: number; path: string }>
> {
  const projectId = crowdinClient.projectId
  const fileMap = new Map<string, { id: number; path: string }>()

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const files = response.data as {
      data: { id: number; path: string; name: string }
    }[]

    for (const { data: file } of files) {
      // Crowdin paths have leading slash, normalize
      const normalizedPath = file.path.replace(/^\//, "")
      fileMap.set(normalizedPath, { id: file.id, path: file.path })
    }

    hasMore = files.length === limit
    offset += limit
  }

  return fileMap
}

/**
 * Upload a single file to Crowdin.
 */
async function uploadFile(
  filePath: string,
  crowdinFiles: Map<string, { id: number; path: string }>,
  directories: Map<string, number>,
  cache: UploadCache
): Promise<void> {
  const projectId = crowdinClient.projectId
  const content = readFileSync(filePath)
  const hash = hashFile(filePath)
  const fileName = path.basename(filePath)
  const dirPath = path.dirname(filePath)

  // Check if file exists in Crowdin
  const existingFile = crowdinFiles.get(filePath)

  if (existingFile) {
    // Update existing file
    const storageResponse = await crowdinClient.uploadStorage.addStorage(
      fileName,
      content
    )
    const storageId = storageResponse.data.id

    await crowdinClient.sourceFiles.updateOrRestoreFile(
      projectId,
      existingFile.id,
      { storageId }
    )

    cache[filePath] = {
      hash,
      crowdinFileId: existingFile.id,
      uploadedAt: new Date().toISOString(),
    }

    console.log(`[UPLOAD] Updated: ${filePath}`)
  } else {
    // Create new file
    const storageResponse = await crowdinClient.uploadStorage.addStorage(
      fileName,
      content
    )
    const storageId = storageResponse.data.id

    const directoryId = await ensureDirectory(dirPath, directories)

    const fileResponse = await crowdinClient.sourceFiles.createFile(projectId, {
      storageId,
      name: fileName,
      directoryId,
    })

    cache[filePath] = {
      hash,
      crowdinFileId: fileResponse.data.id,
      uploadedAt: new Date().toISOString(),
    }

    console.log(`[UPLOAD] Created: ${filePath}`)
  }
}

/**
 * Process files in batches.
 */
async function processBatch<T>(
  items: T[],
  batchSize: number,
  processor: (item: T) => Promise<void>
): Promise<void> {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    await Promise.all(batch.map(processor))
    console.log(
      `[UPLOAD] Progress: ${Math.min(i + batchSize, items.length)}/${items.length}`
    )
  }
}

async function main() {
  console.log("[UPLOAD] Starting Crowdin file upload...")

  // Load environment
  const env = loadEnv()
  console.log(`[UPLOAD] Project ID: ${env.crowdinProjectId}`)

  // Load cache
  const cache = loadCache()
  console.log(`[UPLOAD] Loaded cache with ${Object.keys(cache).length} entries`)

  // Find all source files
  const allFiles: string[] = []
  for (const pattern of CONTENT_PATHS) {
    const files = await glob(pattern)
    allFiles.push(...files)
  }
  console.log(`[UPLOAD] Found ${allFiles.length} source files`)

  // Determine which files need uploading
  const filesToUpload: string[] = []
  const skipped: string[] = []

  for (const file of allFiles) {
    const hash = hashFile(file)
    const cached = cache[file]

    if (cached && cached.hash === hash) {
      skipped.push(file)
    } else {
      filesToUpload.push(file)
    }
  }

  console.log(`[UPLOAD] Skipping ${skipped.length} unchanged files`)
  console.log(`[UPLOAD] Uploading ${filesToUpload.length} changed files`)

  if (filesToUpload.length === 0) {
    console.log("[UPLOAD] All files up-to-date, nothing to upload")
    return
  }

  // Get existing Crowdin structure
  console.log("[UPLOAD] Fetching Crowdin project structure...")
  const [crowdinFiles, directories] = await Promise.all([
    getCrowdinFiles(),
    getCrowdinDirectories(),
  ])
  console.log(`[UPLOAD] Found ${crowdinFiles.size} existing Crowdin files`)
  console.log(`[UPLOAD] Found ${directories.size} existing directories`)

  // Upload files in batches
  await processBatch(filesToUpload, CONCURRENT_UPLOADS, async (file) => {
    try {
      await uploadFile(file, crowdinFiles, directories, cache)
    } catch (error) {
      console.error(`[UPLOAD] Failed to upload ${file}:`, error)
      throw error
    }
  })

  // Save cache
  saveCache(cache)
  console.log(`[UPLOAD] Cache saved to ${CACHE_FILE}`)

  console.log("[UPLOAD] Upload complete!")
}

main().catch((error) => {
  console.error("[UPLOAD] Fatal error:", error)
  process.exit(1)
})
