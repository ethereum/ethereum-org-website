import { fetchRetry, sleep } from "@/data-layer/fetchers/fetchRetry"

type RepoInfo = {
  owner: string
  name: string
  originalHref: string
}

type GraphQLRepoResult = {
  stargazerCount: number
  forkCount: number
  watcherCount: number
  subscriberCount: number
  openIssueCount: number
  isArchived: boolean
  isFork: boolean
  pushedAt: string | null
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
  const VALID_REPO_PATTERN = /^[a-zA-Z0-9._-]+$/

  const repoQueries = repos
    .filter(
      (repo) =>
        VALID_REPO_PATTERN.test(repo.owner) &&
        VALID_REPO_PATTERN.test(repo.name)
    )
    .map(
      (repo, i) => `
    repo${i}: repository(owner: "${repo.owner}", name: "${repo.name}") {
      stargazerCount
      forkCount
      watchers {
        totalCount
      }
      mentionableUsers {
        totalCount
      }
      issues(states: OPEN) {
        totalCount
      }
      isArchived
      isFork
      pushedAt
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

/** Extra attempts for a rate-limited batch, on top of what fetchRetry covers. */
const RATE_LIMIT_RETRIES = 2

/** Below this share of repos resolved, the run fails instead of publishing. */
const MIN_REPO_COVERAGE = 0.75

async function requestRepoBatch(
  query: string,
  token: string
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetchRetry("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (response.ok) return response

    // GitHub reports secondary rate limits as 403, which fetchRetry's status
    // list does not cover. Honor Retry-After when the response offers one.
    const retryAfter = Number(response.headers.get("retry-after") ?? "")
    const rateLimited = response.status === 403 || response.status === 429
    if (rateLimited && retryAfter > 0 && attempt < RATE_LIMIT_RETRIES) {
      console.warn(
        `GitHub rate limited (${response.status}), waiting ${retryAfter}s before retry ${attempt + 1}/${RATE_LIMIT_RETRIES}`
      )
      await sleep((retryAfter + 1) * 1000)
      continue
    }

    // The bare status never said which limit was hit, so keep the body and the
    // rate-limit headers: they are the only way to tell primary from secondary.
    const body = await response.text().catch(() => "")
    throw new Error(
      `GitHub GraphQL request failed with status ${response.status} ` +
        `(remaining=${response.headers.get("x-ratelimit-remaining") ?? "?"}, ` +
        `reset=${response.headers.get("x-ratelimit-reset") ?? "?"}, ` +
        `retry-after=${response.headers.get("retry-after") ?? "none"}): ` +
        body.slice(0, 300)
    )
  }
}

async function fetchReposBatch(
  repos: RepoInfo[]
): Promise<Map<string, GraphQLRepoResult>> {
  const results = new Map<string, GraphQLRepoResult>()
  const token = process.env.GITHUB_TOKEN_READ_ONLY

  if (repos.length === 0) return results
  if (!token) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  const response = await requestRepoBatch(buildGraphQLQuery(repos), token)
  const json = await response.json()

  if (json.errors) {
    console.warn("GitHub GraphQL errors:", json.errors)
  }

  repos.forEach((repo, i) => {
    const data = json.data?.[`repo${i}`]
    if (data) {
      results.set(repo.originalHref, {
        stargazerCount: data.stargazerCount,
        forkCount: data.forkCount ?? 0,
        watcherCount: data.watchers?.totalCount ?? 0,
        subscriberCount: data.mentionableUsers?.totalCount ?? 0,
        openIssueCount: data.issues?.totalCount ?? 0,
        isArchived: data.isArchived ?? false,
        isFork: data.isFork ?? false,
        pushedAt: data.pushedAt ?? null,
        lastCommitDate: data.defaultBranchRef?.target?.committedDate ?? null,
      })
    }
  })

  return results
}

type ToolWithRepoUrls = {
  repos: Array<string | { href: string }>
} & Record<string, unknown>

type ToolWithGitHubData<T extends ToolWithRepoUrls> = Omit<T, "repos"> & {
  repos: {
    href: string
    stargazers?: number
    forks?: number
    watchers?: number
    subscribers?: number
    openIssues?: number
    isArchived?: boolean
    isFork?: boolean
    daysSincePush?: number
    lastUpdated?: string | null
  }[]
}

function daysSince(dateIso: string | null): number | undefined {
  if (!dateIso) return undefined
  const timestamp = Date.parse(dateIso)
  if (Number.isNaN(timestamp)) return undefined
  return Math.max(0, (Date.now() - timestamp) / (1000 * 60 * 60 * 24))
}

export async function fetchGitHub<T extends ToolWithRepoUrls>(
  appData: T[]
): Promise<ToolWithGitHubData<T>[]> {
  if (!process.env.GITHUB_TOKEN_READ_ONLY) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  // Collect all unique repo URLs
  const allRepos: RepoInfo[] = []
  const seenHrefs = new Set<string>()

  for (const app of appData) {
    for (const repoEntry of app.repos) {
      const repoUrl = typeof repoEntry === "string" ? repoEntry : repoEntry.href
      if (seenHrefs.has(repoUrl)) continue
      seenHrefs.add(repoUrl)

      const parsed = parseGitHubUrl(repoUrl)
      if (parsed) {
        allRepos.push(parsed)
      }
    }
  }

  console.log(`Fetching stargazers for ${allRepos.length} GitHub repos`)

  // Keep queries small to avoid GraphQL resource-limit spikes on large batches.
  const BATCH_SIZE = 25
  const repoDataMap = new Map<string, GraphQLRepoResult>()
  let failedBatches = 0

  for (let i = 0; i < allRepos.length; i += BATCH_SIZE) {
    const batch = allRepos.slice(i, i + BATCH_SIZE)

    try {
      const batchResults = await fetchReposBatch(batch)

      for (const [href, data] of batchResults) {
        repoDataMap.set(href, data)
      }
    } catch (error) {
      failedBatches++
      console.error(`Failed to fetch batch ${i / BATCH_SIZE + 1}:`, error)
      // Continue with next batch instead of failing entirely
    }

    // Add 1 second delay between batches to avoid rate limits
    if (i + BATCH_SIZE < allRepos.length) {
      await sleep(1000)
    }
  }

  console.log(`Successfully fetched data for ${repoDataMap.size} repos`)

  // Ranking reads a missing stargazer count as zero, so a partly-failed fetch
  // does not degrade gracefully -- it quietly demotes every repo it missed.
  // Keeping yesterday's data beats publishing a corrupted ranking.
  const coverage =
    allRepos.length === 0 ? 1 : repoDataMap.size / allRepos.length
  if (coverage < MIN_REPO_COVERAGE) {
    throw new Error(
      `GitHub enrichment covered ${(coverage * 100).toFixed(0)}% of ${allRepos.length} repos ` +
        `(${failedBatches} batch(es) failed), below the ${MIN_REPO_COVERAGE * 100}% floor`
    )
  }

  // Transform the data with enriched repos
  return appData.map(({ repos, ...app }) => ({
    ...(app as Omit<T, "repos">),
    repos: repos.map((repoEntry) => {
      const repoUrl = typeof repoEntry === "string" ? repoEntry : repoEntry.href
      const data = repoDataMap.get(repoUrl)
      return {
        href: repoUrl,
        stargazers: data?.stargazerCount,
        forks: data?.forkCount,
        watchers: data?.watcherCount,
        subscribers: data?.subscriberCount,
        openIssues: data?.openIssueCount,
        isArchived: data?.isArchived,
        isFork: data?.isFork,
        daysSincePush: daysSince(data?.pushedAt ?? null),
        lastUpdated: data?.lastCommitDate,
      }
    }),
  }))
}
