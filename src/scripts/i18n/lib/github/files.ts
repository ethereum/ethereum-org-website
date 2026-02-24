// GitHub file operations

import { config, doNotTranslatePaths, gitHubBearerHeaders } from "../../config"
import type {
  ContentType,
  GitHubCrowdinFileMetadata,
  GitHubQueryResponseItem,
} from "../types"
import { fetchWithRetry } from "../utils/fetch"
import { debugLog } from "../workflows/utils"

/**
 * Check if a path should be excluded
 */
function isPathExcluded(filePath: string, excludedPaths: string[]): boolean {
  return excludedPaths.some((excluded) => filePath.includes(excluded))
}

/**
 * Check if a path is a file (has .md or .json extension) or directory
 */
function isFilePath(targetPath: string): boolean {
  return targetPath.endsWith(".md") || targetPath.endsWith(".json")
}

/**
 * Get English files with optional file/directory filtering and excluded paths.
 * If targetPath is a file (ends with .md or .json), returns only that file.
 * If targetPath is a directory, returns all files recursively within that directory.
 * Otherwise, returns all English content files.
 */
export const getAllEnglishFiles = async (): Promise<
  GitHubQueryResponseItem[]
> => {
  const { targetPath, excludePath } = config

  // Add runtime exclusion if specified
  const allExcludedPaths = excludePath
    ? [...doNotTranslatePaths, excludePath]
    : doNotTranslatePaths

  debugLog(
    `Do-not-translate paths loaded: ${doNotTranslatePaths.length} entries`
  )
  if (excludePath) {
    debugLog(`Runtime path exclusions: ${excludePath}`)
  }

  // Determine if targetPath is a file or directory
  if (targetPath) {
    if (isPathExcluded(targetPath, allExcludedPaths)) {
      console.log(`[INFO] Path ${targetPath} is in excluded paths, skipping`)
      return []
    }

    if (isFilePath(targetPath)) {
      // Single file mode
      console.log(`[INFO] Fetching single file: ${targetPath}`)
      return await fetchSingleFile(targetPath)
    } else {
      // Directory mode
      console.log(`[INFO] Fetching files from directory: ${targetPath}`)
    }
  }

  // Directory mode or full translation
  const ghSearchEndpointBase = "https://api.github.com/search/code"
  let query: string

  if (targetPath && !isFilePath(targetPath)) {
    // Search within specific directory
    query = `repo:${config.ghOrganization}/${config.ghRepo} extension:md path:"${targetPath}" -path:"${config.mdRoot}/translations" OR repo:${config.ghOrganization}/${config.ghRepo} extension:json path:"${targetPath}"`
  } else {
    // Search all content files
    query = `repo:${config.ghOrganization}/${config.ghRepo} extension:md path:"${config.mdRoot}" -path:"${config.mdRoot}/translations" OR repo:${config.ghOrganization}/${config.ghRepo} extension:json path:"${config.jsonRoot}"`
    if (!targetPath) {
      console.log(`[INFO] Fetching all English content files`)
    }
  }

  debugLog(`GitHub search query: ${query}`)

  const perPage = 100
  const collected: GitHubQueryResponseItem[] = []

  let page = 1
  let hasMorePages = true
  while (hasMorePages) {
    const url = new URL(ghSearchEndpointBase)
    url.searchParams.set("q", query)
    url.searchParams.set("per_page", perPage.toString())
    url.searchParams.set("page", page.toString())

    debugLog(`Fetching search page ${page}...`)

    try {
      const res = await fetchWithRetry(url.toString(), {
        headers: gitHubBearerHeaders,
      })

      if (!res.ok) {
        const body = await res.text().catch(() => "")
        throw new Error(`GitHub getAllEnglishFiles (${res.status}): ${body}`)
      }

      type JsonResponse = { items: GitHubQueryResponseItem[] }
      const json: JsonResponse = await res.json()

      if (!json.items.length) {
        debugLog(`No more results at page ${page}`)
        hasMorePages = false
        break
      }

      collected.push(...json.items)
      debugLog(`Collected ${collected.length} items so far`)

      page += 1
      if (page > 10) {
        console.warn(`[WARN] Reached pagination safety cap at page ${page - 1}`)
        hasMorePages = false
        break
      }
    } catch (error) {
      console.error(`[ERROR] Failed to get English files from GitHub:`, error)
      process.exit(1)
    }
  }

  // Filter out excluded paths (static + runtime)
  const filtered = collected.filter(
    (item) => !isPathExcluded(item.path, allExcludedPaths)
  )

  const excludedCount = collected.length - filtered.length
  if (excludedCount > 0) {
    console.log(`[INFO] Filtered out ${excludedCount} excluded files`)
  }

  console.log(`[INFO] Total files to translate: ${filtered.length}`)

  return filtered
}

/**
 * Fetch a single file by path from GitHub
 */
async function fetchSingleFile(
  filePath: string
): Promise<GitHubQueryResponseItem[]> {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/contents/${filePath}?ref=${config.baseBranch}`

  try {
    const res = await fetchWithRetry(url, {
      headers: gitHubBearerHeaders,
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch file ${filePath}: ${res.status}`)
    }

    const data = await res.json()

    // Convert to GitHubQueryResponseItem format
    return [
      {
        name: data.name,
        path: data.path,
        sha: data.sha,
        url: data.url,
        git_url: data.git_url,
        html_url: data.html_url,
        repository: {
          id: 0,
          name: config.ghRepo,
          full_name: `${config.ghOrganization}/${config.ghRepo}`,
          owner: {
            login: config.ghOrganization,
            id: 0,
            node_id: "",
            avatar_url: "",
            gravatar_id: "",
            url: "",
            html_url: "",
            followers_url: "",
            following_url: "",
            gists_url: "",
            starred_url: "",
            subscriptions_url: "",
            organizations_url: "",
            repos_url: "",
            events_url: "",
            received_events_url: "",
            type: "Organization",
            user_view_type: "",
            site_admin: false,
          },
        } as GitHubQueryResponseItem["repository"],
        score: 1,
      },
    ]
  } catch (error) {
    console.error(`[ERROR] Failed to fetch single file ${filePath}:`, error)
    throw error
  }
}

/**
 * Convert GitHub items to Crowdin file metadata
 */
export const getFileMetadata = async (
  items: GitHubQueryResponseItem[]
): Promise<GitHubCrowdinFileMetadata[]> => {
  if (!items.length) return []

  const owner = items[0].repository.owner.login
  const repo = items[0].repository.name

  const englishFileMetadata = items.map((item) => {
    // https://raw.githubusercontent.com/:owner/:repo/:ref/:path
    const download_url = `https://raw.githubusercontent.com/${owner}/${repo}/${config.baseBranch}/${item.path}`
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

/**
 * Download a file from GitHub
 */
export const downloadGitHubFile = async (
  download_url: string
): Promise<Buffer> => {
  try {
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
