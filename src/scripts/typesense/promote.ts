/**
 * Promote a freshly scraped collection onto its production alias, if it passes.
 *
 *   pnpm typesense:promote -- --locale en [--dry-run] [--force]
 *   pnpm typesense:promote -- --all
 *
 * The DocSearch scraper swaps its own alias the instant a crawl ends, so a half-finished
 * run would silently become production. We scrape into a staging name and promote here
 * instead, which is the Typesense equivalent of Algolia's
 * `safetyChecks.beforeIndexPublishing`. On refusal the alias is left alone and search
 * keeps serving the older index -- stale results beat no results.
 */

import {
  api,
  type CollectionInfo,
  countByLanguage,
  listCollections,
  LOCALES,
  requireEnv,
  resolveAlias,
} from "./client"

/** A new index must retain at least this share of the live one to be promotable. */
const MIN_SIZE_RATIO = 0.9

interface Args {
  locales: string[]
  dryRun: boolean
  force: boolean
  minRatio: number
}

const parseArgs = (argv: string[]): Args => {
  const get = (flag: string) => {
    const i = argv.indexOf(flag)
    return i === -1 ? undefined : argv[i + 1]
  }
  const locale = get("--locale")
  return {
    locales: argv.includes("--all") ? [...LOCALES] : locale ? [locale] : ["en"],
    dryRun: argv.includes("--dry-run"),
    force: argv.includes("--force"),
    minRatio: Number(get("--min-ratio") ?? MIN_SIZE_RATIO),
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
): Promise<boolean> => {
  const alias = `ethereumorg-${locale}`
  const source = newestStaged(collections, locale)
  if (!source) {
    console.log(`  ${locale}: no staged collection -- skipped`)
    return true
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

  if (failures.length) {
    console.log(
      `  ${locale}: REFUSED (${next.toLocaleString()} docs vs ${live.toLocaleString()} live)`
    )
    failures.forEach((f) => console.log(`      - ${f}`))
    return false
  }

  if (args.dryRun) {
    console.log(
      `  ${locale}: would promote ${source} (${next.toLocaleString()} docs)`
    )
    return true
  }

  await api("PUT", `/aliases/${alias}`, { body: { collection_name: source } })
  console.log(
    `  ${locale}: ${alias} -> ${source} (${next.toLocaleString()} docs)`
  )
  return true
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
  const refused = results.filter((ok) => !ok).length
  console.log(`\n${results.length - refused} promoted, ${refused} refused`)
  if (refused) process.exitCode = 1
}

main().catch((error) => {
  console.error((error as Error).message)
  process.exit(1)
})
