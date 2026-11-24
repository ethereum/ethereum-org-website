import type {
  NavFeatured,
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

/** Every destination a section links to: hub, featured slot, group headings, items */
export const getNavSectionLinks = (
  section: NavSections[NavSectionKey]
): NavLink[] => {
  const groupLinks = section.groups.flatMap((group) => [
    ...(group.href ? [{ label: group.label, href: group.href }] : []),
    ...group.items,
  ])
  // The featured card may spotlight a page its groups already list
  const { featured } = section
  const isListed = groupLinks.some(({ href }) => href === featured?.href)
  return [
    section.hub,
    ...(featured && !isListed ? [featured] : []),
    ...groupLinks,
  ]
}

/**
 * Upgrade pages, oldest first. The first one Forkcast doesn't show as live becomes
 * the next-upgrade card (`getNextUpgradeSlug`, run on the server), so a fork
 * shipping needs no edit; upcoming ones need a description.
 */
export const NAV_UPGRADES: {
  labelKey: string
  href: string
  slug?: string
  descriptionKey?: string
}[] = [
  { labelKey: "beacon-chain", href: "/roadmap/beacon-chain/" },
  { labelKey: "merge", href: "/roadmap/merge/", slug: "the-merge" },
  { labelKey: "dencun", href: "/roadmap/dencun/", slug: "dencun" },
  { labelKey: "pectra", href: "/roadmap/pectra/", slug: "pectra" },
  { labelKey: "fusaka", href: "/roadmap/fusaka/", slug: "fusaka" },
  {
    labelKey: "glamsterdam",
    href: "/roadmap/glamsterdam/",
    slug: "glamsterdam",
    descriptionKey: "nav-glamsterdam-description",
  },
  {
    labelKey: "hegota",
    href: "/roadmap/hegota/",
    slug: "hegota",
    descriptionKey: "nav-hegota-description",
  },
]

const nextUpgradeCard = (
  t: TranslateFn,
  slug?: string
): NavFeatured | undefined => {
  const next = slug && NAV_UPGRADES.find((upgrade) => upgrade.slug === slug)
  if (!next || !next.descriptionKey) return undefined
  return {
    eyebrow: t("nav-eyebrow-next-upgrade"),
    label: t(next.labelKey),
    description: t(next.descriptionKey),
    href: next.href,
  }
}

/**
 * Item order within a group follows 90-day pageviews unless a reading order
 * (basics, upgrades by date) reads better. `nextUpgradeSlug` picks the Roadmap
 * card; client callers get it from the server, keeping the upgrade data out of
 * their bundle.
 */
export const buildNavigation = (
  t: TranslateFn,
  nextUpgradeSlug?: string
): NavSections => ({
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
          { label: t("nav-ether-label"), href: "/what-is-ether/" },
          { label: t("nav-web3-label"), href: "/web3/" },
          { label: t("ethereum-wallets"), href: "/wallets/" },
          { label: t("ethereum-vs-bitcoin"), href: "/ethereum-vs-bitcoin/" },
          { label: t("nav-ethereum-apps-label"), href: "/what-are-apps/" },
        ],
      },
      {
        id: "learn/how-it-works",
        label: t("nav-how-ethereum-works-label"),
        items: [
          { label: t("smart-contracts"), href: "/smart-contracts/" },
          {
            label: t("nav-ethereum-network-label"),
            href: "/what-is-the-ethereum-network/",
          },
          { label: t("layer-2"), href: "/layer-2/" },
          { label: t("bridges"), href: "/bridges/" },
          { label: t("nav-network-fees-label"), href: "/gas/" },
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
          { label: t("open-source"), href: "/open-source/" },
          { label: t("privacy"), href: "/privacy/" },
          { label: t("open-access"), href: "/open-access/" },
          { label: t("security"), href: "/security/" },
        ],
      },
      {
        id: "learn/library",
        label: t("nav-library-label"),
        items: [
          { label: t("nav-stories-label"), href: "/stories/" },
          {
            label: t("nav-history-founders-label"),
            href: "/ethereum-history-founder-and-ownership/",
          },
          { label: t("glossary"), href: "/glossary/" },
          { label: t("quizzes"), href: "/quizzes/" },
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
      eyebrow: t("nav-eyebrow-most-popular"),
      label: t("nav-find-wallet-label"),
      description: t("nav-find-wallet-description"),
      href: "/wallets/find-wallet/",
    },
    groups: [
      {
        id: "use/essentials",
        label: t("nav-essentials-label"),
        items: [
          { label: t("nav-get-a-wallet-label"), href: "/wallets/find-wallet/" },
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
          { label: t("stablecoins"), href: "/stablecoins/" },
          { label: t("nav-rwa-label"), href: "/real-world-assets/" },
          { label: t("dao"), href: "/dao/" },
          { label: t("gaming"), href: "/gaming/" },
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
          { label: t("breadcrumb-delegated-staking"), href: "/staking/saas/" },
          { label: t("nav-dvt-label"), href: "/staking/dvt/" },
          { label: t("withdrawals"), href: "/staking/withdrawals/" },
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
    featured: nextUpgradeCard(t, nextUpgradeSlug),
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
          ...[...NAV_UPGRADES]
            .reverse()
            .map(({ labelKey, href }) => ({ label: t(labelKey), href })),
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
      eyebrow: t("nav-eyebrow-calendar"),
      label: t("nav-conferences-meetups-label"),
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
        items: [
          { label: t("contributing"), href: "/contributing/" },
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
    hub: {
      label: t("organizations"),
      description: t("nav-organizations-overview-description"),
      href: "/organizations/",
    },
    groups: [
      {
        id: "organizations/audiences",
        label: t("nav-organizations-audiences-label"),
        items: [
          {
            label: t("public-sector"),
            href: "/organizations/public-sector/",
          },
          { label: t("enterprise"), href: "/organizations/enterprise/" },
          {
            label: t("small-business"),
            href: "/organizations/small-business/",
          },
          { label: t("founders"), href: "/organizations/founders/" },
        ],
      },
      {
        id: "organizations/enterprise",
        label: t("nav-enterprise-use-cases-label"),
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
    ],
  },
})
