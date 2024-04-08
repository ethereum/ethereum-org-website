import type { GHIssue } from "../types"

const owner = "ethereum"
const repo = "ethereum-org-website"
const label = "good first issue"

export const fetchGFIs = async () => {
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
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) {
      throw new Error(
        `GitHub API responded with ${response.status}: ${response.statusText}`
      )
    }

    return (await response.json()) as GHIssue[]
  } catch (error) {
    console.error(error)
    return []
  }
}
