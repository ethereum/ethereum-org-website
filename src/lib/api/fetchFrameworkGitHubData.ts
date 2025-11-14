import type { FrameworkGitHubData, FrameworkRepoData } from "@/lib/types"

import { frameworksListData } from "@/data/frameworks/frameworks-data"

const ghRepoData = async (
  githubUrl: string
): Promise<FrameworkRepoData | null> => {
  try {
    const split = githubUrl.split("/")
    const repoOwner = split[split.length - 2]
    const repoName = split[split.length - 1]

    const [repoReq, languageReq] = await Promise.all([
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN_READ_ONLY}`,
        },
      }),
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/languages`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN_READ_ONLY}`,
        },
      }),
    ])

    if (!repoReq.ok || !languageReq.ok) {
      console.error("GitHub API error", {
        repo: `${repoOwner}/${repoName}`,
        repoStatus: repoReq.status,
        languageStatus: languageReq.status,
      })
      return null
    }

    const repoData = await repoReq.json()
    const languageData = await languageReq.json()

    return {
      starCount: repoData.stargazers_count || 0,
      languages: Object.keys(languageData),
    }
  } catch (error) {
    console.error("Error fetching GitHub repo data:", error)
    return null
  }
}

export const fetchFrameworkGitHubData = async (): Promise<
  FrameworkGitHubData | { error: string }
> => {
  try {
    // Fetch GitHub data for all frameworks in parallel
    const githubDataPromises = frameworksListData.map(async (framework) => {
      const repoData = await ghRepoData(framework.githubUrl)
      return {
        frameworkId: framework.id,
        data: repoData,
      }
    })

    const results = await Promise.all(githubDataPromises)

    // Build the result object, filtering out null values
    const frameworkGitHubData: FrameworkGitHubData = {}
    for (const result of results) {
      if (result.data) {
        frameworkGitHubData[result.frameworkId] = result.data
      }
    }

    return frameworkGitHubData
  } catch (error) {
    console.error("Error fetching framework GitHub data:", error)
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch framework GitHub data",
    }
  }
}
