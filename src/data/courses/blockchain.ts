import type { Course } from "./types"

export const blockchainCourse: Course = {
  id: "blockchain",
  level: "beginner",
  theme: "teal",
  art: "blocks",
  lessons: [
    {
      id: "hashing",
      icon: "fingerprint",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "diamond" },
        {
          id: "predict",
          type: "choice",
          options: ["one", "few", "most"],
          correct: ["most"],
        },
        { id: "playground", type: "interactive", widget: "hash-playground" },
        {
          id: "reverse",
          type: "choice",
          options: ["backwards", "supercomputer", "no"],
          correct: ["no"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "chain",
      icon: "link",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        { id: "tamper", type: "interactive", widget: "chain-tamper" },
        {
          id: "detect",
          type: "choice",
          options: ["accepted", "unnoticed", "rejected"],
          correct: ["rejected"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "consensus",
      icon: "shield",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "diamond" },
        { id: "attack", type: "interactive", widget: "stake-vote" },
        {
          id: "slash",
          type: "choice",
          options: ["reward", "slashed", "nothing"],
          correct: ["slashed"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "nodes",
      icon: "server",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        {
          id: "predict",
          type: "choice",
          options: ["stops", "lost", "continues"],
          correct: ["continues"],
        },
        { id: "network", type: "interactive", widget: "node-network" },
        { id: "sync", type: "concept", paragraphs: 1 },
        {
          id: "who",
          type: "choice",
          options: ["stake", "approval", "anyone"],
          correct: ["anyone"],
        },
        {
          id: "why",
          type: "choice",
          options: ["faster", "check", "earn"],
          correct: ["check"],
        },
        {
          id: "roles",
          type: "match",
          pairs: ["hash", "block", "node", "validator"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "finality",
      icon: "badge",
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
      id: "tiny-change",
      type: "choice",
      options: ["one", "all", "none"],
      correct: ["all"],
    },
    {
      id: "work-back",
      type: "choice",
      options: ["reverse", "power", "guess"],
      correct: ["guess"],
    },
    {
      id: "rewrite",
      type: "choice",
      options: ["after", "next", "none"],
      correct: ["after"],
    },
    {
      id: "spot-edit",
      type: "choice",
      options: ["report", "slow", "links"],
      correct: ["links"],
    },
    {
      id: "stall",
      type: "choice",
      options: ["third", "half", "two-thirds"],
      correct: ["third"],
    },
    {
      id: "double-sign",
      type: "choice",
      options: ["penalty", "slashed", "nothing"],
      correct: ["slashed"],
    },
    {
      id: "back-online",
      type: "choice",
      options: ["broken", "trust", "sync"],
      correct: ["sync"],
    },
    {
      id: "run-node",
      type: "choice",
      options: ["anyone", "stake", "check", "earn"],
      correct: ["anyone", "check"],
      multi: true,
    },
    {
      id: "wait",
      type: "choice",
      options: ["block", "thirteen", "checkpoint"],
      correct: ["thirteen"],
    },
    {
      id: "undo",
      type: "choice",
      options: ["third", "edit", "nodes"],
      correct: ["third"],
    },
  ],
}
