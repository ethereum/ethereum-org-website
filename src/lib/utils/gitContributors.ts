import type { CommitHistory, FileContributor } from "@/lib/types"

const owner = "ethereum"
const repo = "ethereum-org-website"

/**
 * Fetches GitHub contributors for a specific file path and caches the result.
 * This is a utility function used by the contributors system to get file-specific
 * contributor information from GitHub's API.
 *
 * @param filePath - The path to the file (e.g., "/content/developers/index.md")
 * @param cache - A cache object to store results and avoid duplicate API calls
 * @returns An array of FileContributor objects sorted by date (most recent first)
 */
export async function fetchAndCacheGitHubContributors(
  filePath: string,
  cache: CommitHistory
): Promise<FileContributor[]> {
  // Check cache first
  if (cache[filePath]) {
    return cache[filePath]
  }

  const githubToken = process.env.GITHUB_TOKEN_READ_ONLY

  if (!githubToken) {
    console.warn(
      "GitHub token not set (GITHUB_TOKEN_READ_ONLY), skipping contributor fetch"
    )
    return []
  }

  try {
    // GitHub API endpoint for file commits
    const url = new URL(`https://api.github.com/repos/${owner}/${repo}/commits`)
    url.searchParams.set("path", filePath)
    url.searchParams.set("per_page", "100")

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
      const waitTime = resetTime
        ? +resetTime - Math.floor(Date.now() / 1000)
        : 60
      console.warn(
        `GitHub API rate limit exceeded for ${filePath}. Reset in ${waitTime} seconds.`
      )
      return []
    }

    if (!response.ok) {
      const status = response.status
      console.warn(`GitHub API fetch failed for ${filePath}`, {
        status,
        url: url.toString(),
      })
      return []
    }

    const commits = (await response.json()) as Array<{
      sha: string
      commit: {
        author: { date: string; name: string; email: string }
        message: string
      }
      author: {
        login: string
        avatar_url: string
        html_url: string
      } | null
    }>

    if (!Array.isArray(commits)) {
      console.warn("Unexpected response from GitHub API", commits)
      return []
    }

    // Transform commits to FileContributor format
    const contributors: FileContributor[] = commits
      .map((commit) => ({
        login: commit.author?.login || commit.commit.author.name || "unknown",
        avatar_url: commit.author?.avatar_url || "",
        html_url:
          commit.author?.html_url ||
          `https://github.com/${commit.author?.login || commit.commit.author.name}`,
        date: commit.commit.author.date,
      }))
      .filter((contributor) => contributor.login !== "unknown")
      // Remove duplicates by login
      .filter(
        (contributor, index, self) =>
          index === self.findIndex((c) => c.login === contributor.login)
      )
      // Sort by date (most recent first)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Cache the result
    cache[filePath] = contributors

    return contributors
  } catch (error) {
    console.error(`Error fetching GitHub contributors for ${filePath}:`, error)
    return []
  }
}
