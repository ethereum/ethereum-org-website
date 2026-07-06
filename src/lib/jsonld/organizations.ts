import { REFERENCE } from "./references"

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

  optimist: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#optimist",
    name: "Optimist",
    url: "https://optimist.co/",
    description:
      "Optimist is an Emmy-winning non-profit production studio based in Los Angeles, known for independent feature documentaries including Vitalik: An Ethereum Story, Living On One Dollar, Salam Neighbor, Five Years North, and State of Firsts. Their Community.eth series explores the people and culture behind the Ethereum community.",
    sameAs: [
      "https://x.com/optimistfilms",
      "https://www.youtube.com/@Optimist",
      "https://www.instagram.com/optimist",
      "https://www.facebook.com/Optimistfilms/",
    ],
  },

  /**
   * Publishers of externally-hosted reports surfaced on /reports
   */
  "galaxy-research": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#galaxy-research",
    name: "Galaxy Research",
    url: "https://www.galaxy.com/research",
    sameAs: [
      "https://en.wikipedia.org/wiki/Galaxy_Digital",
      "https://x.com/glxyresearch",
    ],
  },

  openzeppelin: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#openzeppelin",
    name: "OpenZeppelin",
    url: "https://www.openzeppelin.com/",
    sameAs: ["https://github.com/OpenZeppelin", "https://x.com/OpenZeppelin"],
  },

  coinbase: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#coinbase",
    name: "Coinbase",
    url: "https://www.coinbase.com/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Coinbase",
      "https://x.com/coinbase",
    ],
  },

  etherealize: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#etherealize",
    name: "Etherealize",
    url: "https://www.etherealize.com/",
  },

  "enterprise-ethereum-alliance": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#enterprise-ethereum-alliance",
    name: "Enterprise Ethereum Alliance",
    url: "https://entethalliance.org/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Enterprise_Ethereum_Alliance",
      "https://x.com/EntEthAlliance",
    ],
  },

  "a16z-crypto": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#a16z-crypto",
    name: "a16z crypto",
    url: "https://a16zcrypto.com/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Andreessen_Horowitz",
      "https://x.com/a16zcrypto",
    ],
  },

  nethermind: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#nethermind",
    name: "Nethermind",
    url: "https://www.nethermind.io/",
    sameAs: ["https://github.com/NethermindEth", "https://x.com/NethermindEth"],
  },

  l2beat: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#l2beat",
    name: "L2BEAT",
    url: "https://l2beat.com/",
    sameAs: ["https://github.com/l2beat", "https://x.com/l2beat"],
  },

  "privacy-stewards-of-ethereum": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#privacy-stewards-of-ethereum",
    name: "Privacy Stewards of Ethereum",
    url: "https://pse.dev/",
    sameAs: ["https://github.com/privacy-scaling-explorations"],
  },

  shutter: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#shutter",
    name: "Shutter",
    url: "https://www.shutter.network/",
    sameAs: [
      "https://github.com/shutter-network",
      "https://x.com/ShutterNetwork",
    ],
  },

  "fidelity-digital-assets": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#fidelity-digital-assets",
    name: "Fidelity Digital Assets",
    url: "https://www.fidelitydigitalassets.com/",
    sameAs: ["https://en.wikipedia.org/wiki/Fidelity_Investments"],
  },

  consensys: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#consensys",
    name: "Consensys",
    url: "https://consensys.io/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Consensys",
      "https://github.com/Consensys",
      "https://x.com/Consensys",
    ],
  },

  twinstake: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#twinstake",
    name: "Twinstake",
    url: "https://www.twinstake.io/",
  },

  "white-house": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#white-house",
    name: "The White House",
    url: "https://www.whitehouse.gov/",
    sameAs: [
      "https://en.wikipedia.org/wiki/White_House",
      "https://x.com/WhiteHouse",
    ],
  },

  "bank-for-international-settlements": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#bank-for-international-settlements",
    name: "Bank for International Settlements",
    url: "https://www.bis.org/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Bank_for_International_Settlements",
      "https://x.com/BIS_org",
    ],
  },

  mckinsey: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#mckinsey",
    name: "McKinsey & Company",
    url: "https://www.mckinsey.com/",
    sameAs: [
      "https://en.wikipedia.org/wiki/McKinsey_%26_Company",
      "https://x.com/McKinsey",
    ],
  },
} as const
