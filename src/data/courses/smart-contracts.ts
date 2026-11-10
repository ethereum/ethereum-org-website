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
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "tokens",
      icon: "coins",
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
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "underpay",
      type: "choice",
      options: ["owe", "reject", "creator"],
      correct: ["reject"],
    },
    {
      id: "deployed",
      type: "choice",
      options: ["anytime", "validators", "published"],
      correct: ["published"],
    },
    {
      id: "gas",
      type: "choice",
      options: ["stock", "buy", "balance", "send"],
      correct: ["buy", "send"],
      multi: true,
    },
    {
      id: "price-check",
      type: "choice",
      options: ["decline", "always", "once"],
      correct: ["decline"],
    },
    {
      id: "transfer",
      type: "choice",
      options: ["created", "travel", "updated"],
      correct: ["updated"],
    },
    {
      id: "restore",
      type: "choice",
      options: ["list", "gone", "eth"],
      correct: ["list"],
    },
    {
      id: "source",
      type: "choice",
      options: ["hidden", "machine", "change"],
      correct: ["machine"],
    },
    {
      id: "swap",
      type: "choice",
      options: ["three", "two", "one"],
      correct: ["one"],
    },
    {
      id: "audit",
      type: "choice",
      options: ["lowers", "bug-free", "useless"],
      correct: ["lowers"],
    },
    {
      id: "approval",
      type: "choice",
      options: ["still", "disconnect", "revoke", "held"],
      correct: ["still", "revoke"],
      multi: true,
    },
  ],
}
