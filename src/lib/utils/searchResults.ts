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
  "hierarchy.lvl1"?: unknown
  _highlightResult?: unknown
  _snippetResult?: unknown
}

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
 * and its `url` minus the fragment is the page. The synthesised row becomes the parent
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

export const isHomepageUrl = (url: string, locale: string): boolean => {
  const path = pathOf(url)
  return path === "" || path === `/${locale}`
}

const isGlossaryUrl = (url: string, locale: string): boolean => {
  const path = pathOf(url)
  return path === "/glossary" || path === `/${locale}/glossary`
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
