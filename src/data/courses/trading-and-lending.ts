import type { Course } from "./types"

/**
 * Using Ethereum: how trading and lending apps work as smart contracts,
 * taught through everyday stand-ins (a fruit stand, a pawn shop)
 */
export const tradingAndLendingCourse: Course = {
  id: "trading-and-lending",
  level: "beginner",
  theme: { hue: 250 },
  art: "tanks",
  lessons: [
    {
      id: "apps",
      icon: "code",
      learnMore: "/defi/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "tanks" },
        {
          id: "swap",
          type: "order",
          items: ["connect", "pick", "approve", "swap", "check"],
        },
        {
          id: "trust",
          type: "choice",
          options: ["clerk", "code", "bank"],
          correct: ["code"],
        },
        { id: "admin", type: "concept", paragraphs: 1 },
        {
          id: "controls",
          type: "choice",
          options: ["never", "both", "safer"],
          correct: ["both"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "pool",
      icon: "coins",
      learnMore: "/guides/how-to-swap-tokens/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "guess",
          type: "choice",
          options: ["same", "more", "less"],
          correct: ["more"],
        },
        { id: "stand", type: "interactive", widget: "pool-swap" },
        {
          id: "size",
          type: "choice",
          options: ["tiny", "same", "huge"],
          correct: ["huge"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "limit",
      icon: "alert",
      learnMore: "/guides/how-to-swap-tokens/#what-is-slippage",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "first",
          type: "choice",
          options: ["same", "worse", "better"],
          correct: ["worse"],
        },
        { id: "set", type: "interactive", widget: "swap-limit" },
        {
          id: "any",
          type: "choice",
          options: ["fee", "never", "worse"],
          correct: ["worse"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "borrow",
      icon: "piggy",
      learnMore: "/defi/#lending",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "less",
          type: "choice",
          options: ["fee", "cushion", "trust"],
          correct: ["cushion"],
        },
        { id: "cushion", type: "interactive", widget: "collateral" },
        {
          id: "falling",
          type: "choice",
          options: ["warn", "support", "repay"],
          correct: ["repay"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "rewards",
      icon: "gift",
      learnMore: "/defi/#saving",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "sort", type: "interactive", widget: "reward-sort" },
        {
          id: "secret",
          type: "choice",
          options: ["strategy", "newer", "ethereum"],
          correct: ["newer"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "keep",
      source: "/defi/#swaps",
      type: "choice",
      options: ["app", "wallet", "pool"],
    },
    {
      id: "admin",
      source:
        "/developers/docs/smart-contracts/upgrading/#pros-and-cons-of-upgrading-smart-contracts",
      type: "choice",
      options: ["code", "nothing", "both"],
    },
    {
      id: "big",
      source: "/guides/how-to-id-scam-tokens/#protect-yourself",
      type: "choice",
      options: ["small", "huge", "same"],
    },
    {
      id: "depth",
      source: "/guides/how-to-id-scam-tokens/#protect-yourself",
      type: "choice",
      options: ["steady", "worse", "refund"],
    },
    {
      id: "canceled",
      source: "/developers/docs/gas/#what-is-gas",
      type: "choice",
      options: ["lost", "half", "kept"],
    },
    {
      id: "limit",
      source: "/guides/how-to-swap-tokens/#what-is-slippage",
      type: "choice",
      options: ["none", "small", "any"],
    },
    {
      id: "pawn",
      source: "/defi/#borrowing-privacy",
      type: "choice",
      options: ["cushion", "profit", "identity"],
    },
    {
      id: "drop",
      source: "/developers/docs/mev/#mev-examples-liquidations",
      type: "choice",
      options: ["reminder", "sold", "nothing"],
    },
    {
      id: "interest",
      source: "/defi/#lending",
      type: "choice",
      options: ["ethereum", "app", "borrowers"],
    },
    {
      id: "secret",
      source: "/security/#mining-pool-scams",
      type: "choice",
      options: ["careful", "safe", "staking"],
    },
  ],
}
