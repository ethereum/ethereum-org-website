import type { Course } from "./types"

/**
 * Intermediate pass on layer 2s: what rollups post, the two kinds of proof,
 * the ways out and what backs bridged ETH. Builds on `layer-2`.
 */
export const rollupsCourse: Course = {
  id: "rollups",
  level: "intermediate",
  theme: { hue: 340 },
  art: "rollup",
  lessons: [
    {
      id: "posted",
      icon: "scroll",
      learnMore: "/developers/docs/scaling/#rollups",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "rollup" },
        {
          id: "offline",
          type: "choice",
          options: ["gone", "replay", "list"],
          correct: ["replay"],
        },
        { id: "replay", type: "interactive", widget: "rollup-replay" },
        {
          id: "blobs",
          type: "choice",
          options: ["proof", "window", "forever"],
          correct: ["window"],
        },
        {
          id: "terms",
          type: "match",
          pairs: ["rollup", "batch", "blob", "state"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "optimistic",
      icon: "clock",
      learnMore: "/developers/docs/scaling/optimistic-rollups/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "challenge", type: "interactive", widget: "fraud-challenge" },
        {
          id: "honest",
          type: "choice",
          options: ["one", "majority", "validators"],
          correct: ["one"],
        },
        {
          id: "withdraw",
          type: "choice",
          options: ["queue", "window", "fee"],
          correct: ["window"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "zk",
      icon: "badge",
      learnMore: "/developers/docs/scaling/zk-rollups/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "verify", type: "interactive", widget: "proof-check" },
        {
          id: "journey",
          type: "order",
          items: ["run", "prove", "post", "check", "accept"],
        },
        {
          id: "exit",
          type: "choice",
          options: ["week", "operator", "verified"],
          correct: ["verified"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "exits",
      icon: "send",
      learnMore: "/developers/docs/bridges/#trade-offs",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "race", type: "interactive", widget: "exit-race" },
        {
          id: "trust",
          type: "choice",
          options: ["validators", "provider", "nothing"],
          correct: ["provider"],
        },
        {
          id: "month",
          type: "choice",
          options: ["fast", "own", "split"],
          correct: ["own"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "risk",
      icon: "shield",
      learnMore: "/bridges/#bridge-risk",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "backing", type: "interactive", widget: "bridge-backing" },
        {
          id: "signers",
          type: "choice",
          options: ["slow", "keys", "fees"],
          correct: ["keys"],
        },
        {
          id: "judge",
          type: "choice",
          multi: true,
          options: ["native", "record", "bonus", "audited"],
          correct: ["native", "record", "audited"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "data",
      source: "/developers/docs/scaling/#rollups",
      type: "choice",
      options: ["balances", "data", "nothing"],
      correct: ["data"],
    },
    {
      id: "blob",
      source: "/roadmap/danksharding/#what-is-protodanksharding",
      type: "choice",
      options: ["copies", "unused", "proof"],
      correct: ["copies"],
    },
    {
      id: "assume",
      source:
        "/developers/docs/scaling/optimistic-rollups/#what-is-an-optimistic-rollup",
      type: "choice",
      options: ["replays", "valid", "proof"],
      correct: ["valid"],
    },
    {
      id: "week",
      source: "/developers/docs/scaling/optimistic-rollups/#asset-movement",
      type: "choice",
      options: ["busy", "fee", "challenge"],
      correct: ["challenge"],
    },
    {
      id: "validity",
      source: "/developers/docs/scaling/zk-rollups/#validity-proofs",
      type: "choice",
      options: ["proof", "keys", "same"],
      correct: ["proof"],
    },
    {
      id: "bad",
      source: "/developers/docs/scaling/zk-rollups/#transaction-finality",
      type: "choice",
      options: ["week", "rejected", "counts"],
      correct: ["rejected"],
    },
    {
      id: "fast",
      source: "/developers/docs/scaling/optimistic-rollups/#asset-movement",
      type: "choice",
      options: ["provider", "skip", "mint"],
      correct: ["provider"],
    },
    {
      id: "tradeoff",
      source: "/developers/docs/bridges/#trade-offs",
      type: "choice",
      options: ["none", "slower", "trust"],
      correct: ["trust"],
    },
    {
      id: "backing",
      source: "/bridges/#bridge-risk",
      type: "choice",
      options: ["safe", "unbacked", "refund"],
      correct: ["unbacked"],
    },
    {
      id: "safer",
      source: "/developers/docs/bridges/#trade-offs",
      type: "choice",
      options: ["signers", "message", "native"],
      correct: ["native"],
    },
  ],
}
