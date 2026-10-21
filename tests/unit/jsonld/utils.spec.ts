import { expect, test } from "@playwright/test"

import { KNOWN_PERSONS } from "@/lib/jsonld/persons"
import { REFERENCE } from "@/lib/jsonld/references"
import { resolveAuthorsFromFrontmatter } from "@/lib/jsonld/utils"

test.describe("resolveAuthorsFromFrontmatter", () => {
  const organizationAliases = [
    ["Trailofbits", "trail-of-bits", "Trail of Bits"],
    ["Tellor", "tellor", "Tellor"],
    ["EthereumOnArm", "ethereum-on-arm", "Ethereum on ARM"],
  ] as const

  for (const [alias, id, name] of organizationAliases) {
    test(`resolves ${alias} as an Organization`, () => {
      const organizationId = `https://ethereum.org/#${id}`

      const result = resolveAuthorsFromFrontmatter(alias)

      expect(result.authorGraphNodes).toEqual([
        expect.objectContaining({
          "@type": "Organization",
          "@id": organizationId,
          name,
        }),
      ])
      expect(result.authorReferences).toEqual([
        { "@id": organizationId },
        REFERENCE.ETHEREUM_COMMUNITY,
      ])
    })
  }

  test("uses the community reference when no author is supplied", () => {
    expect(resolveAuthorsFromFrontmatter()).toEqual({
      authorGraphNodes: [],
      authorReferences: [REFERENCE.ETHEREUM_COMMUNITY],
    })
  })

  test("trims author names before resolution and output", () => {
    const knownPerson = KNOWN_PERSONS["patrick-collins"]

    expect(
      resolveAuthorsFromFrontmatter([" PatrickAlphaC ", " jdourlens "])
    ).toEqual({
      authorGraphNodes: [knownPerson],
      authorReferences: [
        { "@id": knownPerson["@id"] },
        { "@type": "Person", name: "jdourlens" },
        REFERENCE.ETHEREUM_COMMUNITY,
      ],
    })
  })

  test("uses the community reference when all authors are empty", () => {
    expect(resolveAuthorsFromFrontmatter(["", "   "])).toEqual({
      authorGraphNodes: [],
      authorReferences: [REFERENCE.ETHEREUM_COMMUNITY],
    })
  })

  test("removes duplicate authors case-insensitively", () => {
    expect(
      resolveAuthorsFromFrontmatter([
        " jdourlens ",
        "JDourlens",
        "another",
        " another ",
      ])
    ).toEqual({
      authorGraphNodes: [],
      authorReferences: [
        { "@type": "Person", name: "jdourlens" },
        { "@type": "Person", name: "another" },
        REFERENCE.ETHEREUM_COMMUNITY,
      ],
    })
  })

  test("preserves an unresolved author as an inline Person", () => {
    expect(resolveAuthorsFromFrontmatter("jdourlens")).toEqual({
      authorGraphNodes: [],
      authorReferences: [
        { "@type": "Person", name: "jdourlens" },
        REFERENCE.ETHEREUM_COMMUNITY,
      ],
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
        REFERENCE.ETHEREUM_COMMUNITY,
      ],
    })
  })

  test("resolves a known alias to its stable entity reference", () => {
    const knownPerson = KNOWN_PERSONS["patrick-collins"]

    expect(resolveAuthorsFromFrontmatter("PatrickAlphaC")).toEqual({
      authorGraphNodes: [knownPerson],
      authorReferences: [
        { "@id": knownPerson["@id"] },
        REFERENCE.ETHEREUM_COMMUNITY,
      ],
    })
  })
})
