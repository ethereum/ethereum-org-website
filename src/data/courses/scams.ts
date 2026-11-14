import type { Course } from "./types"

/**
 * The capstone of the beginner tracks: each scam leans on something an
 * earlier course taught (signing, approvals, tokens, addresses, rewards),
 * so the course doubles as a review
 */
export const scamsCourse: Course = {
  id: "scams",
  level: "beginner",
  theme: { hue: 105 },
  art: "lure",
  lessons: [
    {
      id: "playbook",
      icon: "alert",
      learnMore: "/security/#common-scams",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "lure" },
        { id: "sort", type: "interactive", widget: "red-flag-sort" },
        {
          id: "one",
          type: "choice",
          options: ["sign", "stop", "free"],
          correct: ["stop"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "lookalike",
      icon: "search",
      learnMore: "/guides/how-to-id-scam-tokens/#websites",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "copy",
          type: "choice",
          options: ["logo", "address", "design"],
          correct: ["address"],
        },
        { id: "pick", type: "interactive", widget: "site-check" },
        {
          id: "ad",
          type: "choice",
          options: ["ad", "dm", "bookmark"],
          correct: ["bookmark"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "signatures",
      icon: "pen",
      learnMore: "/security/#double-check-transactions",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "free",
          type: "choice",
          options: ["safe", "depends", "eth"],
          correct: ["depends"],
        },
        { id: "spot", type: "interactive", widget: "sign-request" },
        {
          id: "login",
          type: "choice",
          options: ["never", "phrase", "sign"],
          correct: ["sign"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "bait",
      icon: "gift",
      learnMore: "/security/#airdrop-scams",
      steps: [
        { id: "intro", type: "concept", paragraphs: 1 },
        { id: "spot", type: "interactive", widget: "claim-site" },
        { id: "trail", type: "concept", paragraphs: 2 },
        {
          id: "signed",
          type: "choice",
          options: ["fine", "revoke", "again"],
          correct: ["revoke"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "too-good",
      icon: "eye",
      learnMore: "/security/#broker-scams",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "stages",
          type: "order",
          items: ["hello", "friends", "tip", "join", "grow", "fee"],
        },
        {
          id: "bot",
          type: "choice",
          options: ["cheap", "guarantee", "screenshots"],
          correct: ["guarantee"],
        },
        {
          id: "tax",
          type: "choice",
          options: ["pay", "wait", "scam"],
          correct: ["scam"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "response",
      icon: "shield",
      learnMore: "/community/support/scams/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "phrase",
          type: "choice",
          options: ["enough", "password", "new"],
          correct: ["new"],
        },
        {
          id: "steps",
          type: "order",
          items: ["stop", "new", "move", "report"],
        },
        {
          id: "recovery",
          type: "choice",
          options: ["help", "scam", "police"],
          correct: ["scam"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "marks",
      source: "/security/#giveaway",
      type: "choice",
      options: ["hurry", "secret", "good", "ask"],
      correct: ["hurry", "good", "ask"],
      multi: true,
    },
    {
      id: "one",
      source: "/security/#common-scams",
      type: "choice",
      options: ["fine", "stop", "reply"],
      correct: ["stop"],
    },
    {
      id: "copycat",
      source: "/guides/how-to-id-scam-tokens/#websites",
      type: "choice",
      options: ["address", "padlock", "speed"],
      correct: ["address"],
    },
    {
      id: "bookmark",
      source: "/community/support/scams/#scam-types",
      type: "choice",
      options: ["search", "message", "bookmark"],
      correct: ["bookmark"],
    },
    {
      id: "free",
      source: "/guides/how-to-id-scam-tokens/",
      type: "choice",
      options: ["later", "permission", "twice"],
      correct: ["permission"],
    },
    {
      id: "read",
      source: "/security/#double-check-transactions",
      type: "choice",
      options: ["who", "what", "button", "amount"],
      correct: ["who", "what", "amount"],
      multi: true,
    },
    {
      id: "lead",
      source: "/security/#airdrop-scams",
      type: "choice",
      options: ["gift", "drain", "nowhere"],
      correct: ["drain"],
    },
    {
      id: "trap",
      source: "/security/#airdrop-scams",
      type: "choice",
      options: ["connect", "look", "sign"],
      correct: ["sign"],
    },
    {
      id: "guarantee",
      source: "/security/#broker-scams",
      type: "choice",
      options: ["scam", "luck", "tip"],
      correct: ["scam"],
    },
    {
      id: "withdraw",
      source: "/security/#broker-scams",
      type: "choice",
      options: ["normal", "scam", "wait"],
      correct: ["scam"],
    },
    {
      id: "phrase",
      source: "/community/support/scams/#secure-assets",
      type: "choice",
      options: ["revoke", "rename", "move"],
      correct: ["move"],
    },
    {
      id: "recovery",
      source: "/community/support/scams/#scam-types",
      type: "choice",
      options: ["ignore", "pay", "half"],
      correct: ["ignore"],
    },
  ],
}
