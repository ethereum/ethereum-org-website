import { REFERENCE } from "./references"

/**
 * Parent organizations extracted to consts so sub-organization entries
 * (boards, subsidiaries) can embed them as full parentOrganization
 * nodes. Publisher nodes only enter the page @graph when a report
 * resolves to them, so a bare @id reference to the parent could dangle.
 */
const COINBASE = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.org/#coinbase",
  name: "Coinbase",
  url: "https://www.coinbase.com/",
  sameAs: ["https://en.wikipedia.org/wiki/Coinbase", "https://x.com/coinbase"],
} as const

const GALAXY_DIGITAL = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.org/#galaxy-digital",
  name: "Galaxy Digital",
  url: "https://www.galaxy.com/",
  sameAs: [
    "https://en.wikipedia.org/wiki/Galaxy_Digital_(company)",
    "https://www.crunchbase.com/organization/galaxy-digital-lp",
  ],
} as const

const ANDREESSEN_HOROWITZ = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.org/#andreessen-horowitz",
  name: "Andreessen Horowitz",
  url: "https://a16z.com/",
  sameAs: [
    "https://en.wikipedia.org/wiki/Andreessen_Horowitz",
    "https://x.com/a16z",
  ],
} as const

const FIDELITY_INVESTMENTS = {
  "@type": "Organization" as const,
  "@id": "https://ethereum.org/#fidelity-investments",
  name: "Fidelity Investments",
  url: "https://www.fidelity.com/",
  sameAs: [
    "https://en.wikipedia.org/wiki/Fidelity_Investments",
    "https://x.com/Fidelity",
  ],
} as const

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
  "galaxy-digital": GALAXY_DIGITAL,

  "galaxy-research": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#galaxy-research",
    name: "Galaxy Research",
    url: "https://www.galaxy.com/insights/research",
    parentOrganization: GALAXY_DIGITAL,
    sameAs: ["https://x.com/glxyresearch"],
  },

  openzeppelin: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#openzeppelin",
    name: "OpenZeppelin",
    url: "https://www.openzeppelin.com/",
    sameAs: [
      "https://github.com/OpenZeppelin",
      "https://x.com/OpenZeppelin",
      "https://www.linkedin.com/company/openzeppelin",
    ],
  },

  "coinbase-independent-advisory-board": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#coinbase-independent-advisory-board",
    name: "Coinbase Independent Advisory Board on Quantum Computing and Blockchain",
    url: "https://www.coinbase.com/blog/coinbase-establishes-independent-advisory-board-on-quantum-computing-and-blockchain",
    parentOrganization: COINBASE,
  },

  etherealize: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#etherealize",
    name: "Etherealize",
    url: "https://www.etherealize.com/",
    sameAs: [
      "https://x.com/Etherealize_io",
      "https://www.linkedin.com/company/etherealize",
      "https://www.bloomberg.com/profile/company/2592590D:US",
    ],
  },

  "enterprise-ethereum-alliance": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#enterprise-ethereum-alliance",
    name: "Enterprise Ethereum Alliance",
    url: "https://entethalliance.org/",
    sameAs: [
      "https://www.investopedia.com/terms/e/ethereum-enterprise-alliance-eea.asp",
      "https://x.com/EntEthAlliance",
      "https://www.linkedin.com/company/enterpriseethereumalliance",
      "https://github.com/EntEthAlliance",
    ],
  },

  "andreessen-horowitz": ANDREESSEN_HOROWITZ,

  "a16z-crypto": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#a16z-crypto",
    name: "a16z crypto",
    url: "https://a16zcrypto.com/",
    parentOrganization: ANDREESSEN_HOROWITZ,
    sameAs: [
      "https://x.com/a16zcrypto",
      "https://www.linkedin.com/showcase/a16zcrypto/",
    ],
  },

  nethermind: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#nethermind",
    name: "Nethermind",
    url: "https://www.nethermind.io/",
    sameAs: [
      "https://github.com/NethermindEth",
      "https://x.com/Nethermind",
      "https://linkedin.com/company/nethermind",
    ],
  },

  l2beat: {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#l2beat",
    name: "L2BEAT",
    url: "https://l2beat.com/",
    sameAs: [
      "https://github.com/l2beat",
      "https://x.com/l2beat",
      "https://linkedin.com/company/l2beat",
    ],
  },

  "privacy-stewards-of-ethereum": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#privacy-stewards-of-ethereum",
    name: "Privacy Stewards of Ethereum",
    url: "https://pse.dev/",
    sameAs: [
      "https://github.com/privacy-scaling-explorations",
      "https://x.com/PrivacyEthereum",
      "https://github.com/privacy-ethereum",
    ],
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

  "fidelity-investments": FIDELITY_INVESTMENTS,

  "fidelity-digital-assets": {
    "@type": "Organization" as const,
    "@id": "https://ethereum.org/#fidelity-digital-assets",
    name: "Fidelity Digital Assets",
    url: "https://www.fidelitydigitalassets.com/",
    parentOrganization: FIDELITY_INVESTMENTS,
    sameAs: [
      "https://www.linkedin.com/showcase/fidelity-digital-assets/",
      "https://x.com/DigitalAssets",
    ],
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
    url: "https://www.twinstake.com/",
    sameAs: [
      "https://x.com/twinstake_io",
      "https://www.linkedin.com/company/twinstake/",
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
