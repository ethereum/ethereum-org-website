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
 *
 * Queries are not: a pin matches its string exactly, so every locale gets the English
 * query plus that locale's entries in `typesense/curation-aliases.json` -- the ETHGlossary
 * surface forms that `localize-curation.ts` generates.
 */

import { createHash } from "crypto"
import { existsSync, readFileSync } from "fs"
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
  term?: string
  pin: string[]
}

/** rule query -> locale -> localized query strings. */
type Aliases = Record<string, Record<string, string[]>>

const CURATION_PATH = path.join(process.cwd(), "typesense", "curation.json")
const ALIASES_PATH = path.join(
  process.cwd(),
  "typesense",
  "curation-aliases.json"
)

const loadRules = (): CurationRule[] =>
  JSON.parse(readFileSync(CURATION_PATH, "utf-8")).rules ?? []

const loadAliases = (): Aliases =>
  existsSync(ALIASES_PATH)
    ? (JSON.parse(readFileSync(ALIASES_PATH, "utf-8")).aliases ?? {})
    : {}

const localize = (p: string, locale: string) =>
  locale === "en" ? p : `/${locale}${p}`

/**
 * Readable where the query is Latin, unique regardless: the slug alone collapsed every
 * non-Latin query to "", so all of a locale's localized pins shared one id and overwrote
 * each other.
 */
const itemId = (query: string) => {
  const slug = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32)
  const hash = createHash("sha1").update(query).digest("hex").slice(0, 10)
  return `${slug || "q"}-${hash}`
}

/**
 * Typesense compares an exact rule against the typed query with punctuation as a token
 * separator, but stores the rule's own text with punctuation removed -- so a rule written
 * "erc-20" or "crypto.com" matches nothing anyone types, while a rule written "erc 20"
 * matches "erc-20", "erc_20" and "erc 20" alike. Store every query in the spaced form.
 */
const ruleQuery = (query: string) =>
  query.replace(/[^\p{L}\p{N}]+/gu, " ").trim()

/** The strings that pin this rule's pages in a locale. English never gets aliases. */
const queriesFor = (rule: CurationRule, aliases: Aliases, locale: string) =>
  [rule.q, ...(locale === "en" ? [] : (aliases[rule.q]?.[locale] ?? []))]
    .map(ruleQuery)
    .filter(Boolean)

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
  aliases: Aliases,
  dryRun: boolean
) => {
  const alias = `ethereumorg-${locale}`
  // Curation sets are top-level and outlive collections, but their item ids point at
  // documents in one specific collection -- so resolve against whatever the alias
  // currently serves, and re-run after every promotion.
  const collection = (await resolveAlias(alias)) ?? alias
  const setName = `curation-${locale}`

  const items: unknown[] = []
  // Exact matching is case-insensitive, so two rules must not claim one string.
  const claimed = new Set<string>()
  let unresolved = 0

  for (const rule of rules) {
    const ids: string[] = []
    for (const pin of rule.pin) {
      const id = await resolveDocumentId(collection, localize(pin, locale))
      if (id) ids.push(id)
      else unresolved++
    }
    if (!ids.length) continue
    for (const query of queriesFor(rule, aliases, locale)) {
      if (claimed.has(query.toLowerCase())) continue
      claimed.add(query.toLowerCase())
      items.push({
        id: itemId(query),
        rule: { query, match: "exact" },
        includes: ids.map((id, i) => ({ id, position: i + 1 })),
      })
    }
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
    `  ${locale}: ${items.length} pins from ${rules.length} rules -> ${setName}` +
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
  const aliases = loadAliases()
  console.log(
    `applying ${rules.length} curation rules to ${locales.length} locale(s)${dryRun ? " (dry run)" : ""}\n`
  )

  let unresolved = 0
  for (const locale of locales)
    unresolved += await curateLocale(locale, rules, aliases, dryRun)

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
