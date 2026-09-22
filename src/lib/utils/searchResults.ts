/**
 * Shaping applied to a page's search results before they are rendered.
 *
 * Typed structurally rather than against the search library's `DocSearchHit`, which is
 * only reachable by inference from a prop signature and carries far more than this needs.
 */
export interface PageResult {
  objectID: string
  type?: string
  url?: string
  anchor?: string | null
  content?: string | null
  "hierarchy.lvl0"?: unknown
  "hierarchy.lvl1"?: unknown
  _highlightResult?: unknown
  _snippetResult?: unknown
}

/** One field of one hit, as the search adapter reports it. */
interface FieldResult {
  value?: unknown
}

const fields = (bag: unknown): Record<string, FieldResult> | undefined =>
  bag && typeof bag === "object"
    ? (bag as Record<string, FieldResult>)
    : undefined

const plainText = (value: unknown): string =>
  typeof value === "string" ? value.replace(/<\/?mark>/g, "") : ""

/**
 * Guarantee a row for the page itself at the head of its group.
 *
 * Results arrive one page at a time. When the page's own `lvl1` record is not among them
 * -- it competes for a `group_limit` slot like any other record, and loses whenever a
 * section matches the query more literally -- every row deep-links into the middle of a
 * page that was never offered on its own. Searching "issuance of eth" and landing on
 * `#components-of-eth-issuance`, the page's first heading, is the usual shape of it.
 *
 * Nothing has to be invented: every record carries the page's h1 in `hierarchy.lvl1`,
 * and its `url` minus the fragment is the page. The synthesized row becomes the parent
 * the renderer nests the remaining sections under.
 */
export const withPageRow = <T extends PageResult>(items: T[]): T[] => {
  if (!items.length || items.some((item) => item.type === "lvl1")) return items

  const [first] = items
  const title = first["hierarchy.lvl1"]
  const pageUrl = first.url?.split("#")[0]
  // No fragment to strip means this already is the page, or the URL is unusable.
  if (typeof title !== "string" || !pageUrl || pageUrl === first.url)
    return items

  const highlight = first._highlightResult as
    | Record<string, unknown>
    | undefined
  return [
    {
      ...first,
      objectID: `${first.objectID}-page`,
      type: "lvl1",
      url: pageUrl,
      anchor: null,
      // No second line: this row is the page, not a snippet of one section within it.
      content: null,
      _highlightResult: {
        "hierarchy.lvl0": highlight?.["hierarchy.lvl0"],
        "hierarchy.lvl1": highlight?.["hierarchy.lvl1"] ?? { value: title },
      },
      _snippetResult: undefined,
    } as T,
    ...items,
  ]
}

/**
 * Title a page row by the page, not by its opening headline.
 *
 * `hierarchy.lvl1` is the page's `h1`, which on a landing page is a slogan: `/staking/`
 * offered "Earn rewards while securing Ethereum" as the clickable label under a heading
 * reading "Ethereum staking: How does it work?". Most pages carry the same text in both,
 * so this only moves the ones where the `h1` is not the page's name.
 *
 * Only the rendered copies change. The raw `hierarchy.lvl1` is what the renderer matches a
 * child row against to find its parent, so rewriting it would unnest every section.
 */
export const withPageName = <T extends PageResult>(item: T): T => {
  if (item.type !== "lvl1") return item
  const highlight = fields(item._highlightResult)
  const name = highlight?.["hierarchy.lvl0"]
  if (!name || !plainText(name.value)) return item
  if (plainText(name.value) === plainText(highlight["hierarchy.lvl1"]?.value))
    return item

  // The snippet copy is dropped rather than replaced: it wins over the highlight one, and
  // lvl0's is an excerpt of a title already short enough to show whole.
  const snippet = fields(item._snippetResult)
  const keptSnippets = snippet ? { ...snippet } : undefined
  delete keptSnippets?.["hierarchy.lvl1"]
  return {
    ...item,
    _highlightResult: { ...highlight, "hierarchy.lvl1": name },
    _snippetResult: keptSnippets ?? item._snippetResult,
  }
}

/**
 * Fields the search adapter attaches for its own use, none of which anything reads.
 *
 * They matter because a selected row is written to `localStorage` as the recent search:
 * `_rawTypesenseHit` is the hit's whole unadapted response and `_grouped_hits` repeats it
 * for every sibling, which measured 9.9 KB per entry against 0.5 KB without them.
 * DocSearch keeps seven.
 */
const ADAPTER_FIELDS = [
  "_rawTypesenseHit",
  "_grouped_hits",
  "_group_key",
  "_group_found",
  "group_key",
  "text_match",
  "text_match_info",
] as const

export const withoutAdapterFields = <T extends PageResult>(item: T): T => {
  const rest = { ...item } as Record<string, unknown>
  for (const field of ADAPTER_FIELDS) delete rest[field]
  return rest as T
}

/**
 * Pages withheld from results, in any locale.
 *
 * The homepage: what the crawler extracts from it is hero copy and section headings,
 * every phrase of which appears more fully on the page it links to.
 *
 * The glossary: every entry is a one-word heading, which is an exact full-field match for
 * any single-word query and so scores above pages that are actually about the term. It
 * takes the top three for "gas" and "staking" as readily as for "issuance". No ranking
 * weight fixes that -- the score gap is far too wide for page importance to close -- so it
 * is withheld unless the reader asked for the glossary itself.
 *
 * Both are dropped here rather than with a `filter_by` on their `category` facet, which
 * would be tidier but is not safe to assume: `category` is an optional field, and
 * Typesense does not document whether a negation filter keeps or discards documents that
 * lack it. If it discards them, any page missing the tag would silently vanish.
 */
const pathOf = (url: string): string => {
  let path: string
  try {
    path = new URL(url).pathname
  } catch {
    path = url.split("#")[0]
  }
  return path.replace(/\/+$/, "")
}

const isHomepageUrl = (url: string, locale: string): boolean => {
  const path = pathOf(url)
  return path === "" || path === `/${locale}`
}

const isGlossaryUrl = (url: string, locale: string): boolean => {
  const path = pathOf(url)
  return path === "/glossary" || path === `/${locale}/glossary`
}

const isContributingUrl = (url: string, locale: string): boolean => {
  const path = pathOf(url)
  return (
    path.startsWith("/contributing/") ||
    path.startsWith(`/${locale}/contributing/`)
  )
}

/**
 * Share of results that must be contributor pages before the reader is taken to be asking
 * about contributing. Measured: reader questions put them at 0-10%, contributor questions
 * at 22% and up.
 */
const CONTRIBUTOR_INTENT_SHARE = 0.2

/**
 * Sink the pages written for contributors below the ones written for readers, unless the
 * reader is asking about contributing.
 *
 * `/contributing/` documents how to add a quiz or a wallet to the site, and it matches a
 * reader's words closely enough to take a top slot -- "Adding a quiz" ranked third for
 * "what is eth". Its `pagerank` is already the lowest tier and that never reaches it:
 * `sort_by` leads with the text-match bucket, and rank only separates pages inside one.
 *
 * Intent is read off how much of the result set they are rather than off the query text.
 * A word list has to anticipate every way someone asks, and sinking them unconditionally
 * buried "how to contribute" under Glossary and Glamsterdam -- weak reader matches still
 * float up, so there is always something to sink beneath.
 */
export const sinkContributorPages = <T extends { url?: string }>(
  hits: T[],
  locale: string
): T[] => {
  const contributor = hits.filter((hit) =>
    isContributingUrl(hit.url ?? "", locale)
  )
  if (!contributor.length) return hits
  if (contributor.length / hits.length >= CONTRIBUTOR_INTENT_SHARE) return hits
  return [
    ...hits.filter((hit) => !isContributingUrl(hit.url ?? "", locale)),
    ...contributor,
  ]
}

/** True when a result should not be shown for this query. */
export const isWithheldResult = (
  url: string,
  locale: string,
  query: string
): boolean => {
  if (isHomepageUrl(url, locale)) return true
  // Asked for by name, so it is the answer rather than noise.
  if (isGlossaryUrl(url, locale)) return !/glossar/i.test(query)
  return false
}
