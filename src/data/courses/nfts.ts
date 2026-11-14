import type { Course } from "./types"

/**
 * Using Ethereum: one-of-a-kind tokens, what owning one means, telling an
 * original from a copy, readable names for addresses, and NFT permissions.
 */
export const nftsCourse: Course = {
  id: "nfts",
  level: "beginner",
  theme: { hue: 325 },
  art: "frame",
  lessons: [
    {
      id: "unique",
      icon: "fingerprint",
      learnMore: "/nft/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "frame" },
        {
          id: "half",
          type: "choice",
          options: ["split", "whole", "copy"],
          correct: ["whole"],
        },
        { id: "ledger", type: "interactive", widget: "nft-ledger" },
        {
          id: "like",
          type: "choice",
          options: ["coins", "seat", "card"],
          correct: ["seat"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "own",
      icon: "box",
      learnMore: "/nft/#how-nfts-work",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["gone", "still", "host"],
          correct: ["still"],
        },
        { id: "host", type: "interactive", widget: "nft-host" },
        {
          id: "last",
          type: "choice",
          options: ["price", "many", "famous"],
          correct: ["many"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "copy",
      icon: "eye",
      learnMore: "/nft/#nft-use-cases",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "allowed",
          type: "choice",
          options: ["blocked", "anyone", "pay"],
          correct: ["anyone"],
        },
        { id: "proof", type: "interactive", widget: "nft-proof" },
        {
          id: "twins",
          type: "choice",
          options: ["price", "likes", "address"],
          correct: ["address"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "names",
      icon: "at",
      learnMore: "/developers/docs/smart-contracts/naming/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "why",
          type: "choice",
          options: ["private", "spot", "undo"],
          correct: ["spot"],
        },
        { id: "spot", type: "interactive", widget: "name-check" },
        {
          id: "know",
          type: "choice",
          options: ["public", "hides", "renew", "forever"],
          correct: ["public", "renew"],
          multi: true,
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "approve",
      icon: "shield",
      learnMore: "/guides/how-to-revoke-token-access/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "scope", type: "interactive", widget: "nft-approval" },
        {
          id: "later",
          type: "choice",
          options: ["covered", "old", "ended"],
          correct: ["covered"],
        },
        {
          id: "done",
          type: "fill",
          blanks: ["all", "revoke"],
          extras: ["one", "share"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "uses",
      icon: "badge",
      learnMore: "/nft/#nft-use-cases",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "match",
          type: "match",
          pairs: ["ticket", "badge", "card", "tag"],
        },
        {
          id: "gate",
          type: "choice",
          options: ["blurry", "owner", "secret"],
          correct: ["owner"],
        },
        {
          id: "helpers",
          type: "choice",
          options: ["bought", "staff", "helped"],
          correct: ["helped"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "coin",
      source: "/nft/#what-are-nfts",
      type: "choice",
      options: ["cheaper", "unique", "free"],
    },
    {
      id: "owners",
      source: "/nft/#how-nfts-work",
      type: "choice",
      options: ["one", "savers", "none"],
    },
    {
      id: "picture",
      source: "/nft/#nft-use-cases",
      type: "choice",
      options: ["chain", "elsewhere", "wallet"],
    },
    {
      id: "offline",
      source: "/nft/#how-nfts-work",
      type: "choice",
      options: ["host", "nobody", "you"],
    },
    {
      id: "copier",
      source: "/nft/#nft-use-cases",
      type: "choice",
      options: ["yes", "blocked", "pay"],
    },
    {
      id: "proof",
      source: "/nft/#nft-use-cases",
      type: "choice",
      options: ["name", "picture", "address"],
    },
    {
      id: "name",
      source:
        "/developers/docs/smart-contracts/naming/#human-readable-identifiers",
      type: "choice",
      options: ["points", "hides", "key"],
    },
    {
      id: "renew",
      source: "/developers/docs/smart-contracts/naming/#risks",
      type: "choice",
      options: ["forever", "lose", "address"],
    },
    {
      id: "all",
      source: "/developers/docs/standards/tokens/erc-721/#methods",
      type: "choice",
      options: ["one", "everything", "collection"],
    },
    {
      id: "revoke",
      source: "/guides/how-to-revoke-token-access/",
      type: "choice",
      options: ["revoke", "wait", "disconnect"],
    },
    {
      id: "gate",
      source: "/nft/#nft-use-cases",
      type: "choice",
      options: ["code", "list", "call"],
    },
    {
      id: "badge",
      source: "/nft/#nft-use-cases",
      type: "choice",
      options: ["finished", "paid", "teaches"],
    },
  ],
}
