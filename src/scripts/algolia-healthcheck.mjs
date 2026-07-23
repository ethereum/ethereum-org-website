// Algolia search index health check.
//
// Runs weekly in CI (see .github/workflows/algolia-index-healthcheck.yml) to catch
// the two ways site search silently goes stale:
//   1. The DocSearch crawler gets BLOCKED (e.g. the "too many missing records" safe-
//      reindex guard tripped by a locale reduction) and stops publishing new content.
//   2. The live index drifts from what we expect (wrong locale count, record cliff, a
//      settled page that should be searchable but isn't).
//
// On any hard failure it prints a report to $GITHUB_OUTPUT so the workflow can ping the
// Discord alerts channel. Dependency-free on purpose (Node built-ins + global fetch) so
// the workflow doesn't need `pnpm install`.
//
// Context: docs/site-search.md

import { appendFileSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const env = process.env

const cfg = {
  // Search index (public client credentials — the NEXT_PUBLIC_ALGOLIA_* values)
  appId: env.ALGOLIA_APP_ID,
  searchKey: env.ALGOLIA_SEARCH_KEY,
  index: env.ALGOLIA_INDEX || "ethereumorg-2",
  // Crawler REST API credentials (crawler.algolia.com → account → API key)
  crawlerUserId: env.CRAWLER_USER_ID,
  crawlerApiKey: env.CRAWLER_API_KEY,
  crawlerName: env.CRAWLER_NAME || "ethereumorg-2",
  crawlerId: env.CRAWLER_ID || "",
  // Thresholds
  expectedLocales: Number(env.EXPECTED_LOCALES || 25),
  recordFloor: Number(env.RECORD_FLOOR || 150000),
  maxCrawlAgeDays: Number(env.MAX_CRAWL_AGE_DAYS || 9),
  contentMinAgeDays: Number(env.CONTENT_MIN_AGE_DAYS || 21),
  siteOrigin: env.SITE_ORIGIN || "https://ethereum.org",
  contentDir: env.CONTENT_DIR || "public/content",
}

/** Hard failures — these fire a Discord alert. */
const problems = []
/** Context lines shown alongside the result (both healthy and unhealthy). */
const notes = []
const fail = (msg) => problems.push(msg)
const note = (msg) => notes.push(msg)

async function searchQuery(body) {
  const res = await fetch(
    `https://${cfg.appId}-dsn.algolia.net/1/indexes/${cfg.index}/query`,
    {
      method: "POST",
      headers: {
        "X-Algolia-API-Key": cfg.searchKey,
        "X-Algolia-Application-Id": cfg.appId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) throw new Error(`Algolia search API ${res.status}: ${await res.text()}`)
  return res.json()
}

async function crawlerGet(path) {
  const auth = Buffer.from(`${cfg.crawlerUserId}:${cfg.crawlerApiKey}`).toString("base64")
  const res = await fetch(`https://crawler.algolia.com/api/1${path}`, {
    headers: { Authorization: `Basic ${auth}` },
  })
  if (!res.ok) throw new Error(`Crawler API ${res.status}: ${await res.text()}`)
  return res.json()
}

// ── Check 1 + 2: live index shape (locale count, record floor) ──────────────
async function checkIndexShape() {
  const facet = await searchQuery({
    query: "",
    hitsPerPage: 0,
    facets: ["lang"],
    maxValuesPerFacet: 500,
  })
  const langs = facet.facets?.lang || {}
  const localeCount = Object.keys(langs).length
  const totalRecords = Object.values(langs).reduce((a, b) => a + b, 0)
  note(
    `Index \`${cfg.index}\`: ${totalRecords.toLocaleString()} records across ${localeCount} locales`
  )
  if (localeCount !== cfg.expectedLocales)
    fail(
      `Locale count is ${localeCount}, expected ${cfg.expectedLocales} (crawler config drift or a bad reindex?)`
    )
  if (totalRecords < cfg.recordFloor)
    fail(
      `Record count ${totalRecords.toLocaleString()} is below the ${cfg.recordFloor.toLocaleString()} floor — index may be degraded`
    )
}

// ── Check 3: crawler status + freshness (the blocked/stale signal) ──────────
async function checkCrawler() {
  if (!cfg.crawlerUserId || !cfg.crawlerApiKey) {
    note("Crawler API credentials not set — skipped crawler status/freshness check.")
    return
  }
  let crawlerId = cfg.crawlerId
  if (!crawlerId) {
    const list = await crawlerGet(`/crawlers?itemsPerPage=100`)
    const items = list.items || []
    const match = items.find((c) => c.name === cfg.crawlerName) || items[0]
    if (!match) throw new Error(`No crawler found matching name "${cfg.crawlerName}"`)
    crawlerId = match.id
  }
  const c = await crawlerGet(`/crawlers/${crawlerId}`)
  // Log the raw field names to the Actions log — makes it trivial to fix the mapping
  // below if Algolia renames anything.
  console.error("crawler status fields:", Object.keys(c).join(", "))

  const blocked = c.blocked === true || Boolean(c.blockingError)
  if (blocked) {
    const be = c.blockingError
    const reason =
      typeof be === "string" ? be : be?.code || be?.message || JSON.stringify(be) || "unknown"
    fail(`Crawler is BLOCKED — ${reason}. It will not publish until a human resolves it.`)
  }

  const lastEnd =
    c.lastReindexEndedAt || c.lastReindexEndDate || c.lastCrawlEndedAt || c.updatedAt || null
  if (lastEnd) {
    const ageDays = (Date.now() - new Date(lastEnd).getTime()) / 86_400_000
    note(`Last crawl ended ${lastEnd} (${ageDays.toFixed(1)} days ago)`)
    if (ageDays > cfg.maxCrawlAgeDays)
      fail(
        `Last successful crawl was ${ageDays.toFixed(0)} days ago (> ${cfg.maxCrawlAgeDays}d) — search content is going stale`
      )
  } else {
    note("Could not read a last-crawl timestamp from the Crawler API (field mapping may need a tweak).")
  }
}

// ── Check 4: a settled page (older than one crawl cycle) is actually searchable ──
function walkContent(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "translations") continue // English only
      walkContent(p, out)
    } else if (entry.name === "index.md") {
      out.push(p)
    }
  }
  return out
}

function frontmatter(file) {
  const text = readFileSync(file, "utf8").slice(0, 4000)
  const date = text.match(/^published:\s*"?(\d{4}-\d{2}-\d{2})/m)?.[1]
  const title = text.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1]
  return { date, title }
}

async function checkFreshness() {
  let files
  try {
    files = walkContent(cfg.contentDir)
  } catch (err) {
    note(`Freshness check skipped — could not read ${cfg.contentDir}: ${err.message}`)
    return
  }
  const cutoff = Date.now() - cfg.contentMinAgeDays * 86_400_000
  let newest = null
  for (const file of files) {
    const { date, title } = frontmatter(file)
    if (!date) continue
    const ts = new Date(date).getTime()
    if (Number.isNaN(ts) || ts > cutoff) continue // too new — allow for crawl/deploy lag
    if (!newest || ts > newest.ts) {
      const slug = file
        .replace(new RegExp(`^${cfg.contentDir}/`), "")
        .replace(/\/index\.md$/, "")
      newest = { ts, date, title, slug }
    }
  }
  if (!newest) {
    note("Freshness check skipped — no settled content page found to probe.")
    return
  }
  const q = newest.title || newest.slug.split("/").pop().replace(/-/g, " ")
  const r = await searchQuery({ query: q, hitsPerPage: 50, facetFilters: ["lang:en"] })
  const present = (r.hits || []).some((h) => (h.url || "").includes(`/${newest.slug}`))
  if (present) note(`Freshness OK — /${newest.slug} (published ${newest.date}) is searchable.`)
  else
    fail(
      `Settled page not searchable: /${newest.slug} (published ${newest.date}). The index looks stale — a recent crawl likely never published.`
    )
}

function buildReport() {
  const runUrl = env.RUN_URL ? `\nRun: <${env.RUN_URL}>` : ""
  if (problems.length === 0) {
    return `:white_check_mark: Algolia search index \`${cfg.index}\` healthy.\n${notes
      .map((n) => `• ${n}`)
      .join("\n")}`
  }
  return [
    `:rotating_light: **Algolia search index unhealthy** — \`${cfg.index}\``,
    ...problems.map((p) => `• ${p}`),
    "",
    "_Context:_",
    ...notes.map((n) => `• ${n}`),
    "Fix: crawler.algolia.com → the crawler → Overview. See docs/site-search.md." + runUrl,
  ].join("\n")
}

async function main() {
  if (!cfg.appId || !cfg.searchKey) {
    fail("ALGOLIA_APP_ID / ALGOLIA_SEARCH_KEY not set — cannot query the index.")
  } else {
    // Run checks independently so one thrown error doesn't mask the others.
    for (const [label, fn] of [
      ["index-shape", checkIndexShape],
      ["crawler", checkCrawler],
      ["freshness", checkFreshness],
    ]) {
      try {
        await fn()
      } catch (err) {
        fail(`Health check "${label}" errored: ${err.message}`)
      }
    }
  }

  const unhealthy = problems.length > 0
  const report = buildReport()
  console.log(report)

  if (env.GITHUB_OUTPUT) {
    appendFileSync(
      env.GITHUB_OUTPUT,
      `unhealthy=${unhealthy}\nreport<<__HC_EOF__\n${report}\n__HC_EOF__\n`
    )
  }
  // Exit 0 even when unhealthy: the workflow reads the `unhealthy` output to decide
  // whether to alert. A non-zero exit would just show up as a red run with no signal.
  process.exit(0)
}

main()
