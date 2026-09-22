/**
 * The search parameters the app sends, shared so a script cannot measure ranking users
 * never receive. `sort_by` was missing from the relevance gate once already, which made a
 * change to page ranking invisible to the check meant to catch it.
 *
 * Kept free of imports and side effects: the scripts' Typesense client loads `.env`, and
 * the search modal must not drag that into the browser bundle to read a string.
 */

export const QUERY_BY =
  "hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content"

/**
 * Rank by which field matched rather than by raw match score, so a page title beats a
 * content snippet that happens to repeat the term. See #19194.
 */
export const TEXT_MATCH_TYPE = "max_weight" as const

/**
 * Six buckets, not 100: at 100 almost nothing ties, so `pagerank` never applies.
 *
 * `item_priority` went with the bucket change. It was there so a page outranked its own
 * first section, and it no longer does that -- "issuance of eth" lands on the section
 * anchor either way, now that the renderer synthesizes the page row. What it still did
 * was break the far larger ties six buckets create, on position-within-page, which put
 * the whitepaper first for "what is eth".
 */
export const SORT_BY = "_text_match(buckets: 6):desc,pagerank:desc"
