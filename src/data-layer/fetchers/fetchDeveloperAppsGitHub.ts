// TODO: Set up data-layer integration

import type { DeveloperAppsResponse } from "@/lib/types"

import type { DeveloperApp } from "../../../app/[locale]/developers/apps/types"

type RepoInfo = {
  owner: string
  name: string
  originalHref: string
}

type GraphQLRepoResult = {
  stargazerCount: number
  lastCommitDate: string | null
}

function parseGitHubUrl(href: string): RepoInfo | null {
  try {
    const url = new URL(href)
    if (url.hostname !== "github.com") return null

    const [, owner, name] = url.pathname.split("/")
    if (!owner || !name) return null

    return { owner, name: name.replace(/\.git$/, ""), originalHref: href }
  } catch {
    return null
  }
}

function buildGraphQLQuery(repos: RepoInfo[]): string {
  const repoQueries = repos
    .map(
      (repo, i) => `
    repo${i}: repository(owner: "${repo.owner}", name: "${repo.name}") {
      stargazerCount
      defaultBranchRef {
        target {
          ... on Commit {
            committedDate
          }
        }
      }
    }
  `
    )
    .join("")

  return `query { ${repoQueries} }`
}

async function fetchReposBatch(
  repos: RepoInfo[]
): Promise<Map<string, GraphQLRepoResult>> {
  const results = new Map<string, GraphQLRepoResult>()

  if (repos.length === 0) return results

  const query = buildGraphQLQuery(repos)

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN_READ_ONLY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    console.warn(`GitHub GraphQL request failed with status ${response.status}`)
    return results
  }

  const json = await response.json()

  if (json.errors) {
    console.warn("GitHub GraphQL errors:", json.errors)
  }

  repos.forEach((repo, i) => {
    const data = json.data?.[`repo${i}`]
    if (data) {
      results.set(repo.originalHref, {
        stargazerCount: data.stargazerCount,
        lastCommitDate: data.defaultBranchRef?.target?.committedDate ?? null,
      })
    }
  })

  return results
}

export async function fetchDeveloperAppsGitHub(
  appData: DeveloperAppsResponse[]
): Promise<DeveloperApp[]> {
  // Collect all unique repo URLs
  const allRepos: RepoInfo[] = []
  const seenHrefs = new Set<string>()

  for (const app of appData) {
    for (const repoUrl of app.repos) {
      if (seenHrefs.has(repoUrl)) continue
      seenHrefs.add(repoUrl)

      const parsed = parseGitHubUrl(repoUrl)
      if (parsed) {
        allRepos.push(parsed)
      }
    }
  }

  console.log(`Fetching stargazers for ${allRepos.length} GitHub repos`)

  // GitHub GraphQL has a complexity limit; batch in chunks of ~100
  const BATCH_SIZE = 100
  const repoDataMap = new Map<string, GraphQLRepoResult>()

  for (let i = 0; i < allRepos.length; i += BATCH_SIZE) {
    const batch = allRepos.slice(i, i + BATCH_SIZE)
    const batchResults = await fetchReposBatch(batch)

    for (const [href, data] of batchResults) {
      repoDataMap.set(href, data)
    }
  }

  console.log(`Successfully fetched data for ${repoDataMap.size} repos`)

  // Transform the data with enriched repos
  return appData.map(({ repos, ...app }) => ({
    ...app,
    repos: repos.map((repoUrl) => {
      const data = repoDataMap.get(repoUrl)
      return {
        href: repoUrl,
        stargazers: data?.stargazerCount,
        lastUpdated: data?.lastCommitDate,
      }
    }),
  }))
}
