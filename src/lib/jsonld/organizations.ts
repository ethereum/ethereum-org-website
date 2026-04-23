import { REFERENCE } from "./constants"

/**
 * Known Organization profiles for JSON-LD attribution
 *
 * Each entry is a schema.org Organization with a stable @id. Use for
 * entities that are brands/channels/events rather than individuals
 * (e.g. podcasts, video channels, events).
 */
export const KNOWN_ORGANIZATIONS = {
  /**
   * Ethereum Foundation organization definition
   * Can be used as publisher, maintainer, author, etc.
   */
  "ethereum-foundation": {
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
  "ethereum-community": {
    "@type": "Organization" as const,
    name: "Ethereum Community",
    url: "https://github.com/ethereum/ethereum-org-website/graphs/contributors",
    description: "A global collective of open-source contributors.",
    ...REFERENCE.ETHEREUM_COMMUNITY,
  },

  /**
   * Other known organizations
   */
  bankless: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#bankless",
    name: "Bankless",
    url: "https://www.bankless.com/",
    sameAs: ["https://x.com/Bankless", "https://www.youtube.com/c/Bankless"],
  },

  finematics: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#finematics",
    name: "Finematics",
    url: "https://finematics.com/",
    sameAs: [
      "https://x.com/finematics",
      "https://www.youtube.com/c/Finematics",
    ],
  },

  ethboulder: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#ethboulder",
    name: "EthBoulder",
    url: "https://ethboulder.xyz/",
    sameAs: ["https://x.com/ethereumboulder"],
  },

  ethcc: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#ethcc",
    name: "EthCC",
    url: "https://ethcc.io/",
    sameAs: [
      "https://x.com/EthCC",
      "https://www.youtube.com/channel/UCf7zF8tFOb9T58nBo09BhAw",
    ],
  },

  ethdenver: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#ethdenver",
    name: "ETHDenver",
    url: "https://ethdenver.com/",
    sameAs: ["https://x.com/EthereumDenver"],
  },

  "web3privacy-now": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#web3privacy-now",
    name: "Web3Privacy Now",
    url: "https://web3privacy.info/",
    sameAs: ["https://x.com/web3privacy"],
  },
} as const
