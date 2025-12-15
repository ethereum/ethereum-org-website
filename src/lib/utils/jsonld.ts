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
  ownershipFundingInfo: "https://ethereum.org/images/ef-logo.png",
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
  name: "Ethereum Community",
  url: "https://github.com/ethereum/ethereum-org-website/graphs/contributors",
  description: "A global collective of open-source contributors.",
}

/**
 * Ethereum.org website organization (simpler version used in some pages)
 */
export const ethereumOrgOrganization = {
  "@type": "Organization" as const,
  name: "ethereum.org",
  url: "https://ethereum.org",
}
