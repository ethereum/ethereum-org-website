/**
 * The search parameters the app sends, shared so a script cannot measure ranking users
 * never receive. `sort_by` was missing from the relevance gate once already, which made a
 * change to page ranking invisible to the check meant to catch it.
 *
 * Kept free of imports and side effects: the scripts' Typesense client loads `.env`, and
 * the search modal must not drag that into the browser bundle to read a string.
 */

/** Mirrors the docsearch adapter's own default, so the gate queries what the modal does. */
export const QUERY_BY =
  "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content"

/**
 * Rank by which field matched rather than by raw match score: without this a short
 * content snippet outscores a page title, so short queries land on whichever page
 * happens to mention the term. Costs long exact-title queries (89/90 -> 73/90) but they
 * stay far ahead of Algolia's 37/90.
 */
export const TEXT_MATCH_TYPE = "max_weight" as const

/**
 * Break near-ties by page importance: root-level pages rank 10, tutorials 1. Far fewer
 * buckets than the default 100, where almost nothing ties so pagerank never applies. The
 * two locale groups peak in different places, measured on unpinned queries: English at
 * 16 (45/56 vs 37 at 6), the rest at 5-6 (hit@3 89/120 vs 80 at 16). Every query in
 * groundtruth.json is also a curation rule, so that set scores pins rather than ranking
 * -- don't tune against it.
 */
export const textMatchBuckets = (locale: string) => (locale === "en" ? 16 : 6)

export const sortBy = (locale: string) =>
  `_text_match(buckets: ${textMatchBuckets(locale)}):desc,pagerank:desc`
