/**
 * Shared JSON-LD structured data definitions
 * These can be imported and reused across page-jsonld.tsx files
 */

/**
 * Ethereum Foundation organization definition
 * Can be used as publisher, maintainer, author, etc.
 */
export const ethereumFoundationOrganization = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.foundation/#organization",
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
}

/**
 * Reference to Ethereum Foundation organization (for use when the full object is already defined elsewhere)
 */
export const ethereumFoundationReference = {
  "@id": "https://ethereum.foundation/#organization",
}

/**
 * Ethereum Community contributor organization
 */
export const ethereumCommunityOrganization = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.org/#community-organization",
  name: "Ethereum Community",
  url: "https://github.com/ethereum/ethereum-org-website/graphs/contributors",
  description: "A global collective of open-source contributors.",
}

/**
 * Reference to Ethereum Community organization (for use when the full object is already defined elsewhere)
 */
export const ethereumCommunityReference = {
  "@id": "https://ethereum.org/#community-organization",
}

/**
 * Reference to the ethereum.org WebSite entity (for use when the full
 * object is already defined elsewhere in the graph)
 */
export const ethereumOrgWebSiteReference = {
  "@id": "https://ethereum.org/#website",
}

/**
 * ethereum.org WebSite entity
 * Anchors the site in the knowledge graph. Every page's JSON-LD graph
 * should include this as a top-level node and reference it via @id from
 * the page's `isPartOf`.
 */
export const ethereumOrgWebSite = {
  "@type": "WebSite" as const,
  name: "ethereum.org",
  url: "https://ethereum.org",
  ...ethereumOrgWebSiteReference,
}

/**
 * Core entities present in every page's JSON-LD @graph.
 * Spread at the top of each page's `@graph` array so that `@id`
 * references (e.g. `ethereumFoundationReference`) resolve within the
 * same graph.
 */
export const baseGraphNodes = [
  ethereumFoundationOrganization,
  ethereumCommunityOrganization,
  ethereumOrgWebSite,
]
