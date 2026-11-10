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
      type: "choice",
      options: ["block", "key", "sign"],
      correct: ["sign"],
    },
    {
      id: "undo",
      type: "choice",
      options: ["final", "support", "window"],
      correct: ["final"],
    },
    // gas
    {
      id: "fee",
      type: "choice",
      options: ["gas", "fee", "price", "transfer"],
      correct: ["fee"],
    },
    {
      id: "wait",
      type: "choice",
      options: ["currency", "limit", "wait"],
      correct: ["wait"],
    },
    // blocks
    {
      id: "tip",
      type: "choice",
      options: ["keep", "burn", "limit"],
      correct: ["keep"],
    },
    {
      id: "final",
      type: "choice",
      options: ["instant", "finalized", "never"],
      correct: ["finalized"],
    },
    // failed
    {
      id: "outcome",
      type: "choice",
      options: ["sent", "fee", "refund", "undone"],
      correct: ["fee", "undone"],
      multi: true,
    },
    {
      id: "headroom",
      type: "choice",
      options: ["higher", "same", "fails"],
      correct: ["same"],
    },
    // explorer
    {
      id: "proof",
      type: "choice",
      options: ["hash", "screenshot", "key"],
      correct: ["hash"],
    },
    {
      id: "status",
      type: "choice",
      options: ["block", "fee", "value", "status"],
      correct: ["status"],
    },
  ],
}
