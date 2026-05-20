/**
 * A content collection — one type of markdown page that a hub consumes as data.
 *
 * The build script reads English slugs from `public/content/{subDir}`, then for
 * each locale invokes `buildEntry(slug, locale)`. Each collection owns its own
 * frontmatter shape, translation fallback, and any derived fields (e.g. reading
 * time). The script just orchestrates and writes the JSON.
 */
export type CollectionDefinition<TEntry> = {
  /** Output filename: src/data/generated/{name}.json */
  name: string
  /** Path under public/content/ where English slugs live (e.g. "developers/tutorials") */
  subDir: string
  /** Build one entry for one locale, or return null to omit it. */
  buildEntry: (slug: string, locale: string) => Promise<TEntry | null>
}

/** Shape of a generated manifest file: { [locale]: Entry[] } */
export type Manifest<TEntry> = Record<string, TEntry[]>
