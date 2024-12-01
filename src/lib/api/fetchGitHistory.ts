import type { Commit, CommitHistory } from "@/lib/types"

import {
  CONTENT_DIR,
  GITHUB_COMMITS_URL,
  OLD_CONTENT_DIR,
} from "@/lib/constants"

async function fetchWithRateLimit(filepath: string): Promise<Commit[]> {
  const url = new URL(GITHUB_COMMITS_URL)
  url.searchParams.set("path", filepath)
  url.searchParams.set("sha", "master")

  const gitHubToken = process.env.GITHUB_TOKEN_READ_ONLY

  // If no token available, return empty array
  if (!gitHubToken) return []

  /* eslint-disable no-constant-condition --
   * eslint does not like while(true)
   **/
  while (true) {
    const response = await fetch(url.href, {
      headers: { Authorization: `token ${gitHubToken}` },
    })

    if (
      response.status === 403 &&
      response.headers.get("X-RateLimit-Remaining") === "0"
    ) {
      const resetTime = response.headers.get("X-RateLimit-Reset") as string
      const waitTime = +resetTime - Math.floor(Date.now() / 1000)
      console.log(`Rate limit exceeded, waiting for ${waitTime} seconds`)
      await new Promise((resolve) => setTimeout(resolve, waitTime * 1000))
      continue
    }

    if (!response.ok) throw new Error(response.statusText)
    const json = await response.json()
    if (!Array.isArray(json)) {
      console.warn("Unexpected response from GitHub API", json)
      return []
    }
    return json
  }
}

// Fetch commit history and save it to a JSON file
export const fetchAndCacheGitContributors = async (
  filepath: string,
  cache: CommitHistory
) => {
  // First, check cache for existing commit history for English version (despite locale)
  if (cache[filepath]) return cache[filepath]

  // Fetch and save commit history for file
  const history = (await fetchWithRateLimit(filepath)) || []

  const legacyHistory =
    (await fetchWithRateLimit(
      filepath.replace(CONTENT_DIR, OLD_CONTENT_DIR)
    )) || []

  // Transform commitHistory
  const contributors = [...history, ...legacyHistory]
    .filter(({ author }) => !!author)
    .map((contribution) => {
      const { login, avatar_url, html_url } = contribution.author
      const { date } = contribution.commit.author
      return { login, avatar_url, html_url, date }
    })

  // Remove duplicates from same login
  const uniqueContributors = contributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  // Amend to cache
  cache[filepath] = uniqueContributors

  return uniqueContributors
}
