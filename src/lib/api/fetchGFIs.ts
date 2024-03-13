const owner = "ethereum"
const repo = "ethereum-org-website"
const label = "good first issue"

type GHIssue = {
  title: string
  html_url: string
  created_at: string
  user: {
    login: string
    html_url: string
    avatar_url: string
  }
}

export const fetchGFIs = async () => {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?labels=${encodeURIComponent(
    label
  )}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.ISSUES_GITHUB_TOKEN_READ_ONLY}`,
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
