/**
 * Promote a freshly scraped collection onto its production alias, if it passes.
 *
 *   pnpm typesense:promote -- --locale en [--dry-run] [--force] [--keep 2] [--skip-relevance]
 *   pnpm typesense:promote -- --all
 *
 * The DocSearch scraper swaps its own alias the instant a crawl ends, so a half-finished
 * run would silently become production. We scrape into a staging name and promote here
 * instead, which is the Typesense equivalent of Algolia's
 * `safetyChecks.beforeIndexPublishing`. On refusal the alias is left alone and search
 * keeps serving the older index -- stale results beat no results.
 */

import { existsSync, readFileSync } from "fs"
import path from "path"

import {
  api,
  type CollectionInfo,
  countByLanguage,
  listCollections,
  LOCALES,
  requireEnv,
  resolveAlias,
  SEARCH_KEY,
  SITE_ORIGIN,
} from "./client"

/** A new index must retain at least this share of the live one to be promotable. */
const MIN_SIZE_RATIO = 0.9

/**
 * Collections kept per locale after promotion: the live one plus one predecessor, so a
 * rollback is a single alias flip. Without this, 25 locales rebuilt weekly would add 25
 * collections a week to an instance that holds its indexes in memory.
 */
const KEEP_PER_LOCALE = 2

/**
 * Minimum share of labelled queries whose correct page must rank first, measured against
 * the staging collection before the alias moves. The baseline is ~42% before curation is
 * applied, so this catches a collapse without tripping on ordinary drift.
 *
 * Deliberately measured pre-curation: pins are applied after promotion and would mask a
 * regression in the underlying ranking.
 */
const MIN_HIT_AT_1 = 0.35

const GROUNDTRUTH_PATH = path.join(
  process.cwd(),
  "typesense",
  "groundtruth.json"
)

/** Per-locale result. A skip is a failure of its own, not a quiet success. */
type Outcome = "promoted" | "refused" | "skipped"

interface Args {
  locales: string[]
  dryRun: boolean
  force: boolean
  minRatio: number
  keep: number
  skipRelevance: boolean
}

const parseArgs = (argv: string[]): Args => {
  const get = (flag: string) => {
    const i = argv.indexOf(flag)
    return i === -1 ? undefined : argv[i + 1]
  }
  /**
   * A bad value used to become `NaN` and disable a safeguard silently, in opposite
   * directions: `NaN` keep made `slice(NaN)` return everything, so prune deleted every
   * predecessor, and `NaN` minRatio made `ratio < minRatio` always false, turning the
   * shrink gate off.
   */
  const numeric = (flag: string, fallback: number) => {
    const raw = get(flag)
    if (raw === undefined) return fallback
    const value = Number(raw)
    if (!Number.isFinite(value)) {
      console.error(`${flag} needs a number, got "${raw}"`)
      process.exit(1)
    }
    return value
  }
  const locale = get("--locale")
  return {
    locales: argv.includes("--all") ? [...LOCALES] : locale ? [locale] : ["en"],
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    minRatio: numeric("--min-ratio", MIN_SIZE_RATIO),
    keep: numeric("--keep", KEEP_PER_LOCALE),
    skipRelevance: argv.includes("--skip-relevance"),
  }
}

/** Newest staging collection for a locale, by the timestamp the scraper appends. */
const newestStaged = (collections: CollectionInfo[], locale: string) =>
  collections
    .map((c) => c.name)
    .filter((n) => n.startsWith(`ethereumorg-staging-${locale}_`))
    .sort()
    .at(-1)

const promoteLocale = async (
  locale: string,
  collections: CollectionInfo[],
  args: Args
): Promise<Outcome> => {
  const alias = `ethereumorg-${locale}`
  const source = newestStaged(collections, locale)
  if (!source) {
    // Promote runs straight after that locale's crawl, so nothing staged means the crawl
    // produced nothing. Counting it as promoted made a silently failed scrape read as a
    // successful run.
    console.log(`  ${locale}: no staged collection -- skipped`)
    return "skipped"
  }

  const sizeOf = (name?: string) =>
    collections.find((c) => c.name === name)?.num_documents ?? 0
  const current = await resolveAlias(alias)
  const [next, live] = [sizeOf(source), sizeOf(current)]
  const failures: string[] = []

  if (live > 0) {
    const ratio = next / live
    if (ratio < args.minRatio && !args.force)
      failures.push(
        `index shrank to ${(ratio * 100).toFixed(1)}% of live (floor ${args.minRatio * 100}%)`
      )
  }

  const schema = await api<CollectionInfo>("GET", `/collections/${source}`)
  const pagerank = schema.fields?.find((f) => f.name === "pagerank")
  if (!pagerank?.sort)
    failures.push(
      "pagerank missing or unsortable -- ranking would silently revert"
    )

  if ((await countByLanguage(source, locale)) === 0)
    failures.push(`no documents tagged language:=${locale}`)

  // Relevance last: it is the slowest check, and there is no point scoring an index that
  // already failed a structural one.
  if (!failures.length && !args.skipRelevance) {
    const score = await hitAtOne(source, locale)
    if (score !== null) {
      console.log(
        `  ${locale}: hit@1 ${(score * 100).toFixed(0)}% on labelled queries`
      )
      if (score < MIN_HIT_AT_1 && !args.force)
        failures.push(
          `hit@1 ${(score * 100).toFixed(0)}% is below the ${MIN_HIT_AT_1 * 100}% floor`
        )
    }
  }

  if (failures.length) {
    console.log(
      `  ${locale}: REFUSED (${next.toLocaleString()} docs vs ${live.toLocaleString()} live)`
    )
    failures.forEach((f) => console.log(`      - ${f}`))
    return "refused"
  }

  if (args.dryRun) {
    console.log(
      `  ${locale}: would promote ${source} (${next.toLocaleString()} docs)`
    )
    return "promoted"
  }

  await api("PUT", `/aliases/${alias}`, { body: { collection_name: source } })
  console.log(
    `  ${locale}: ${alias} -> ${source} (${next.toLocaleString()} docs)`
  )
  await prune(locale, source, current, collections, args.keep)
  return "promoted"
}

interface LabelledQuery {
  q: string
  correct: string | null
}

const normalizePath = (url: string) =>
  "/" +
  url
    .replace(SITE_ORIGIN, "")
    .split("#")[0]
    .replace(/^\/|\/$/g, "") +
  "/"

/**
 * Share of labelled queries whose correct page ranks first. Returns null when there is no
 * ground truth for this locale, which is every locale but English.
 */
const hitAtOne = async (collection: string, locale: string) => {
  if (locale !== "en" || !existsSync(GROUNDTRUTH_PATH)) return null
  const queries: LabelledQuery[] = JSON.parse(
    readFileSync(GROUNDTRUTH_PATH, "utf-8")
  ).queries.filter((row: LabelledQuery) => row.correct)

  let hits = 0
  for (const { q, correct } of queries) {
    const params = new URLSearchParams({
      q,
      query_by:
        "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,content",
      group_by: "url_without_anchor",
      group_limit: "1",
      per_page: "1",
    })
    const result = await api<{
      grouped_hits?: { hits: { document: { url_without_anchor?: string } }[] }[]
    }>("GET", `/collections/${collection}/documents/search?${params}`, {
      key: SEARCH_KEY,
    })
    const top = result.grouped_hits?.[0]?.hits?.[0]?.document.url_without_anchor
    if (top && normalizePath(top) === normalizePath(correct!)) hits++
  }
  return hits / queries.length
}

/** Drop superseded collections for a locale, newest-first, never touching the live one. */
const prune = async (
  locale: string,
  live: string,
  previous: string | undefined,
  collections: CollectionInfo[],
  keep: number
) => {
  const mine = collections
    .map((c) => c.name)
    .filter(
      (n) =>
        n.startsWith(`ethereumorg-${locale}_`) ||
        n.startsWith(`ethereumorg-staging-${locale}_`)
    )
    .filter((n) => n !== live && n !== previous)
    .sort()
    .reverse()

  // Newest-first ordering alone would drop the wrong one: after a refused run the newest
  // leftover is the collection that failed its gates, so it would outlive the index the
  // alias was actually serving. `previous` is held explicitly to keep rollback a single
  // alias flip, and both it and `live` occupy kept slots.
  const reserved = previous ? 2 : 1
  const doomed = mine.slice(Math.max(keep - reserved, 0))
  for (const name of doomed) {
    await api("DELETE", `/collections/${name}`)
    console.log(`      pruned ${name}`)
  }
}

const main = async () => {
  requireEnv()
  const args = parseArgs(process.argv.slice(2))
  const collections = await listCollections()
  console.log(
    `promoting ${args.locales.length} locale(s)${args.dryRun ? " (dry run)" : ""}\n`
  )

  const results = await Promise.all(
    args.locales.map((l) => promoteLocale(l, collections, args))
  )
  const count = (outcome: Outcome) =>
    results.filter((r) => r === outcome).length
  const [promoted, refused, skipped] = (
    ["promoted", "refused", "skipped"] as const
  ).map(count)
  console.log(`\n${promoted} promoted, ${refused} refused, ${skipped} skipped`)
  if (refused || skipped) process.exitCode = 1
}

main().catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
