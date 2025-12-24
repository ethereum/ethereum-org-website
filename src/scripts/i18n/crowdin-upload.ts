#!/usr/bin/env npx ts-node
/**
 * crowdin-upload.ts
 *
 * Uploads English source files to Crowdin.
 * - Only uploads NEW files (existing files are skipped to preserve parsed structure)
 * - Unhides hidden strings so they can be pre-translated
 * - Outputs file IDs for the pretranslate step
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/crowdin-upload.ts
 *
 * Environment:
 *   I18N_CROWDIN_API_KEY - Crowdin API token
 *   TARGET_PATHS - Comma-separated paths to process (optional, empty = all)
 *   FILE_LIMIT - Max files to process (optional, 0 = no limit)
 */

import { readFileSync, writeFileSync } from "fs"
import path from "path"

import { glob } from "glob"

import { crowdinClient } from "./lib/crowdin-client"
import { loadEnv } from "./lib/env"

// Configuration
const CONTENT_PATHS = ["public/content/**/*.md", "src/intl/en/**/*.json"]
const FILE_IDS_OUTPUT = ".crowdin-file-ids.json"
const PARSE_DELAY_MS = 10_000 // Wait for Crowdin to parse new files

interface CrowdinFile {
  id: number
  path: string
  name: string
}

/**
 * Get all existing Crowdin files for the project.
 */
async function getCrowdinFiles(): Promise<Map<string, CrowdinFile>> {
  const projectId = crowdinClient.projectId
  const fileMap = new Map<string, CrowdinFile>()

  let offset = 0
  const limit = 500
  let hasMore = true

  while (hasMore) {
    const response = await crowdinClient.sourceFiles.listProjectFiles(
      projectId,
      { limit, offset }
    )
    const files = response.data as { data: CrowdinFile }[]

    for (const { data: file } of files) {
      // Crowdin paths have leading slash, normalize
      const normalizedPath = file.path.replace(/^\//, "")
      fileMap.set(normalizedPath, file)
    }

    hasMore = files.length === limit
    offset += limit
  }

  return fileMap
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
    const dirs = response.data as {
      data: { id: number; name: string; directoryId?: number }
    }[]

    for (const { data: dir } of dirs) {
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

    const existingId = existingDirs.get(currentPath)
    if (existingId) {
      parentId = existingId
      continue
    }

    try {
      const response = await crowdinClient.sourceFiles.createDirectory(
        projectId,
        { name: segment, directoryId: parentId }
      )
      const newId = response.data.id
      existingDirs.set(currentPath, newId)
      parentId = newId
      console.log(`[UPLOAD] Created directory: ${currentPath}`)
    } catch (error: unknown) {
      const err = error as { code?: string }
      if (err.code === "409") {
        // Already exists, refresh
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
 * Unhide all hidden strings in a Crowdin file.
 * Hidden strings (duplicates) cannot be translated.
 */
async function unhideStringsInFile(fileId: number): Promise<number> {
  const projectId = crowdinClient.projectId
  console.log(`[UNHIDE] Checking for hidden strings in fileId=${fileId}`)

  let offset = 0
  const limit = 500
  let unhiddenCount = 0

  // Paginate through all strings
  for (;;) {
    const response = await crowdinClient.sourceStrings.listProjectStrings(
      projectId,
      { fileId, limit, offset }
    )
    const strings = response.data as {
      data: { id: number; isHidden: boolean }
    }[]

    if (strings.length === 0) break

    for (const { data: str } of strings) {
      if (!str.isHidden) continue

      try {
        await crowdinClient.sourceStrings.editString(projectId, str.id, [
          { op: "replace", path: "/isHidden", value: false },
        ])
        unhiddenCount++
      } catch (err) {
        console.warn(`[UNHIDE] Failed to unhide string ${str.id}:`, err)
      }
    }

    if (strings.length < limit) break
    offset += limit
  }

  if (unhiddenCount > 0) {
    console.log(
      `[UNHIDE] ✓ Unhidden ${unhiddenCount} strings in fileId=${fileId}`
    )
  }

  return unhiddenCount
}

/**
 * Upload a new file to Crowdin (only for files not already in Crowdin).
 */
async function uploadNewFile(
  filePath: string,
  directories: Map<string, number>
): Promise<number> {
  const projectId = crowdinClient.projectId
  const content = readFileSync(filePath)
  const fileName = path.basename(filePath)
  const dirPath = path.dirname(filePath)

  // Upload to storage
  const storageResponse = await crowdinClient.uploadStorage.addStorage(
    fileName,
    content
  )
  const storageId = storageResponse.data.id

  // Ensure directory exists
  const directoryId = await ensureDirectory(dirPath, directories)

  // Create file
  const fileResponse = await crowdinClient.sourceFiles.createFile(projectId, {
    storageId,
    name: fileName,
    directoryId,
  })

  console.log(`[UPLOAD] Created: ${filePath} (id=${fileResponse.data.id})`)
  return fileResponse.data.id
}

/**
 * Filter files by target paths.
 */
function filterByTargetPaths(files: string[], targetPaths: string[]): string[] {
  if (targetPaths.length === 0) return files

  return files.filter((file) =>
    targetPaths.some(
      (target) => file.startsWith(target) || file.includes(`/${target}`)
    )
  )
}

async function main() {
  console.log("[UPLOAD] Starting Crowdin file upload...")

  // Load environment
  const env = loadEnv()
  console.log(`[UPLOAD] Project ID: ${env.crowdinProjectId}`)

  // Parse target paths
  const targetPathsEnv = process.env.TARGET_PATHS || ""
  const targetPaths = targetPathsEnv
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
  if (targetPaths.length > 0) {
    console.log(`[UPLOAD] Target paths: ${targetPaths.join(", ")}`)
  }

  // Find all source files
  let allFiles: string[] = []
  for (const pattern of CONTENT_PATHS) {
    const files = await glob(pattern)
    allFiles.push(...files)
  }
  console.log(`[UPLOAD] Found ${allFiles.length} total source files`)

  // Filter by target paths
  if (targetPaths.length > 0) {
    allFiles = filterByTargetPaths(allFiles, targetPaths)
    console.log(
      `[UPLOAD] Filtered to ${allFiles.length} files matching target paths`
    )
  }

  // Apply file limit
  const fileLimit = parseInt(process.env.FILE_LIMIT || "0", 10)
  if (fileLimit > 0 && allFiles.length > fileLimit) {
    console.log(`[UPLOAD] Limiting to ${fileLimit} files (FILE_LIMIT)`)
    allFiles = allFiles.slice(0, fileLimit)
  }

  if (allFiles.length === 0) {
    console.log("[UPLOAD] No files to process")
    return
  }

  // Get existing Crowdin structure
  console.log("[UPLOAD] Fetching Crowdin project structure...")
  const [crowdinFiles, directories] = await Promise.all([
    getCrowdinFiles(),
    getCrowdinDirectories(),
  ])
  console.log(`[UPLOAD] Found ${crowdinFiles.size} existing Crowdin files`)

  // Separate new files from existing
  const fileIds: number[] = []
  const newFiles: string[] = []
  const existingFiles: string[] = []

  for (const file of allFiles) {
    const crowdinFile = crowdinFiles.get(file)
    if (crowdinFile) {
      // File exists - skip upload, just record ID
      existingFiles.push(file)
      fileIds.push(crowdinFile.id)
    } else {
      newFiles.push(file)
    }
  }

  console.log(
    `[UPLOAD] Existing files (skipping upload): ${existingFiles.length}`
  )
  console.log(`[UPLOAD] New files to upload: ${newFiles.length}`)

  // Upload new files
  if (newFiles.length > 0) {
    for (const file of newFiles) {
      try {
        const fileId = await uploadNewFile(file, directories)
        fileIds.push(fileId)
      } catch (error) {
        console.error(`[UPLOAD] Failed to upload ${file}:`, error)
        throw error
      }
    }

    // Wait for Crowdin to parse new files
    console.log(
      `[UPLOAD] Waiting ${PARSE_DELAY_MS / 1000}s for Crowdin to parse new files...`
    )
    await new Promise((resolve) => setTimeout(resolve, PARSE_DELAY_MS))
  }

  // Unhide strings in all files
  console.log(
    `\n[UNHIDE] Checking ${fileIds.length} files for hidden strings...`
  )
  for (const fileId of fileIds) {
    await unhideStringsInFile(fileId)
  }

  // Output file IDs for pretranslate step
  writeFileSync(FILE_IDS_OUTPUT, JSON.stringify({ fileIds }, null, 2))
  console.log(`[UPLOAD] File IDs saved to ${FILE_IDS_OUTPUT}`)

  console.log(
    `\n[UPLOAD] Complete! ${fileIds.length} files ready for pre-translation`
  )
}

main().catch((error) => {
  console.error("[UPLOAD] Fatal error:", error)
  process.exit(1)
})
