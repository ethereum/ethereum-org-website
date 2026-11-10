import type { Course } from "./types"

export const transactionsCourse: Course = {
  id: "transactions",
  level: "beginner",
  theme: "orange",
  art: "coins",
  lessons: [
    {
      id: "lifecycle",
      icon: "send",
      learnMore: "/developers/docs/transactions/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        {
          id: "order",
          type: "order",
          items: ["create", "sign", "broadcast", "include", "confirm"],
        },
        {
          id: "undo",
          type: "choice",
          options: ["support", "window", "final"],
          correct: ["final"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "gas",
      icon: "fuel",
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
          id: "cheaper",
          type: "choice",
          options: ["limit", "currency", "wait"],
          correct: ["wait"],
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
          id: "priority",
          type: "choice",
          options: ["limit", "tip", "resend"],
          correct: ["tip"],
        },
        {
          id: "final",
          type: "choice",
          options: ["instant", "never", "finalized"],
          correct: ["finalized"],
        },
        {
          id: "match-up",
          type: "match",
          pairs: ["tip", "base", "space", "final"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "failed",
      icon: "alert",
      learnMore: "/developers/docs/gas/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "tank" },
        {
          id: "predict",
          type: "choice",
          options: ["free", "fee", "later"],
          correct: ["fee"],
        },
        { id: "limit", type: "interactive", widget: "gas-limit" },
        {
          id: "headroom",
          type: "choice",
          options: ["lower", "exact", "keep"],
          correct: ["keep"],
        },
        {
          id: "undone",
          type: "choice",
          options: ["lost", "kept", "retry"],
          correct: ["kept"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["undone", "used", "refunded"],
          extras: ["retried", "lost", "allowed"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "explorer",
      icon: "search",
      learnMore: "/developers/docs/data-and-analytics/block-explorers/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        {
          id: "proof",
          type: "choice",
          options: ["screenshot", "hash", "balance"],
          correct: ["hash"],
        },
        { id: "read", type: "interactive", widget: "explorer-labels" },
        {
          id: "pending",
          type: "choice",
          options: ["failed", "waiting", "lost"],
          correct: ["waiting"],
        },
        {
          id: "public",
          type: "choice",
          options: ["you", "both", "anyone"],
          correct: ["anyone"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    // lifecycle
    {
      id: "sign",
      source: "/developers/docs/transactions/",
      type: "choice",
      options: ["block", "key", "sign"],
      correct: ["sign"],
    },
    {
      id: "undo",
      source: "/developers/docs/transactions/",
      type: "choice",
      options: ["final", "support", "window"],
      correct: ["final"],
    },
    // gas
    {
      id: "fee",
      source: "/gas/",
      type: "choice",
      options: ["gas", "fee", "price", "transfer"],
      correct: ["fee"],
    },
    {
      id: "wait",
      source: "/gas/",
      type: "choice",
      options: ["currency", "limit", "wait"],
      correct: ["wait"],
    },
    // blocks
    {
      id: "tip",
      source: "/developers/docs/blocks/",
      type: "choice",
      options: ["keep", "burn", "limit"],
      correct: ["keep"],
    },
    {
      id: "final",
      source: "/developers/docs/blocks/",
      type: "choice",
      options: ["instant", "finalized", "never"],
      correct: ["finalized"],
    },
    // failed
    {
      id: "outcome",
      source: "/developers/docs/gas/",
      type: "choice",
      options: ["sent", "fee", "refund", "undone"],
      correct: ["fee", "undone"],
      multi: true,
    },
    {
      id: "headroom",
      source: "/developers/docs/gas/",
      type: "choice",
      options: ["higher", "same", "fails"],
      correct: ["same"],
    },
    // explorer
    {
      id: "proof",
      source: "/developers/docs/data-and-analytics/block-explorers/",
      type: "choice",
      options: ["hash", "screenshot", "key"],
      correct: ["hash"],
    },
    {
      id: "status",
      source: "/developers/docs/data-and-analytics/block-explorers/",
      type: "choice",
      options: ["block", "fee", "value", "status"],
      correct: ["status"],
    },
  ],
}
