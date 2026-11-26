import type { Course } from "./types"

/**
 * How any blockchain works, building on Everyday's notebook: blocks are its
 * pages, hashes link them, nodes keep the copies and consensus picks the
 * next page. Ethereum's own particulars live in the Ethereum course.
 */
export const blockchainsCourse: Course = {
  id: "blockchains",
  level: "beginner",
  theme: "teal",
  art: "blocks",
  lessons: [
    {
      id: "hashing",
      icon: "fingerprint",
      learnMore: "/videos/hash-function-eth-build/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
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
      learnMore: "/developers/docs/intro-to-ethereum/#what-is-a-blockchain",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        {
          id: "predict",
          type: "choice",
          options: ["nothing", "breaks", "fixes"],
          correct: ["breaks"],
        },
        { id: "tamper", type: "interactive", widget: "chain-tamper" },
        {
          id: "detect",
          type: "choice",
          options: ["accepted", "old", "rejected"],
          correct: ["rejected"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "nodes",
      icon: "server",
      learnMore: "/run-a-node/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "notebook" },
        {
          id: "predict",
          type: "choice",
          options: ["stops", "lost", "continues"],
          correct: ["continues"],
        },
        { id: "network", type: "interactive", widget: "node-network" },
        {
          id: "who",
          type: "choice",
          options: ["approval", "company", "anyone"],
          correct: ["anyone"],
        },
        {
          id: "why",
          type: "choice",
          options: ["faster", "check", "earn"],
          correct: ["check"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "consensus",
      icon: "shield",
      learnMore: "/developers/docs/consensus-mechanisms/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "blocks" },
        {
          id: "predict",
          type: "choice",
          options: ["both", "agree", "boss"],
          correct: ["agree"],
        },
        { id: "ways", type: "concept", paragraphs: 2 },
        { id: "try", type: "interactive", widget: "next-page" },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "many",
      icon: "layers",
      learnMore: "/ethereum-vs-bitcoin/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        {
          id: "rules",
          type: "choice",
          options: ["same", "own", "copy"],
          correct: ["own"],
        },
        { id: "sort", type: "interactive", widget: "chain-sort" },
        {
          id: "fee",
          type: "choice",
          options: ["any", "own", "swap"],
          correct: ["own"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "tiny-change",
      source: "/developers/docs/blocks/",
      type: "choice",
      options: ["one", "all", "none"],
    },
    {
      id: "work-back",
      source: "/videos/hash-function-eth-build/#one-directional-property-237",
      type: "choice",
      options: ["reverse", "power", "guess"],
    },
    {
      id: "link",
      source: "/developers/docs/intro-to-ethereum/#what-is-a-blockchain",
      type: "choice",
      options: ["hash", "time", "name"],
    },
    {
      id: "repair",
      source: "/developers/docs/intro-to-ethereum/#what-is-a-blockchain",
      type: "choice",
      options: ["company", "counts", "others"],
    },
    {
      id: "back-online",
      source: "/run-a-node/",
      type: "choice",
      options: ["broken", "trust", "catch-up"],
    },
    {
      id: "who-runs",
      source: "/run-a-node/",
      type: "choice",
      options: ["anyone", "approved", "rich"],
    },
    {
      id: "agree",
      source: "/developers/docs/consensus-mechanisms/#what-is-consensus",
      type: "choice",
      options: ["match", "speed", "boss"],
    },
    {
      id: "today",
      source: "/developers/docs/consensus-mechanisms/#proof-of-stake",
      type: "choice",
      options: ["race", "stake", "fee"],
    },
    {
      id: "first",
      source: "/ethereum-vs-bitcoin/",
      type: "choice",
      options: ["bitcoin", "ethereum", "together"],
    },
    {
      id: "same",
      source: "/ethereum-vs-bitcoin/",
      type: "choice",
      options: ["one", "separate", "part"],
    },
  ],
}
