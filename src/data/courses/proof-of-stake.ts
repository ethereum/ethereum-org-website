import type { Course } from "./types"

export const proofOfStakeCourse: Course = {
  id: "proof-of-stake",
  level: "intermediate",
  theme: { hue: 200 },
  art: "validators",
  lessons: [
    {
      id: "validators",
      icon: "server",
      learnMore: "/developers/docs/consensus-mechanisms/pos/#validators",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "validators" },
        {
          id: "need",
          type: "choice",
          options: ["stake", "permission", "online", "rig"],
          correct: ["stake", "online"],
          multi: true,
        },
        {
          id: "many",
          type: "choice",
          options: ["cheap", "stake", "banned"],
          correct: ["stake"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["thirty-two", "proposes", "rewards"],
          extras: ["one", "mines", "nothing"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "voting",
      icon: "pen",
      learnMore: "/developers/docs/consensus-mechanisms/pos/attestations/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "round",
          type: "order",
          items: ["pick", "send", "check", "attest", "include"],
        },
        {
          id: "rare",
          type: "choice",
          options: ["hourly", "lottery", "weekly"],
          correct: ["lottery"],
        },
        {
          id: "broken",
          type: "choice",
          options: ["fix", "vote", "retry"],
          correct: ["vote"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "slots",
      icon: "clock",
      learnMore: "/developers/docs/consensus-mechanisms/pos/block-proposal/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "hour",
          type: "choice",
          options: ["minute", "slots", "second"],
          correct: ["slots"],
        },
        {
          id: "missed",
          type: "choice",
          options: ["wait", "backup", "empty"],
          correct: ["empty"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["twelve", "thirty-two", "once"],
          extras: ["ten", "sixty-four", "every"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "finality",
      icon: "badge",
      learnMore: "/developers/docs/consensus-mechanisms/pos/#finality",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "diamond" },
        { id: "clock", type: "interactive", widget: "finality-clock" },
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
    {
      id: "penalties",
      icon: "shield",
      learnMore:
        "/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "sort", type: "interactive", widget: "validator-sort" },
        {
          id: "day",
          type: "choice",
          options: ["stake", "nothing", "rewards"],
          correct: ["rewards"],
        },
        {
          id: "together",
          type: "choice",
          options: ["shared", "attack", "random"],
          correct: ["attack"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    // validators
    {
      id: "deposit",
      source: "/developers/docs/consensus-mechanisms/pos/#validators",
      type: "choice",
      options: ["approval", "stake", "mining"],
    },
    {
      id: "weight",
      source: "/developers/docs/consensus-mechanisms/pos/#validators",
      type: "choice",
      options: ["limit", "ignored", "stake"],
    },
    // voting
    {
      id: "proposer",
      source:
        "/developers/docs/consensus-mechanisms/pos/block-proposal/#random-selection",
      type: "choice",
      options: ["random", "fastest", "rota"],
    },
    {
      id: "attest",
      source:
        "/developers/docs/consensus-mechanisms/pos/attestations/#what-is-an-attestation",
      type: "choice",
      options: ["receipt", "fee", "vote"],
    },
    // slots
    {
      id: "epoch",
      source:
        "/developers/docs/consensus-mechanisms/pos/block-proposal/#who-produces-blocks",
      type: "choice",
      options: ["seconds", "minutes", "hour"],
    },
    {
      id: "missed",
      source:
        "/developers/docs/consensus-mechanisms/pos/attestations/#missing-block-proposer",
      type: "choice",
      options: ["empty", "pause", "repeat"],
    },
    // finality
    {
      id: "wait",
      source: "/developers/docs/consensus-mechanisms/pos/#finality",
      type: "choice",
      options: ["block", "thirteen", "checkpoint"],
    },
    {
      id: "undo",
      source: "/developers/docs/consensus-mechanisms/pos/#finality",
      type: "choice",
      options: ["third", "edit", "nodes"],
    },
    // penalties
    {
      id: "offline",
      source:
        "/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#penalties",
      type: "choice",
      options: ["slash", "small", "nothing"],
    },
    {
      id: "correlated",
      source:
        "/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#slashing",
      type: "choice",
      options: ["same", "less", "more"],
    },
  ],
}
