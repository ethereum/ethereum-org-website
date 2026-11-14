import type { Course } from "./types"

export const gasCourse: Course = {
  id: "gas",
  level: "intermediate",
  theme: { hue: 85 },
  art: "tank",
  lessons: [
    {
      id: "units",
      icon: "calculator",
      learnMore: "/gas/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "tank" },
        { id: "calculator", type: "interactive", widget: "gas-fee" },
        {
          id: "compare",
          type: "choice",
          options: ["transfer", "swap", "same"],
          correct: ["swap"],
        },
        {
          id: "rank",
          type: "order",
          items: ["transfer", "token", "trade", "deploy"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "fees",
      icon: "flame",
      learnMore: "/developers/docs/gas/#base-fee",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["climb", "same", "top"],
          correct: ["climb"],
        },
        { id: "meter", type: "interactive", widget: "base-fee" },
        {
          id: "split",
          type: "choice",
          options: ["all", "tip", "base"],
          correct: ["tip"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "blocks",
      icon: "box",
      learnMore: "/developers/docs/blocks/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        { id: "build", type: "interactive", widget: "block-builder" },
        {
          id: "per-gas",
          type: "choice",
          options: ["a", "b", "same"],
          correct: ["b"],
        },
        {
          id: "builder",
          type: "choice",
          options: ["big", "tip", "order"],
          correct: ["tip"],
        },
        {
          id: "match-up",
          type: "match",
          pairs: ["tip", "base", "space", "builder"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "failed",
      icon: "alert",
      learnMore: "/developers/docs/gas/#what-is-gas-limit",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "tank" },
        {
          id: "cost",
          type: "choice",
          options: ["free", "used", "limit"],
          correct: ["used"],
        },
        { id: "limit", type: "interactive", widget: "gas-limit" },
        {
          id: "headroom",
          type: "choice",
          options: ["lower", "exact", "keep"],
          correct: ["keep"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["undone", "used", "refunded"],
          extras: ["retried", "burned", "allowed"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "stuck",
      icon: "queue",
      learnMore: "/community/support/faq/#stuck-transaction",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["first", "waits", "replaces"],
          correct: ["waits"],
        },
        { id: "queue", type: "interactive", widget: "nonce-queue" },
        {
          id: "cancel",
          type: "choice",
          options: ["self", "again", "wait"],
          correct: ["self"],
        },
        {
          id: "terms",
          type: "match",
          pairs: ["nonce", "speed", "cancel"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    // units
    {
      id: "fee",
      source: "/developers/docs/gas/#how-are-gas-fees-calculated",
      type: "choice",
      options: ["gas", "fee", "price"],
    },
    {
      id: "token",
      source: "/developers/docs/gas/#what-is-gas",
      type: "choice",
      options: ["contract", "creator", "value"],
    },
    // fees
    {
      id: "burn",
      source: "/developers/docs/gas/#how-are-gas-fees-calculated",
      type: "choice",
      options: ["tip", "burned", "total"],
    },
    {
      id: "rise",
      source: "/developers/docs/gas/#base-fee",
      type: "choice",
      options: ["fixed", "drop", "climb"],
    },
    // blocks
    {
      id: "tip",
      source: "/developers/docs/gas/#priority-fee",
      type: "choice",
      options: ["keep", "burn", "limit"],
    },
    {
      id: "builder",
      source: "/developers/docs/mev/#builder-api",
      type: "choice",
      options: ["server", "builder", "sender"],
    },
    // failed
    {
      id: "outcome",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["sent", "fee", "refund", "undone"],
      multi: true,
    },
    {
      id: "headroom",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["higher", "same", "fails"],
    },
    // stuck
    {
      id: "order",
      source: "/developers/docs/transactions/#whats-a-transaction",
      type: "choice",
      options: ["jumps", "replaces", "waits"],
    },
    {
      id: "cancel",
      source: "/community/support/faq/#stuck-transaction",
      type: "choice",
      options: ["delete", "self", "next"],
    },
  ],
}
