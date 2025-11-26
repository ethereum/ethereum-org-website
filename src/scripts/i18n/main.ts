/* eslint-disable import/order */
import fs from "fs"

import dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

import { runSanitizer } from "./post_import_sanitize"
import type {
  BranchDetailsResponse,
  BranchObject,
  BuildProjectFileTranslationResponse,
  ContentType,
  CrowdinAddFileResponse,
  CrowdinFileData,
  CrowdinPreTranslateResponse,
  GitHubCrowdinFileMetadata,
  GitHubQueryResponseItem,
} from "./types"

dotenv.config({ path: ".env.local" })

const crowdinToInternalCodeMapping: Record<string, string> = i18nConfig.reduce(
  (acc, { crowdinCode, code }) => {
    acc[crowdinCode] = code
    return acc
  },
  {} as Record<string, string>
)

const gitHubApiKey = process.env.I18N_GITHUB_API_KEY || ""
if (!gitHubApiKey) {
  console.error("[ERROR] Missing I18N_GITHUB_API_KEY environment variable")
  console.error(
    "[ERROR] Please set I18N_GITHUB_API_KEY in your .env.local file"
  )
  throw new Error("No GitHub API Key found (I18N_GITHUB_API_KEY)")
}
console.log("[DEBUG] GitHub API key found ✓")
const gitHubBearerHeaders = {
  Authorization: `Bearer ${gitHubApiKey}`,
  Accept: "application/vnd.github.v3+json",
}

const crowdinApiKey = process.env.I18N_CROWDIN_API_KEY || ""
if (!crowdinApiKey) {
  console.error("[ERROR] Missing I18N_CROWDIN_API_KEY environment variable")
  console.error(
    "[ERROR] Please set I18N_CROWDIN_API_KEY in your .env.local file"
  )
  throw new Error("No Crowdin API Key found (I18N_CROWDIN_API_KEY)")
}
console.log("[DEBUG] Crowdin API key found ✓")
const crowdinBearerHeaders = { Authorization: `Bearer ${crowdinApiKey}` }

// Parse environment variables with defaults
const targetLanguages = process.env.TARGET_LANGUAGES
  ? process.env.TARGET_LANGUAGES.split(",").map((lang) => lang.trim())
  : ["es-EM"]

const baseBranch = process.env.BASE_BRANCH || "dev"

const fileLimit = process.env.FILE_LIMIT
  ? parseInt(process.env.FILE_LIMIT, 10)
  : 100

const startOffset = process.env.START_OFFSET
  ? parseInt(process.env.START_OFFSET, 10)
  : 0

// Adaptive polling / timeout configuration (milliseconds)
const pretranslateTimeoutMs = process.env.PRETRANSLATE_TIMEOUT_MS
  ? parseInt(process.env.PRETRANSLATE_TIMEOUT_MS, 10)
  : 6 * 60 * 60 * 1000 // default 6h
const pretranslatePollBaseMs = process.env.PRETRANSLATE_POLL_BASE_MS
  ? Math.max(5000, parseInt(process.env.PRETRANSLATE_POLL_BASE_MS, 10))
  : 30_000 // default 30s base (min clamped to 5s)

const existingPreTranslationId = process.env.PRETRANSLATION_ID || ""

// Parse GitHub repository from env (format: "owner/repo")
const githubRepo =
  process.env.GITHUB_REPOSITORY || "ethereum/ethereum-org-website"
const [ghOrganization, ghRepo] = githubRepo.split("/")

console.log("[DEBUG] Configuration:")
console.log(`[DEBUG] - Target languages: ${targetLanguages.join(", ")}`)
console.log(`[DEBUG] - Base branch: ${baseBranch}`)
console.log(`[DEBUG] - File limit: ${fileLimit}`)
console.log(`[DEBUG] - Start offset: ${startOffset}`)
console.log(`[DEBUG] - GitHub repo: ${ghOrganization}/${ghRepo}`)
console.log(`[DEBUG] - Pretranslate timeout ms: ${pretranslateTimeoutMs}`)
console.log(`[DEBUG] - Pretranslate poll base ms: ${pretranslatePollBaseMs}`)
if (existingPreTranslationId) {
  console.log(
    `[DEBUG] - Resuming from pre-translation ID: ${existingPreTranslationId}`
  )
}

const env = {
  projectId: 834930,
  ghOrganization,
  ghRepo,
  jsonRoot: "src/intl/en",
  mdRoot: "public/content",
  preTranslatePromptId: 326942,
  allCrowdinCodes: targetLanguages,
  baseBranch,
}

// --- Utilities: resilient fetch for GitHub calls ---
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

type RetryOptions = {
  retries?: number
  timeoutMs?: number
  backoffMs?: number
  retryOnStatuses?: number[]
}

const fetchWithRetry = async (
  url: string,
  init?: RequestInit,
  options?: RetryOptions
) => {
  const retries = options?.retries ?? 3
  const timeoutMs = options?.timeoutMs ?? 30000
  const backoffMs = options?.backoffMs ?? 1000
  const retryOnStatuses = options?.retryOnStatuses ?? [
    408, 429, 500, 502, 503, 504,
  ]

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        ...(init || {}),
        signal: controller.signal,
      })
      clearTimeout(id)
      if (
        !res.ok &&
        retryOnStatuses.includes(res.status) &&
        attempt < retries
      ) {
        const wait = backoffMs * Math.pow(2, attempt)
        console.warn(
          `[RETRY] ${url} -> ${res.status}. Attempt ${attempt + 1}/${retries}. Waiting ${wait}ms.`
        )
        await delay(wait)
        continue
      }
      return res
    } catch (err: unknown) {
      clearTimeout(id)
      const errObj = err as { name?: string; code?: string }
      const isAbort = errObj?.name === "AbortError"
      const isConnectTimeout = errObj?.code === "UND_ERR_CONNECT_TIMEOUT"
      if ((isAbort || isConnectTimeout) && attempt < retries) {
        const wait = backoffMs * Math.pow(2, attempt)
        console.warn(
          `[RETRY] ${url} -> ${isAbort ? "AbortError" : errObj?.code}. Attempt ${
            attempt + 1
          }/${retries}. Waiting ${wait}ms.`
        )
        await delay(wait)
        continue
      }
      throw err
    }
  }
  // Unreachable, but TS wants a return
  throw new Error("fetchWithRetry: exhausted retries")
}

/**
 * Get English files with pagination, allowing limit + offset.
 * GitHub Search API caps `per_page` at 100; we fetch pages until
 * we accumulate `offset + limit` items, then return the slice.
 */
const getAllEnglishFiles = async (
  limit = 100,
  offset = 0
): Promise<GitHubQueryResponseItem[]> => {
  const ghSearchEndpointBase = "https://api.github.com/search/code"
  const query = `repo:${env.ghOrganization}/${env.ghRepo} extension:md path:"${env.mdRoot}" -path:"${env.mdRoot}/translations" OR repo:${env.ghOrganization}/${env.ghRepo} extension:json path:"${env.jsonRoot}"`

  console.log(`[DEBUG] GitHub search query: ${query}`)

  const perPage = 100
  const needed = offset + limit
  const collected: GitHubQueryResponseItem[] = []

  let page = 1
  while (collected.length < needed) {
    const url = new URL(ghSearchEndpointBase)
    url.searchParams.set("q", query)
    url.searchParams.set("per_page", perPage.toString())
    url.searchParams.set("page", page.toString())

    console.log(`[DEBUG] Fetching search page ${page} ...`)

    try {
      const res = await fetchWithRetry(url.toString(), {
        headers: gitHubBearerHeaders,
      })

      if (!res.ok) {
        console.warn(`[ERROR] GitHub API response not OK: ${res.status}`)
        const body = await res.text().catch(() => "")
        console.error(`[ERROR] Response body:`, body)
        throw new Error(`GitHub getAllEnglishFiles (${res.status}): ${body}`)
      }

      type JsonResponse = { items: GitHubQueryResponseItem[] }
      const json: JsonResponse = await res.json()

      if (!json.items.length) {
        console.log(`[DEBUG] No more results at page ${page}.`)
        break
      }

      collected.push(...json.items)
      console.log(`[DEBUG] Collected ${collected.length} items so far.`)

      page += 1
      if (page > 10) {
        // Safety cap: avoid excessive paging; typical search caps ~1000 results
        console.warn(
          `[WARN] Reached pagination safety cap at page ${page - 1}.`
        )
        break
      }
    } catch (error) {
      console.error(`[ERROR] Failed to get English files from GitHub:`, error)
      process.exit(1)
    }
  }

  const sliced = collected.slice(offset, offset + limit)
  console.log(
    `[DEBUG] Returning ${sliced.length} files (offset=${offset}, limit=${limit})`
  )
  if (sliced.length) console.log(`[DEBUG] First GitHub file:`, sliced[0])
  return sliced
}

const getFileMetadata = async (
  items: GitHubQueryResponseItem[]
): Promise<GitHubCrowdinFileMetadata[]> => {
  if (!items.length) return []

  const owner = items[0].repository.owner.login
  const repo = items[0].repository.name

  const englishFileMetadata = items.map((item) => {
    // https://raw.githubusercontent.com/:owner/:repo/:ref/:path
    const download_url = `https://raw.githubusercontent.com/${owner}/${repo}/${env.baseBranch}/${item.path}`
    const filePath = item.path
    const filePathSplit = filePath.split("/")
    const fileName = filePathSplit[filePathSplit.length - 1]
    const contentType: ContentType = fileName?.endsWith(".json")
      ? "application/json"
      : "text/markdown"

    return {
      "Crowdin-API-FileName": fileName,
      filePath: filePath,
      download_url: download_url,
      "Content-Type": contentType,
    }
  })
  return englishFileMetadata
}

const getCrowdinProjectFiles = async (): Promise<CrowdinFileData[]> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/files`
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

const findCrowdinFile = (
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
const unhideStringsInFile = async (fileId: number): Promise<number> => {
  console.log(`[UNHIDE] Checking for hidden strings in fileId=${fileId}`)

  // Get all strings from the file
  const listUrl = `https://api.crowdin.com/api/v2/projects/${env.projectId}/strings?fileId=${fileId}&limit=500`

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
      const patchUrl = `https://api.crowdin.com/api/v2/projects/${env.projectId}/strings/${stringId}`

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
const getCrowdinProjectDirectories = async (): Promise<
  { id: number; name: string; directoryId?: number }[]
> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/directories`
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
const postCrowdinDirectory = async (
  name: string,
  parentDirectoryId?: number
): Promise<number> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/directories`
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
const createCrowdinDirectory = async (fullPath: string): Promise<number> => {
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

const postCrowdinFile = async (
  storageId: number,
  name: string,
  dir: string
): Promise<CrowdinAddFileResponse> => {
  const directoryId = await createCrowdinDirectory(dir)
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/files`
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

const downloadGitHubFile = async (download_url: string): Promise<Buffer> => {
  try {
    // const res = await fetch(download_url, { headers: gitHubBearerHeaders })
    const res = await fetch(download_url)
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(`Failed to download from GitHub (${res.status}): ${body}`)
    }
    const arrayBuffer = await res.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error("downloadGitHubFile error:", error)
    throw error
  }
}

const postFileToStorage = async (fileBuffer: Buffer, fileName: string) => {
  const url = new URL("https://api.crowdin.com/api/v2/storages")

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

const postApplyPreTranslation = async (
  fileIds: number[],
  languageIds?: string[]
): Promise<CrowdinPreTranslateResponse> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/pre-translations`
  )
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        languageIds: languageIds || env.allCrowdinCodes, // ["es-EM"], // TODO: All languages
        fileIds,
        method: "ai",
        aiPromptId: env.preTranslatePromptId,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `Crowdin postApplyPreTranslation failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = {
      data: CrowdinPreTranslateResponse
    }
    const json: JsonResponse = await res.json()

    return json.data
  } catch (error) {
    console.error("postApplyPreTranslation error:", error)
    throw error
  }
}

const getPreTranslationStatus = async (
  preTranslationId: string
): Promise<CrowdinPreTranslateResponse> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/pre-translations/${preTranslationId}`
  )
  try {
    const res = await fetch(url.toString(), { headers: crowdinBearerHeaders })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `Crowdin getPreTranslationStatus failed (${res.status}): ${text}`
      )
    }

    type JsonResponse = {
      data: CrowdinPreTranslateResponse
    }
    const json: JsonResponse = await res.json()

    return json.data
  } catch (error) {
    console.error("postApplyPreTranslation error:", error)
    throw error
  }
}

/**
 * Polls Crowdin for the status of a pre-translation job and resolves when it finishes.
 *
 * This function repeatedly calls `getPreTranslationStatus` for the given
 * pre-translation ID until the job is no longer in progress. It polls at a
 * fixed interval (10 seconds) and will abort with an error if the operation
 * does not complete within the configured timeout (30 minutes).
 *
 * @param preTranslationId - The identifier of the Crowdin pre-translation job to monitor.
 *
 * @returns A promise that resolves with the final CrowdinPreTranslateResponse when the
 *          job status becomes "finished".
 *
 * @throws {Error} If the wait times out (after 30 minutes).
 * @throws {Error} If the pre-translation completes with an unexpected status
 *                 (i.e., any status other than "finished").
 * @throws {Error} If an error is thrown while fetching the pre-translation status
 *                 (errors from `getPreTranslationStatus` are propagated).
 *
 * @remarks
 * - Polling interval: 10,000 ms (10 seconds).
 * - Timeout: 30 minutes.
 *
 * @example
 * // Wait for a pre-translation to complete
 * const result = await awaitPreTranslationCompleted("abc123")
 */
const awaitPreTranslationCompleted = async (
  preTranslationId: string,
  opts?: { timeoutMs?: number; baseIntervalMs?: number }
): Promise<CrowdinPreTranslateResponse> => {
  const timeoutMs = opts?.timeoutMs ?? pretranslateTimeoutMs
  const baseInterval = opts?.baseIntervalMs ?? pretranslatePollBaseMs
  const start = Date.now()
  let attempt = 0

  const computeInterval = (elapsedMs: number): number => {
    const minutes = elapsedMs / 60000
    if (minutes < 10) return baseInterval
    if (minutes < 30) return Math.max(baseInterval * 2, 60_000)
    if (minutes < 60) return Math.max(baseInterval * 4, 180_000)
    return Math.max(baseInterval * 10, 300_000) // cap at 5 min
  }

  // Bounded loop: terminates once elapsed exceeds timeoutMs
  while (Date.now() - start <= timeoutMs) {
    const elapsed = Date.now() - start
    attempt++
    let res: CrowdinPreTranslateResponse
    try {
      res = await getPreTranslationStatus(preTranslationId)
    } catch (e) {
      // transient fetch errors: log + continue within timeout window
      const nextWait = computeInterval(elapsed)
      console.warn(
        `[PRE-TRANSLATE][POLL] Error on attempt ${attempt}: ${(e as Error).message}. Retrying in ${nextWait}ms.`
      )
      await delay(nextWait)
      continue
    }
    if (res.status !== "in_progress") {
      if (res.status === "finished") {
        console.log(
          `[PRE-TRANSLATE][POLL] Completed after ${attempt} attempts; elapsed ${Math.round(
            (Date.now() - start) / 60000
          )}m.`
        )
        return res
      }
      throw new Error(
        `Pre-translation ended with unexpected status: ${res.status}`
      )
    }
    const nextWait = computeInterval(elapsed)
    const progressPct = res.progress ?? 0
    console.log(
      `[PRE-TRANSLATE][POLL] attempt=${attempt} progress=${progressPct}% elapsed=${Math.round(
        elapsed / 60000
      )}m nextWait=${nextWait}ms`
    )
    await delay(nextWait)
  }
  const finalElapsed = Date.now() - start
  throw new Error(
    `Timed out waiting for pre-translation (elapsed ${Math.round(
      finalElapsed / 60000
    )}m)`
  )
}

/**
 * Method: POST
 * https://support.crowdin.com/developer/api/v2/#tag/Translations/operation/api.projects.translations.builds.directories.post
 * @param fileId
 * @param targetLanguageId
 * @param projectId
 * @returns { url: string; expireIn: string; etag: string; }
 */
const postBuildProjectFileTranslation = async (
  fileId: number,
  targetLanguageId: string,
  projectId = env.projectId
): Promise<BuildProjectFileTranslationResponse> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${projectId}/translations/builds/files/${fileId}`
  )

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      ...crowdinBearerHeaders,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ targetLanguageId }),
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(
      `Crowdin postBuildProjectFileTranslation failed (${res.status}): ${body}`
    )
  }

  type JsonResponse = { data: BuildProjectFileTranslationResponse }
  const json: JsonResponse = await res.json()
  console.log("Built file:", json.data)
  return json.data
}

/**
 * method: GET
 * @param downloadUrl
 * @returns { buffer: Buffer }
 */
const getBuiltFile = async (
  downloadUrl: string
  // ): Promise<{ buffer: Buffer; fileName: string; contentType: string }> => {
): Promise<{ buffer: Buffer }> => {
  try {
    const res = await fetch(downloadUrl)

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(`Failed to download built file (${res.status}): ${body}`)
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return { buffer }
  } catch (error) {
    console.error("getBuiltFile error:", error)
    throw error
  }
}

/**
 * Retrieves the Git object for a branch from the GitHub API and returns its underlying BranchObject.
 *
 * Fetches the ref for the given branch name from:
 * https://api.github.com/repos/{env.ghOrganization}/{env.ghRepo}/git/ref/heads/{branch}
 * using the preconfigured `gitHubBearerHeaders`.
 *
 * @param branch - The branch name to look up (for example "main" or "dev").
 * @returns A promise that resolves to the BranchObject extracted from the GitHub API response.
 *
 * @throws {Error} If the HTTP response is not OK (non-2xx). The thrown error includes the HTTP status
 * and the response body text (when available).
 * @throws {SyntaxError} If the response body cannot be parsed as JSON.
 *
 * @remarks
 * - This function expects `env.ghOrganization`, `env.ghRepo`, and `gitHubBearerHeaders` to be available
 *   in the enclosing scope and correctly configured.
 * - The function returns the `.object` property of the BranchDetailsResponse returned by GitHub.
 * - Network errors (e.g. connectivity issues) will propagate as rejected promises from `fetch`.
 *
 * @example
 * ```ts
 * // resolves to the branch's object (sha, type, url)
 * const obj = await getBranchObject("dev");
 * ```
 */
const getBranchObject = async (branch: string): Promise<BranchObject> => {
  // https://api.github.com/repos/{{ $('env').item.json.ghOrganization }}/{{ $('env').item.json.ghRepo }}/git/ref/heads/dev
  const url = new URL(
    `https://api.github.com/repos/${env.ghOrganization}/${env.ghRepo}/git/ref/heads/${branch}`
  )

  const res = await fetchWithRetry(url.toString(), {
    headers: gitHubBearerHeaders,
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`GitHub getBranchObject (${res.status}): ${body}`)
  }

  type JsonResponse = BranchDetailsResponse
  const json: JsonResponse = await res.json()
  // console.log("getBranchDetails results", json)
  return json.object
}

const createBranchName = () => {
  const ts = new Date().toISOString().replace(/\..*$/, "").replace(/[:]/g, "-") // e.g., 2025-11-10T04-20-13
  return "i18n/import/" + ts
}

const getDestinationFromPath = (
  crowdinFilePath: string, // e.g. src/intl/en/page-foo.json OR public/content/.../index.md
  internalLanguageCode: string
) => {
  const normalized = crowdinFilePath.replace(/^\//, "")
  const isJson = normalized.toLowerCase().endsWith(".json")
  const isMarkdown = normalized.toLowerCase().endsWith(".md")

  let destinationPath = normalized

  if (isJson) {
    // JSON: src/intl/en/*.json -> src/intl/<lang>/*.json
    if (normalized.startsWith("src/intl/en/")) {
      destinationPath = normalized.replace(
        /^src\/intl\/en\//,
        `src/intl/${internalLanguageCode}/`
      )
    } else if (normalized.startsWith("src/intl/")) {
      // Fallback: if for some reason "en" segment is missing, inject lang after src/intl/
      const parts = normalized.split("/")
      // parts: [src, intl, ...]
      parts.splice(2, 0, internalLanguageCode)
      destinationPath = parts.join("/")
    }
  } else if (isMarkdown) {
    // Markdown: public/content/<path>/index.md -> public/content/translations/<lang>/<path>/index.md
    if (normalized.startsWith("public/content/")) {
      const rel = normalized.replace(/^public\/content\//, "")
      // If already inside translations/, avoid duplicating; rewrite to current lang
      const relParts = rel.split("/").filter(Boolean)
      if (relParts[0] === "translations") {
        // Drop existing translations/<lang>/
        const rest = relParts.slice(2).join("/")
        destinationPath = `public/content/translations/${internalLanguageCode}/${rest}`
      } else {
        destinationPath = `public/content/translations/${internalLanguageCode}/${rel}`
      }
    }
  }

  console.log(
    `[DEBUG] Destination mapping: ${crowdinFilePath} -> ${destinationPath} (lang=${internalLanguageCode})`
  )
  return destinationPath
}

/**
 * method: PUT
 */
const postCreateBranchFrom = async (ref = env.baseBranch) => {
  const { sha } = await getBranchObject(ref)

  const branch = createBranchName()

  const url = new URL(
    `https://api.github.com/repos/${env.ghOrganization}/${env.ghRepo}/git/refs`
  )

  try {
    console.log(
      `[DEBUG] Creating branch from base="${ref}" sha=${sha} -> new branch="${branch}"`
    )
    const res = await fetchWithRetry(url.toString(), {
      method: "POST",
      headers: {
        ...gitHubBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
    })

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      console.error(
        `[ERROR] Failed to create branch. URL=${url.toString()} status=${res.status}`
      )
      throw new Error(`GitHub createBranchFrom (${res.status}): ${body}`)
    }

    return { branch, sha }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const getPathSha = async (path: string, branch: string) => {
  const url = new URL(
    `https://api.github.com/repos/${env.ghOrganization}/${env.ghRepo}/contents/${path}?ref=${branch}`
  )

  const res = await fetchWithRetry(url.toString(), {
    headers: gitHubBearerHeaders,
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`GitHub getPathSha (${res.status}): ${body}`)
  }

  type JsonResponse = { sha: string }
  const { sha }: JsonResponse = await res.json()

  return { sha }
}
const putCommitFile = async (
  buffer: Buffer,
  destinationPath: string,
  branch: string,
  sha?: string,
  attempt = 0
): Promise<void> => {
  const url = `https://api.github.com/repos/${env.ghOrganization}/${env.ghRepo}/contents/${destinationPath}`

  try {
    // Use the buffer contents as base64-encoded content for the commit
    const contentBase64 = buffer.toString("base64")

    const body = {
      message: `update(i18n): ${destinationPath}`,
      content: contentBase64,
      branch,
    }

    if (sha) body["sha"] = sha

    const res = await fetchWithRetry(url.toString(), {
      method: "PUT",
      headers: {
        ...gitHubBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (res.status === 422) {
      const { sha: fileSha } = await getPathSha(destinationPath, branch)
      console.warn(
        `[RETRY] 422 Unprocessable for ${destinationPath}. Retrying with existing SHA ${fileSha}`
      )
      return await putCommitFile(
        buffer,
        destinationPath,
        branch,
        fileSha,
        attempt
      )
    }

    if (res.status === 409) {
      if (attempt >= 5) {
        const bodyText = await res.text().catch(() => "")
        throw new Error(
          `GitHub putCommitFile conflict persists after ${attempt} retries (${res.status}): ${bodyText}`
        )
      }
      const backoff = 500 * Math.pow(2, attempt) // 500ms, 1s, 2s, 4s, 8s
      console.warn(
        `[RETRY] 409 Conflict for ${destinationPath}. Attempt ${attempt + 1}. Waiting ${backoff}ms before retry.`
      )
      await delay(backoff)
      const { sha: latestSha } = await getPathSha(destinationPath, branch)
      return await putCommitFile(
        buffer,
        destinationPath,
        branch,
        latestSha,
        attempt + 1
      )
    }

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      throw new Error(`GitHub putCommitFile (${res.status}): ${body}`)
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const postPullRequest = async (head: string, base = env.baseBranch) => {
  const url = new URL(
    `https://api.github.com/repos/${env.ghOrganization}/${env.ghRepo}/pulls`
  )

  const body = {
    title: "i18n: automated Crowdin translation import",
    head,
    base,
    body: "Automated Crowdin translation import",
  }

  const res = await fetchWithRetry(url.toString(), {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`Crowdin postPullRequest failed (${res.status}): ${body}`)
  }

  const json = await res.json()
  return json
}

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

  // Build mapping between Crowdin IDs (e.g. "es-EM") and internal codes (e.g. "es")
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: crowdinToInternalCodeMapping[crowdinId],
  }))

  const { branch } = await postCreateBranchFrom(env.baseBranch)
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
        env.projectId
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
  const sanitizeResult = runSanitizer(env.allCrowdinCodes)
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
  console.log(`[PR] Base branch: ${env.baseBranch}`)

  const pr = await postPullRequest(branch, env.baseBranch)

  console.log(`\n[SUCCESS] ========== Translation import complete! ==========`)
  console.log(`[SUCCESS] Pull Request URL: ${pr.html_url}`)
  console.log(`[SUCCESS] PR Number: #${pr.number}`)
  console.log(pr)
}

async function main(options?: { allLangs: boolean }) {
  console.log(`[DEBUG] Starting main function with options:`, options)
  console.log(`[DEBUG] Environment config:`, {
    projectId: env.projectId,
    baseBranch: env.baseBranch,
    jsonRoot: env.jsonRoot,
    mdRoot: env.mdRoot,
    allCrowdinCodes: env.allCrowdinCodes,
  })

  // Check if resuming from existing pre-translation
  if (existingPreTranslationId) {
    console.log(
      `\n[RESUME] ========== Resuming from pre-translation ID: ${existingPreTranslationId} ==========`
    )
    console.log(`[RESUME] Checking status of existing pre-translation...`)

    const preTranslateJobCompletedResponse = await getPreTranslationStatus(
      existingPreTranslationId
    )

    if (preTranslateJobCompletedResponse.status === "in_progress") {
      console.log(
        `[RESUME] Pre-translation still in progress (${preTranslateJobCompletedResponse.progress}%). Waiting for completion...`
      )
      const completedResponse = await awaitPreTranslationCompleted(
        existingPreTranslationId
      )
      return await buildAndCommitTranslations(completedResponse)
    } else if (preTranslateJobCompletedResponse.status === "finished") {
      console.log(
        `[RESUME] Pre-translation already finished. Building translations...`
      )
      return await buildAndCommitTranslations(preTranslateJobCompletedResponse)
    } else {
      throw new Error(
        `Pre-translation ${existingPreTranslationId} has unexpected status: ${preTranslateJobCompletedResponse.status}`
      )
    }
  }

  // Normal flow: Start new pre-translation
  console.log(`\n[START] ========== Starting new pre-translation ==========`)

  // Fetch English files with limit + start offset
  const allEnglishFiles = await getAllEnglishFiles(fileLimit, startOffset)
  console.log(
    `[DEBUG] Found ${allEnglishFiles.length} English files from GitHub (offset=${startOffset}, limit=${fileLimit})`
  )

  // TODO: Add filter here to select specific files
  const fileMetadata = await getFileMetadata(allEnglishFiles)
  console.log(`[DEBUG] Generated metadata for ${fileMetadata.length} files`)
  console.log(`[DEBUG] First file metadata:`, fileMetadata[0])

  const crowdinProjectFiles = await getCrowdinProjectFiles() // ***
  console.log(
    `[DEBUG] Found ${crowdinProjectFiles.length} files in Crowdin project`
  )

  /**
   * Iterate through each file and upload
   */
  const fileIdsSet = new Set<number>()
  // Maintain authoritative mapping of processed Crowdin fileId -> path (including newly added files this run)
  const processedFileIdToPath: Record<number, string> = {}
  // Keep original English buffers to detect untranslated outputs
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
      // Record path for destination mapping later (Crowdin returns leading slash paths)
      if (effectivePath) processedFileIdToPath[effectiveFileId] = effectivePath
    })()
  }

  // Unhide any hidden/duplicate strings before pre-translation
  console.log(
    `\n[UNHIDE] ========== Unhiding strings in ${fileIdsSet.size} files ==========`
  )
  for (const fileId of fileIdsSet) {
    await unhideStringsInFile(fileId)
  }

  console.log(
    `\n[PRE-TRANSLATE] ========== Requesting AI Pre-Translation ==========`
  )
  console.log(`[PRE-TRANSLATE] FileIds to translate:`, Array.from(fileIdsSet))
  console.log(`[PRE-TRANSLATE] Target languages:`, env.allCrowdinCodes)
  console.log(`[PRE-TRANSLATE] AI Prompt ID:`, env.preTranslatePromptId)

  const applyPreTranslationResponse = await postApplyPreTranslation(
    Array.from(fileIdsSet),
    options?.allLangs ? env.allCrowdinCodes : env.allCrowdinCodes
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

  const { languageIds, fileIds } = preTranslateJobCompletedResponse.attributes

  // Build mapping for commit phase. Prefer processed mapping (includes newly added files); fall back to existing Crowdin snapshot for any missed IDs.
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
  // Build mapping between Crowdin IDs (e.g. "es-EM") and internal codes (e.g. "es")
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: crowdinToInternalCodeMapping[crowdinId],
  }))

  const { branch } = await postCreateBranchFrom(env.baseBranch)
  console.log(`\n[BRANCH] ✓ Created branch: ${branch}`)

  // For each language
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    console.log(
      `\n[BUILD] ========== Building translations for language: ${crowdinId} (internal: ${internalLanguageCode}) ==========`
    )

    // Build, download and commit each file updated
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
        crowdinId, // Crowdin expects the Crowdin language ID here (e.g., "es-EM")
        env.projectId
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
        internalLanguageCode // Use internal code (e.g., "es") for repo path replacement
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
  const sanitizeResult = runSanitizer(env.allCrowdinCodes)
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
  console.log(`[PR] Base branch: ${env.baseBranch}`)

  const pr = await postPullRequest(branch, env.baseBranch)

  console.log(`\n[SUCCESS] ========== Translation import complete! ==========`)
  console.log(`[SUCCESS] Pull Request URL: ${pr.html_url}`)
  console.log(`[SUCCESS] PR Number: #${pr.number}`)
  console.log(pr)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
