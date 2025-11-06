import type { ExternalDataReturnData, GHIssue } from "@/lib/types"

const owner = "ethereum"
const repo = "ethereum-org-website"
const label = "good first issue"

export const fetchGFIs = async (): Promise<ExternalDataReturnData> => {
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`)
  url.searchParams.append("labels", label)
  url.searchParams.append("state", "open")
  url.searchParams.append("sort", "created")
  url.searchParams.append("direction", "desc")
  url.searchParams.append("assignee", "none")
  url.searchParams.append("per_page", "10")

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN_READ_ONLY}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      console.error("GitHub API fetch non-OK", {
        status: response.status,
        statusText: response.statusText,
        url: url.toString(),
      })
      return {
        error: `GitHub API responded with ${response.status}: ${response.statusText}`,
      }
    }

    const issues = (await response.json()) as GHIssue[]

    return {
      value: issues,
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error("Error fetching GitHub good first issues:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub good first issues",
    }
  }
}
