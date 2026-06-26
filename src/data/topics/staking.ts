import type { TopicConfig } from "."

export const staking: TopicConfig = {
  translationNs: "page-staking",
  dropdown: {
    textKey: "page-staking-dropdown-staking-options",
    ariaLabelKey: "page-staking-dropdown-staking-options-alt",
    matomoCategory: "Staking dropdown",
    items: [
      {
        textKey: "page-staking-dropdown-home",
        href: "/staking/",
        matomoEvent: "clicked staking home",
      },
      {
        textKey: "page-staking-dropdown-solo",
        href: "/staking/solo/",
        matomoEvent: "clicked solo staking",
      },
      {
        textKey: "page-staking-dropdown-saas",
        href: "/staking/saas/",
        matomoEvent: "clicked staking as a service",
      },
      {
        textKey: "page-staking-dropdown-pools",
        href: "/staking/pools/",
        matomoEvent: "clicked pooled staking",
      },
      {
        textKey: "page-staking-dropdown-withdrawals",
        href: "/staking/withdrawals/",
        matomoEvent: "clicked about withdrawals",
      },
      {
        textKey: "page-staking-dropdown-dvt",
        href: "/staking/dvt/",
        matomoEvent: "clicked about dvt",
      },
    ],
  },
}
