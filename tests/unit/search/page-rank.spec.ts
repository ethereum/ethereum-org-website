import { expect, test } from "@playwright/test"

import {
  categoryForSlug,
  PAGE_RANK,
  pageRankForSlug,
} from "@/lib/utils/searchRanking"

test.describe("pageRankForSlug", () => {
  test("puts beginner landing pages at the top", () => {
    for (const slug of [
      ["what-is-ethereum"],
      ["security"],
      ["smart-contracts"],
      ["gas"],
      ["nft"],
      ["defi"],
      ["privacy"],
      ["values"],
      ["get-eth"],
    ]) {
      expect(pageRankForSlug(slug), slug.join("/")).toBe(PAGE_RANK.beginner)
    }
  })

  test("ranks the homepage with the landing pages", () => {
    // It arrives as `[""]` rather than an empty array. Counted naively that reads as
    // depth 1 and scores it above every other page, so empty segments are dropped.
    expect(pageRankForSlug([""])).toBe(PAGE_RANK.beginner)
  })

  test("prefers the shallower page when both are below a root", () => {
    // The reported case: "issuance of eth" put /roadmap/merge/issuance above /eth/supply
    // because a flat model scored every non-root page the same.
    expect(pageRankForSlug(["eth", "supply"])).toBeGreaterThan(
      pageRankForSlug(["roadmap", "merge", "issuance"])
    )
  })

  test("decays with depth and stops at the floor", () => {
    expect(pageRankForSlug(["eth"])).toBe(10)
    expect(pageRankForSlug(["eth", "supply"])).toBe(8)
    expect(pageRankForSlug(["roadmap", "merge", "issuance"])).toBe(6)
    // Deeper pages settle at the floor rather than sinking under tutorials and videos.
    expect(pageRankForSlug(["a", "b", "c", "d", "e"])).toBe(PAGE_RANK.default)
  })

  test("orders the buckets beginner > guide > docs > supplemental > tutorial > lowest", () => {
    const order = [
      pageRankForSlug(["what-is-ethereum"]),
      pageRankForSlug(["guides", "how-to-swap-tokens"]),
      pageRankForSlug(["developers", "docs", "blocks"]),
      pageRankForSlug(["glossary"]),
      pageRankForSlug(["developers", "tutorials", "some-tutorial"]),
      pageRankForSlug(["videos", "a-talk"]),
    ]
    expect(order).toEqual([...order].sort((a, b) => b - a))
    expect(new Set(order).size).toBe(order.length)
  })

  test("demotes references below the pages that explain a term", () => {
    // Typing a glossary term must not surface the glossary above the page that covers
    // it; the ranking carries half of that, curation the rest.
    expect(pageRankForSlug(["glossary"])).toBeLessThan(
      pageRankForSlug(["staking"])
    )
    for (const root of ["glossary", "resources", "ethereum-forks"]) {
      expect(pageRankForSlug([root]), root).toBe(PAGE_RANK.supplemental)
    }
  })

  test("demotes transcripts and contributor docs furthest", () => {
    expect(pageRankForSlug(["videos", "a-talk"])).toBe(PAGE_RANK.lowest)
    expect(pageRankForSlug(["contributing", "adding-a-quiz"])).toBe(
      PAGE_RANK.lowest
    )
    // "Adding a quiz" outranking /nft/ for the query "nft" is the failure this fixes.
    expect(pageRankForSlug(["contributing", "adding-a-quiz"])).toBeLessThan(
      pageRankForSlug(["nft"])
    )
  })

  test("holds developer docs at their own rank, whatever their depth", () => {
    // Docs are deliberately exempt from the decay: nesting there is organisational,
    // not a signal that the page is more specific than a reader wanted.
    expect(pageRankForSlug(["developers", "docs", "blocks"])).toBe(
      PAGE_RANK.docs
    )
    expect(
      pageRankForSlug(["developers", "docs", "scaling", "optimistic-rollups"])
    ).toBe(PAGE_RANK.docs)
  })
})

test.describe("categoryForSlug", () => {
  test("gives videos their own facet so transcripts can be filtered", () => {
    expect(categoryForSlug(["videos", "a-talk"])).toBe("videos")
  })

  test("marks the homepage so it can be withheld from results", () => {
    // It arrives as `[""]`, and is a landing page rather than a page about anything.
    expect(categoryForSlug([""])).toBe("home")
    expect(categoryForSlug([])).toBe("home")
    // Named listing pages are not the same case -- people search for them by name.
    expect(categoryForSlug(["stories"])).toBe("other")
    expect(categoryForSlug(["latest"])).toBe("other")
  })

  test("keeps the existing developer facets", () => {
    expect(categoryForSlug(["developers", "docs", "blocks"])).toBe("docs")
    expect(categoryForSlug(["developers", "tutorials", "x"])).toBe("tutorials")
    expect(categoryForSlug(["developers"])).toBe("devs")
    expect(categoryForSlug(["staking"])).toBe("other")
  })
})
