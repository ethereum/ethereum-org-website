import { expect, test } from "@playwright/test"

import {
  isWithheldResult,
  sinkContributorPages,
  withPageRow,
} from "@/lib/utils/searchResults"

const section = (anchor: string, level = "lvl2") => ({
  objectID: `rec-${anchor}`,
  type: level,
  url: `https://ethereum.org/roadmap/merge/issuance/#${anchor}`,
  anchor,
  content: "some text",
  "hierarchy.lvl1": "ETH issuance",
  _highlightResult: {
    "hierarchy.lvl0": { value: "Issuance" },
    "hierarchy.lvl1": { value: "ETH issuance" },
  },
})

test.describe("withPageRow", () => {
  test("prepends the page when only sections came back", () => {
    // The exact case reported: every row deep-linked into a page that was never
    // offered on its own, the top one being its first heading.
    const [page, ...rest] = withPageRow([
      section("components-of-eth-issuance"),
      section("post-merge-issuance"),
    ])
    expect(page.url).toBe("https://ethereum.org/roadmap/merge/issuance/")
    expect(page.type).toBe("lvl1")
    expect(page.anchor).toBeNull()
    // No second line -- the row is the page, not a snippet of one section in it.
    expect(page.content).toBeNull()
    expect(rest).toHaveLength(2)
    expect(rest[0].url).toContain("#components-of-eth-issuance")
  })

  test("titles the page row from the h1 every record already carries", () => {
    const [page] = withPageRow([section("x")])
    expect(page["hierarchy.lvl1"]).toBe("ETH issuance")
    expect(
      (page._highlightResult as Record<string, { value: string }>)[
        "hierarchy.lvl1"
      ].value
    ).toBe("ETH issuance")
  })

  test("leaves the group alone when the page's own record is present", () => {
    const real = {
      ...section("x"),
      type: "lvl1",
      url: "https://ethereum.org/x/",
    }
    const items = [real, section("y")]
    expect(withPageRow(items)).toBe(items)
  })

  test("does nothing when there is no fragment to strip", () => {
    const items = [{ ...section("x"), url: "https://ethereum.org/x/" }]
    expect(withPageRow(items)).toBe(items)
  })

  test("does nothing for an empty group", () => {
    expect(withPageRow([])).toEqual([])
  })

  test("gives the synthesized row its own id", () => {
    // The renderer keys rows on objectID; reusing the section's would collide.
    const [page, original] = withPageRow([section("x")])
    expect(page.objectID).not.toBe(original.objectID)
  })
})

test.describe("isWithheldResult", () => {
  const q = "issuance"

  test("withholds the homepage in any locale", () => {
    expect(isWithheldResult("https://ethereum.org/", "en", q)).toBe(true)
    expect(isWithheldResult("https://ethereum.org/ja/", "ja", q)).toBe(true)
    expect(isWithheldResult("/", "en", q)).toBe(true)
  })

  test("withholds the glossary unless the reader asked for it", () => {
    expect(
      isWithheldResult("https://ethereum.org/glossary/#gas", "en", "gas")
    ).toBe(true)
    for (const asked of ["glossary", "Glossary", "eth glossary"]) {
      expect(
        isWithheldResult("https://ethereum.org/glossary/#gas", "en", asked),
        asked
      ).toBe(false)
    }
  })

  test("leaves content pages alone", () => {
    expect(isWithheldResult("https://ethereum.org/nft/", "en", q)).toBe(false)
    expect(
      isWithheldResult(
        "https://ethereum.org/developers/docs/glossary-of-terms/",
        "en",
        q
      )
    ).toBe(false)
    expect(isWithheldResult("https://ethereum.org/ja/", "en", q)).toBe(false)
  })
})

test.describe("sinkContributorPages", () => {
  const reader = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      url: `https://ethereum.org/page-${i}/`,
    }))
  const contributor = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      url: `https://ethereum.org/contributing/adding-${i}/`,
    }))
  const urls = (hits: { url: string }[]) => hits.map((hit) => hit.url)

  test("sinks a contributor page a reader's question turned up", () => {
    // "Adding a quiz" ranked third for "what is eth". Its pagerank is already the lowest
    // tier; sort_by leads with the text-match bucket, so rank never reaches it.
    const hits = [...reader(4), ...contributor(1), ...reader(5)]
    expect(urls(sinkContributorPages(hits, "en")).at(-1)).toContain(
      "/contributing/"
    )
  })

  test("leaves them alone when the question is about contributing", () => {
    // Read off how much of the result set they are: a word list would have to anticipate
    // every way someone asks.
    const hits = [...contributor(3), ...reader(7)]
    expect(sinkContributorPages(hits, "en")).toBe(hits)
  })

  test("keeps every result, since these are demoted and not withheld", () => {
    const hits = [...reader(9), ...contributor(1)]
    const sunk = sinkContributorPages(hits, "en")
    expect(sunk).toHaveLength(hits.length)
    expect(new Set(urls(sunk))).toEqual(new Set(urls(hits)))
  })

  test("does nothing when there are none to sink", () => {
    const hits = reader(5)
    expect(sinkContributorPages(hits, "en")).toBe(hits)
  })

  test("matches a localized path too", () => {
    const hits = [
      ...reader(9),
      { url: "https://ethereum.org/ja/contributing/adding-a-quiz/" },
    ]
    expect(urls(sinkContributorPages(hits, "ja")).at(-1)).toContain("/ja/")
  })

  test("leaves a page merely named for contributing where it is", () => {
    // Only the section counts -- a reader page about contributing to a DAO is not one.
    const hits = [
      ...reader(9),
      { url: "https://ethereum.org/dao/contributing-to-a-dao/" },
    ]
    expect(sinkContributorPages(hits, "en")).toBe(hits)
  })
})
