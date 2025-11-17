import dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

import type {
  BranchDetailsResponse,
  BranchObject,
  BuildProjectFileTranslationResponse,
  ContentType,
  CrowdinAddFileResponse,
  CrowdinFileData,
  CrowdinFileInfoResponseModel,
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

// const internalToCrowdinCodeMapping: Record<string, string> = i18nConfig.reduce(
//   (acc, { crowdinCode, code }) => {
//     acc[code] = crowdinCode
//     return acc
//   },
//   {} as Record<string, string>
// )

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

const env = {
  projectId: 834930,
  ghOrganization: "ethereum",
  ghRepo: "ethereum-org-website",
  jsonRoot: "src/intl/en",
  mdRoot: "public/content",
  preTranslatePromptId: 168584,
  allCrowdinCodes: ["es-EM"], // i18nConfig.map((item) => item.crowdinCode),
  baseBranch: "i18n-flow-1", // "dev",
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
 * Get all files, using perPage to limit amount fetched
 */
const getAllEnglishFiles = async (
  perPage = 100
): Promise<GitHubQueryResponseItem[]> => {
  const ghSearchEndpointBase = "https://api.github.com/search/code"
  const query = `repo:${env.ghOrganization}/${env.ghRepo} extension:md path:"${env.mdRoot}" -path:"${env.mdRoot}/translations" OR repo:${env.ghOrganization}/${env.ghRepo} extension:json path:"${env.jsonRoot}"`

  const url = new URL(ghSearchEndpointBase)
  url.searchParams.set("q", query)
  url.searchParams.set("per_page", perPage.toString())
  url.searchParams.set("page", "1")

  console.log(`[DEBUG] GitHub search query: ${query}`)
  console.log(`[DEBUG] GitHub search URL: ${url.toString()}`)

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

    console.log(`[DEBUG] Found ${json.items.length} files from GitHub`)
    console.log(`[DEBUG] First GitHub file:`, json.items[0])
    return json.items
  } catch (error) {
    console.error(`[ERROR] Failed to get English files from GitHub:`, error)
    process.exit(1)
  }
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
  // return { owner, repo, branch, englishFiles }
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

const putCrowdinFile = async (
  fileId: number,
  storageId: number
): Promise<unknown> => {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.projectId}/files/${fileId}`
  )

  try {
    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ storageId }),
    })

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      throw new Error(`Crowdin putCrowdinFile failed (${res.status}): ${body}`)
    }

    type JsonResponse = { data: CrowdinFileInfoResponseModel }
    const json: JsonResponse = await res.json()
    console.log("Updated file:", json.data)
    return json.data
  } catch (error) {
    console.error(error)
    process.exit(1)
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
  options?: { intervalMs?: number; timeoutMs?: number }
): Promise<CrowdinPreTranslateResponse> => {
  const intervalMs = options?.intervalMs ?? 10_000
  const timeoutMs = options?.timeoutMs ?? 30 /* min */ * 60 * 1000

  return await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timed out waiting for pre-translation to finish"))
    }, timeoutMs)

    const poll = async () => {
      try {
        const res = await getPreTranslationStatus(preTranslationId)
        if (res.status !== "in_progress") {
          clearTimeout(timeout)
          if (res.status === "finished") {
            resolve(res)
          } else {
            reject(
              new Error(
                `Pre-translation ended with unexpected status: ${res.status}`
              )
            )
          }
        } else {
          setTimeout(poll, intervalMs)
        }
      } catch (err) {
        clearTimeout(timeout)
        reject(err)
      }
    }

    void poll()
  })
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

    // const contentDisposition = res.headers.get("content-disposition") || ""
    // const cdMatch = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/.exec(
    //   contentDisposition
    // )
    // let fileName = ""
    // if (cdMatch) {
    //   fileName = decodeURIComponent(cdMatch[1] || cdMatch[2] || "")
    // }
    // if (!fileName) {
    //   try {
    //     const urlObj = new URL(downloadUrl)
    //     fileName = urlObj.pathname.split("/").pop() || "file"
    //   } catch {
    //     fileName = "file"
    //   }
    // }

    // const contentType =
    //   res.headers.get("content-type") || "application/octet-stream"

    // return { buffer, fileName, contentType }
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

// const addSlashes = (path: string) =>
//   path.replace(/^\/*/, "/").replace(/\/*$/, "/")

const createBranchName = () => {
  const ts = new Date().toISOString().replace(/\..*$/, "").replace(/[:]/g, "-") // e.g., 2025-11-10T04-20-13
  return "i18n/import/" + ts
}

const getDestinationFromPath = (
  crowdinFilePath: string, // e.g. src/intl/en/page-foo.json
  internalLanguageCode: string
) => {
  const destinationPath = crowdinFilePath
    .replace("/en/", `/${internalLanguageCode}/`)
    .replace(/^\//, "")

  return destinationPath
  // return { destinationPath, internalLanguageCode }
}

// const createCommitDetails = (
//   crowdinFilePaths: string[], // e.g. src/intl/en/page-foo.json
//   internalLanguageCode: string
// ) => {
//   // const ext = (crowdinFilePath.split(".").pop() || "").toLowerCase()
//   // const isJson = ext === "json"
//   // const rootEnPath = addSlashes(isJson ? env.jsonRoot : env.mdRoot)

//   // const crowdinCode = $("Split fileIds").first().json.languageIds[0]

//   // const langCode = $("Language code mapping").first().json[crowdinCode]
//   const destinationPaths = crowdinFilePaths.map((crowdinFilePath) =>
//     crowdinFilePath
//       .replace("/en/", `/${internalLanguageCode}/`)
//       .replace(/^\//, "")
//   )

//   return { destinationPaths, internalLanguageCode }

//   // const simpleName = isJson
//   //   ? crowdinFilePath
//   //       .split("/")
//   //       .pop()
//   //       .replace(/\.[^.]+$/, "")
//   //   : crowdinFilePath
//   //       .split(rootEnPath)
//   //       .pop()
//   //       .replace("/index.md", "")
//   //       .replace("/", "-")

//   // const branch = branchParts.join("/")
//   // return [{ branch, destinationPath, langCode: internalLanguageCode }]
// }

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
  sha?: string
) => {
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
      // Retry as an update with the file SHA and return to avoid falling through
      return await putCommitFile(buffer, destinationPath, branch, fileSha)
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

  // type JsonResponse = { data: { data: CrowdinFileData }[] }
  const json = await res.json()
  return json
}

// const test = async () => {
//         const fileBuffer = await downloadGitHubFile(file.download_url)
//         const storageInfo = await postFileToStorage(
//           fileBuffer,
//           file["Crowdin-API-FileName"]
//         )

//         await putCrowdinFile(foundFile.id, storageInfo.id)
//         // fileBuffer goes out of scope here and can be garbage collected
//       }

async function main(options?: { allLangs: boolean }) {
  console.log(`[DEBUG] Starting main function with options:`, options)
  console.log(`[DEBUG] Environment config:`, {
    projectId: env.projectId,
    baseBranch: env.baseBranch,
    jsonRoot: env.jsonRoot,
    mdRoot: env.mdRoot,
    allCrowdinCodes: env.allCrowdinCodes,
  })

  const allEnglishFiles = await getAllEnglishFiles(4)
  console.log(
    `[DEBUG] Found ${allEnglishFiles.length} English files from GitHub`
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
  for (const file of fileMetadata) {
    console.log(`[DEBUG] Processing file: ${file.filePath}`)
    await (async () => {
      let foundFile: CrowdinFileData | undefined
      try {
        foundFile = findCrowdinFile(file, crowdinProjectFiles)
      } catch {
        console.log("File not found in Crowdin, attempting to add new file")
      }
      const fileBuffer = await downloadGitHubFile(file.download_url)
      const storageInfo = await postFileToStorage(
        fileBuffer,
        file["Crowdin-API-FileName"]
      )
      let crowdinFileResponse: CrowdinAddFileResponse | undefined
      if (foundFile) {
        await putCrowdinFile(foundFile.id, storageInfo.id)
      } else {
        // Derive full parent directory path (exclude filename)
        const parts = file.filePath.split("/").filter(Boolean)
        parts.pop() // remove filename
        const parentDirPath = parts.join("/") || "/"
        console.log(
          `[DEBUG] Attempting to create new Crowdin file in parent directory path: ${parentDirPath}`
        )
        crowdinFileResponse = await postCrowdinFile(
          storageInfo.id,
          file["Crowdin-API-FileName"],
          parentDirPath
        )
      }
      if (!foundFile && !crowdinFileResponse)
        throw new Error("No file found AND unable to add new file")
      fileIdsSet.add(
        foundFile?.id || (crowdinFileResponse as CrowdinAddFileResponse).id
      )
      // fileBuffer goes out of scope here and can be garbage collected
    })()
  }

  const applyPreTranslationResponse = await postApplyPreTranslation(
    Array.from(fileIdsSet),
    options?.allLangs ? env.allCrowdinCodes : env.allCrowdinCodes
  )
  console.log({ preTranslationId: applyPreTranslationResponse.identifier })

  const preTranslateJobCompletedResponse = await awaitPreTranslationCompleted(
    applyPreTranslationResponse.identifier
  )

  if (preTranslateJobCompletedResponse.status !== "finished") {
    console.error(
      "Pre-translation did not finish successfully. Full response:",
      preTranslateJobCompletedResponse
    )
    throw new Error(
      `Pre-translation ended with unexpected status: ${preTranslateJobCompletedResponse.status}`
    )
  }

  console.log(preTranslateJobCompletedResponse)

  const { languageIds, fileIds } = preTranslateJobCompletedResponse.attributes

  const fileIdToPathMapping = crowdinProjectFiles.reduce(
    (acc, { path, id }) => {
      if (fileIds.includes(id)) acc[id] = path
      return acc
    },
    {} as Record<number, string>
  )
  // Build mapping between Crowdin IDs (e.g. "es-EM") and internal codes (e.g. "es")
  const languagePairs = languageIds.map((crowdinId) => ({
    crowdinId,
    internalLanguageCode: crowdinToInternalCodeMapping[crowdinId],
  }))
  // const detailsForCommits = internalLanguageCodes.map((internalLanguageCode) =>
  //   createCommitDetails(crowdinFilePaths, internalLanguageCode)
  // )

  const { branch } = await postCreateBranchFrom(env.baseBranch)

  // Create branch from dev

  // For each language
  for (const { crowdinId, internalLanguageCode } of languagePairs) {
    // Build, download and commit each file updated
    for (const fileId of fileIds) {
      // 1- Build
      const { url: downloadUrl } = await postBuildProjectFileTranslation(
        fileId,
        crowdinId, // Crowdin expects the Crowdin language ID here (e.g., "es-EM")
        env.projectId
      )
      // 2- Download
      const { buffer } = await getBuiltFile(downloadUrl)
      // 3a- Get destination path
      const destinationPath = getDestinationFromPath(
        fileIdToPathMapping[fileId],
        internalLanguageCode // Use internal code (e.g., "es") for repo path replacement
      )
      // 3b- Commit
      putCommitFile(buffer, destinationPath, branch)
    }
  }

  const pr = postPullRequest(branch, env.baseBranch)

  console.log("SUCCESS!", pr)

  /**
   * First markdown test
   */
  // try {
  //   const firstMarkdown = fileMetadata.filter(
  //     (file) => file["Content-Type"] === "text/markdown"
  //   )[0]
  //   console.log(firstMarkdown)
  //   const fileBuffer = await downloadGitHubFile(firstMarkdown.download_url)
  //   await postFileToStorage(fileBuffer, firstMarkdown["Crowdin-API-FileName"])
  // } catch (error) {
  //   console.error("No JSON found while parsing fileMetadata")
  // }

  /**
   * First JSON test
   */
  // try {
  //   const firstJson = fileMetadata.filter(
  //     (file) => file["Content-Type"] === "application/json"
  //   )[0]

  //   // const targetCrowdinFile = crowdinProjectFiles.find(({ path }) => {

  //   // })
  //   // console.log(firstJson)
  //   // crowdinProjectFiles[0].id // fileId
  //   // crowdinProjectFiles[0].path // e.g., /path/to/file.ext

  //   // const found = crowdinProjectFiles.find(({ path }) =>
  //   //   path.endsWith(firstJson.filePath)
  //   // )
  //   // if (!found) throw new Error("No matching Crowdin project file found")

  //   const found = findCrowdinFile(firstJson, crowdinProjectFiles)
  //   const fileBuffer = await downloadGitHubFile(firstJson.download_url)
  //   const storageInfo = await postFileToStorage(
  //     fileBuffer,
  //     firstJson["Crowdin-API-FileName"]
  //   )
  //   await putCrowdinFile((found as CrowdinFileData).id, storageInfo.id)
  // } catch (error) {
  //   console.error("No JSON found while parsing fileMetadata")
  // }
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})

/**
 * 1. Get all english content files from GitHub
 * 1b. Filter to selected files
 * 2. Download files from GitHub
 * 3. Upload to Crowdin storage
 * return [{ json: { fileId: found.id, projectId: found.projectId, name: found.name, path: found.path } }];
 * 4. Point fileId to new storageId
 * Need array with at LEAST { storageId, fileId }[]
 */
