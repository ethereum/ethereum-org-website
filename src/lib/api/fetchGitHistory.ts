import fs from "fs"
import { join } from "path"

import type { FileContributor } from "@/lib/types"

import {
  COMMIT_HISTORY_JSON,
  CONTENT_DIR,
  GITHUB_COMMITS_URL,
  OLD_CONTENT_DIR,
} from "@/lib/constants"

async function fetchWithRateLimit(
  filepath: string
): Promise<Record<any, any>[]> {
  const url = new URL(GITHUB_COMMITS_URL)
  url.searchParams.set("path", filepath)
  url.searchParams.set("sha", "master")

  const gitHubToken = process.env.GITHUB_TOKEN_READ_ONLY

  // If no token available, return empty array
  if (!gitHubToken) return []

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

    return await response.json()
  }
}

// Fetch commit history and save it to a JSON file
export const fetchAndSaveGitHistory = async (mdDir: string) => {
  const filepath = join("/", mdDir, "index.md")

  const commitHistory = fs.existsSync(COMMIT_HISTORY_JSON)
    ? JSON.parse(fs.readFileSync(COMMIT_HISTORY_JSON, "utf8"))
    : {}

  // First, check cache for existing commit history for English version (despite locale)
  if (commitHistory[filepath]) return commitHistory[filepath]

  // Fetch and save commit history for file
  const history = (await fetchWithRateLimit(filepath)) || []
  const legacyHistory =
    (await fetchWithRateLimit(
      filepath.replace(CONTENT_DIR, OLD_CONTENT_DIR)
    )) || []
  // Transform commitHistory
  const contributors = [...history, ...legacyHistory]
    .filter(({ author }) => !!author)
    .map((contribution: Record<any, any>) => {
      const { login, avatar_url, html_url } = contribution.author
      const { date } = contribution.commit.author
      return { login, avatar_url, html_url, date }
    }) as FileContributor[]

  // Remove duplicates from same login
  const uniqueContributors = contributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  // Amend to commitHistory log and save
  commitHistory[filepath] = uniqueContributors
  fs.writeFileSync(COMMIT_HISTORY_JSON, JSON.stringify(commitHistory, null, 2))

  return uniqueContributors
}
