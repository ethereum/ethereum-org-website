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
 * Rank by which field matched rather than by raw match score, so a page title beats a
 * content snippet that happens to repeat the term. Measured on the live index against
 * production Algolia, 2026-09: on 200 unpinned glossary terms across 8 locales the top
 * result agrees with Algolia's 83 times against 56 for `max_score`; on 248 pages searched
 * by their own title it costs 10 hits (233 vs 243 of 248) and stays ahead of Algolia's 222.
 */
export const TEXT_MATCH_TYPE = "max_weight" as const

/**
 * `pagerank` (root-level pages 10, tutorials 1) breaks ties within a text-match bucket.
 * 100 buckets, the default: coarser bucketing was tried (6 and 16) to pull short head
 * terms onto their landing pages, and it worked for those, but it collapses an exact
 * title match into the same tier as a page that merely contains the words -- known-item
 * fell to 186 of 248 at 6 buckets and agreement with Algolia on unpinned terms to 36 of
 * 200. Head terms are pinned per locale instead (see typesense/curation-aliases.json),
 * which is deterministic and leaves the ranking free to serve everything else.
 *
 * Every query in groundtruth.json is also a curation rule, so that set scores pins rather
 * than ranking -- don't tune against it.
 */
export const SORT_BY = "_text_match(buckets: 100):desc,pagerank:desc"
