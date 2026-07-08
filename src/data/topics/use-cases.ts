import type { TopicConfig } from "."

export const useCases: TopicConfig = {
  translationNs: "template-usecase",
  dropdown: {
    textKey: "template-usecase-dropdown",
    ariaLabelKey: "template-usecase-dropdown-aria",
    matomoCategory: "use cases menu",
    items: [
      {
        textKey: "template-usecase-dropdown-all-use-cases",
        href: "/use-cases/",
        matomoEvent: "all-use-cases",
      },
      {
        textKey: "template-usecase-dropdown-defi",
        href: "/defi/",
        matomoEvent: "defi",
      },
      {
        textKey: "template-usecase-dropdown-nft",
        href: "/nft/",
        matomoEvent: "nft",
      },
      {
        textKey: "template-usecase-dropdown-dao",
        href: "/dao/",
        matomoEvent: "dao",
      },
      {
        textKey: "template-usecase-dropdown-payments",
        href: "/payments/",
        matomoEvent: "payments",
      },
      {
        textKey: "template-usecase-dropdown-social-networks",
        href: "/social-networks/",
        matomoEvent: "social-networks",
      },
      {
        textKey: "template-usecase-dropdown-identity",
        href: "/decentralized-identity/",
        matomoEvent: "decentralized-identity",
      },
      {
        textKey: "template-usecase-dropdown-desci",
        href: "/desci/",
        matomoEvent: "desci",
      },
      {
        textKey: "template-usecase-dropdown-refi",
        href: "/refi/",
        matomoEvent: "refi",
      },
      {
        textKey: "template-usecase-dropdown-ai-agents",
        href: "/ai-agents/",
        matomoEvent: "ai-agents",
      },
      {
        textKey: "template-usecase-dropdown-onchain-gaming",
        href: "/gaming/",
        matomoEvent: "onchain-gaming",
      },
      {
        textKey: "template-usecase-dropdown-prediction-markets",
        href: "/prediction-markets/",
        matomoEvent: "prediction-markets",
      },
      {
        textKey: "template-usecase-dropdown-rwa",
        href: "/real-world-assets/",
        matomoEvent: "real-world-assets",
      },
      {
        textKey: "template-usecase-dropdown-restaking",
        href: "/restaking/",
        matomoEvent: "restaking",
      },
    ],
  },
  editBanner: {
    textKey: "template-usecase-banner",
    linkKey: "template-usecase-edit-link",
  },
}
