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
    // It arrives as `[""]` rather than an empty array, which used to make its rank an
    // accident of `slug.length === 1` rather than a decision.
    expect(pageRankForSlug([""])).toBe(PAGE_RANK.beginner)
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

  test("leaves nested pages at the default", () => {
    expect(pageRankForSlug(["roadmap", "merge"])).toBe(PAGE_RANK.default)
    expect(pageRankForSlug(["developers", "docs", "blocks"])).toBe(
      PAGE_RANK.default
    )
  })
})

test.describe("categoryForSlug", () => {
  test("gives videos their own facet so transcripts can be filtered", () => {
    expect(categoryForSlug(["videos", "a-talk"])).toBe("videos")
  })

  test("keeps the existing developer facets", () => {
    expect(categoryForSlug(["developers", "docs", "blocks"])).toBe("docs")
    expect(categoryForSlug(["developers", "tutorials", "x"])).toBe("tutorials")
    expect(categoryForSlug(["developers"])).toBe("devs")
    expect(categoryForSlug(["staking"])).toBe("other")
  })
})
