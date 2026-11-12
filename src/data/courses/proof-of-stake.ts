import type { Course } from "./types"

export const proofOfStakeCourse: Course = {
  id: "proof-of-stake",
  level: "intermediate",
  theme: { hue: 200 },
  art: "stamp",
  lessons: [
    {
      id: "finality",
      icon: "badge",
      learnMore: "/developers/docs/consensus-mechanisms/pos/#finality",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "diamond" },
        { id: "clock", type: "interactive", widget: "finality-clock" },
        { id: "slashing", type: "concept", paragraphs: 2 },
        {
          id: "offline",
          type: "choice",
          options: ["slashed", "rewards", "waits"],
          correct: ["rewards"],
        },
        {
          id: "reverse",
          type: "choice",
          options: ["node", "majority", "third"],
          correct: ["third"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["slots", "checkpoint", "final"],
          extras: ["nodes", "hashes", "slashed"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "wait",
      source: "/developers/docs/consensus-mechanisms/pos/#finality",
      type: "choice",
      options: ["block", "thirteen", "checkpoint"],
      correct: ["thirteen"],
    },
    {
      id: "undo",
      source: "/developers/docs/consensus-mechanisms/pos/#finality",
      type: "choice",
      options: ["third", "edit", "nodes"],
      correct: ["third"],
    },
  ],
}
