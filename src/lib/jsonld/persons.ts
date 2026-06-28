/**
 * Known Person profiles for JSON-LD attribution
 *
 * Each entry is a schema.org Person with verifiable credentials.
 * Use the full object on the "defining" page (e.g., whitepaper for Vitalik),
 * and the reference ({ "@id": ... }) on other pages where the Person is relevant.
 *
 * Keys should be stable identifiers (kebab-case of the person's name).
 */
export const KNOWN_PERSONS = {
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
    name: "Andreas Antonopoulos",
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

  "austin-griffith": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#austin-griffith",
    name: "Austin Griffith",
    jobTitle: "Head of Builder Growth",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    description:
      "Austin Griffith leads the Ethereum Foundation's Builder Growth team and is the creator of Scaffold-ETH, BuidlGuidl, and SpeedRunEthereum. He is dedicated to educating builders and simplifying the onboarding process for Web3 developers.",
    knowsAbout: [
      "Ethereum Development",
      "Smart Contract Engineering",
      "Scaffold-ETH",
      "Developer Onboarding",
      "BuidlGuidl",
      "Solidity",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "BuidlGuidl",
        url: "https://buidlguidl.com/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Wyoming",
        url: "https://www.uwyo.edu/index.html",
      },
    ],
    sameAs: [
      "https://www.wikidata.org/wiki/Q112965396",
      "https://github.com/austintgriffith",
      "https://austingriffith.com",
      "https://x.com/austingriffith",
      "https://www.linkedin.com/in/austin-griffith-65ba2a2/",
      "https://www.youtube.com/@austingriffith3550",
    ],
  },

  "philip-krause": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#philip-krause",
    name: "Philip Krause",
    jobTitle: "Builder Growth",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    description:
      "Philip Krause is a member of the Ethereum Foundation's Builder Growth team, where he focuses on developer onboarding, ecosystem communications, reducing barriers for builders shipping on Ethereum, and develops educational resources and tooling. Before joining the Ethereum Foundation, he advised on DeFi product strategy at fija Finance and held consulting and investment roles in traditional finance. His current work spans AI agents on Ethereum, Solidity security and auditing, zero-knowledge applications with Noir, and translating protocol upgrades into practical guidance for application developers.",
    knowsAbout: [
      "AI Agents on Ethereum",
      "Solidity Security and Auditing",
      "Ethereum Protocol and Roadmap",
      "Foundry",
      "Scaffold-ETH",
      "Zero-Knowledge Applications (Noir)",
      "Layer 2 Scaling and Bridging",
      "Account Abstraction",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "BuidlGuidl",
        url: "https://buidlguidl.com/",
      },
      {
        "@type": "Organization",
        name: "fija Finance GmbH",
        url: "https://fija.finance/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
        url: "https://www.fau.eu/",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/philip-krause-7b597711a/",
      "https://x.com/phipsae",
      "https://github.com/phipsae",
    ],
  },

  "sophia-dew": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#sophia-dew",
    name: "Sophia Dew",
    jobTitle: "Builder Growth",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    description:
      "Sophia Dew is a member of the Ethereum Foundation's Builder Growth team, where she focuses on AI agent infrastructure, developer education, and onchain agent standards. She previously served as a Developer Relations Engineering Lead at the Celo Foundation and worked on public goods infrastructure at Gitcoin. She holds a BS in Computer Science and Product Design from Stanford University.",
    knowsAbout: [
      "AI Agents on Ethereum",
      "Onchain Agent Standards",
      "Agent Frameworks and MCP Tooling",
      "Ethereum L1 Scaling",
      "Ethereum Protocol Architecture",
      "Agent Security and Guardrails",
      "Developer Relations",
      "Public Goods Infrastructure",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Stanford University",
        url: "https://www.stanford.edu/",
      },
      {
        "@type": "Organization",
        name: "Stanford Blockchain Club",
        url: "https://stanfordblockchain.org/",
      },
      {
        "@type": "Organization",
        name: "Gitcoin",
        url: "https://www.gitcoin.co/",
      },
      {
        "@type": "Organization",
        name: "Celo Foundation",
        url: "https://celo.org/",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/sophiadew/",
      "https://x.com/sodofi_",
      "https://github.com/sodofi",
    ],
  },

  rick: {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#rick",
    name: "Rick",
    jobTitle: "Builder Growth",
    worksFor: { "@id": "https://ethereum.foundation/#organization" },
    url: "https://www.rick.build/",
    description:
      "Rick is a member of the Ethereum Foundation's Builder Growth team, where he focuses on agentic commerce infrastructure, sovereign AI agents, and developer education. He writes about the Ethereum standards stack for autonomous agent economies, including ERC-8004, ERC-8183, x402, and onchain agent primitives.",
    knowsAbout: [
      "Agentic Commerce Infrastructure",
      "AI Agents on Ethereum",
      "Onchain Agent Standards",
      "Sovereign AI and Local Inference",
      "Ethereum Developer Education",
      "Agent Key Management and Wallets",
      "Layer 2 Ecosystem and Adoption",
      "SpeedRunEthereum",
    ],
    sameAs: [
      "https://www.rick.build/",
      "https://x.com/rickdotbuild",
      "https://github.com/rickkdev",
    ],
  },

  "anders-brownworth": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#anders-brownworth",
    name: "Anders Brownworth",
    jobTitle: "Head of Research & Development",
    worksFor: {
      "@type": "Organization",
      name: "Radius",
      url: "https://radiustech.xyz",
    },
    description:
      "Anders Brownworth is a blockchain educator, engineer, and Senior Research Advisor at MIT's Digital Currency Initiative, best known for creating a widely-used interactive blockchain demonstration that visually explains hashing, blocks, and distributed consensus. He co-taught MIT's first blockchain course and previously helped launch USDC at Circle, and contributed to Project Hamilton at the Federal Reserve Bank of Boston. His open-source educational tools and talks have introduced hundreds of thousands of learners to the mechanics underpinning Ethereum and other blockchains.",
    knowsAbout: [
      "Blockchain Education",
      "Cryptographic Hashing",
      "Distributed Consensus",
      "Ethereum Virtual Machine",
      "Stablecoins",
      "Central Bank Digital Currencies",
      "Payment Systems",
    ],
    sameAs: [
      "https://andersbrownworth.com",
      "https://github.com/anders94",
      "https://x.com/anders94",
      "https://anders94.medium.com",
      "https://www.youtube.com/anders94",
      "https://www.linkedin.com/in/andersbrownworth",
    ],
  },

  "tarrence-van-as": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#tarrence-van-as",
    name: "Tarrence van As",
    jobTitle: "CEO & Co-Founder",
    worksFor: {
      "@type": "Organization",
      name: "Cartridge",
      url: "https://cartridge.gg/",
    },
    description:
      "Tarrence van As is the CEO and co-founder of Cartridge, a developer ecosystem for fully onchain games, and co-founder of Dojo, an open-source framework for building onchain games and Autonomous Worlds on Starknet. He also co-founded Dope World, an evolving onchain playground of games, story, and culture built on Starknet.",
    knowsAbout: [
      "Fully Onchain Games",
      "Autonomous Worlds",
      "Starknet Development",
      "Game Engine Architecture",
      "Digital Ownership",
      "Blockchain Gaming Infrastructure",
    ],
    sameAs: [
      "https://x.com/tarrence",
      "https://github.com/tarrencev",
      "https://www.linkedin.com/in/tarrence-van-as-b1440a23",
    ],
  },

  "emily-yang": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#emily-yang",
    name: "Emily Yang",
    alternateName: "pplpleasr",
    jobTitle: "Co-Founder",
    worksFor: {
      "@type": "Organization",
      name: "Shibuya",
      url: "https://www.shibuya.xyz/",
    },
    description:
      "Emily Yang, known as pplpleasr, is a multidisciplinary artist and co-founder of Shibuya, a decentralized content studio pioneering permissionless creativity. From visual effects on feature films including Batman v Superman and Wonder Woman to defining the visual identity of the DeFi movement, she created Fortune magazine's first NFT cover and co-executive produced the Emmy-winning Vitalik: An Ethereum Story. She co-founded PleasrDAO and plsA0k1, a collaborative vault supporting emerging female artists in the NFT space.",
    knowsAbout: [
      "Decentralized Content Creation",
      "NFT Art and Culture",
      "DeFi Visual Identity",
      "Permissionless Creativity",
      "Onchain Film Production",
      "Community-Funded Storytelling",
    ],
    sameAs: [
      "https://x.com/pplpleasr1",
      "https://pplplsr.com/",
      "https://www.instagram.com/pplpleasr/",
      "https://www.televisionacademy.com/bios/emily-yang",
      "https://www.forbes.com/profile/emily-yang/",
    ],
  },

  "santiago-palladino": {
    "@type": "Person" as const,
    "@id": "https://ethereum.org/#santiago-palladino",
    name: "Santiago Palladino",
    jobTitle: "Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Aztec",
      url: "https://aztec.network/",
    },
    description:
      "Santiago Palladino is a software engineer at Aztec and a councilmember at The Graph, with over two decades of professional development experience and nine years in the Ethereum ecosystem. Formerly at OpenZeppelin, where he contributed to smart contract security audits and led development of open-source tools for Ethereum applications. He authored Ethereum for Web Developers and holds an MSc in Computer Science from the University of Buenos Aires, where he taught Algorithms and Numerical Methods for seven years.",
    knowsAbout: [
      "Ethereum Application Development",
      "Smart Contract Security",
      "Privacy-Preserving Blockchains",
      "Open-Source Developer Tooling",
      "Layer 2 Scaling",
      "Ethereum Developer Education",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "OpenZeppelin",
        url: "https://www.openzeppelin.com/",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Buenos Aires",
        url: "https://www.uba.ar/",
      },
    ],
    sameAs: [
      "https://x.com/smpalladino",
      "https://palla.dev/",
      "https://github.com/spalladino",
      "https://www.linkedin.com/in/spalladino",
      "https://www.youtube.com/@spalladino",
      "https://dev.to/spalladino",
    ],
  },
} as const
