export const FETCH_GITHUB_REPO_DATA_TASK_ID = "fetch-github-repo-data"

// GitHub repository URLs for local environment frameworks
// This list matches the githubUrl values from src/lib/api/ghRepoData.ts
// but avoids importing images which Trigger.dev's bundler can't handle
const FRAMEWORK_GITHUB_URLS: string[] = [
  "https://github.com/kurtosis-tech/ethereum-package",
  "https://github.com/nomiclabs/hardhat",
  "https://github.com/eth-brownie/brownie",
  "https://github.com/PaulRBerg/create-eth-app",
  "https://github.com/scaffold-eth/scaffold-eth-2",
  "https://github.com/paulrberg/solidity-template",
  "https://github.com/foundry-rs/foundry",
]

type GithubRepoData = {
  starCount: number
  languages: string[]
}

type GithubRepoDataResult = Record<string, GithubRepoData>

/**
 * Fetch GitHub repository data for local environment frameworks.
 * Returns star counts and languages for each repository.
 */
export async function fetchGithubRepoData(): Promise<GithubRepoDataResult> {
  const githubToken = process.env.GITHUB_TOKEN_READ_ONLY

  if (!githubToken) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  console.log(
    `Starting GitHub repo data fetch for ${FRAMEWORK_GITHUB_URLS.length} repositories`
  )

  const result: GithubRepoDataResult = {}
  const errors: string[] = []

  for (const githubUrl of FRAMEWORK_GITHUB_URLS) {
    try {
      const split = githubUrl.split("/")
      const repoOwner = split[split.length - 2]
      const repoName = split[split.length - 1]

      // Fetch repo data
      const repoReq = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )

      if (!repoReq.ok) {
        const status = repoReq.status
        console.warn(`GitHub repo fetch failed for ${githubUrl}`, { status })
        errors.push(`${githubUrl}: ${status}`)
        continue
      }

      const repoData = await repoReq.json()

      // Fetch language data
      const languageReq = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/languages`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )

      if (!languageReq.ok) {
        const status = languageReq.status
        console.warn(`GitHub languages fetch failed for ${githubUrl}`, {
          status,
        })
        errors.push(`${githubUrl} (languages): ${status}`)
        continue
      }

      const languageData = await languageReq.json()

      result[githubUrl] = {
        starCount: repoData.stargazers_count,
        languages: Object.keys(languageData),
      }
    } catch (error) {
      console.error(`Error fetching GitHub repo data for ${githubUrl}:`, error)
      errors.push(
        `${githubUrl}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  const successCount = Object.keys(result).length
  const totalCount = FRAMEWORK_GITHUB_URLS.length

  console.log("Successfully fetched GitHub repo data", {
    successCount,
    totalCount,
    errors: errors.length > 0 ? errors : undefined,
  })

  if (errors.length > 0 && successCount === 0) {
    throw new Error(
      `Failed to fetch all GitHub repo data: ${errors.join(", ")}`
    )
  }

  return result
}
