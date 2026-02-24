import type { Commit } from "@/lib/types"

export const FETCH_GIT_HISTORY_TASK_ID = "fetch-git-history"

const owner = "ethereum"
const repo = "ethereum-org-website"

/**
 * Fetch recent commit history from the GitHub repository.
 * Returns the latest commits from the master branch.
 */
export async function fetchGitHistory(): Promise<Commit[]> {
  const githubToken = process.env.GITHUB_TOKEN_READ_ONLY

  if (!githubToken) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/commits`)
  url.searchParams.set("sha", "master")
  url.searchParams.set("per_page", "100") // Fetch up to 100 recent commits

  console.log("Starting GitHub commit history data fetch")

  const response = await fetch(url.href, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (
    response.status === 403 &&
    response.headers.get("X-RateLimit-Remaining") === "0"
  ) {
    const resetTime = response.headers.get("X-RateLimit-Reset")
    const waitTime = resetTime ? +resetTime - Math.floor(Date.now() / 1000) : 60
    console.log(`Rate limit exceeded, would need to wait ${waitTime} seconds`)
    throw new Error(
      `GitHub API rate limit exceeded. Reset in ${waitTime} seconds.`
    )
  }

  if (!response.ok) {
    const status = response.status
    console.warn("GitHub API fetch non-OK", { status, url: url.toString() })
    throw new Error(
      `GitHub API responded with ${status}: ${response.statusText}`
    )
  }

  const commits = (await response.json()) as Commit[]

  if (!Array.isArray(commits)) {
    console.warn("Unexpected response from GitHub API", commits)
    throw new Error("GitHub API returned unexpected response format")
  }

  console.log(`Successfully fetched ${commits.length} commits from GitHub`)

  return commits
}
