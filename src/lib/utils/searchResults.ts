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
