import type { Course } from "./types"

export const gasCourse: Course = {
  id: "gas",
  level: "intermediate",
  theme: { hue: 85 },
  art: "tank",
  lessons: [
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
          extras: ["retried", "burned", "allowed"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    // gas
    {
      id: "fee",
      source: "/gas/",
      type: "choice",
      options: ["gas", "fee", "price"],
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
      source: "/developers/docs/gas/#priority-fee",
      type: "choice",
      options: ["keep", "burn", "limit"],
      correct: ["keep"],
    },
    {
      id: "final",
      source: "/developers/docs/consensus-mechanisms/pos/#finality",
      type: "choice",
      options: ["instant", "finalized", "never"],
      correct: ["finalized"],
    },
    // failed
    {
      id: "outcome",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["sent", "fee", "refund", "undone"],
      correct: ["fee", "undone"],
      multi: true,
    },
    {
      id: "headroom",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["higher", "same", "fails"],
      correct: ["same"],
    },
  ],
}
