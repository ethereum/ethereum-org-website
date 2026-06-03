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
        textKey: "template-ai-agents-dropdown-use-cases",
        href: "/ai-agents/use-cases/",
        matomoEvent: "use-cases",
      },
      {
        textKey: "template-ai-agents-dropdown-models",
        href: "/ai-agents/models/",
        matomoEvent: "models",
      },
      {
        textKey: "template-ai-agents-dropdown-agent-harness",
        href: "/ai-agents/agent-harness/",
        matomoEvent: "agent-harness",
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
        textKey: "template-ai-agents-dropdown-security",
        href: "/ai-agents/security/",
        matomoEvent: "security",
      },
      {
        textKey: "template-ai-agents-dropdown-agent-economy",
        href: "/ai-agents/agent-economy/",
        matomoEvent: "agent-economy",
      },
    ],
  },
  editBanner: {
    textKey: "template-ai-agents-banner",
    linkKey: "template-ai-agents-edit-link",
  },
}
