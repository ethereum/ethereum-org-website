/**
 * Apply pinned search results to a locale's collection.
 *
 *   pnpm typesense:curate -- --locale en [--dry-run]
 *   pnpm typesense:curate -- --all
 *
 * Typesense pins by document id, and the DocSearch scraper assigns ids as sequential
 * counters that change on every crawl. Curation is therefore stored as URLs in
 * `typesense/curation.json` and re-resolved against whichever collection is live --
 * never entered by hand in a dashboard, where it would silently stop matching each week.
 *
 * Paths there are locale-agnostic: brand names read the same in every language and
 * ethereum.org uses English slugs throughout, so `/wallets/find-wallet/metamask/` becomes
 * `/ja/wallets/find-wallet/metamask/` for Japanese.
 */

import { readFileSync } from "fs"
import path from "path"

import {
  api,
  type CollectionInfo,
  LOCALES,
  requireEnv,
  resolveAlias,
  SEARCH_KEY,
  SITE_ORIGIN,
} from "./client"

interface CurationRule {
  q: string
  pin: string[]
}

const CURATION_PATH = path.join(process.cwd(), "typesense", "curation.json")

const loadRules = (): CurationRule[] =>
  JSON.parse(readFileSync(CURATION_PATH, "utf-8")).rules ?? []

const localize = (p: string, locale: string) =>
  locale === "en" ? p : `/${locale}${p}`

const itemId = (query: string) =>
  query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)

/** Resolve a site path to a document id. Anchors are dropped: we pin pages, not fragments. */
const resolveDocumentId = async (collection: string, sitePath: string) => {
  const url = SITE_ORIGIN + sitePath.split("#")[0]
  const params = new URLSearchParams({
    q: "*",
    query_by: "hierarchy.lvl1",
    per_page: "1",
    filter_by: `url_without_anchor:=\`${url}\``,
  })
  const result = await api<{ hits?: { document: { id: string } }[] }>(
    "GET",
    `/collections/${collection}/documents/search?${params}`,
    { key: SEARCH_KEY }
  )
  return result.hits?.[0]?.document.id
}

const curateLocale = async (
  locale: string,
  rules: CurationRule[],
  dryRun: boolean
) => {
  const alias = `ethereumorg-${locale}`
  // Curation sets are top-level and outlive collections, but their item ids point at
  // documents in one specific collection -- so resolve against whatever the alias
  // currently serves, and re-run after every promotion.
  const collection = (await resolveAlias(alias)) ?? alias
  const setName = `curation-${locale}`

  const items: unknown[] = []
  let unresolved = 0

  for (const rule of rules) {
    const ids: string[] = []
    for (const pin of rule.pin) {
      const id = await resolveDocumentId(collection, localize(pin, locale))
      if (id) ids.push(id)
      else unresolved++
    }
    if (!ids.length) continue
    items.push({
      id: itemId(rule.q),
      rule: { query: rule.q, match: "exact" },
      includes: ids.map((id, i) => ({ id, position: i + 1 })),
    })
  }

  // The whole set is written in one request: the per-item endpoint
  // (PUT /curation_sets/:set/items/:id) needs a permission the pipeline key doesn't
  // carry, and a single atomic write is what we want anyway.
  if (!dryRun && items.length) {
    await api("PUT", `/curation_sets/${setName}`, { body: { items } })
  }

  // The collection is recreated by every scrape, so the set has to be re-attached.
  if (!dryRun && items.length) {
    const current = await api<CollectionInfo & { curation_sets?: string[] }>(
      "GET",
      `/collections/${collection}`
    )
    if (!current.curation_sets?.includes(setName)) {
      await api("PATCH", `/collections/${collection}`, {
        body: { curation_sets: [...(current.curation_sets ?? []), setName] },
      })
    }
  }

  console.log(
    `  ${locale}: ${items.length}/${rules.length} rules -> ${setName}` +
      (unresolved ? `, ${unresolved} URLs unresolved` : "")
  )
  return unresolved
}

const main = async () => {
  requireEnv()
  const argv = process.argv.slice(2)
  const dryRun = argv.includes("--dry-run")
  const locales = argv.includes("--all")
    ? [...LOCALES]
    : argv.includes("--locale")
      ? [argv[argv.indexOf("--locale") + 1]]
      : ["en"]

  const rules = loadRules()
  console.log(
    `applying ${rules.length} curation rules to ${locales.length} locale(s)${dryRun ? " (dry run)" : ""}\n`
  )

  let unresolved = 0
  for (const locale of locales)
    unresolved += await curateLocale(locale, rules, dryRun)

  // An unresolved URL means curation.json points at a page that no longer exists; the
  // pin silently does nothing, so fail rather than let it rot.
  if (unresolved) {
    console.error(`\n${unresolved} pinned URL(s) did not resolve to a document`)
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
