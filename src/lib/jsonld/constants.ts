/**
 * Shared JSON-LD structured data definitions
 * These can be imported and reused across page-jsonld.tsx files
 */

export const REFERENCE = {
  /**
   * Reference to Ethereum Foundation organization (for use when the full object is already defined elsewhere)
   */
  ETHEREUM_FOUNDATION: { "@id": "https://ethereum.foundation/#organization" },
  /**
   * Reference to Ethereum Community organization (for use when the full object is already defined elsewhere)
   */
  ETHEREUM_COMMUNITY: { "@id": "https://ethereum.org/#community-organization" },
  /**
   * Reference to the ethereum.org WebSite entity (for use when the full object is already defined elsewhere in the graph)
   */
  ETHEREUM_ORG_WEBSITE: { "@id": "https://ethereum.org/#website" },
} as const

export const ORGANIZATION = {
  /**
   * Ethereum Foundation organization definition
   * Can be used as publisher, maintainer, author, etc.
   */
  ETHEREUM_FOUNDATION: {
    "@type": "Organization" as const,
    name: "Ethereum Foundation",
    url: "https://ethereum.foundation",
    ownershipFundingInfo: "https://ethereum.foundation/ef",
    logo: "https://ethereum.org/images/ef-logo.png",
    sameAs: [
      "https://www.wikidata.org/wiki/Q114736857",
      "https://www.crunchbase.com/organization/ethereum",
      "https://x.com/ethereumfndn",
      "https://www.linkedin.com/company/ethereum-foundation",
    ],
    ...REFERENCE.ETHEREUM_FOUNDATION,
  },
  /**
   * Ethereum Community contributor organization
   */
  ETHEREUM_COMMUNITY: {
    "@type": "Organization" as const,
    name: "Ethereum Community",
    url: "https://github.com/ethereum/ethereum-org-website/graphs/contributors",
    description: "A global collective of open-source contributors.",
    ...REFERENCE.ETHEREUM_COMMUNITY,
  },
}

/**
 * ethereum.org WebSite entity
 * Anchors the site in the knowledge graph. Every page's JSON-LD graph
 * should include this as a top-level node and reference it via @id from
 * the page's `isPartOf`.
 */
export const ETHEREUM_ORG_WEBSITE = {
  "@type": "WebSite" as const,
  name: "ethereum.org",
  url: "https://ethereum.org",
  ...REFERENCE.ETHEREUM_ORG_WEBSITE,
}

/**
 * Core entities present in every page's JSON-LD @graph.
 * Spread at the top of each page's `@graph` array so that `@id`
 * references (e.g. `ethereumFoundationReference`) resolve within the
 * same graph.
 */
export const BASE_GRAPH_NODES = [
  ORGANIZATION.ETHEREUM_FOUNDATION,
  ORGANIZATION.ETHEREUM_COMMUNITY,
  ETHEREUM_ORG_WEBSITE,
]
