import type { Course } from "./types"

export const walletsCourse: Course = {
  id: "wallets",
  level: "beginner",
  theme: "purple",
  art: "vault",
  lessons: [
    {
      id: "keys",
      icon: "key",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "vault" },
        {
          id: "where",
          type: "choice",
          options: ["app", "chain", "company"],
          correct: ["chain"],
        },
        { id: "generate", type: "interactive", widget: "key-pair" },
        {
          id: "share",
          type: "choice",
          options: ["key", "address", "both"],
          correct: ["address"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "recovery",
      icon: "scroll",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "lost",
          type: "choice",
          options: ["gone", "restore", "support"],
          correct: ["restore"],
        },
        {
          id: "storage",
          type: "choice",
          options: ["paper", "photo", "metal", "email"],
          correct: ["paper", "metal"],
          multi: true,
        },
        {
          id: "scam",
          type: "choice",
          options: ["send", "half", "refuse"],
          correct: ["refuse"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "signing",
      icon: "pen",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "proves",
          type: "choice",
          options: ["identity", "key", "secret"],
          correct: ["key"],
        },
        { id: "sign", type: "interactive", widget: "sign-verify" },
        {
          id: "blind",
          type: "choice",
          options: ["sign", "reject", "key"],
          correct: ["reject"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "addresses",
      icon: "at",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "ends",
          type: "choice",
          options: ["enough", "warn", "middle"],
          correct: ["middle"],
        },
        { id: "spot", type: "interactive", widget: "address-check" },
        {
          id: "poison",
          type: "choice",
          options: ["history", "ends", "source"],
          correct: ["source"],
        },
        {
          id: "wrong",
          type: "choice",
          options: ["support", "bounce", "owner"],
          correct: ["owner"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "custody",
      icon: "wallet",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "control",
          type: "choice",
          options: ["password", "exchange", "phrase"],
          correct: ["exchange"],
        },
        { id: "storage", type: "concept", paragraphs: 2 },
        { id: "sort", type: "interactive", widget: "custody-sort" },
        {
          id: "savings",
          type: "choice",
          options: ["exchange", "hardware", "phone"],
          correct: ["hardware"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "balance",
      type: "choice",
      options: ["app", "chain", "maker"],
      correct: ["chain"],
    },
    {
      id: "public",
      type: "choice",
      options: ["send", "move", "key"],
      correct: ["send"],
    },
    {
      id: "restore",
      type: "choice",
      options: ["support", "gone", "phrase"],
      correct: ["phrase"],
    },
    {
      id: "website",
      type: "choice",
      options: ["type", "close", "part"],
      correct: ["close"],
    },
    {
      id: "signature",
      type: "choice",
      options: ["identity", "key", "reveal", "exact"],
      correct: ["key", "exact"],
      multi: true,
    },
    {
      id: "unreadable",
      type: "choice",
      options: ["reject", "sign", "phrase"],
      correct: ["reject"],
    },
    {
      id: "lookalike",
      type: "choice",
      options: ["recent", "trusted", "ends"],
      correct: ["trusted"],
    },
    {
      id: "mistake",
      type: "choice",
      options: ["holder", "support", "bounce"],
      correct: ["holder"],
    },
    {
      id: "frozen",
      type: "choice",
      options: ["password", "phrase", "exchange"],
      correct: ["exchange"],
    },
    {
      id: "savings",
      type: "choice",
      options: ["phone", "split", "exchange"],
      correct: ["split"],
    },
  ],
}
