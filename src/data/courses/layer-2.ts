import type { Course } from "./types"

/**
 * Beginner pass on layer 2s: express lanes, bundling, networks, bridges and
 * checking the network. No proofs or timings; `rollups` goes deeper.
 */
export const layer2Course: Course = {
  id: "layer-2",
  level: "beginner",
  theme: { hue: 190 },
  art: "crate",
  lessons: [
    {
      id: "lanes",
      icon: "layers",
      learnMore: "/layer-2/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 2, art: "crate" },
        {
          id: "predict",
          type: "choice",
          options: ["main", "layer-2", "same"],
          correct: ["layer-2"],
        },
        { id: "try", type: "interactive", widget: "fee-lanes" },
        { id: "today", type: "concept", paragraphs: 1 },
        {
          id: "why",
          type: "choice",
          options: ["safe", "fees", "permission"],
          correct: ["safe"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "parcels",
      icon: "box",
      learnMore: "/layer-2/learn/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1 },
        { id: "try", type: "interactive", widget: "parcel-pack" },
        { id: "reveal", type: "concept", paragraphs: 2 },
        {
          id: "share",
          type: "choice",
          options: ["few", "many", "alone"],
          correct: ["many"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["payments", "bundle", "ethereum"],
          extras: ["keys", "wallet"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "networks",
      icon: "at",
      learnMore: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      steps: [
        { id: "picture", type: "concept", paragraphs: 2 },
        {
          id: "wrong",
          type: "choice",
          options: ["anyway", "ethereum", "vanish"],
          correct: ["ethereum"],
        },
        { id: "try", type: "interactive", widget: "network-match" },
        {
          id: "receive",
          type: "choice",
          options: ["network", "key", "nothing"],
          correct: ["network"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "bridge",
      icon: "link",
      learnMore: "/guides/how-to-use-a-bridge/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1 },
        { id: "try", type: "interactive", widget: "bridge-move" },
        { id: "reveal", type: "concept", paragraphs: 2 },
        {
          id: "link",
          type: "choice",
          options: ["hurry", "known", "small"],
          correct: ["known"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "check",
      icon: "eye",
      learnMore: "/guides/how-to-use-a-wallet/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 2 },
        { id: "try", type: "interactive", widget: "wallet-network" },
        {
          id: "mismatch",
          type: "choice",
          options: ["switch", "send", "new"],
          correct: ["switch"],
        },
        {
          id: "steps",
          type: "order",
          items: ["ask", "switch", "paste", "send"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "lane",
      source: "/layer-2/",
      type: "choice",
      options: ["layer-2", "ethereum", "bank"],
    },
    {
      id: "report",
      source: "/layer-2/learn/",
      type: "choice",
      options: ["hides", "report", "deletes"],
    },
    {
      id: "trip",
      source: "/layer-2/learn/",
      type: "choice",
      options: ["split", "wallets", "bundle"],
    },
    {
      id: "share",
      source: "/layer-2/learn/",
      type: "choice",
      options: ["share", "skip", "discount"],
    },
    {
      id: "address",
      source:
        "/guides/how-to-use-a-wallet/#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains",
      type: "choice",
      options: ["new", "same", "wallet"],
    },
    {
      id: "balance",
      source: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      type: "choice",
      options: ["all", "split", "none"],
    },
    {
      id: "bridge",
      source: "/bridges/#what-are-bridges",
      type: "choice",
      options: ["moves", "copies", "stores"],
    },
    {
      id: "giveaway",
      source: "/bridges/#bridge-risk",
      type: "choice",
      options: ["quick", "phrase", "known"],
    },
    {
      id: "screen",
      source: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      type: "choice",
      options: ["address", "network", "balance"],
    },
    {
      id: "before",
      source: "/guides/how-to-use-a-wallet/#send-cryptocurrency",
      type: "choice",
      options: ["send", "address", "switch"],
    },
  ],
}
