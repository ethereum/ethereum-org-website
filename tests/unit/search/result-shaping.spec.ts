import { expect, test } from "@playwright/test"

import { withoutAdapterFields, withPageName } from "@/lib/utils/searchResults"

const field = (value: string, matched = false) => ({
  value,
  matchLevel: matched ? "full" : "none",
  matchedWords: matched ? ["x"] : [],
})

const rendered = (item: { _snippetResult?: unknown }, attribute: string) =>
  (item._snippetResult as Record<string, { value: string }>)[attribute]?.value

test.describe("withPageName", () => {
  const page = (h1: string) => ({
    objectID: "rec-page",
    type: "lvl1",
    url: "https://ethereum.org/staking/",
    "hierarchy.lvl1": h1,
    _highlightResult: {
      "hierarchy.lvl0": field(
        "Ethereum <mark>staking</mark>: How does it work?",
        true
      ),
      "hierarchy.lvl1": field(h1),
    },
    _snippetResult: { "hierarchy.lvl1": field(h1) },
  })

  test("titles the row by the page when the h1 is a slogan", () => {
    const item = withPageName(page("Earn rewards while securing Ethereum"))
    const highlight = item._highlightResult as Record<string, { value: string }>
    expect(highlight["hierarchy.lvl1"].value).toBe(
      "Ethereum <mark>staking</mark>: How does it work?"
    )
    // The snippet copy would otherwise win over the highlight one.
    expect(rendered(item, "hierarchy.lvl1")).toBeUndefined()
  })

  test("keeps the raw lvl1, which is how a child row finds its parent", () => {
    const h1 = "Earn rewards while securing Ethereum"
    expect(withPageName(page(h1))["hierarchy.lvl1"]).toBe(h1)
  })

  test("does nothing when the h1 already is the page's name", () => {
    const same = page("Ethereum staking: How does it work?")
    expect(withPageName(same)).toBe(same)
  })

  test("leaves section rows alone -- their title is the heading, not the page", () => {
    const section = { ...page("x"), type: "lvl2" }
    expect(withPageName(section)).toBe(section)
  })
})

test.describe("withoutAdapterFields", () => {
  test("drops the response the adapter staples to every hit", () => {
    // 9.9 KB per entry against 0.5 KB, and DocSearch writes seven to localStorage.
    const item = withoutAdapterFields({
      objectID: "rec-1",
      url: "https://ethereum.org/staking/",
      content: "kept",
      _rawTypesenseHit: { document: {}, highlights: [] },
      _grouped_hits: [{}, {}, {}],
      group_key: ["x"],
      text_match_info: {},
    } as never) as Record<string, unknown>
    expect(Object.keys(item).sort()).toEqual(["content", "objectID", "url"])
  })
})
