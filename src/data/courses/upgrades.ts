import type { Course } from "./types"

export const upgradesCourse: Course = {
  id: "upgrades",
  level: "intermediate",
  theme: { hue: 300 },
  art: "upgrade",
  lessons: [
    {
      id: "who",
      icon: "users",
      learnMore: "/governance/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "upgrade" },
        {
          id: "predict",
          type: "choice",
          options: ["fame", "agree", "vote"],
          correct: ["agree"],
        },
        { id: "roles", type: "concept", paragraphs: 2 },
        {
          id: "refuse",
          type: "choice",
          options: ["automatic", "refuse", "founders"],
          correct: ["refuse"],
        },
        {
          id: "match",
          type: "match",
          pairs: ["authors", "clients", "runners", "users"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "eips",
      icon: "scroll",
      learnMore: "/eips/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "author",
          type: "choice",
          options: ["devs", "anyone", "holders"],
          correct: ["anyone"],
        },
        { id: "kinds", type: "concept", paragraphs: 2 },
        { id: "sort", type: "interactive", widget: "eip-sort" },
        {
          id: "bundle",
          type: "choice",
          options: ["fees", "coordinate", "rule"],
          correct: ["coordinate"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "path",
      icon: "badge",
      learnMore: "/governance/#formal-process",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "steps",
          type: "order",
          items: ["draft", "calls", "build", "test", "install", "activate"],
        },
        {
          id: "testnet",
          type: "choice",
          options: ["vote", "bugs", "fund"],
          correct: ["bugs"],
        },
        {
          id: "scam",
          type: "choice",
          options: ["link", "exchange", "ignore"],
          correct: ["ignore"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "clients",
      icon: "server",
      learnMore: "/developers/docs/nodes-and-clients/client-diversity/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "drill", type: "interactive", widget: "client-bug" },
        {
          id: "share",
          type: "choice",
          options: ["half", "third", "never"],
          correct: ["third"],
        },
        {
          id: "pick",
          type: "choice",
          options: ["big", "same", "small"],
          correct: ["small"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "forks",
      icon: "fork",
      learnMore: "/ethereum-forks/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "stuck",
          type: "choice",
          options: ["wait", "update", "restart"],
          correct: ["update"],
        },
        { id: "split", type: "concept", paragraphs: 2 },
        {
          id: "balance",
          type: "choice",
          options: ["half", "winner", "both"],
          correct: ["both"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["upgrade", "splits", "history"],
          extras: ["vote", "merges", "owner"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "alone",
      source: "/governance/#decentralized-governance",
      type: "choice",
      options: ["developers", "nobody", "holders"],
    },
    {
      id: "oppose",
      source: "/governance/#community-consensus",
      type: "choice",
      options: ["forced", "vote", "dropped"],
    },
    {
      id: "write",
      source: "/eips/#what-are-eips",
      type: "choice",
      options: ["eip", "permission", "stake"],
    },
    {
      id: "core",
      source: "/eips/#why-do-eips-matter",
      type: "choice",
      options: ["gas", "token", "block", "wallet"],
      multi: true,
    },
    {
      id: "before",
      source: "/governance/#formal-process",
      type: "choice",
      options: ["vote", "live", "testnet"],
    },
    {
      id: "holder",
      source: "/roadmap/pectra/#scam-alert",
      type: "choice",
      options: ["convert", "nothing", "move"],
    },
    {
      id: "minority",
      source: "/developers/docs/nodes-and-clients/client-diversity/#finality",
      type: "choice",
      options: ["carries", "stalls", "wrong"],
    },
    {
      id: "why",
      source:
        "/developers/docs/nodes-and-clients/client-diversity/#why-multiple-clients",
      type: "choice",
      options: ["speed", "resilience", "rules"],
    },
    {
      id: "skipped",
      source: "/roadmap/pectra/#client-impact",
      type: "choice",
      options: ["auto", "fine", "stuck"],
    },
    {
      id: "classic",
      source: "/governance/#dao-fork",
      type: "choice",
      options: ["bug", "kept", "rename"],
    },
  ],
}
