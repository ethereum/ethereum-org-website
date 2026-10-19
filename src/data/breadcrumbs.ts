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
  "/cookie-policy/": "/about/",
  "/privacy-policy/": "/about/",
  "/terms-of-use/": "/about/",
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
  "/stories/": "/learn/",
  "/web3/": "/learn/",
  "/what-are-apps/": "/learn/",
  "/what-is-ether/": "/learn/",
  "/what-is-ethereum/": "/learn/",
  "/what-is-the-ethereum-network/": "/learn/",
  "/zero-knowledge-proofs/": "/learn/",
  "/whitepaper/": "/ethereum-history-founder-and-ownership/",
  "/wrapped-eth/": "/what-is-ether/",

  // Start
  "/apps/": "/start/",
  "/get-eth/": "/start/",
  "/guides/": "/start/",
  "/wallets/": "/start/",

  // Roadmap
  "/ethereum-forks/": "/roadmap/",
  "/governance/": "/roadmap/",
  "/eips/": "/governance/",
  "/roadmap/danksharding/": "/roadmap/scaling/",
  "/roadmap/zkevm/": "/roadmap/scaling/",
  "/roadmap/pbs/": "/roadmap/security/",
  "/roadmap/secret-leader-election/": "/roadmap/security/",
  "/roadmap/single-slot-finality/": "/roadmap/security/",
  "/roadmap/statelessness/": "/roadmap/security/",
  "/roadmap/verkle-trees/": "/roadmap/security/",
  "/roadmap/account-abstraction/": "/roadmap/user-experience/",

  // Staking
  "/staking/deposit-contract/": "/staking/solo/",

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
  "/contributing/content-resources/": "breadcrumb-adding-content-resources",
  "/contributing/quizzes/": "breadcrumb-adding-quizzes",
  "/eips/": "breadcrumb-eip",
  "/ethereum-history-founder-and-ownership/": "breadcrumb-history",
  "/layer-2/learn/": "breadcrumb-what-is-layer-2",
  "/reports/trillion-dollar-security/":
    "breadcrumb-security-challenges-overview",
  "/real-world-assets/": "breadcrumb-rwa",
  "/resources/": "breadcrumb-resources",
  "/staking/saas/": "breadcrumb-delegated-staking",
  "/staking/solo/": "breadcrumb-home-staking",
  "/what-is-ether/": "breadcrumb-what-is-ether",
}

/** Label override when the page appears as an ancestor rather than the leaf */
export const BREADCRUMB_ANCESTOR_LABEL_KEYS: Record<string, string> = {
  "/apps/": "breadcrumb-all-apps",
}
