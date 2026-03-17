import type { FileContributor, GitHubContributorsData } from "@/lib/types"

import { CONTENT_DIR, OLD_CONTENT_DIR } from "@/lib/constants"

const GITHUB_API_BASE =
  "https://api.github.com/repos/ethereum/ethereum-org-website"

// Optimized settings for parallel fetching
const BATCH_SIZE = 20 // Concurrent requests per batch
const BATCH_DELAY_MS = 50 // Small delay between batches to avoid rate limiting

const APP_PAGES_PREFIX = "app/[locale]/"

interface AllContributorsEntry {
  login: string
  name: string
  avatar_url: string
}

type NameLookup = Map<string, AllContributorsEntry>

/**
 * Fetch .all-contributorsrc from GitHub and build a case-insensitive
 * name -> entry lookup map for resolving co-authors by display name.
 */
async function fetchNameLookup(): Promise<NameLookup> {
  const url =
    "https://raw.githubusercontent.com/ethereum/ethereum-org-website/master/.all-contributorsrc"
  const response = await fetch(url)

  if (!response.ok) {
    console.warn("Failed to fetch .all-contributorsrc:", response.status)
    return new Map()
  }

  const data = await response.json()
  const entries: AllContributorsEntry[] = data.contributors || []
  const lookup: NameLookup = new Map()

  for (const entry of entries) {
    lookup.set(entry.name.toLowerCase(), entry)
  }

  return lookup
}

/** Email addresses (or substrings) that identify AI agent co-authors */
const EXCLUDED_EMAILS = [
  "noreply@anthropic.com",
  "copilot@github.com",
  "49699333+dependabot[bot]@users.noreply.github.com",
  "actions@github.com",
  "github-actions[bot]@users.noreply.github.com",
  "noreply@github.com",
]

/** GitHub logins (exact match) that should be excluded */
const EXCLUDED_LOGINS = [
  "dependabot[bot]",
  "github-actions[bot]",
  "allcontributors[bot]",
  "netlify[bot]",
  "crowdin-bot",
  "eth-bot",
  "ethereumoptimism-bot",
  "coderabbitai[bot]",
]

/** Name patterns (case-insensitive substring match) for AI agent co-authors */
const EXCLUDED_NAME_PATTERNS = [
  "claude",
  "copilot",
  "gpt",
  "chatgpt",
  "openai",
  "cursor",
  "codeium",
  "tabnine",
  "amazon q",
  "cody",
  "gemini",
  "coderabbit",
]

/**
 * Extract GitHub login from a noreply email address.
 * Handles both formats:
 *   - "username@users.noreply.github.com"
 *   - "12345678+username@users.noreply.github.com"
 * Returns null for non-noreply emails.
 */
const extractLoginFromNoreplyEmail = (email: string): string | null => {
  const match = email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/)
  return match ? match[1] : null
}

/**
 * Parse co-author trailers from a commit message.
 * Matches lines like: "Co-authored-by: Name <email>"
 *
 * Resolution chain for each co-author:
 * 1. Filter out bots/AI agents by email and name patterns
 * 2. Extract login from GitHub noreply email if applicable
 * 3. Match display name against .all-contributorsrc entries
 * 4. Fall back to trailer name (no avatar/profile link)
 */
const parseCoAuthors = (
  message: string,
  commitDate: string,
  nameLookup: NameLookup
): FileContributor[] => {
  const coAuthorPattern = /^co-authored-by:\s*(.+?)\s*<([^>]+)>/gim
  const coAuthors: FileContributor[] = []
  let match

  while ((match = coAuthorPattern.exec(message)) !== null) {
    const name = match[1].trim()
    const email = match[2].trim()

    // Skip excluded emails
    if (
      EXCLUDED_EMAILS.some((excluded) =>
        email.toLowerCase().includes(excluded.toLowerCase())
      )
    ) {
      continue
    }

    // Skip excluded name patterns (catches AI agents)
    if (
      EXCLUDED_NAME_PATTERNS.some((pattern) =>
        name.toLowerCase().includes(pattern.toLowerCase())
      )
    ) {
      continue
    }

    // 1. Try noreply email -> GitHub login
    const noreplyLogin = extractLoginFromNoreplyEmail(email)
    if (noreplyLogin) {
      if (!isExcludedContributor(noreplyLogin)) {
        coAuthors.push({
          login: noreplyLogin,
          avatar_url: `https://avatars.githubusercontent.com/${noreplyLogin}`,
          html_url: `https://github.com/${noreplyLogin}`,
          date: commitDate,
        })
      }
      continue
    }

    // 2. Try name match in .all-contributorsrc
    const entry = nameLookup.get(name.toLowerCase())
    if (entry) {
      if (!isExcludedContributor(entry.login)) {
        coAuthors.push({
          login: entry.login,
          avatar_url: entry.avatar_url,
          html_url: `https://github.com/${entry.login}`,
          date: commitDate,
        })
      }
      continue
    }

    // 3. Last resort: use trailer name, no avatar or profile link
    coAuthors.push({
      login: name,
      avatar_url: "",
      html_url: "",
      date: commitDate,
    })
  }

  return coAuthors
}

/** Check if a primary commit author should be excluded */
const isExcludedContributor = (login: string): boolean =>
  EXCLUDED_LOGINS.some(
    (excluded) => excluded.toLowerCase() === login.toLowerCase()
  )

/**
 * Generate all historical paths for an app page.
 * Used to aggregate git history across directory structure migrations.
 *
 * For app router paths, also includes underscore-prefixed variants of each
 * segment (e.g., roadmap/vision → roadmap/_vision) since Next.js private
 * folders use the _ prefix but represent the same page.
 */
function getAllHistoricalPaths(pagePath: string): string[] {
  const paths = [
    `src/pages/${pagePath}.tsx`,
    `src/pages/${pagePath}/index.tsx`,
    `src/pages/[locale]/${pagePath}.tsx`,
    `src/pages/[locale]/${pagePath}/index.tsx`,
    `${APP_PAGES_PREFIX}${pagePath}/page.tsx`,
    `${APP_PAGES_PREFIX}${pagePath}/_components/${pagePath}.tsx`,
  ]

  // Add underscore-prefixed variants for each segment
  const segments = pagePath.split("/")
  for (let i = 0; i < segments.length; i++) {
    const variant = [...segments]
    variant[i] = `_${variant[i]}`
    paths.push(`${APP_PAGES_PREFIX}${variant.join("/")}/page.tsx`)
  }

  return paths
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
  token: string,
  nameLookup: NameLookup
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
      return fetchCommitsForPath(filepath, token, nameLookup) // Retry
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

  // Transform to FileContributor format and deduplicate.
  // When a commit author email isn't linked to a GitHub account, the API
  // returns `author: null`. We still include these commits so their date
  // is captured, using the git commit author name as a fallback identity.
  // Also parses co-author trailers and filters out bots/AI agents.
  const contributors = commits.flatMap(
    (commit: {
      author?: { login: string; avatar_url: string; html_url: string } | null
      commit: { author: { name: string; date: string }; message: string }
    }) => {
      const login = commit.author?.login ?? commit.commit.author.name
      const date = commit.commit.author.date

      // Use username-based avatar URL instead of the API's /u/{id}?v=4
      // format which causes redirect loops with Next.js image optimization
      const primary: FileContributor[] =
        isExcludedContributor(login)
          ? []
          : [{
              login,
              avatar_url: commit.author
                ? `https://avatars.githubusercontent.com/${commit.author.login}`
                : "",
              html_url: commit.author?.html_url ?? "",
              date,
            }]

      const coAuthors = parseCoAuthors(commit.commit.message, date, nameLookup)

      return [...primary, ...coAuthors]
    }
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
  token: string,
  nameLookup: NameLookup
): Promise<FileContributor[]> {
  const results = await parallelBatch(paths, (path) =>
    fetchCommitsForPath(path, token, nameLookup)
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
 * Fetch the full repo tree in ONE API call.
 * Returns both content slugs and app page paths discovered from the tree.
 */
async function discoverPathsFromTree(token: string): Promise<{
  contentSlugs: string[]
  appPagePaths: string[]
}> {
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

  const contentSlugs: string[] = []
  const appPagePaths: string[] = []

  const contentPrefix = `${CONTENT_DIR}/`
  const translationsSegment = "/translations/"

  for (const item of tree) {
    if (item.type !== "blob") continue

    // Content files: public/content/{slug}/index.md (excluding translations)
    if (
      item.path.startsWith(contentPrefix) &&
      item.path.endsWith("/index.md") &&
      !item.path.includes(translationsSegment)
    ) {
      const relativePath = item.path.slice(contentPrefix.length)
      const slug = relativePath.replace(/\/index\.md$/, "")
      contentSlugs.push(slug)
    }

    // App pages: app/[locale]/{pagePath}/page.tsx
    // Strip the prefix and /page.tsx suffix to get the pagePath key.
    // Next.js private folders (prefixed with _) are excluded from routing,
    // so strip leading underscores from segments to match the route key
    // that page components pass to getAppPageContributorInfo().
    if (
      item.path.startsWith(APP_PAGES_PREFIX) &&
      item.path.endsWith("/page.tsx")
    ) {
      const pagePath = item.path
        .slice(APP_PAGES_PREFIX.length)
        .replace(/\/page\.tsx$/, "")

      // Normalize private folder prefixes: _vision → vision
      const normalized = pagePath
        .split("/")
        .map((seg) => (seg.startsWith("_") ? seg.slice(1) : seg))
        .join("/")

      appPagePaths.push(normalized)
    }
  }

  return { contentSlugs, appPagePaths }
}

/**
 * Fetch GitHub contributors data for all content files and app pages.
 * This runs as a scheduled task (weekly) and stores results in Netlify Blobs.
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

  // Build name lookup from .all-contributorsrc for co-author resolution
  const nameLookup = await fetchNameLookup()
  console.log(`Loaded ${nameLookup.size} entries from .all-contributorsrc`)

  const result: GitHubContributorsData = {
    content: {},
    appPages: {},
    generatedAt: new Date().toISOString(),
  }

  // 1. Discover all paths from repo tree (single API call)
  console.log("Discovering paths from git/trees API...")
  const { contentSlugs, appPagePaths } = await discoverPathsFromTree(token)
  console.log(
    `Found ${contentSlugs.length} content slugs and ${appPagePaths.length} app pages in ${Date.now() - startTime}ms`
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
      const contributors = await fetchContributorsForPaths(paths, token, nameLookup)
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
    `Fetching contributors for ${appPagePaths.length} app pages (parallel batches of ${BATCH_SIZE})...`
  )
  const appPagesStartTime = Date.now()

  // Prepare all paths for each app page
  const appPagePathPairs = appPagePaths.map((pagePath) => ({
    pagePath,
    paths: getAllHistoricalPaths(pagePath),
  }))

  // Fetch all app page contributors in parallel batches
  const appPageResults = await parallelBatch(
    appPagePathPairs,
    async ({ pagePath, paths }) => {
      const contributors = await fetchContributorsForPaths(paths, token, nameLookup)
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
