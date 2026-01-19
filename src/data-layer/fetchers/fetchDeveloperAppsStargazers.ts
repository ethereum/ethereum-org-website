// TODO: Set up data-layer integration
import { DeveloperAppsByCategory } from "../../../app/[locale]/developers/apps/types"

type RepoInfo = {
  owner: string
  name: string
  originalHref: string
}

type GraphQLRepoResult = {
  stargazerCount: number
  lastCommitDate: string | null // ISO date string - last commit on default branch
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

  // Map results back to original hrefs
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

export async function fetchDeveloperAppsStargazers(
  appData: DeveloperAppsByCategory
): Promise<DeveloperAppsByCategory> {
  // Collect all unique repo URLs across all categories
  const allRepos: RepoInfo[] = []
  const seenHrefs = new Set<string>()

  for (const apps of Object.values(appData)) {
    for (const app of apps) {
      for (const repo of app.repos) {
        if (seenHrefs.has(repo.href)) continue
        seenHrefs.add(repo.href)

        const parsed = parseGitHubUrl(repo.href)
        if (parsed) {
          allRepos.push(parsed)
        }
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

  // Enrich the app data with stargazer counts and last updated dates
  const enrichedData: DeveloperAppsByCategory = {} as DeveloperAppsByCategory

  for (const [category, apps] of Object.entries(appData)) {
    enrichedData[category as keyof DeveloperAppsByCategory] = apps.map(
      (app) => ({
        ...app,
        repos: app.repos.map((repo) => {
          const data = repoDataMap.get(repo.href)
          return {
            ...repo,
            stargazers: data?.stargazerCount,
            lastUpdated: data?.lastCommitDate,
          }
        }),
      })
    )
  }

  return enrichedData
}
