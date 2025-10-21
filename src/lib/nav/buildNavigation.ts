import type { NavSections } from "@/components/Nav/types"

type TranslateFn = (key: string) => string

export const buildNavigation = (t: TranslateFn): NavSections => {
  return {
    learn: {
      label: t("learn"),
      ariaLabel: t("learn-menu"),
      items: [
        {
          id: "learn/overview",
          label: t("nav-overview-label"),
          description: t("nav-overview-description"),
          href: "/learn/",
        },
        {
          id: "learn/basics",
          label: t("nav-basics-label"),
          description: t("nav-basics-description"),
          items: [
            {
              label: t("what-is-ethereum"),
              description: t("nav-what-is-ethereum-description"),
              href: "/what-is-ethereum/",
            },
            {
              label: t("what-is-the-ethereum-network"),
              description: t("nav-what-is-ethereum-network-description"),
              href: "/what-is-the-ethereum-network/",
            },
            {
              label: t("what-is-ether"),
              description: t("nav-what-is-ether-description"),
              href: "/eth/",
            },
            {
              label: t("ethereum-vs-bitcoin"),
              description: t("nav-ethereum-vs-bitcoin-description"),
              href: "/ethereum-vs-bitcoin/",
            },
            {
              label: t("ethereum-history-founder-and-ownership"),
              description: t(
                "nav-ethereum-history-founder-and-ownership-description"
              ),
              href: "/ethereum-history-founder-and-ownership/",
            },
            {
              label: t("ethereum-wallets"),
              description: t("nav-ethereum-wallets-description"),
              href: "/wallets/",
            },
            {
              label: t("nav-what-is-web3-label"),
              description: t("nav-what-is-web3-description"),
              href: "/web3/",
            },
            {
              label: t("smart-contracts"),
              description: t("nav-smart-contracts-description"),
              href: "/smart-contracts/",
            },
          ],
        },
        {
          id: "learn/advanced",
          label: t("nav-advanced-label"),
          description: t("nav-advanced-description"),
          items: [
            {
              label: t("nav-gas-fees-label"),
              description: t("nav-gas-fees-description"),
              href: "/gas/",
            },
            {
              label: t("bridges"),
              description: t("nav-bridges-description"),
              href: "/bridges/",
            },
            {
              label: t("zero-knowledge-proofs"),
              description: t("nav-zkp-description"),
              href: "/zero-knowledge-proofs/",
            },
            {
              label: t("run-a-node"),
              description: t("nav-run-a-node-description"),
              href: "/run-a-node/",
            },
            {
              label: t("ethereum-security"),
              description: t("nav-security-description"),
              href: "/security/",
            },
            {
              label: t("ethereum-privacy"),
              description: t("nav-privacy-description"),
              href: "/privacy/",
            },
          ],
        },
        {
          id: "learn/quizzes",
          label: t("nav-quizzes-label"),
          description: t("nav-quizzes-description"),
          href: "/quizzes/",
        },
      ],
    },
    use: {
      label: t("use"),
      ariaLabel: t("use-menu"),
      items: [
        {
          id: "use/get-started",
          label: t("get-started"),
          description: t("nav-get-started-description"),
          items: [
            {
              label: t("nav-start-with-crypto-title"),
              description: t("nav-start-with-crypto-description"),
              href: "/start/",
            },
            {
              label: t("nav-find-wallet-label"),
              description: t("nav-find-wallet-description"),
              href: "/wallets/find-wallet/",
            },
            {
              label: t("get-eth"),
              description: t("nav-get-eth-description"),
              href: "/get-eth/",
            },
            {
              label: t("application-explorer"),
              description: t("nav-apps-description"),
              href: "/apps/",
            },
            {
              label: t("nav-guides-label"),
              description: t("nav-guides-description"),
              items: [
                {
                  label: t("nav-overview-label"),
                  description: t("nav-guide-overview-description"),
                  href: "/guides/",
                },
                {
                  label: t("nav-guide-create-account-label"),
                  description: t("nav-guide-create-account-description"),
                  href: "/guides/how-to-create-an-ethereum-account/",
                },
                {
                  label: t("nav-guide-use-wallet-label"),
                  description: t("nav-guide-use-wallet-description"),
                  href: "/guides/how-to-use-a-wallet/",
                },
                {
                  label: t("nav-guide-revoke-access-label"),
                  description: t("nav-guide-revoke-access-description"),
                  href: "/guides/how-to-revoke-token-access/",
                },
              ],
            },
          ],
        },
        {
          id: "use/use-cases",
          label: t("nav-use-cases-label"),
          description: t("nav-use-cases-description"),
          items: [
            {
              label: t("stablecoins"),
              description: t("nav-stablecoins-description"),
              href: "/stablecoins/",
            },
            {
              label: t("nft-page"),
              description: t("nav-nft-description"),
              href: "/nft/",
            },
            {
              label: t("defi-page"),
              description: t("nav-defi-description"),
              href: "/defi/",
            },
            {
              label: t("payments-page"),
              description: t("nav-payments-description"),
              href: "/payments/",
            },
            {
              label: t("dao-page"),
              description: t("nav-dao-description"),
              href: "/dao/",
            },
            {
              label: t("decentralized-social-networks"),
              description: t("nav-desoc-description"),
              href: "/social-networks/",
            },
            {
              label: t("nav-emerging-label"),
              description: t("nav-emerging-description"),
              items: [
                {
                  label: t("decentralized-identity"),
                  description: t("nav-did-description"),
                  href: "/decentralized-identity/",
                },
                {
                  label: t("decentralized-science"),
                  description: t("nav-desci-description"),
                  href: "/desci/",
                },
                {
                  label: t("regenerative-finance"),
                  description: t("nav-refi-description"),
                  href: "/refi/",
                },
                {
                  label: t("ai-agents"),
                  description: t("nav-ai-agents-description"),
                  href: "/ai-agents/",
                },
                {
                  label: t("onchain-gaming"),
                  description: t("nav-gaming-description"),
                  href: "/gaming/",
                },
                {
                  label: t("prediction-markets"),
                  description: t("nav-prediction-markets-description"),
                  href: "/prediction-markets/",
                },
                {
                  label: t("real-world-assets"),
                  description: t("nav-rwa-description"),
                  href: "/real-world-assets/",
                },
              ],
            },
          ],
        },
        {
          id: "use/stake",
          label: t("nav-stake-label"),
          description: t("nav-stake-description"),
          items: [
            {
              label: t("nav-staking-home-label"),
              description: t("nav-staking-home-description"),
              href: "/staking/",
            },
            {
              label: t("nav-staking-solo-label"),
              description: t("nav-staking-solo-description"),
              href: "/staking/solo/",
            },
            {
              label: t("nav-staking-saas-label"),
              description: t("nav-staking-saas-description"),
              href: "/staking/saas/",
            },
            {
              label: t("nav-staking-pool-label"),
              description: t("nav-staking-pool-description"),
              href: "/staking/pools/",
            },
          ],
        },
        {
          id: "use/networks",
          label: t("nav-ethereum-networks"),
          description: t("nav-ethereum-networks-description"),
          items: [
            {
              label: t("nav-networks-introduction-label"),
              description: t("nav-networks-introduction-description"),
              href: "/layer-2/",
            },
            {
              label: t("nav-networks-explore-networks-label"),
              description: t("nav-networks-explore-networks-description"),
              href: "/layer-2/networks/",
            },
            {
              label: t("nav-networks-learn-label"),
              description: t("nav-networks-learn-description"),
              href: "/layer-2/learn/",
            },
          ],
        },
      ],
    },
    build: {
      label: t("build"),
      ariaLabel: t("build-menu"),
      items: [
        {
          id: "build/home",
          label: t("nav-builders-home-label"),
          description: t("nav-builders-home-description"),
          href: "/developers/",
        },
        {
          id: "build/get-started",
          label: t("get-started"),
          description: t("nav-start-building-description"),
          items: [
            {
              label: t("tutorials"),
              description: t("nav-tutorials-description"),
              href: "/developers/tutorials/",
            },
            {
              label: t("learn-by-coding"),
              description: t("nav-learn-by-coding-description"),
              href: "/developers/learning-tools/",
            },
            {
              label: t("set-up-local-env"),
              description: t("nav-local-env-description"),
              href: "/developers/local-environment/",
            },
            {
              label: t("grants"),
              description: t("nav-grants-description"),
              href: "/community/grants/",
            },
          ],
        },
        {
          id: "build/docs",
          label: t("documentation"),
          description: t("nav-docs-description"),
          items: [
            {
              label: t("nav-overview-label"),
              description: t("nav-docs-overview-description"),
              href: "/developers/docs/",
            },
            {
              label: t("nav-docs-foundation-label"),
              description: t("nav-docs-foundation-description"),
              href: "/developers/docs/intro-to-ethereum/",
            },
            {
              label: t("nav-docs-stack-label"),
              description: t("nav-docs-stack-description"),
              href: "/developers/docs/ethereum-stack/",
            },
            {
              label: t("nav-docs-design-label"),
              description: t("nav-docs-design-description"),
              href: "/developers/docs/design-and-ux/",
            },
          ],
        },
        {
          id: "build/business",
          label: t("business"),
          description: t("nav-business-description"),
          items: [
            {
              label: t("enterprise"),
              description: t("nav-enterprise-description"),
              href: "/enterprise/",
            },
            {
              label: t("founders"),
              description: t("nav-founders-description"),
              href: "/founders/",
            },
          ],
        },
      ],
    },
    participate: {
      label: t("participate"),
      ariaLabel: t("participate-menu"),
      items: [
        {
          id: "participate/community-hub",
          label: t("community-hub"),
          description: t("nav-participate-overview-description"),
          href: "/community/",
        },
        {
          id: "participate/events",
          label: t("nav-events-label"),
          description: t("nav-events-description"),
          items: [
            {
              label: t("ethereum-online"),
              description: t("nav-events-online-description"),
              href: "/community/online/",
            },
            {
              label: t("ethereum-events"),
              description: t("nav-events-irl-description"),
              href: "/community/events/",
            },
          ],
        },
        {
          id: "participate/ethereum-org",
          label: t("site-title"),
          description: t("nav-ethereum-org-description"),
          items: [
            {
              label: t("nav-contribute-label"),
              description: t("nav-contribute-description"),
              href: "/contributing/",
            },
            {
              label: t("translation-program"),
              description: t("nav-translation-program-description"),
              href: "/contributing/translation-program/",
            },
            {
              label: t("nav-collectibles-label"),
              description: t("nav-collectibles-description"),
              href: "/collectibles/",
            },
            {
              label: t("about-ethereum-org"),
              description: t("nav-about-description"),
              href: "/about/",
            },
          ],
        },
      ],
    },
    research: {
      label: t("research"),
      ariaLabel: t("research-menu"),
      items: [
        {
          id: "research/whitepaper",
          label: t("ethereum-whitepaper"),
          description: t("nav-whitepaper-description"),
          href: "/whitepaper/",
        },
        {
          id: "research/roadmap",
          label: t("nav-roadmap-label"),
          description: t("nav-roadmap-description"),
          items: [
            {
              label: t("nav-overview-label"),
              description: t("nav-roadmap-overview-description"),
              href: "/roadmap/",
            },
            {
              label: t("nav-roadmap-security-label"),
              description: t("nav-roadmap-security-description"),
              href: "/roadmap/security/",
            },
            {
              label: t("nav-roadmap-scaling-label"),
              description: t("nav-roadmap-scaling-description"),
              href: "/roadmap/scaling/",
            },
            {
              label: t("nav-roadmap-ux-label"),
              description: t("nav-roadmap-ux-description"),
              href: "/roadmap/user-experience/",
            },
            {
              label: t("nav-roadmap-future-label"),
              description: t("nav-roadmap-future-description"),
              href: "/roadmap/future-proofing/",
            },
          ],
        },
        {
          id: "research/research",
          label: t("nav-research-label"),
          description: t("nav-research-description"),
          items: [
            {
              label: t("nav-history-label"),
              description: t("nav-history-description"),
              href: "/ethereum-forks/",
            },
            {
              label: t("nav-open-research-label"),
              description: t("nav-open-research-description"),
              href: "/community/research/",
            },
            {
              label: t("nav-eip-label"),
              description: t("nav-eip-description"),
              href: "/eips/",
            },
            {
              label: t("nav-governance-label"),
              description: t("nav-governance-description"),
              href: "/governance/",
            },
          ],
        },
      ],
    },
  }
}
