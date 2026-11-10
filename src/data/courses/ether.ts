import type { Course } from "./types"

export const etherCourse: Course = {
  id: "ether",
  level: "beginner",
  theme: "blue",
  art: "diamond",
  lessons: [
    {
      id: "what",
      icon: "coins",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "diamond" },
        {
          id: "price",
          type: "choice",
          options: ["network", "company", "eth"],
          correct: ["eth"],
        },
        {
          id: "uses",
          type: "choice",
          options: ["fees", "stake", "money", "subscription"],
          correct: ["fees", "stake", "money"],
          multi: true,
        },
        {
          id: "empty",
          type: "choice",
          options: ["free", "need", "loan"],
          correct: ["need"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "units",
      icon: "calculator",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "coins" },
        {
          id: "biggest",
          type: "choice",
          options: ["wei", "gwei", "eth"],
          correct: ["eth"],
        },
        { id: "convert", type: "interactive", widget: "unit-converter" },
        {
          id: "price",
          type: "choice",
          options: ["same", "billion", "fraction"],
          correct: ["billion"],
        },
        {
          id: "balance",
          type: "choice",
          options: ["bug", "same", "extra"],
          correct: ["same"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "supply",
      icon: "flame",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["more", "less", "same"],
          correct: ["more"],
        },
        { id: "balance", type: "interactive", widget: "supply-balance" },
        {
          id: "quiet",
          type: "choice",
          options: ["shrinks", "fixed", "grows"],
          correct: ["grows"],
        },
        {
          id: "who",
          type: "choice",
          options: ["bank", "founders", "rules"],
          correct: ["rules"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "wrapped",
      icon: "gift",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "predict",
          type: "choice",
          options: ["both", "one", "less"],
          correct: ["one"],
        },
        { id: "wrap", type: "interactive", widget: "wrap-eth" },
        {
          id: "gas",
          type: "choice",
          options: ["value", "fee", "send"],
          correct: ["fee"],
        },
        {
          id: "copy",
          type: "choice",
          options: ["name", "check", "bargain"],
          correct: ["check"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "staking",
      icon: "piggy",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "vault" },
        {
          id: "small",
          type: "choice",
          options: ["no", "own", "pool"],
          correct: ["pool"],
        },
        {
          id: "control",
          type: "order",
          items: ["solo", "operator", "pool", "exchange"],
        },
        {
          id: "risks",
          type: "choice",
          options: ["slashing", "offline", "trust", "guaranteed"],
          correct: ["slashing", "offline", "trust"],
          multi: true,
        },
        {
          id: "exchange",
          type: "choice",
          options: ["nothing", "control", "forever"],
          correct: ["control"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "own",
      type: "choice",
      options: ["eth", "shares", "network"],
      correct: ["eth"],
    },
    {
      id: "jobs",
      type: "choice",
      options: ["fees", "stake", "subscription", "money"],
      correct: ["fees", "stake", "money"],
      multi: true,
    },
    {
      id: "smallest",
      type: "choice",
      options: ["eth", "gwei", "wei"],
      correct: ["wei"],
    },
    {
      id: "gwei",
      type: "choice",
      options: ["same", "big", "fraction"],
      correct: ["big"],
    },
    {
      id: "shrink",
      type: "choice",
      options: ["busy", "quiet", "fixed"],
      correct: ["busy"],
    },
    {
      id: "rules",
      type: "choice",
      options: ["founders", "bank", "rules"],
      correct: ["rules"],
    },
    {
      id: "discount",
      type: "choice",
      options: ["normal", "backed", "name"],
      correct: ["backed"],
    },
    {
      id: "keep",
      type: "choice",
      options: ["keep", "all", "little"],
      correct: ["keep"],
    },
    {
      id: "risks",
      type: "choice",
      options: ["slashing", "forever", "offline", "trust"],
      correct: ["slashing", "offline", "trust"],
      multi: true,
    },
    {
      id: "solo",
      type: "choice",
      options: ["exchange", "solo", "pool"],
      correct: ["solo"],
    },
  ],
}
