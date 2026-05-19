/**
 * Build per-collection frontmatter manifests consumed by ISR hub pages.
 *
 * Why this exists: `public/content/` is excluded from the deployed Netlify
 * function (see next.config.js outputFileTracingExcludes). Hub pages like
 * /developers/tutorials and /videos need frontmatter from those markdown
 * files at runtime, so we precompile a small JSON manifest per collection
 * and import it from `src/data/generated/`, which IS bundled.
 *
 * Output: src/data/generated/{collection}.json = { [locale]: Entry[] }
 */
import { mkdir, readdir, writeFile } from "fs/promises"
import { join } from "path"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "../../lib/constants"

import { collections } from "./collections"
import type { CollectionDefinition, Manifest } from "./types"

const OUTPUT_DIR = join(process.cwd(), "src/data/generated")

/**
 * Discover slug folders for a collection by reading the English content tree.
 * English is the source of truth for which slugs exist.
 */
async function discoverSlugs(subDir: string): Promise<string[]> {
  const dir = join(process.cwd(), CONTENT_DIR, subDir)
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()
}

async function buildCollection<TEntry>(
  collection: CollectionDefinition<TEntry>
): Promise<{ name: string; entryCount: number }> {
  const slugs = await discoverSlugs(collection.subDir)
  const manifest: Manifest<TEntry> = {}
  let totalEntries = 0

  for (const locale of LOCALES_CODES) {
    const entries: TEntry[] = []
    for (const slug of slugs) {
      try {
        const entry = await collection.buildEntry(slug, locale)
        if (entry !== null) entries.push(entry)
      } catch (error) {
        // English failure for a slug is a real bug; non-English is usually
        // just a missing translation that the buildEntry already handled.
        if (locale === DEFAULT_LOCALE) {
          console.warn(
            `[${collection.name}] failed to build ${locale}/${slug}:`,
            error
          )
        }
      }
    }
    manifest[locale] = entries
    totalEntries += entries.length
  }

  const outPath = join(OUTPUT_DIR, `${collection.name}.json`)
  await writeFile(outPath, JSON.stringify(manifest) + "\n", "utf-8")

  return { name: collection.name, entryCount: totalEntries }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const results = await Promise.all(
    collections.map((c) => buildCollection(c as CollectionDefinition<unknown>))
  )

  for (const { name, entryCount } of results) {
    console.log(
      `  [${name}] ${entryCount} entries across ${LOCALES_CODES.length} locales`
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
