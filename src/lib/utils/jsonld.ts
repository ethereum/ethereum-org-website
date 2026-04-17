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
 * Known author profiles for JSON-LD attribution
 *
 * Each entry is a schema.org Person with verifiable credentials.
 * Use the full object on the "defining" page (e.g., whitepaper for Vitalik),
 * and the reference ({ "@id": ... }) on other pages where the author is relevant.
 *
 * Keys should be stable identifiers (kebab-case of the person's name).
 */
export const KNOWN_AUTHORS = {
  // --- Public figures (Wikipedia/Wikidata verified) ---

  "vitalik-buterin": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#vitalik-buterin",
    name: "Vitalik Buterin",
    jobTitle: "Co-founder, Ethereum",
    description:
      "Vitalik Buterin is a Russian-Canadian computer programmer and the primary co-founder of the Ethereum blockchain. A leading force in open-source software and decentralized technology, Buterin deployed Ethereum in 2015 alongside co-founders including Gavin Wood and Joseph Lubin. His ongoing research focuses on protocol verifiability, zero-knowledge proofs, privacy, and computing self-sovereignty.",
    knowsAbout: [
      "Ethereum Protocol Architecture",
      "Zero-Knowledge Proofs",
      "Open Source Software",
      "Privacy Protocols",
      "Decentralized Systems",
      "Computing Self-Sovereignty",
      "Local AI",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "Bitcoin Magazine",
        url: "https://bitcoinmagazine.com/",
      },
      {
        "@type": "Organization",
        name: "Thiel Fellowship",
        url: "https://thielfellowship.org/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Waterloo",
        url: "https://uwaterloo.ca/",
      },
    ],
    sameAs: [
      "https://www.wikidata.org/wiki/Q16197959",
      "https://en.wikipedia.org/wiki/Vitalik_Buterin",
      "https://vitalik.eth.limo",
      "https://x.com/VitalikButerin",
    ],
  },

  "andreas-antonopoulos": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#andreas-antonopoulos",
    name: "Andreas M. Antonopoulos",
    description:
      "Andreas M. Antonopoulos is an acclaimed author, speaker, and educator known for making complex blockchain and cryptocurrency topics accessible and easy to understand. He is the author of the widely-read essay collection 'The Internet of Money' and the standard-setting technical books 'Mastering Ethereum' and 'Mastering Bitcoin', and his work serves as a bridge between complex cryptographic concepts and mainstream understanding.",
    knowsAbout: [
      "Bitcoin Architecture",
      "Ethereum Architecture",
      "Cryptocurrency Education",
      "Decentralized Finance",
      "Information Security",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University College London",
        url: "https://www.ucl.ac.uk/",
      },
    ],
    sameAs: [
      "https://www.wikidata.org/wiki/Q18352176",
      "https://en.wikipedia.org/wiki/Andreas_Antonopoulos",
      "https://github.com/aantonop",
      "https://aantonop.com",
      "https://x.com/aantonop",
    ],
  },

  // --- Tutorial and dev-docs authors ---

  "patrick-collins": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#patrick-collins",
    name: "Patrick Collins",
    jobTitle: "Co-Founder",
    worksFor: {
      "@type": "Organization",
      name: "Cyfrin",
      url: "https://www.cyfrin.io/",
    },
    description:
      "Patrick Collins is the Co-Founder and CEO of Cyfrin, a leading smart contract security and auditing firm. He is a prolific educator, software engineer, and Web3 Developer Advocate, known for his comprehensive Web3 and Solidity tutorials that have onboarded thousands to the Ethereum ecosystem.",
    knowsAbout: [
      "Smart Contract Auditing",
      "Solidity Development",
      "Web3 Security",
      "Chainlink Oracles",
      "Financial Data APIs",
      "Python Blockchain Integration",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "Chainlink Labs",
        url: "https://chainlinklabs.com/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Massachusetts Amherst",
        url: "https://www.umass.edu/",
      },
    ],
    sameAs: [
      "https://github.com/PatrickAlphaC",
      "https://www.linkedin.com/in/patrickalphac",
      "https://www.youtube.com/c/patrickcollins",
      "https://x.com/PatrickAlphaC",
      "https://stackoverflow.com/users/11969592/patrick-collins",
    ],
  },

  "ori-pomerantz": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#ori-pomerantz",
    name: "Ori Pomerantz",
    description:
      "Ori Pomerantz is an experienced technical writer and blockchain documentation expert. He has created extensive developer guides and documentation for major Ethereum ecosystem projects, synthesizing complex topics such as Layer 2 scaling, account abstraction, and advanced cryptographic development environments.",
    knowsAbout: [
      "Ethereum Technical Documentation",
      "Layer 2 Scaling Solutions",
      "Account Abstraction (ERC-4337)",
      "Optimistic Rollups",
      "EVM Architecture",
      "Developer Education",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "OP Labs",
        url: "https://www.oplabs.co/",
      },
      {
        "@type": "Organization",
        name: "Lattice",
        url: "https://lattice.xyz/",
      },
      {
        "@type": "Organization",
        name: "IBM",
        url: "https://www.ibm.com/us-en",
      },
    ],
    sameAs: [
      "https://github.com/qbzzt",
      "https://cryptodocguy.pro",
      "https://www.linkedin.com/in/ori-pomerantz-34a915/",
    ],
  },

  // --- Content authors (authored specific pages) ---

  "fredrik-svantes": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#fredrik-svantes",
    name: "Fredrik Svantes",
    jobTitle: "Protocol Security Lead",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    description:
      "Fredrik Svantes is the Protocol Security Lead at the Ethereum Foundation, where he contributes to the Trillion Dollar Security Initiative and manages one of the blockchain industry's longest-running bug bounty programs. He leads the 'Harden the L1' priority track, coordinating multi-million dollar audit competitions to secure Ethereum's core infrastructure and enhance wallet security.",
    knowsAbout: [
      "Protocol Security Research",
      "Ethereum Consensus Layer",
      "Smart Contract Security",
      "Smart Contract Security Audits",
      "Bug Bounty Coordination",
      "Network Resilience",
      "Wallet Security",
    ],
    sameAs: [
      "https://github.com/fredriksvantes",
      "https://x.com/fredrik0x",
      "https://www.linkedin.com/in/fredrik7545/",
    ],
  },

  nixo: {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#nixo",
    name: "Nixo Rokish",
    description:
      "Nixo Rokish is a core contributor to Ethereum governance and protocol upgrade coordination. As former Executive Director of EthStaker, Nixo is deeply involved in community education, staking advocacy, and decentralization initiatives. Nixo is dedicated to advancing Ethereum's decentralization, privacy, and open-source infrastructure.",
    knowsAbout: [
      "Ethereum Governance",
      "Protocol Upgrade Coordination",
      "Ethereum Staking",
      "Open Source Technology",
      "Decentralized Infrastructure",
      "Solo Staking",
      "Community Education",
    ],
    alumniOf: [
      { "@id": "https://ethereum.foundation/#organization" },
      {
        "@type": "Organization",
        name: "EthStaker",
        url: "https://ethstaker.org/",
      },
    ],
    sameAs: [
      "https://github.com/nixorokish",
      "https://x.com/nixorokish",
      "https://farcaster.xyz/nixo",
    ],
  },

  "mario-havel": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#mario-havel",
    name: "Mario Havel",
    jobTitle: "Protocol Support",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    description:
      "Mario Havel operates within Protocol Support at the Ethereum Foundation, assisting researchers and developers in navigating and contributing to Ethereum's core infrastructure and upgrades, and co-leading the Ethereum Protocol Fellowship study group. Mario played a key role in calculating the Terminal Total Difficulty (TTD) for the Ethereum Merge, developing tooling to track network mining conditions and give the community insight into when the transition from proof-of-work would occur.",
    knowsAbout: [
      "Ethereum Core Infrastructure",
      "The Ethereum Merge (TTD)",
      "Web3 Privacy",
      "Ephemery Testnet Architect",
      "Protocol Support Engineering",
    ],
    sameAs: ["https://github.com/taxmeifyoucan", "https://x.com/tmiychao"],
  },

  "josh-stark": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#josh-stark",
    name: "Josh Stark",
    description:
      "Josh Stark is the author of influential essays including 'Atoms, Institutions, Blockchains' and the 'Making Sense of' series on Web 3, Layer 2 scaling, and cryptoeconomics. He co-authored 'The Year in Ethereum' annual reviews with Evan Van Ness, co-founded ETHGlobal and L4 Ventures, and co-led the Trillion Dollar Security Initiative.",
    knowsAbout: [
      "Ethereum Ecosystem Communications",
      "Layer 2 Scaling Solutions",
      "Cryptoeconomics",
      "Web3 Architecture",
      "Ethereum Security",
      "Blockchain Governance",
    ],
    alumniOf: [
      { "@id": "https://ethereum.foundation/#organization" },
      {
        "@type": "Organization",
        name: "ETHGlobal",
        url: "https://ethglobal.com/",
      },
    ],
    sameAs: [
      "https://github.com/jjmstark",
      "https://x.com/0xstark",
      "https://www.linkedin.com/in/jjmstark/",
      "https://paragraph.com/@josh-stark",
      "https://0xstark.com",
    ],
  },
} as const

/**
 * Helper to get an @id reference for a known author
 */
export const knownAuthorReference = (key: keyof typeof KNOWN_AUTHORS) => ({
  "@id": KNOWN_AUTHORS[key]["@id"],
})

/**
 * Alias map for author lookup by display name or GitHub handle.
 * Auto-generated from KNOWN_AUTHORS -- no manual maintenance needed.
 * Allows frontmatter to use full name, profile key, or GitHub handle
 */
const AUTHOR_ALIASES: Record<string, keyof typeof KNOWN_AUTHORS> =
  Object.fromEntries(
    Object.entries(KNOWN_AUTHORS).flatMap(([key, profile]) => {
      const aliases: [string, string][] = [[profile.name, key]]
      for (const url of profile.sameAs) {
        const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/?$/)
        if (match) aliases.push([match[1], key])
      }
      return aliases
    })
  ) as Record<string, keyof typeof KNOWN_AUTHORS>

/**
 * Resolve frontmatter author field(s) into JSON-LD @graph nodes and @id
 * references. Handles both the new `authors` array and legacy singular
 * `author` string via alias lookup (full name or GitHub handle).
 * Falls back to the community organization reference when nothing resolves.
 */
export function resolveAuthorsFromFrontmatter(authors?: string | string[]): {
  graphNodes: Array<(typeof KNOWN_AUTHORS)[keyof typeof KNOWN_AUTHORS]>
  references: Array<{ "@id": string }>
} {
  const values = !authors ? [] : Array.isArray(authors) ? authors : [authors]
  const keys = values
    .map((v) =>
      v in KNOWN_AUTHORS
        ? (v as keyof typeof KNOWN_AUTHORS)
        : (AUTHOR_ALIASES[v] ?? null)
    )
    .filter((k): k is keyof typeof KNOWN_AUTHORS => k !== null)

  return {
    graphNodes: keys.map((key) => KNOWN_AUTHORS[key]),
    references:
      keys.length > 0
        ? keys.map((key) => ({ "@id": KNOWN_AUTHORS[key]["@id"] }))
        : [ethereumCommunityReference],
  }
}
