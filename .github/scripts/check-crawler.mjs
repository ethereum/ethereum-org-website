// Algolia crawler health check — run weekly by .github/workflows/algolia-index-healthcheck.yml.
//
// Answers one question: is the DocSearch crawler running and not blocked? The crawl runs on
// Algolia's servers and only emails on failure, so a blocked crawler can silently serve a
// stale index for months (it did — see docs/site-search.md). When something is wrong this
// writes a Discord message to $GITHUB_OUTPUT for the workflow to post.
//
// Dependency-free: Node built-ins + global fetch, so the workflow needs no `pnpm install`.

import { appendFileSync } from "node:fs"

const {
  CRAWLER_USER_ID,
  CRAWLER_API_KEY,
  CRAWLER_NAME = "ethereumorg-2",
  MAX_CRAWL_AGE_DAYS = "9",
  RUN_URL = "",
  GITHUB_OUTPUT,
} = process.env

const API = "https://crawler.algolia.com/api/1"
const maxAgeDays = Number(MAX_CRAWL_AGE_DAYS)

/** GET a Crawler REST API path with Basic auth. Throws on any non-2xx response. */
async function api(path) {
  const auth = Buffer.from(`${CRAWLER_USER_ID}:${CRAWLER_API_KEY}`).toString("base64")
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Basic ${auth}` } })
  if (!res.ok) throw new Error(`Crawler API ${res.status} on ${path}: ${await res.text()}`)
  return res.json()
}

/** `blockingError` may be a plain string or an object — pull out something human-readable. */
function blockReason(status) {
  const error = status.blockingError
  if (!error) return "unknown"
  return typeof error === "string" ? error : error.code || error.message || JSON.stringify(error)
}

/** Returns a list of problem strings. Empty list = healthy. */
async function findProblems() {
  const problems = []

  // The API keys everything by crawler id, so resolve the id from the name first.
  const { items = [] } = await api("/crawlers?itemsPerPage=100")
  const crawler = items.find((c) => c.name === CRAWLER_NAME)
  if (!crawler) return [`No crawler named "${CRAWLER_NAME}" found via the Crawler API`]

  const status = await api(`/crawlers/${crawler.id}`)
  // Log the field names so the mapping below is easy to fix if Algolia ever renames anything.
  console.log("Crawler status fields:", Object.keys(status).join(", "))

  // 1. Is it blocked? (e.g. the SafeReindexing guard tripping after a locale reduction.)
  if (status.blocked || status.blockingError) {
    problems.push(
      `Crawler is BLOCKED — ${blockReason(status)}. It won't publish until a human resolves it.`
    )
  }

  // 2. Is it still running on schedule? A stale last-crawl means crawling has stopped.
  const lastCrawl =
    status.lastReindexEndedAt ??
    status.lastReindexEndDate ??
    status.lastCrawlEndedAt ??
    status.updatedAt
  if (lastCrawl) {
    const ageDays = (Date.now() - Date.parse(lastCrawl)) / 86_400_000
    console.log(`Last crawl ended ${lastCrawl} (${ageDays.toFixed(1)}d ago)`)
    if (ageDays > maxAgeDays) {
      problems.push(
        `Last successful crawl was ${Math.round(ageDays)}d ago (> ${maxAgeDays}d) — crawling may have stopped`
      )
    }
  } else {
    console.log("::warning::Could not read a last-crawl timestamp (field mapping may need a tweak)")
  }

  return problems
}

// Any thrown error (bad credentials, API down) is itself a health problem worth alerting on.
let problems
try {
  problems = await findProblems()
} catch (error) {
  problems = [`Health check could not reach the Crawler API: ${error.message}`]
}

const unhealthy = problems.length > 0
const report = unhealthy
  ? [
      `:rotating_light: **Algolia crawler unhealthy** — \`${CRAWLER_NAME}\``,
      ...problems.map((p) => `• ${p}`),
      "Fix: crawler.algolia.com → the crawler → Overview. See docs/site-search.md.",
      RUN_URL && `Run: <${RUN_URL}>`,
    ]
      .filter(Boolean)
      .join("\n")
  : `Crawler "${CRAWLER_NAME}" is running and not blocked.`

console.log(report)

if (GITHUB_OUTPUT) {
  appendFileSync(GITHUB_OUTPUT, `unhealthy=${unhealthy}\nreport<<EOF\n${report}\nEOF\n`)
}
