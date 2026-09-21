import { expect, test } from "@playwright/test"

import {
  Citations,
  citedSources,
  collapseRepeatedCitations,
  groupExcerpts,
  matchReferral,
  scrubQuery,
  withCitationLinks,
} from "@/lib/utils/ask"

const record = (url: string, content: string) => ({
  url,
  content,
  headings: ["Staking", "Solo staking"],
})

test.describe("groupExcerpts", () => {
  test("collapses a page's sections into one numbered excerpt", () => {
    // Numbering sections separately invites [2][3][5] citations that are all one link.
    const excerpts = groupExcerpts([
      record("/staking/", "first"),
      record("/staking/", "second"),
      record("/gas/", "third"),
    ])
    expect(excerpts).toHaveLength(2)
    expect(excerpts[0].text).toBe("first\n\nsecond")
    expect(excerpts[1].url).toBe("/gas/")
  })

  test("caps pages, so one page cannot spend the whole budget", () => {
    const many = ["/a/", "/b/", "/c/", "/d/"].map((url) => record(url, "x"))
    expect(groupExcerpts(many, { maxPages: 2 })).toHaveLength(2)
  })

  test("caps how much of one page is handed over", () => {
    const sections = ["a", "b", "c", "d"].map((text) => record("/a/", text))
    expect(groupExcerpts(sections, { sectionsPerPage: 2 })[0].text).toBe(
      "a\n\nb"
    )
  })

  test("orders documentation ahead of video transcripts", () => {
    // Left in rank order a governance talk led a question about gas fees.
    const excerpts = groupExcerpts([
      record("https://ethereum.org/videos/talk/#x", "talk"),
      record("https://ethereum.org/gas/#y", "docs"),
    ])
    expect(excerpts.map((e) => e.text)).toEqual(["docs", "talk"])
  })

  test("keeps a couple of videos rather than dropping them", () => {
    // Excluding them took "what happens if I lose my seed phrase" from nine pages to one.
    const videos = ["a", "b", "c"].map((slug) =>
      record(`https://ethereum.org/videos/${slug}/#x`, slug)
    )
    expect(groupExcerpts(videos, { maxVideoPages: 2 })).toHaveLength(2)
  })
})

test.describe("matchReferral", () => {
  test("routes a question the site does not own", () => {
    // The failure this exists for: answered from the contributor-rewards page, with
    // real citations and a wrong answer.
    expect(matchReferral("how do I get devcon tickets")?.name).toBe("Devcon")
  })

  test("matches whole words only", () => {
    expect(
      matchReferral("who is the recipient of a transaction")
    ).toBeUndefined()
    expect(matchReferral("what is eip 1559")?.name).toBe(
      "Ethereum Improvement Proposals"
    )
  })

  test("prefers the longest trigger, so the specific site wins", () => {
    // "validator keys" is the Launchpad's; a bare staking question is not.
    expect(matchReferral("how do I generate validator keys")?.name).toBe(
      "Staking Launchpad"
    )
    expect(matchReferral("how do I stake my eth")).toBeUndefined()
  })

  test("is case and punctuation insensitive", () => {
    expect(matchReferral("Apply for a GRANT?")?.name).toBe(
      "Ecosystem Support Program"
    )
  })
})

test.describe("Citations", () => {
  test("renumbers to first-appearance order as tokens stream", () => {
    // The model cites a subset, so raw numbering arrives gappy and out of order.
    const cites = new Citations(8)
    const out = ["Rollups ", "batch [5]", " and settle [2]."]
      .map((chunk) => cites.feed(chunk))
      .join("")
    expect(out).toBe("Rollups batch [1] and settle [2].")
    expect(cites.used).toEqual([5, 2])
  })

  test("reuses a number the answer cites twice", () => {
    const cites = new Citations(4)
    expect(cites.feed("a [3] b [1] c [3]")).toBe("a [1] b [2] c [1]")
  })

  test("splits a comma list into one bracket each", () => {
    const cites = new Citations(6)
    expect(cites.feed("both [2, 4] apply")).toBe("both [1][2] apply")
  })

  test("survives a citation split across chunks", () => {
    const cites = new Citations(3)
    expect(cites.feed("see [") + cites.feed("2] there")).toBe("see [1] there")
  })

  test("leaves anything that is not a citation alone", () => {
    // An out-of-range number would otherwise invent a source, and array syntax in a
    // code answer is not a citation at all.
    const cites = new Citations(2)
    expect(cites.feed("use array[0] and [9]")).toBe("use array[0] and [9]")
    expect(cites.used).toEqual([])
  })

  test("flushes an unterminated bracket rather than swallowing it", () => {
    const cites = new Citations(2)
    expect(cites.feed("trailing [1")).toBe("trailing ")
    expect(cites.flush()).toBe("[1")
  })
})

test.describe("citedSources", () => {
  const excerpts = [
    { url: "/a/#one", headings: ["A page | ethereum.org", "A page"], text: "" },
    { url: "/b/#two", headings: ["B page | ethereum.org", "B page"], text: "" },
    {
      url: "/c/#three",
      headings: ["C page | ethereum.org", "C page"],
      text: "",
    },
  ]

  test("lists only what was cited, numbered to match the prose", () => {
    // Listing the whole retrieval trace invites the reader to discount the citations
    // that matter.
    expect(citedSources(excerpts, [3, 1])).toEqual([
      { n: 1, url: "/c/#three", title: "C page" },
      { n: 2, url: "/a/#one", title: "A page" },
    ])
  })

  test("titles a source by its page, not by the section retrieved first", () => {
    // An excerpt spans several sections, so the deepest heading labelled the FAQ page
    // "How do I mine Ethereum?" under an answer about staking.
    const faq = {
      url: "/faq/#mining",
      headings: ["FAQ | ethereum.org", "FAQ", "How do I mine Ethereum?"],
      text: "",
    }
    expect(citedSources([faq], [1])[0].title).toBe("FAQ")
  })

  test("lists nothing when the answer cited nothing", () => {
    // A refusal reached for no excerpt; offering one attributes an answer never given.
    expect(citedSources(excerpts, [])).toEqual([])
  })
})

test.describe("collapseRepeatedCitations", () => {
  test("keeps the last of a run of the same citation", () => {
    // The model cites every claim, and consecutive sentences usually rest on one page.
    expect(
      collapseRepeatedCitations("Rollups batch [1]. They settle on L1 [1].")
    ).toBe("Rollups batch. They settle on L1 [1].")
  })

  test("collapses a chain longer than two", () => {
    expect(collapseRepeatedCitations("A [2]. B [2]. C [2].")).toBe(
      "A. B. C [2]."
    )
  })

  test("a different citation in between breaks the run", () => {
    // Two claims from different places, so both keep their marker.
    expect(collapseRepeatedCitations("A [1]. B [2]. C [1].")).toBe(
      "A [1]. B [2]. C [1]."
    )
  })

  test("matches on the set, so order within a run does not matter", () => {
    expect(collapseRepeatedCitations("A [1][2]. B [2][1].")).toBe(
      "A. B [2][1]."
    )
  })

  test("leaves a multi-number run alone next to one of its numbers", () => {
    expect(collapseRepeatedCitations("A [1][2]. B [1].")).toBe(
      "A [1][2]. B [1]."
    )
  })

  test("does not carry a marker across a paragraph or list item", () => {
    // Far enough that the citation would no longer sit with the claim it marks.
    expect(collapseRepeatedCitations("- A [1]\n- B [1]")).toBe(
      "- A [1]\n- B [1]"
    )
  })

  test("leaves prose with no citations untouched", () => {
    expect(collapseRepeatedCitations("nothing to do here")).toBe(
      "nothing to do here"
    )
  })
})

test.describe("withCitationLinks", () => {
  const sources = [
    { n: 1, url: "/a/", title: "A" },
    { n: 2, url: "/b/", title: "B" },
  ]

  test("glues a citation to the word it marks", () => {
    // With the model's own space it wrapped onto a line of its own, away from the
    // sentence it belongs to.
    expect(withCitationLinks("wallets differ [1].", sources)).toBe(
      "wallets differ[[1]](/a/)."
    )
  })

  test("keeps the brackets, which are the site's citation form and separate a run", () => {
    expect(withCitationLinks("compare options [2][1]", sources)).toBe(
      "compare options[[2]](/b/)[[1]](/a/)"
    )
  })

  test("leaves the prose alone until the sources arrive", () => {
    expect(withCitationLinks("streaming [1] still", [])).toBe(
      "streaming [1] still"
    )
  })

  test("collapses a repeated citation before linking what is left", () => {
    expect(
      withCitationLinks("wallets differ [1]. so do keys [1].", sources)
    ).toBe("wallets differ. so do keys[[1]](/a/).")
  })

  test("leaves a number that is not a source alone", () => {
    // An uncited excerpt number would otherwise render as a link to nothing.
    expect(withCitationLinks("see [9]", sources)).toBe("see [9]")
  })
})

test.describe("scrubQuery", () => {
  test("keeps an ordinary question", () => {
    expect(scrubQuery("  how do rollups work  ")).toBe("how do rollups work")
  })

  test("drops a question carrying an address or a hash", () => {
    // The explorer results exist because people paste these, so they reach this box.
    expect(
      scrubQuery("what is 0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
    ).toBeNull()
    expect(
      scrubQuery("why did a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0 fail")
    ).toBeNull()
  })

  test("drops a recovery phrase rather than redacting around it", () => {
    // What someone panicking is most likely to type. Redacting in place would still
    // leave the surrounding words, so the whole question goes.
    const mnemonic =
      "legal winner thank year wave sausage worth useful legal winner thank yellow"
    expect(scrubQuery(mnemonic)).toBeNull()
    // Twelve ordinary words are not a mnemonic: real ones are short and unpunctuated.
    expect(
      scrubQuery(
        "what happens to my staked eth if the validator I chose goes offline"
      )
    ).not.toBeNull()
  })

  test("drops an email, and anything empty", () => {
    expect(scrubQuery("contact me at someone@example.com")).toBeNull()
    expect(scrubQuery("   ")).toBeNull()
  })

  test("caps the length", () => {
    expect(scrubQuery("gas ".repeat(60))!.length).toBe(120)
  })
})
