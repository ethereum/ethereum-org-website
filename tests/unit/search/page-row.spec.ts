import { expect, test } from "@playwright/test"

import { withPageRow } from "@/lib/utils/searchResults"

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

  test("gives the synthesised row its own id", () => {
    // The renderer keys rows on objectID; reusing the section's would collide.
    const [page, original] = withPageRow([section("x")])
    expect(page.objectID).not.toBe(original.objectID)
  })
})
