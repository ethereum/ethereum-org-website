import type { TopicConfig } from "."

export const aiAgents: TopicConfig = {
  translationNs: "template-ai-agents",
  dropdown: {
    textKey: "template-ai-agents-dropdown",
    ariaLabelKey: "template-ai-agents-dropdown-aria",
    matomoCategory: "ai agents menu",
    items: [
      {
        textKey: "template-ai-agents-dropdown-hub",
        href: "/ai-agents/",
        matomoEvent: "hub-home",
      },
      {
        textKey: "template-ai-agents-dropdown-ethereum",
        href: "/ai-agents/ethereum/",
        matomoEvent: "ethereum",
      },
      {
        textKey: "template-ai-agents-dropdown-getting-started",
        href: "/ai-agents/getting-started/",
        matomoEvent: "getting-started",
      },
      {
        textKey: "template-ai-agents-dropdown-wallets",
        href: "/ai-agents/wallets/",
        matomoEvent: "wallets",
      },
      {
        textKey: "template-ai-agents-dropdown-frameworks",
        href: "/ai-agents/frameworks/",
        matomoEvent: "frameworks",
      },
      {
        textKey: "template-ai-agents-dropdown-verification",
        href: "/ai-agents/verification/",
        matomoEvent: "verification",
      },
      {
        textKey: "template-ai-agents-dropdown-payments",
        href: "/ai-agents/payments/",
        matomoEvent: "payments",
      },
      {
        textKey: "template-ai-agents-dropdown-identity",
        href: "/ai-agents/identity/",
        matomoEvent: "identity",
      },
      {
        textKey: "template-ai-agents-dropdown-use-cases",
        href: "/ai-agents/use-cases/",
        matomoEvent: "use-cases",
      },
      {
        textKey: "template-ai-agents-dropdown-l2s",
        href: "/ai-agents/l2s/",
        matomoEvent: "l2s",
      },
    ],
  },
  editBanner: {
    textKey: "template-ai-agents-banner",
    linkKey: "template-ai-agents-edit-link",
  },
}
