import type {
  NavLink,
  NavSectionKey,
  NavSections,
} from "@/components/Nav/types"

import { getBreadcrumbTrail } from "@/lib/utils/breadcrumbs"

type TranslateFn = (key: string) => string

/**
 * Breadcrumb roots (a hub, or a root-level page with no hub) whose pages
 * belong to each menu section. Keeps the menu, the "current section"
 * highlight and the breadcrumb IA in step; enforced by tests/unit/routing.
 */
export const NAV_SECTION_ROOTS: Record<NavSectionKey, string[]> = {
  learn: ["/learn/", "/values/", "/videos/", "/reports/"],
  use: ["/start/", "/use-cases/", "/staking/"],
  build: ["/developers/"],
  roadmap: ["/roadmap/"],
  community: ["/community/", "/contributing/", "/about/"],
  organizations: ["/organizations/"],
}

/** Menu section a page belongs to, from the root of its breadcrumb trail */
export const getNavSectionForPath = (path: string): NavSectionKey | null => {
  if (!path) return null
  const root = getBreadcrumbTrail(path).find(({ href }) => href !== "/")?.href
  if (!root) return null
  const entry = Object.entries(NAV_SECTION_ROOTS).find(([, roots]) =>
    roots.includes(root)
  )
  return entry ? (entry[0] as NavSectionKey) : null
}

/** Every link a section renders: hub, featured slot, group headings, items */
export const getNavSectionLinks = (
  section: NavSections[NavSectionKey]
): NavLink[] => [
  section.hub,
  ...(section.featured ? [section.featured] : []),
  ...section.groups.flatMap((group) => [
    ...(group.href ? [{ label: group.label, href: group.href }] : []),
    ...group.items,
  ]),
]

// Item order within a group follows 90-day pageviews unless a reading order
// (basics, upgrades by date) reads better.
export const buildNavigation = (t: TranslateFn): NavSections => ({
  learn: {
    label: t("learn"),
    hub: {
      label: t("learn-hub"),
      description: t("nav-ethereum-explained-description"),
      href: "/learn/",
    },
    featured: {
      eyebrow: t("nav-eyebrow-most-read"),
      label: t("ethereum-whitepaper"),
      description: t("nav-whitepaper-description"),
      href: "/whitepaper/",
    },
    groups: [
      {
        id: "learn/basics",
        label: t("nav-basics-label"),
        items: [
          { label: t("what-is-ethereum"), href: "/what-is-ethereum/" },
          { label: t("breadcrumb-what-is-ether"), href: "/what-is-ether/" },
          { label: t("nav-what-is-web3-label"), href: "/web3/" },
          { label: t("smart-contracts"), href: "/smart-contracts/" },
          { label: t("ethereum-vs-bitcoin"), href: "/ethereum-vs-bitcoin/" },
          {
            label: t("what-is-the-ethereum-network"),
            href: "/what-is-the-ethereum-network/",
          },
          { label: t("what-are-apps"), href: "/what-are-apps/" },
        ],
      },
      {
        id: "learn/how-it-works",
        label: t("nav-how-ethereum-works-label"),
        items: [
          { label: t("layer-2"), href: "/layer-2/" },
          { label: t("bridges"), href: "/bridges/" },
          { label: t("gas"), href: "/gas/" },
          { label: t("run-a-node"), href: "/run-a-node/" },
          {
            label: t("zero-knowledge-proofs"),
            href: "/zero-knowledge-proofs/",
          },
          {
            label: t("nav-energy-consumption-label"),
            href: "/energy-consumption/",
          },
        ],
      },
      {
        id: "learn/values",
        label: t("values"),
        href: "/values/",
        items: [
          { label: t("security"), href: "/security/" },
          { label: t("privacy"), href: "/privacy/" },
          { label: t("open-source"), href: "/open-source/" },
          { label: t("open-access"), href: "/open-access/" },
        ],
      },
      {
        id: "learn/library",
        label: t("nav-library-label"),
        items: [
          {
            label: t("nav-history-founders-label"),
            href: "/ethereum-history-founder-and-ownership/",
          },
          { label: t("glossary"), href: "/glossary/" },
          { label: t("quizzes"), href: "/quizzes/" },
          { label: t("stories"), href: "/stories/" },
          { label: t("videos"), href: "/videos/" },
          { label: t("nav-reports-label"), href: "/reports/" },
          { label: t("breadcrumb-resources"), href: "/resources/" },
        ],
      },
    ],
  },
  use: {
    label: t("use"),
    hub: {
      label: t("start"),
      description: t("nav-start-with-ethereum-description"),
      href: "/start/",
    },
    featured: {
      eyebrow: t("nav-start-with-crypto-title"),
      label: t("nav-find-wallet-label"),
      description: t("nav-find-wallet-description"),
      href: "/wallets/find-wallet/",
    },
    groups: [
      {
        id: "use/essentials",
        label: t("nav-essentials-label"),
        items: [
          { label: t("wallets"), href: "/wallets/" },
          { label: t("get-eth"), href: "/get-eth/" },
          { label: t("nav-explore-apps-label"), href: "/apps/" },
          { label: t("guides"), href: "/guides/" },
        ],
      },
      {
        id: "use/use-cases",
        label: t("use-cases"),
        href: "/use-cases/",
        items: [
          { label: t("nft"), href: "/nft/" },
          { label: t("defi"), href: "/defi/" },
          { label: t("dao"), href: "/dao/" },
          { label: t("nav-rwa-label"), href: "/real-world-assets/" },
          { label: t("stablecoins"), href: "/stablecoins/" },
          {
            label: t("decentralized-identity"),
            href: "/decentralized-identity/",
          },
          { label: t("payments"), href: "/payments/" },
        ],
      },
      {
        id: "use/staking",
        label: t("staking"),
        href: "/staking/",
        items: [
          { label: t("breadcrumb-home-staking"), href: "/staking/solo/" },
          { label: t("nav-staking-pool-label"), href: "/staking/pools/" },
          { label: t("withdrawals"), href: "/staking/withdrawals/" },
          { label: t("breadcrumb-delegated-staking"), href: "/staking/saas/" },
          { label: t("dvt"), href: "/staking/dvt/" },
        ],
      },
    ],
  },
  build: {
    label: t("build"),
    hub: {
      label: t("developers"),
      description: t("nav-builders-home-description"),
      href: "/developers/",
    },
    featured: {
      eyebrow: t("nav-eyebrow-most-popular"),
      label: t("nav-builder-tools-label"),
      description: t("nav-builder-tools-description"),
      href: "/developers/tools/",
    },
    groups: [
      {
        id: "build/docs",
        label: t("documentation"),
        href: "/developers/docs/",
        items: [
          {
            label: t("nav-docs-foundation-label"),
            href: "/developers/docs/intro-to-ethereum/",
          },
          {
            label: t("nav-docs-stack-label"),
            href: "/developers/docs/ethereum-stack/",
          },
          {
            label: t("nav-docs-standards-label"),
            href: "/developers/docs/standards/",
          },
          { label: t("scaling"), href: "/developers/docs/scaling/" },
          {
            label: t("nav-docs-design-label"),
            href: "/developers/docs/design-and-ux/",
          },
        ],
      },
      {
        id: "build/popular-docs",
        label: t("nav-popular-docs-label"),
        items: [
          {
            label: t("nav-docs-erc-20-label"),
            href: "/developers/docs/standards/tokens/erc-20/",
          },
          {
            label: t("nav-docs-smart-contracts-label"),
            href: "/developers/docs/smart-contracts/",
          },
          { label: t("evm"), href: "/developers/docs/evm/" },
          { label: t("networks"), href: "/developers/docs/networks/" },
          {
            label: t("nav-docs-pos-label"),
            href: "/developers/docs/consensus-mechanisms/pos/",
          },
          {
            label: t("nav-docs-json-rpc-label"),
            href: "/developers/docs/apis/json-rpc/",
          },
        ],
      },
      {
        id: "build/start-building",
        label: t("start-building"),
        items: [
          { label: t("tutorials"), href: "/developers/tutorials/" },
          {
            label: t("nav-learn-by-coding-label"),
            href: "/developers/tools/categories/education-standards/",
          },
          {
            label: t("security-testing"),
            href: "/developers/tools/categories/security-testing/",
          },
        ],
      },
    ],
  },
  roadmap: {
    label: t("nav-roadmap-label"),
    hub: {
      label: t("roadmap"),
      description: t("nav-roadmap-description"),
      href: "/roadmap/",
    },
    featured: {
      eyebrow: t("nav-eyebrow-next-upgrade"),
      label: t("glamsterdam"),
      description: t("nav-glamsterdam-description"),
      href: "/roadmap/glamsterdam/",
    },
    groups: [
      {
        id: "roadmap/goals",
        label: t("nav-roadmap-goals-label"),
        items: [
          {
            label: t("nav-roadmap-security-label"),
            href: "/roadmap/security/",
          },
          {
            label: t("nav-roadmap-quantum-resistance"),
            href: "/roadmap/security/quantum-resistance/",
          },
          {
            label: t("nav-roadmap-scaling-label"),
            href: "/roadmap/scaling/",
          },
          {
            label: t("nav-roadmap-privacy-goal-label"),
            href: "/roadmap/privacy/",
          },
          {
            label: t("nav-roadmap-ux-label"),
            href: "/roadmap/user-experience/",
          },
        ],
      },
      {
        id: "roadmap/upgrades",
        label: t("nav-upgrades-label"),
        items: [
          { label: t("hegota"), href: "/roadmap/hegota/" },
          { label: t("fusaka"), href: "/roadmap/fusaka/" },
          { label: t("pectra"), href: "/roadmap/pectra/" },
          { label: t("dencun"), href: "/roadmap/dencun/" },
          { label: t("merge"), href: "/roadmap/merge/" },
          { label: t("ethereum-forks"), href: "/ethereum-forks/" },
        ],
      },
      {
        id: "roadmap/governance",
        label: t("governance"),
        href: "/governance/",
        items: [
          { label: t("breadcrumb-eip"), href: "/eips/" },
          {
            label: t("nav-ercs-label"),
            href: "https://github.com/ethereum/ERCs",
          },
        ],
      },
    ],
  },
  community: {
    label: t("community"),
    hub: {
      label: t("community-hub"),
      description: t("nav-community-description"),
      href: "/community/",
    },
    featured: {
      eyebrow: t("nav-eyebrow-meet-up"),
      label: t("nav-events-calendar-label"),
      description: t("nav-events-calendar-description"),
      href: "/community/events/",
    },
    groups: [
      {
        id: "community/connect",
        label: t("nav-connect-label"),
        items: [
          {
            label: t("nav-online-communities-label"),
            href: "/community/online/",
          },
          { label: t("support"), href: "/community/support/" },
          { label: t("nav-devcon-label"), href: "https://devcon.org/" },
          {
            label: t("nav-code-of-conduct"),
            href: "/community/code-of-conduct/",
          },
        ],
      },
      {
        id: "community/get-involved",
        label: t("nav-get-involved-label"),
        href: "/community/get-involved/",
        items: [
          { label: t("grants"), href: "/community/grants/" },
          { label: t("nav-open-research-label"), href: "/community/research/" },
        ],
      },
      {
        id: "community/contributing",
        label: t("nav-join-ethereum-org-label"),
        href: "/contributing/",
        items: [
          {
            label: t("translation-program"),
            href: "/contributing/translation-program/",
          },
          { label: t("nav-collectibles-label"), href: "/collectibles/" },
        ],
      },
      {
        id: "community/about",
        label: t("about"),
        href: "/about/",
        items: [
          { label: t("nav-bug-bounty-label"), href: "/bug-bounty/" },
          { label: t("nav-ethereum-foundation-label"), href: "/foundation/" },
          { label: t("nav-brand-assets-label"), href: "/assets/" },
        ],
      },
    ],
  },
  organizations: {
    label: t("organizations"),
    linkOnly: true,
    hub: {
      label: t("organizations"),
      description: t("nav-organizations-overview-description"),
      href: "/organizations/",
    },
    groups: [
      {
        id: "organizations/enterprise",
        label: t("enterprise"),
        href: "/organizations/enterprise/",
        items: [
          {
            label: t("tokenization"),
            href: "/organizations/enterprise/tokenization/",
          },
          {
            label: t("onchain-finance"),
            href: "/organizations/enterprise/onchain-finance/",
          },
          {
            label: t("nav-organizations-privacy-label"),
            href: "/organizations/enterprise/privacy/",
          },
          {
            label: t("enterprise-l2s"),
            href: "/organizations/enterprise/enterprise-l2s/",
          },
        ],
      },
      {
        id: "organizations/sectors",
        label: t("organizations"),
        items: [
          {
            label: t("public-sector"),
            href: "/organizations/public-sector/",
          },
          {
            label: t("small-business"),
            href: "/organizations/small-business/",
          },
          { label: t("founders"), href: "/organizations/founders/" },
        ],
      },
    ],
  },
})
