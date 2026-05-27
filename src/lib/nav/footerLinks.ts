import type { FooterLink, FooterLinkSection } from "@/lib/types"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

type TranslateFn = (key: string) => string

export const buildFooterLinkSections = (
  t: TranslateFn
): FooterLinkSection[] => [
  {
    title: t("learn"),
    links: [
      { href: "/learn/", text: t("learn-hub") },
      { href: "/what-is-ethereum/", text: t("what-is-ethereum") },
      { href: "/what-is-ether/", text: t("what-is-ether") },
      { href: "/wallets/", text: t("ethereum-wallets") },
      { href: "/web3/", text: t("web3") },
      { href: "/smart-contracts/", text: t("smart-contracts") },
      { href: "/gas/", text: "Gas fees" },
      { href: "/run-a-node/", text: t("run-a-node") },
      { href: "/security/", text: t("ethereum-security") },
      { href: "/quizzes/", text: t("quizzes-title") },
      { href: "/glossary/", text: t("ethereum-glossary") },
    ],
  },
  {
    title: t("use"),
    links: [
      { href: "/guides/", text: t("guides") },
      { href: "/wallets/find-wallet/", text: t("nav-find-wallet-label") },
      { href: "/get-eth/", text: t("get-eth") },
      { href: "/apps/", text: t("application-explorer") },
      { href: "/stablecoins/", text: t("stablecoins") },
      { href: "/nft/", text: t("nft-page") },
      { href: "/defi/", text: t("defi-page") },
      { href: "/dao/", text: t("dao-page") },
      { href: "/decentralized-identity/", text: t("decentralized-identity") },
      { href: "/staking/", text: t("stake-eth") },
      { href: "/layer-2/", text: t("layer-2") },
    ],
  },
  {
    title: t("build"),
    links: [
      {
        href: "/developers/",
        text: t("nav-builders-home-label"),
        isPartiallyActive: false,
      },
      { href: "/developers/tutorials/", text: t("tutorials") },
      { href: "/developers/docs/", text: t("documentation") },
      { href: "/developers/tools/", text: t("start-building") },
      {
        href: "/developers/tools/education/",
        text: t("learn-ethereum-development"),
      },
      { href: "/community/grants/", text: t("grants") },
      {
        href: "/developers/docs/intro-to-ethereum/",
        text: t("nav-docs-foundation-label"),
      },
      {
        href: "/developers/docs/design-and-ux/",
        text: t("nav-docs-design-label"),
      },
      { href: ENTERPRISE_ETHEREUM_URL, text: t("enterprise-mainnet") },
      { href: "/founders/", text: t("founders") },
    ],
  },
  {
    title: t("participate"),
    links: [
      { href: "/community/", text: t("community-hub") },
      { href: "/community/online/", text: t("ethereum-online") },
      { href: "/community/events/", text: t("ethereum-events") },
      { href: "/contributing/", text: t("nav-contribute-label") },
      {
        href: "/contributing/translation-program/",
        text: t("translation-program"),
      },
      { href: "/bug-bounty/", text: t("ethereum-bug-bounty") },
      { href: "/foundation/", text: t("ethereum-foundation") },
      { href: "https://blog.ethereum.org/", text: t("ef-blog") },
      { href: "https://esp.ethereum.foundation", text: t("esp") },
      { href: "https://devcon.org/", text: t("devcon") },
    ],
  },
  {
    title: t("research"),
    links: [
      { href: "/whitepaper/", text: t("ethereum-whitepaper") },
      { href: "/roadmap/", text: t("ethereum-roadmap") },
      { href: "/roadmap/security/", text: t("nav-roadmap-security-label") },
      { href: "/ethereum-forks/", text: t("nav-history-label") },
      { href: "/community/research/", text: t("nav-open-research-label") },
      { href: "/eips/", text: t("eips") },
      { href: "/governance/", text: t("ethereum-governance") },
      { href: "/reports/", text: t("reports") },
      {
        href: "/reports/trillion-dollar-security/",
        text: t("trillion-dollar-security"),
      },
    ],
  },
]

export const buildFooterDipperLinks = (t: TranslateFn): FooterLink[] => [
  { href: "/about/", text: t("about-us") },
  { href: "/assets/", text: t("ethereum-brand-assets") },
  { href: "/community/code-of-conduct/", text: t("nav-code-of-conduct") },
  { href: "/about/#open-jobs", text: t("jobs") },
  { href: "/privacy-policy/", text: t("privacy-policy") },
  { href: "/terms-of-use/", text: t("terms-of-use") },
  { href: "/cookie-policy/", text: t("cookie-policy") },
  { href: "mailto:press@ethereum.org", text: t("contact") },
]
