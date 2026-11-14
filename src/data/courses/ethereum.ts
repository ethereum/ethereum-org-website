import type { Course } from "./types"

/**
 * How Ethereum uses a blockchain, in lay terms: what it keeps track of, the
 * programs anyone can add, ETH's jobs, who runs it and what it's used for.
 */
export const ethereumCourse: Course = {
  id: "ethereum",
  level: "beginner",
  theme: { hue: 315 },
  art: "platform",
  lessons: [
    {
      id: "anything",
      icon: "ticket",
      learnMore: "/what-is-ethereum/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "platform" },
        { id: "sort", type: "interactive", widget: "track-sort" },
        {
          id: "game",
          type: "choice",
          options: ["gone", "stays", "moves"],
          correct: ["stays"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "rules",
      icon: "code",
      learnMore: "/smart-contracts/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "contract" },
        {
          id: "predict",
          type: "choice",
          options: ["same", "differ", "fastest"],
          correct: ["same"],
        },
        {
          id: "life",
          type: "order",
          items: ["write", "add", "use", "run", "record"],
        },
        {
          id: "who",
          type: "choice",
          options: ["anyone", "approved", "nodes"],
          correct: ["anyone"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "jobs",
      icon: "coins",
      learnMore: "/what-is-ether/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        { id: "match", type: "match", pairs: ["fee", "send", "lock"] },
        {
          id: "miss",
          type: "choice",
          options: ["jobs", "nothing", "share"],
          correct: ["jobs"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "running",
      icon: "globe",
      learnMore: "/what-is-the-ethereum-network/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "notebook" },
        {
          id: "predict",
          type: "choice",
          options: ["founders", "company", "nobody"],
          correct: ["nobody"],
        },
        { id: "world", type: "interactive", widget: "node-world" },
        {
          id: "matters",
          type: "choice",
          options: ["free", "open", "frozen"],
          correct: ["open"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "uses",
      icon: "pointer",
      learnMore: "/use-cases/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "mailbox" },
        {
          id: "needs",
          type: "match",
          pairs: ["abroad", "stable", "art", "games"],
        },
        {
          id: "steady",
          type: "choice",
          options: ["stable", "art", "eth"],
          correct: ["stable"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "track",
      source: "/what-is-ethereum/",
      type: "choice",
      options: ["eth", "many", "files"],
    },
    {
      id: "password",
      source: "/developers/docs/intro-to-ethereum/#what-is-a-blockchain",
      type: "choice",
      options: ["public", "forgets", "long"],
    },
    {
      id: "who-adds",
      source: "/developers/docs/intro-to-ethereum/#what-are-smart-contracts",
      type: "choice",
      options: ["approved", "anyone", "nodes"],
    },
    {
      id: "same-result",
      source: "/smart-contracts/#predictability",
      type: "choice",
      options: ["average", "fastest", "same"],
    },
    {
      id: "fee",
      source: "/developers/docs/intro-to-ethereum/#what-is-ether",
      type: "choice",
      options: ["eth", "card", "free"],
    },
    {
      id: "lock",
      source: "/developers/docs/intro-to-ethereum/#what-is-ether",
      type: "choice",
      options: ["hide", "promise", "interest"],
    },
    {
      id: "owner",
      source: "/ethereum-history-founder-and-ownership/",
      type: "choice",
      options: ["founders", "company", "nobody"],
    },
    {
      id: "off",
      source: "/what-is-ethereum/",
      type: "choice",
      options: ["stops", "keeps", "lost"],
    },
    {
      id: "stablecoin",
      source: "/stablecoins/",
      type: "choice",
      options: ["grow", "steady", "vanish"],
    },
    {
      id: "drawing",
      source: "/nft/#what-are-nfts",
      type: "choice",
      options: ["owner", "file", "nothing"],
    },
  ],
}
