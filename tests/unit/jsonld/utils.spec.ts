import { expect, test } from "@playwright/test"

import { KNOWN_PERSONS } from "@/lib/jsonld/persons"
import { REFERENCE } from "@/lib/jsonld/references"
import { resolveAuthorsFromFrontmatter } from "@/lib/jsonld/utils"

test.describe("resolveAuthorsFromFrontmatter", () => {
  test("uses the community reference when no author is supplied", () => {
    expect(resolveAuthorsFromFrontmatter()).toEqual({
      authorGraphNodes: [],
      authorReferences: [REFERENCE.ETHEREUM_COMMUNITY],
    })
  })

  test("preserves an unresolved author as an inline Person", () => {
    expect(resolveAuthorsFromFrontmatter("jdourlens")).toEqual({
      authorGraphNodes: [],
      authorReferences: [{ "@type": "Person", name: "jdourlens" }],
    })
  })

  test("preserves mixed known and unresolved authors in input order", () => {
    const knownPerson = KNOWN_PERSONS["patrick-collins"]

    expect(
      resolveAuthorsFromFrontmatter(["PatrickAlphaC", "jdourlens"])
    ).toEqual({
      authorGraphNodes: [knownPerson],
      authorReferences: [
        { "@id": knownPerson["@id"] },
        { "@type": "Person", name: "jdourlens" },
      ],
    })
  })

  test("resolves a known alias to its stable entity reference", () => {
    const knownPerson = KNOWN_PERSONS["patrick-collins"]

    expect(resolveAuthorsFromFrontmatter("PatrickAlphaC")).toEqual({
      authorGraphNodes: [knownPerson],
      authorReferences: [{ "@id": knownPerson["@id"] }],
    })
  })
})
