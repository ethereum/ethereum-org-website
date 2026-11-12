import type { Course } from "./types"

export const sendingCourse: Course = {
  id: "sending",
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
          id: "done",
          type: "choice",
          options: ["signed", "sent", "block"],
          correct: ["block"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "fees",
      icon: "fuel",
      learnMore: "/gas/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "stamp" },
        {
          id: "predict",
          type: "choice",
          options: ["fails", "waits", "less"],
          correct: ["waits"],
        },
        { id: "meter", type: "interactive", widget: "fee-meter" },
        {
          id: "urgent",
          type: "choice",
          options: ["lowest", "going", "amount"],
          correct: ["going"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "line",
      icon: "box",
      learnMore: "/developers/docs/blocks/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        { id: "build", type: "interactive", widget: "next-block" },
        {
          id: "jump",
          type: "choice",
          options: ["first", "tip", "amount"],
          correct: ["tip"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["line", "block", "tip"],
          extras: ["amount", "wallet", "address"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "failed",
      icon: "alert",
      learnMore: "/developers/docs/gas/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["both", "fee", "nothing"],
          correct: ["fee"],
        },
        { id: "sort", type: "interactive", widget: "failed-sorter" },
        {
          id: "retry",
          type: "choice",
          options: ["again", "why", "refund"],
          correct: ["why"],
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
      source: "/developers/docs/transactions/#transaction-lifecycle",
      type: "choice",
      options: ["block", "key", "sign"],
      correct: ["sign"],
    },
    {
      id: "sent",
      source: "/developers/docs/transactions/#transaction-lifecycle",
      type: "choice",
      options: ["arrived", "waiting", "cancelled"],
      correct: ["waiting"],
    },
    // fees
    {
      id: "job",
      source: "/developers/docs/gas/#why-can-gas-fees-get-so-high",
      type: "choice",
      options: ["send", "same", "trade"],
      correct: ["trade"],
    },
    {
      id: "offer",
      source: "/developers/docs/gas/#base-fee",
      type: "choice",
      options: ["less", "waits", "fails"],
      correct: ["waits"],
    },
    // line
    {
      id: "space",
      source: "/developers/docs/blocks/#block-size",
      type: "choice",
      options: ["bank", "space", "small"],
      correct: ["space"],
    },
    {
      id: "tip",
      source: "/developers/docs/gas/#priority-fee",
      type: "choice",
      options: ["first", "amount", "tip"],
      correct: ["tip"],
    },
    // failed
    {
      id: "outcome",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["kept", "item", "fee", "refund"],
      correct: ["kept", "fee"],
      multi: true,
    },
    {
      id: "retry",
      source: "/developers/docs/gas/#what-is-gas-limit",
      type: "choice",
      options: ["spam", "nothing", "why"],
      correct: ["why"],
    },
    // explorer
    {
      id: "proof",
      source:
        "/developers/docs/data-and-analytics/block-explorers/#transactions",
      type: "choice",
      options: ["hash", "screenshot", "key"],
      correct: ["hash"],
    },
    {
      id: "status",
      source:
        "/developers/docs/data-and-analytics/block-explorers/#transactions",
      type: "choice",
      options: ["fee", "value", "status"],
      correct: ["status"],
    },
  ],
}
