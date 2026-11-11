import type { Course } from "./types"

export const smartContractsCourse: Course = {
  id: "smart-contracts",
  level: "beginner",
  theme: "pink",
  art: "contract",
  lessons: [
    {
      id: "what",
      icon: "code",
      learnMore: "/smart-contracts/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "contract" },
        {
          id: "decides",
          type: "choice",
          options: ["owner", "code", "validators"],
          correct: ["code"],
        },
        { id: "machine", type: "interactive", widget: "vending-machine" },
        {
          id: "change",
          type: "choice",
          options: ["edit", "vote", "no"],
          correct: ["no"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "calling",
      icon: "pointer",
      learnMore: "/developers/docs/smart-contracts/interacting/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["yes", "no", "first"],
          correct: ["no"],
        },
        { id: "sort", type: "interactive", widget: "call-sorter" },
        {
          id: "fee",
          type: "choice",
          options: ["normal", "suspicious", "premium"],
          correct: ["suspicious"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["nothing", "transaction", "validator"],
          extras: ["something", "message", "wallet"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "tokens",
      icon: "coins",
      learnMore: "/developers/docs/standards/tokens/erc-20/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        {
          id: "predict",
          type: "choice",
          options: ["apps", "list", "leaves"],
          correct: ["list"],
        },
        { id: "ledger", type: "interactive", widget: "token-ledger" },
        {
          id: "wrapped",
          type: "choice",
          options: ["wallet", "list", "eth"],
          correct: ["list"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "public",
      icon: "eye",
      learnMore: "/developers/docs/smart-contracts/composability/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "trust",
          type: "choice",
          options: ["true", "unknown", "scam"],
          correct: ["unknown"],
        },
        { id: "blocks", type: "concept", paragraphs: 2, art: "blocks" },
        {
          id: "swap",
          type: "order",
          items: ["send", "wrap", "pay", "read"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "risks",
      icon: "bug",
      learnMore: "/guides/how-to-revoke-token-access/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "audit",
          type: "choice",
          options: ["safe", "sign", "pointless"],
          correct: ["sign"],
        },
        { id: "approvals", type: "concept", paragraphs: 3 },
        { id: "scope", type: "interactive", widget: "approval-scope" },
        {
          id: "revoke",
          type: "choice",
          options: ["disconnect", "revoke", "wait"],
          correct: ["revoke"],
        },
        {
          id: "terms",
          type: "match",
          pairs: ["audit", "approval", "unlimited", "revoke"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "underpay",
      source: "/smart-contracts/#vending-machine",
      type: "choice",
      options: ["owe", "reject", "creator"],
      correct: ["reject"],
    },
    {
      id: "deployed",
      source: "/developers/docs/smart-contracts/upgrading/",
      type: "choice",
      options: ["anytime", "validators", "published"],
      correct: ["published"],
    },
    {
      id: "gas",
      source:
        "/developers/docs/smart-contracts/interacting/#writing-to-a-contract",
      type: "choice",
      options: ["stock", "buy", "balance", "send"],
      correct: ["buy", "send"],
      multi: true,
    },
    {
      id: "price-check",
      source:
        "/developers/docs/smart-contracts/interacting/#reading-from-a-contract",
      type: "choice",
      options: ["decline", "always", "once"],
      correct: ["decline"],
    },
    {
      id: "transfer",
      source: "/developers/docs/standards/tokens/erc-20/#body",
      type: "choice",
      options: ["created", "travel", "updated"],
      correct: ["updated"],
    },
    {
      id: "restore",
      source: "/wrapped-eth/",
      type: "choice",
      options: ["list", "gone", "eth"],
      correct: ["list"],
    },
    {
      id: "source",
      source:
        "/developers/docs/smart-contracts/verifying/#importance-of-source-code-verification",
      type: "choice",
      options: ["hidden", "machine", "change"],
      correct: ["machine"],
    },
    {
      id: "swap",
      source: "/developers/docs/smart-contracts/composability/",
      type: "choice",
      options: ["three", "two", "one"],
      correct: ["one"],
    },
    {
      id: "audit",
      source: "/developers/docs/smart-contracts/security/#audits",
      type: "choice",
      options: ["lowers", "bug-free", "useless"],
      correct: ["lowers"],
    },
    {
      id: "approval",
      source: "/guides/how-to-revoke-token-access/",
      type: "choice",
      options: ["still", "disconnect", "revoke", "held"],
      correct: ["still", "revoke"],
      multi: true,
    },
  ],
}
