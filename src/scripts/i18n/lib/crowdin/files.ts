// Crowdin file operations

import {
  config,
  CROWDIN_API_BASE_URL,
  crowdinBearerHeaders,
} from "../../config"
import type {
  CrowdinAddFileResponse,
  CrowdinFileData,
  GitHubCrowdinFileMetadata,
} from "../types"

/**
 * Get all files in the Crowdin project
 */
export const getCrowdinProjectFiles = async (): Promise<CrowdinFileData[]> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/files`
  )
  url.searchParams.set("limit", "500")

  console.log(`[DEBUG] Fetching Crowdin project files from: ${url.toString()}`)

  try {
    const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })

    if (!res.ok) {
      console.warn(`[ERROR] Crowdin API response not OK: ${res.status}`)
      const body = await res.text().catch(() => "")
      console.error(`[ERROR] Response body:`, body)
      throw new Error(
        `Crowdin getCrowdinProjectFiles failed (${res.status}): ${body}`
      )
    }

    type JsonResponse = { data: { data: CrowdinFileData }[] }
    const json: JsonResponse = await res.json()

    const mappedData = json.data.map(({ data }) => data)

    console.log(
      `[DEBUG] Successfully fetched ${mappedData.length} Crowdin files`
    )
    console.log(`[DEBUG] First Crowdin file:`, mappedData[0])
    return mappedData
  } catch (error) {
    console.error(`[ERROR] Failed to fetch Crowdin project files:`, error)
    process.exit(1)
  }
}

/**
 * Find a Crowdin file matching a GitHub file
 */
export const findCrowdinFile = (
  targetFile: GitHubCrowdinFileMetadata,
  crowdinFiles: CrowdinFileData[]
): CrowdinFileData => {
  console.log(
    `[DEBUG] Looking for Crowdin file matching: ${targetFile.filePath}`
  )
  console.log(`[DEBUG] Target file name: ${targetFile["Crowdin-API-FileName"]}`)

  // Log first few Crowdin files for comparison
  console.log(`[DEBUG] Total Crowdin files found: ${crowdinFiles.length}`)
  console.log(
    `[DEBUG] First 3 Crowdin file paths:`,
    crowdinFiles.slice(0, 3).map((f) => f.path)
  )

  const found = crowdinFiles.find(({ path }) =>
    path.endsWith(targetFile.filePath)
  )

  if (!found) {
    console.error(
      `[ERROR] No matching Crowdin project file found for: ${targetFile.filePath}`
    )
    console.error(
      `[ERROR] Available Crowdin file paths:`,
      crowdinFiles.map((f) => f.path)
    )
    throw new Error(
      `No matching Crowdin project file found for: ${targetFile.filePath}`
    )
  }

  console.log(
    `[DEBUG] Successfully matched with Crowdin file: ${found.path} (ID: ${found.id})`
  )
  return found
}

/**
 * Unhides all hidden strings in a Crowdin file.
 * Hidden strings (often marked as duplicates) cannot be translated.
 * This function makes them visible so they can be processed by pre-translation.
 */
export const unhideStringsInFile = async (fileId: number): Promise<number> => {
  console.log(`[UNHIDE] Checking for hidden strings in fileId=${fileId}`)

  // Get all strings from the file
  const listUrl = `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/strings?fileId=${fileId}&limit=500`

  try {
    const listRes = await fetch(listUrl, { headers: crowdinBearerHeaders })
    if (!listRes.ok) {
      const text = await listRes.text().catch(() => "")
      console.warn(
        `[UNHIDE] Failed to list strings for fileId=${fileId}: ${text}`
      )
      return 0
    }

    const listJson = await listRes.json()
    const strings = listJson.data || []

    let unhiddenCount = 0

    for (const item of strings) {
      const stringId = item.data.id
      const isHidden = item.data.isHidden

      if (!isHidden) continue

      // Unhide the string using PATCH
      const patchUrl = `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/strings/${stringId}`

      try {
        const patchRes = await fetch(patchUrl, {
          method: "PATCH",
          headers: {
            ...crowdinBearerHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              op: "replace",
              path: "/isHidden",
              value: false,
            },
          ]),
        })

        if (patchRes.ok) {
          unhiddenCount++
        } else {
          const text = await patchRes.text().catch(() => "")
          console.warn(`[UNHIDE] Failed to unhide string ${stringId}: ${text}`)
        }
      } catch (err) {
        console.warn(`[UNHIDE] Error unhiding string ${stringId}:`, err)
      }
    }

    if (unhiddenCount > 0) {
      console.log(
        `[UNHIDE] ✓ Unhidden ${unhiddenCount} strings in fileId=${fileId}`
      )
    } else {
      console.log(`[UNHIDE] No hidden strings found in fileId=${fileId}`)
    }

    return unhiddenCount
  } catch (error) {
    console.error(`[UNHIDE] Error processing fileId=${fileId}:`, error)
    return 0
  }
}

/**
 * Lists all Crowdin directories in the project.
 */
export const getCrowdinProjectDirectories = async (): Promise<
  { id: number; name: string; directoryId?: number }[]
> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/directories`
  )
  url.searchParams.set("limit", "500")

  console.log(`[DEBUG] Fetching Crowdin directories: ${url.toString()}`)

  try {
    const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(
        `Crowdin getCrowdinProjectDirectories failed (${res.status}): ${body}`
      )
    }
    type DirJson = {
      data: { data: { id: number; name: string; directoryId?: number } }[]
    }
    const json: DirJson = await res.json()
    const dirs = json.data.map(({ data }) => data)
    console.log(`[DEBUG] Loaded ${dirs.length} directories`)
    return dirs
  } catch (error) {
    console.error("[ERROR] getCrowdinProjectDirectories:", error)
    throw error
  }
}

/**
 * Creates a single Crowdin directory (one segment). Parent may be undefined for root.
 */
export const postCrowdinDirectory = async (
  name: string,
  parentDirectoryId?: number
): Promise<number> => {
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/directories`
  )

  const body: Record<string, unknown> = { name }
  if (parentDirectoryId) body.directoryId = parentDirectoryId

  console.log(
    `[DEBUG] Creating directory segment "${name}" parent=${parentDirectoryId ?? "ROOT"}`
  )

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      // 409 = already exists race condition
      throw new Error(
        `Crowdin postCrowdinDirectory failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = { data: { id: number } }
    const json: JsonResponse = await res.json()
    console.log(`[DEBUG] Created directory id=${json.data.id} name="${name}"`)
    return json.data.id
  } catch (error) {
    console.error("[ERROR] postCrowdinDirectory:", error)
    throw error
  }
}

/**
 * Ensures a nested path of directories exists.
 * Example path: "public/content/community/events/organizing"
 * Returns the final (deepest) directory id.
 *
 * - Splits path on "/" ignoring empty segments.
 * - Reuses existing segments (matched by name + parent).
 * - Creates missing segments sequentially.
 */
export const createCrowdinDirectory = async (
  fullPath: string
): Promise<number> => {
  if (!fullPath || typeof fullPath !== "string") {
    throw new Error("createCrowdinDirectory: path must be a non-empty string")
  }
  console.log(`[DEBUG] Ensuring Crowdin directory path: "${fullPath}"`)

  const segments = fullPath
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean)
  if (!segments.length) throw new Error("No valid path segments")

  const invalidChars = /[\\:*?"<>|]/ // Disallowed per Crowdin docs for directory name (exclude forward slash which is path separator)
  for (const segment of segments) {
    if (invalidChars.test(segment)) {
      throw new Error(
        `createCrowdinDirectory: segment "${segment}" contains invalid characters in path "${fullPath}"`
      )
    }
  }

  // Load existing directories once
  const existing = await getCrowdinProjectDirectories()

  // Build quick lookup: parentId|name -> id (root parentId = 0 sentinel)
  const key = (parentId: number | undefined, name: string) =>
    `${parentId || 0}|${name}`

  const directoryIndex = new Map<string, number>()
  for (const dir of existing) {
    directoryIndex.set(key(dir.directoryId, dir.name), dir.id)
  }

  let currentParentId: number | undefined
  for (const segment of segments) {
    const k = key(currentParentId, segment)
    let dirId = directoryIndex.get(k)
    if (dirId) {
      console.log(
        `[DEBUG] Reusing existing directory "${segment}" id=${dirId} parent=${currentParentId ?? "ROOT"}`
      )
      currentParentId = dirId
      continue
    }
    // Create
    dirId = await postCrowdinDirectory(segment, currentParentId)
    directoryIndex.set(k, dirId)
    currentParentId = dirId
  }

  if (!currentParentId)
    throw new Error("Failed to resolve final directory id (unexpected)")

  console.log(
    `[DEBUG] Final directory id for path "${fullPath}" = ${currentParentId}`
  )
  return currentParentId
}

/**
 * Upload a file to Crowdin storage
 */
export const postFileToStorage = async (
  fileBuffer: Buffer,
  fileName: string
) => {
  const url = new URL(`${CROWDIN_API_BASE_URL}/storages`)

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        // Crowdin expects raw bytes for storages endpoint; use octet-stream.
        "Content-Type": "application/octet-stream",
        "Crowdin-API-FileName": fileName,
      },
      body: fileBuffer,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `Crowdin postFileToStorage failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = {
      data: {
        id: number
        fileName: string
      }
    }
    const json: JsonResponse = await res.json()
    console.log("Uploaded storage:", json.data)
    return json.data
  } catch (error) {
    console.error("postFileToStorage error:", error)
    throw error
  }
}

/**
 * Add a file to Crowdin project
 */
export const postCrowdinFile = async (
  storageId: number,
  name: string,
  dir: string
): Promise<CrowdinAddFileResponse> => {
  const directoryId = await createCrowdinDirectory(dir)
  const url = new URL(
    `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/files`
  )

  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ storageId, name, directoryId }),
    })

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      throw new Error(`Crowdin postCrowdinFile failed (${res.status}): ${body}`)
    }

    type JsonResponse = { data: CrowdinAddFileResponse }
    const json: JsonResponse = await res.json()
    console.log("Updated file:", json.data)
    return json.data
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
