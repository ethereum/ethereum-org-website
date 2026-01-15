import type { GHIssue } from "@/lib/types"

export const FETCH_GFIS_TASK_ID = "fetch-gfis"

const owner = "ethereum"
const repo = "ethereum-org-website"
const label = "good first issue"

/**
 * Fetch GitHub issues labeled as "good first issue" from the ethereum-org-website repository.
 * Returns the latest open issues sorted by creation date.
 */
export async function fetchGFIs(): Promise<GHIssue[]> {
  const githubToken = process.env.GITHUB_TOKEN_READ_ONLY

  if (!githubToken) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`)
  url.searchParams.append("labels", label)
  url.searchParams.append("state", "open")
  url.searchParams.append("sort", "created")
  url.searchParams.append("direction", "desc")
  url.searchParams.append("assignee", "none")
  url.searchParams.append("per_page", "10")

  console.log("Starting GitHub good first issues data fetch")

  const response = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    const status = response.status
    console.warn("GitHub API fetch non-OK", { status, url: url.toString() })
    throw new Error(
      `GitHub API responded with ${status}: ${response.statusText}`
    )
  }

  const issues = (await response.json()) as GHIssue[]

  console.log(
    `Successfully fetched ${issues.length} good first issues from GitHub`
  )

  return issues
}
