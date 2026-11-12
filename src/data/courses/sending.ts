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
          id: "undo",
          type: "choice",
          options: ["support", "window", "final"],
          correct: ["final"],
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
      id: "undo",
      source: "/developers/docs/transactions/",
      type: "choice",
      options: ["final", "support", "window"],
      correct: ["final"],
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
