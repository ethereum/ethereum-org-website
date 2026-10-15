/**
 * Breadcrumb information architecture. Trails follow the URL by default; these
 * tables only record where the logical structure differs from the URL path.
 * Paths are normalized: leading and trailing slash, no locale.
 */

/** Sections whose descendants drop the leading "ethereum.org" root crumb */
export const BREADCRUMB_HUBS = [
  "/community/",
  "/contributing/",
  "/developers/",
  "/guides/",
  "/learn/",
  "/organizations/",
  "/roadmap/",
  "/staking/",
  "/start/",
  "/use-cases/",
  "/values/",
] as const

/**
 * Logical parent where it differs from the URL parent. A trailing `*` matches
 * any single final segment, for dynamic routes and URL segments with no page.
 */
export const BREADCRUMB_PARENTS: Record<string, string> = {
  // About
  "/assets/": "/about/",
  "/foundation/": "/about/",
  "/bug-bounty/": "/foundation/",

  // Community
  "/10years/": "/community/",

  // Contributing
  "/collectibles/": "/contributing/",

  // Learn
  "/bridges/": "/learn/",
  "/energy-consumption/": "/learn/",
  "/ethereum-history-founder-and-ownership/": "/learn/",
  "/ethereum-vs-bitcoin/": "/learn/",
  "/gas/": "/learn/",
  "/glossary/": "/learn/",
  "/layer-2/": "/learn/",
  "/quizzes/": "/learn/",
  "/resources/": "/learn/",
  "/run-a-node/": "/learn/",
  "/smart-contracts/": "/learn/",
  "/web3/": "/learn/",
  "/what-are-apps/": "/learn/",
  "/what-is-ether/": "/learn/",
  "/what-is-ethereum/": "/learn/",
  "/what-is-the-ethereum-network/": "/learn/",
  "/whitepaper/": "/learn/",
  "/zero-knowledge-proofs/": "/learn/",
  "/wrapped-eth/": "/what-is-ether/",

  // Start
  "/apps/": "/start/",
  "/get-eth/": "/start/",
  "/wallets/": "/start/",

  // Roadmap
  "/ethereum-forks/": "/roadmap/",
  "/governance/": "/roadmap/",
  "/eips/": "/governance/",

  // Use cases
  "/ai-agents/": "/use-cases/",
  "/dao/": "/use-cases/",
  "/decentralized-identity/": "/use-cases/",
  "/defi/": "/use-cases/",
  "/desci/": "/use-cases/",
  "/gaming/": "/use-cases/",
  "/nft/": "/use-cases/",
  "/payments/": "/use-cases/",
  "/prediction-markets/": "/use-cases/",
  "/real-world-assets/": "/use-cases/",
  "/refi/": "/use-cases/",
  "/restaking/": "/use-cases/",
  "/social-networks/": "/use-cases/",
  "/stablecoins/": "/use-cases/",

  // Values
  "/open-access/": "/values/",
  "/open-source/": "/values/",
  "/privacy/": "/values/",
  "/security/": "/values/",

  // URL segments with no page of their own
  "/apps/categories/*": "/apps/",
  "/developers/tools/categories/*": "/developers/tools/",
  "/wallets/find-wallet/personas/*": "/wallets/find-wallet/",
}

/** `common` translation key where it differs from the final URL segment */
export const BREADCRUMB_LABEL_KEYS: Record<string, string> = {
  "/developers/": "breadcrumb-builders",
  "/eips/": "breadcrumb-eip",
  "/layer-2/learn/": "breadcrumb-what-is-layer-2",
  "/reports/trillion-dollar-security/":
    "breadcrumb-security-challenges-overview",
  "/real-world-assets/": "breadcrumb-rwa",
  "/resources/": "breadcrumb-resources",
  "/what-is-ether/": "breadcrumb-what-is-ether",
}

/** Label override when the page appears as an ancestor rather than the leaf */
export const BREADCRUMB_ANCESTOR_LABEL_KEYS: Record<string, string> = {
  "/apps/": "breadcrumb-all-apps",
}
