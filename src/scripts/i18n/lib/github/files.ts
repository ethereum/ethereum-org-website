// GitHub file operations

import { config, gitHubBearerHeaders } from "../../config"
import type {
  ContentType,
  GitHubCrowdinFileMetadata,
  GitHubQueryResponseItem,
} from "../types"
import { fetchWithRetry } from "../utils/fetch"

/**
 * Get English files with pagination, allowing limit + offset.
 * GitHub Search API caps `per_page` at 100; we fetch pages until
 * we accumulate `offset + limit` items, then return the slice.
 */
export const getAllEnglishFiles = async (
  limit = 100,
  offset = 0
): Promise<GitHubQueryResponseItem[]> => {
  const ghSearchEndpointBase = "https://api.github.com/search/code"
  const query = `repo:${config.ghOrganization}/${config.ghRepo} extension:md path:"${config.mdRoot}" -path:"${config.mdRoot}/translations" OR repo:${config.ghOrganization}/${config.ghRepo} extension:json path:"${config.jsonRoot}"`

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
