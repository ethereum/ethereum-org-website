import type { FileContributor, GitHubContributorsData } from "@/lib/types"

export const FETCH_GITHUB_CONTRIBUTORS_TASK_ID = "fetch-github-contributors"

const GITHUB_API_BASE =
  "https://api.github.com/repos/ethereum/ethereum-org-website"
const CONTENT_DIR = "public/content"
const OLD_CONTENT_DIR = "src/content" // For legacy git history

// Optimized settings for parallel fetching
const BATCH_SIZE = 20 // Concurrent requests per batch
const BATCH_DELAY_MS = 50 // Small delay between batches to avoid rate limiting

// App pages that display contributors (from grep search of getAppPageContributorInfo calls)
const APP_PAGE_PATHS = [
  "10years",
  "apps",
  "assets",
  "bug-bounty",
  "collectibles",
  "community",
  "community/events",
  "contributing/translation-program/acknowledgements",
  "contributing/translation-program/contributors",
  "contributing/translation-program/translatathon/leaderboard",
  "developers",
  "developers/learning-tools",
  "developers/local-environment",
  "developers/tutorials",
  "ethereum-history-founder-and-ownership",
  "ethereum-vs-bitcoin",
  "founders",
  "gas",
  "get-eth",
  "layer-2",
  "layer-2/learn",
  "layer-2/networks",
  "learn",
  "quizzes",
  "resources",
  "roadmap",
  "roadmap/_vision",
  "run-a-node",
  "stablecoins",
  "staking",
  "start",
  "trillion-dollar-security",
  "wallets",
  "wallets/find-wallet",
  "what-is-ether",
  "what-is-ethereum",
  "what-is-the-ethereum-network",
]

/**
 * Generate all historical paths for an app page.
 * Mirrors getAllHistoricalPaths() in contributors.ts
 */
function getAllHistoricalPaths(pagePath: string): string[] {
  return [
    `src/pages/${pagePath}.tsx`,
    `src/pages/${pagePath}/index.tsx`,
    `src/pages/[locale]/${pagePath}.tsx`,
    `src/pages/[locale]/${pagePath}/index.tsx`,
    `app/[locale]/${pagePath}/page.tsx`,
    `app/[locale]/${pagePath}/_components/${pagePath}.tsx`,
  ]
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Process items in parallel batches.
 * Executes `fn` for each item, with at most `batchSize` concurrent operations.
 */
async function parallelBatch<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize: number = BATCH_SIZE
): Promise<R[]> {
  const results: R[] = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < items.length) {
      await delay(BATCH_DELAY_MS)
    }
  }

  return results
}

/**
 * Fetch commits for a file path from GitHub API.
 * Returns contributors in FileContributor format.
 */
async function fetchCommitsForPath(
  filepath: string,
  token: string
): Promise<FileContributor[]> {
  const url = new URL(`${GITHUB_API_BASE}/commits`)
  url.searchParams.set("path", filepath)
  url.searchParams.set("sha", "master")

  const response = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  // Handle rate limiting
  if (
    response.status === 403 &&
    response.headers.get("X-RateLimit-Remaining") === "0"
  ) {
    const resetTime = response.headers.get("X-RateLimit-Reset")
    if (resetTime) {
      const waitTime = +resetTime - Math.floor(Date.now() / 1000)
      console.log(`Rate limit exceeded, waiting ${waitTime}s...`)
      await delay(waitTime * 1000)
      return fetchCommitsForPath(filepath, token) // Retry
    }
  }

  if (!response.ok) {
    // 404 is expected for paths that don't exist
    if (response.status !== 404) {
      console.warn(
        `Failed to fetch commits for ${filepath}: ${response.status}`
      )
    }
    return []
  }

  const commits = await response.json()
  if (!Array.isArray(commits)) {
    return []
  }

  // Transform to FileContributor format and deduplicate
  const contributors = commits
    .filter((commit: { author?: unknown }) => !!commit.author)
    .map(
      (commit: {
        author: { login: string; avatar_url: string; html_url: string }
        commit: { author: { date: string } }
      }) => ({
        login: commit.author.login,
        avatar_url: commit.author.avatar_url,
        html_url: commit.author.html_url,
        date: commit.commit.author.date,
      })
    )

  // Remove duplicates by login (keep first = most recent)
  const seen = new Set<string>()
  return contributors.filter((c: FileContributor) => {
    if (seen.has(c.login)) return false
    seen.add(c.login)
    return true
  })
}

/**
 * Fetch contributors for multiple paths and merge/deduplicate results.
 */
async function fetchContributorsForPaths(
  paths: string[],
  token: string
): Promise<FileContributor[]> {
  const results = await parallelBatch(paths, (path) =>
    fetchCommitsForPath(path, token)
  )

  const allContributors = results.flat()

  // Deduplicate by login (keep first = most recent)
  const seen = new Set<string>()
  return allContributors.filter((c) => {
    if (seen.has(c.login)) return false
    seen.add(c.login)
    return true
  })
}

interface GitTreeItem {
  path: string
  type: "blob" | "tree"
  sha: string
}

/**
 * List all content file slugs using GitHub Git Trees API.
 * Gets entire repo tree in ONE API call instead of walking directories.
 */
async function listContentSlugs(token: string): Promise<string[]> {
  const url = `${GITHUB_API_BASE}/git/trees/master?recursive=1`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch repo tree: ${response.status}`)
  }

  const data = await response.json()
  const tree: GitTreeItem[] = data.tree

  // Filter for index.md files in public/content/, excluding translations
  const slugs: string[] = []
  const contentPrefix = `${CONTENT_DIR}/`
  const translationsSegment = "/translations/"

  for (const item of tree) {
    if (
      item.type === "blob" &&
      item.path.startsWith(contentPrefix) &&
      item.path.endsWith("/index.md") &&
      !item.path.includes(translationsSegment)
    ) {
      // Extract slug from path: public/content/{slug}/index.md -> {slug}
      const relativePath = item.path.slice(contentPrefix.length)
      const slug = relativePath.replace(/\/index\.md$/, "")
      slugs.push(slug)
    }
  }

  return slugs
}

/**
 * Fetch GitHub contributors data for all content files and app pages.
 * This runs as a scheduled task (daily) and stores results in Netlify Blobs.
 *
 * Optimizations:
 * - Uses git/trees API to list all content files in ONE request
 * - Fetches commits in parallel batches (20 concurrent requests)
 * - Minimal delays between batches (50ms)
 */
export async function fetchGitHubContributors(): Promise<GitHubContributorsData> {
  const token = process.env.GITHUB_TOKEN_READ_ONLY

  if (!token) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  console.log("Starting GitHub contributors fetch...")
  const startTime = Date.now()

  const result: GitHubContributorsData = {
    content: {},
    appPages: {},
    generatedAt: new Date().toISOString(),
  }

  // 1. Fetch content file contributors
  console.log("Listing content files using git/trees API...")
  const contentSlugs = await listContentSlugs(token)
  console.log(
    `Found ${contentSlugs.length} content slugs in ${Date.now() - startTime}ms`
  )

  // Prepare all paths to fetch (current + legacy for each slug)
  const contentPathPairs = contentSlugs.map((slug) => ({
    slug,
    paths: [
      `${CONTENT_DIR}/${slug}/index.md`,
      `${OLD_CONTENT_DIR}/${slug}/index.md`,
    ],
  }))

  console.log(
    `Fetching contributors for ${contentSlugs.length} content files (parallel batches of ${BATCH_SIZE})...`
  )
  const contentStartTime = Date.now()

  // Fetch all content file contributors in parallel batches
  const contentResults = await parallelBatch(
    contentPathPairs,
    async ({ slug, paths }) => {
      const contributors = await fetchContributorsForPaths(paths, token)
      return { slug, contributors }
    }
  )

  // Populate result
  for (const { slug, contributors } of contentResults) {
    if (contributors.length > 0) {
      result.content[slug] = contributors
    }
  }

  console.log(
    `Fetched contributors for ${Object.keys(result.content).length} content files in ${Date.now() - contentStartTime}ms`
  )

  // 2. Fetch app page contributors
  console.log(
    `Fetching contributors for ${APP_PAGE_PATHS.length} app pages (parallel batches of ${BATCH_SIZE})...`
  )
  const appPagesStartTime = Date.now()

  // Prepare all paths for each app page
  const appPagePathPairs = APP_PAGE_PATHS.map((pagePath) => ({
    pagePath,
    paths: getAllHistoricalPaths(pagePath),
  }))

  // Fetch all app page contributors in parallel batches
  const appPageResults = await parallelBatch(
    appPagePathPairs,
    async ({ pagePath, paths }) => {
      const contributors = await fetchContributorsForPaths(paths, token)
      return { pagePath, contributors }
    }
  )

  // Populate result
  for (const { pagePath, contributors } of appPageResults) {
    if (contributors.length > 0) {
      result.appPages[pagePath] = contributors
    }
  }

  console.log(
    `Fetched contributors for ${Object.keys(result.appPages).length} app pages in ${Date.now() - appPagesStartTime}ms`
  )

  const totalContributors =
    Object.values(result.content).flat().length +
    Object.values(result.appPages).flat().length

  const totalTime = Date.now() - startTime
  console.log("GitHub contributors fetch complete", {
    contentFiles: Object.keys(result.content).length,
    appPages: Object.keys(result.appPages).length,
    totalContributors,
    totalTimeMs: totalTime,
    generatedAt: result.generatedAt,
  })

  return result
}
