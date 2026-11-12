import type { Course } from "./types"

/**
 * Using Ethereum: what a token's name can't prove, what keeps a stablecoin
 * steady, and how to send and receive tokens without slipping up.
 */
export const tokensCourse: Course = {
  id: "tokens",
  level: "beginner",
  theme: { hue: 70 },
  art: "scale",
  lessons: [
    {
      id: "name",
      icon: "search",
      learnMore: "/guides/how-to-id-scam-tokens/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        {
          id: "predict",
          type: "choice",
          options: ["same", "unknown", "wallet"],
          correct: ["unknown"],
        },
        { id: "check", type: "interactive", widget: "token-check" },
        {
          id: "source",
          type: "choice",
          options: ["chat", "project", "search"],
          correct: ["project"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "stable",
      icon: "coins",
      learnMore: "/stablecoins/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "scale" },
        {
          id: "why",
          type: "choice",
          options: ["steady", "grows", "free"],
          correct: ["steady"],
        },
        { id: "backing", type: "concept", paragraphs: 1 },
        { id: "sort", type: "interactive", widget: "backing-sort" },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "steady",
      icon: "piggy",
      learnMore: "/stablecoins/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["short", "fine", "more"],
          correct: ["short"],
        },
        { id: "vaults", type: "interactive", widget: "backing-vaults" },
        {
          id: "freeze",
          type: "choice",
          options: ["freeze", "undo", "eth"],
          correct: ["freeze"],
        },
        {
          id: "nothing",
          type: "choice",
          options: ["trust", "company", "rises"],
          correct: ["trust"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "send",
      icon: "send",
      learnMore: "/guides/how-to-use-a-wallet/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "no-eth",
          type: "choice",
          options: ["token", "stuck", "free"],
          correct: ["stuck"],
        },
        {
          id: "network",
          type: "choice",
          options: ["moves", "bounce", "missing"],
          correct: ["missing"],
        },
        {
          id: "steps",
          type: "order",
          items: ["ask", "switch", "eth", "approve"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "free",
      icon: "gift",
      learnMore: "/security/#airdrop-scams",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "mailbox" },
        { id: "spot", type: "interactive", widget: "token-lure" },
        {
          id: "move",
          type: "choice",
          options: ["visit", "ignore", "swap"],
          correct: ["ignore"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "copy",
      source: "/guides/how-to-id-scam-tokens/#appearing-legitimate",
      type: "choice",
      options: ["picture", "address", "official"],
      correct: ["address"],
    },
    {
      id: "source",
      source: "/guides/how-to-id-scam-tokens/#protect-yourself",
      type: "choice",
      options: ["ad", "chat", "project"],
      correct: ["project"],
    },
    {
      id: "stable",
      source: "/stablecoins/",
      type: "choice",
      options: ["steady", "grow", "free"],
      correct: ["steady"],
    },
    {
      id: "bank",
      source: "/stablecoins/",
      type: "choice",
      options: ["crypto", "company", "rules"],
      correct: ["company"],
    },
    {
      id: "extra",
      source: "/stablecoins/",
      type: "choice",
      options: ["fees", "cushion", "grow"],
      correct: ["cushion"],
    },
    {
      id: "freeze",
      source: "/open-access/",
      type: "choice",
      options: ["company", "anyone", "wallet"],
      correct: ["company"],
    },
    {
      id: "fee",
      source: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      type: "choice",
      options: ["eth", "nothing", "token"],
      correct: ["eth"],
    },
    {
      id: "network",
      source: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      type: "choice",
      options: ["cheapest", "same", "any"],
      correct: ["same"],
    },
    {
      id: "public",
      source: "/security/#airdrop-scams",
      type: "choice",
      options: ["leaked", "approved", "public"],
      correct: ["public"],
    },
    {
      id: "claim",
      source: "/security/#airdrop-scams",
      type: "choice",
      options: ["connect", "ignore", "visit"],
      correct: ["ignore"],
    },
  ],
}
