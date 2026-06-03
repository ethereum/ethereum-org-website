import type { NavSections } from "@/components/Nav/types"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

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
          id: "learn/ethereum-explained",
          label: t("nav-ethereum-explained-label"),
          description: t("nav-ethereum-explained-description"),
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
              href: "/what-is-ether/",
            },
            {
              label: t("nav-what-is-web3-label"),
              description: t("nav-what-is-web3-description"),
              href: "/web3/",
            },
            {
              label: t("ethereum-vs-bitcoin"),
              description: t("nav-ethereum-vs-bitcoin-description"),
              href: "/ethereum-vs-bitcoin/",
            },
          ],
        },
        {
          id: "learn/how-ethereum-works",
          label: t("nav-how-ethereum-works-label"),
          description: t("nav-how-ethereum-works-description"),
          items: [
            {
              label: t("smart-contracts"),
              description: t("nav-smart-contracts-description"),
              href: "/smart-contracts/",
            },
            {
              label: t("ethereum-wallets"),
              description: t("nav-ethereum-wallets-description"),
              href: "/wallets/",
            },
            {
              label: t("nav-gas-fees-label"),
              description: t("nav-gas-fees-description"),
              href: "/gas/",
            },
            {
              label: t("nav-networks-learn-label"),
              description: t("nav-networks-learn-description"),
              href: "/layer-2/learn/",
            },
            {
              label: t("staking"),
              description: t("nav-stake-description"),
              href: "/staking/",
            },
          ],
        },
        {
          id: "learn/staying-safe",
          label: t("nav-staying-safe-label"),
          description: t("nav-staying-safe-description"),
          items: [
            {
              label: t("ethereum-privacy"),
              description: t("nav-privacy-description"),
              href: "/privacy/",
            },
            {
              label: t("ethereum-security"),
              description: t("nav-security-description"),
              href: "/security/",
            },
            {
              label: t("support"),
              description: t("nav-support-description"),
              href: "/community/support/",
            },
          ],
        },
        {
          id: "learn/quizzes",
          label: t("nav-quizzes-label"),
          description: t("nav-quizzes-description"),
          href: "/quizzes/",
        },
        {
          id: "learn/videos",
          label: t("nav-videos-label"),
          description: t("nav-videos-description"),
          href: "/videos/",
        },
      ],
    },
    use: {
      label: t("use"),
      ariaLabel: t("use-menu"),
      items: [
        {
          id: "use/start-with-ethereum",
          label: t("nav-start-with-ethereum-label"),
          description: t("nav-start-with-ethereum-description"),
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
              label: t("nav-explore-apps-label"),
              description: t("nav-explore-apps-description"),
              href: "/apps/",
            },
            {
              label: t("nav-see-all-guides-label"),
              description: t("nav-see-all-guides-description"),
              href: "/guides/",
            },
          ],
        },
        {
          id: "use/use-cases",
          label: t("nav-use-cases-label"),
          description: t("nav-use-cases-description"),
          items: [
            {
              label: t("payments-page"),
              description: t("nav-payments-description"),
              href: "/payments/",
            },
            {
              label: t("stablecoins"),
              description: t("nav-stablecoins-description"),
              href: "/stablecoins/",
            },
            {
              label: t("prediction-markets"),
              description: t("nav-prediction-markets-description"),
              href: "/prediction-markets/",
            },
            {
              label: t("nav-see-all-use-cases-label"),
              description: t("nav-see-all-use-cases-description"),
              href: "/use-cases/",
            },
          ],
        },
        {
          id: "use/staking-nodes",
          label: t("nav-staking-nodes-label"),
          description: t("nav-staking-nodes-description"),
          items: [
            {
              label: t("nav-staking-solo-label"),
              description: t("nav-staking-solo-description"),
              href: "/staking/solo/",
            },
            {
              label: t("run-a-node"),
              description: t("nav-run-a-node-description"),
              href: "/run-a-node/",
            },
            {
              label: t("nav-staking-pool-label"),
              description: t("nav-staking-pool-description"),
              href: "/staking/pools/",
            },
            {
              label: t("nav-staking-saas-label"),
              description: t("nav-staking-saas-description"),
              href: "/staking/saas/",
            },
          ],
        },
        {
          id: "use/explore-networks",
          label: t("nav-explore-networks-label"),
          description: t("nav-explore-networks-description"),
          items: [
            {
              label: t("nav-l2-networks-label"),
              description: t("nav-l2-networks-description"),
              href: "/layer-2/",
            },
            {
              label: t("nav-find-l2-label"),
              description: t("nav-find-l2-description"),
              href: "/layer-2/networks/",
            },
            {
              label: t("bridges"),
              description: t("nav-bridges-description"),
              href: "/bridges/",
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
          id: "build/start-building",
          label: t("start-building"),
          description: t("nav-start-building-description"),
          items: [
            {
              label: t("nav-builder-tools-label"),
              description: t("nav-builder-tools-description"),
              href: "/developers/tools/",
            },
            {
              label: t("nav-code-tutorials-label"),
              description: t("nav-code-tutorials-description"),
              href: "/developers/tutorials/",
            },
            {
              label: t("nav-learn-by-coding-label"),
              description: t("nav-learn-by-coding-description"),
              href: "/developers/tools/education/",
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
          id: "build/ai-agents",
          label: t("ai-agents"),
          description: t("nav-build-ai-agents-description"),
          items: [
            {
              label: t("nav-ai-agents-overview"),
              description: t("nav-ai-agents-overview-description"),
              href: "/ai-agents/",
            },
            {
              label: t("nav-ai-agents-models"),
              description: t("nav-ai-agents-models-description"),
              href: "/ai-agents/models/",
            },
            {
              label: t("nav-ai-agents-agent-harness"),
              description: t("nav-ai-agents-agent-harness-description"),
              href: "/ai-agents/agent-harness/",
            },
            {
              label: t("nav-ai-agents-wallets"),
              description: t("nav-ai-agents-wallets-description"),
              href: "/ai-agents/wallets/",
            },
            {
              label: t("nav-ai-agents-security"),
              description: t("nav-ai-agents-security-description"),
              href: "/ai-agents/security/",
            },
            {
              label: t("nav-ai-agents-agent-economy"),
              description: t("nav-ai-agents-agent-economy-description"),
              href: "/ai-agents/agent-economy/",
            },
          ],
        },
        {
          id: "build/business",
          label: t("business"),
          description: t("nav-business-description"),
          items: [
            {
              label: t("founders"),
              description: t("nav-founders-description"),
              href: "/founders/",
            },
            {
              label: t("nav-institution-enterprise-label"),
              description: t("nav-institution-enterprise-description"),
              href: ENTERPRISE_ETHEREUM_URL,
            },
            {
              label: t("nav-iptf-label"),
              description: t("nav-iptf-description"),
              href: "https://iptf.ethereum.org/",
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
          id: "participate/connect",
          label: t("nav-connect-label"),
          description: t("nav-connect-description"),
          items: [
            {
              label: t("nav-events-calendar-label"),
              description: t("nav-events-calendar-description"),
              href: "/community/events/",
            },
            {
              label: t("nav-online-communities-label"),
              description: t("nav-online-communities-description"),
              href: "/community/online/",
            },
            {
              label: t("nav-devcon-label"),
              description: t("nav-devcon-description"),
              href: "https://devcon.org/",
            },
          ],
        },
        {
          id: "participate/get-involved",
          label: t("nav-get-involved-label"),
          description: t("nav-get-involved-description"),
          items: [
            {
              label: t("nav-where-to-start-label"),
              description: t("nav-where-to-start-description"),
              href: "/community/get-involved/",
            },
            {
              label: t("grants"),
              description: t("nav-grants-description"),
              href: "/community/grants/",
            },
          ],
        },
        {
          id: "participate/join-ethereum-org",
          label: t("nav-join-ethereum-org-label"),
          description: t("nav-join-ethereum-org-description"),
          items: [
            {
              label: t("about-ethereum-org"),
              description: t("nav-about-description"),
              href: "/about/",
            },
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
              label: t("nav-brand-assets-label"),
              description: t("nav-brand-assets-description"),
              href: "/assets/",
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
          id: "research/reports",
          label: t("nav-reports-label"),
          description: t("nav-reports-description"),
          href: "/reports/",
        },
        {
          id: "research/governance",
          label: t("nav-governance-label"),
          description: t("nav-governance-description"),
          href: "/governance/",
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
          id: "research/development",
          label: t("nav-development-label"),
          description: t("nav-development-description"),
          items: [
            {
              label: t("nav-eip-label"),
              description: t("nav-eip-description"),
              href: "/eips/",
            },
            {
              label: t("nav-ercs-label"),
              description: t("nav-ercs-description"),
              href: "https://github.com/ethereum/ERCs",
            },
            {
              label: t("nav-bug-bounty-label"),
              description: t("nav-bug-bounty-description"),
              href: "/bug-bounty/",
            },
            {
              label: t("nav-trillion-dollar-security-label"),
              description: t("nav-trillion-dollar-security-description"),
              href: "/reports/trillion-dollar-security/",
            },
          ],
        },
        {
          id: "research/context",
          label: t("nav-context-label"),
          description: t("nav-context-description"),
          items: [
            {
              label: t("nav-energy-consumption-label"),
              description: t("nav-energy-consumption-description"),
              href: "/energy-consumption/",
            },
            {
              label: t("nav-history-founders-label"),
              description: t("nav-history-founders-description"),
              href: "/ethereum-history-founder-and-ownership/",
            },
            {
              label: t("nav-technical-history-label"),
              description: t("nav-technical-history-description"),
              href: "/ethereum-forks/",
            },
            {
              label: t("nav-open-research-label"),
              description: t("nav-open-research-description"),
              href: "/community/research/",
            },
            {
              label: t("nav-data-analytics-label"),
              description: t("nav-data-analytics-description"),
              href: "/developers/tools/analytics/",
            },
            {
              label: t("nav-ethereum-foundation-label"),
              description: t("nav-ethereum-foundation-description"),
              href: "/foundation/",
            },
          ],
        },
      ],
    },
  }
}
