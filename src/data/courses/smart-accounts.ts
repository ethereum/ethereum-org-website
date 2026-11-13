import type { Course } from "./types"

export const smartAccountsCourse: Course = {
  id: "smart-accounts",
  level: "intermediate",
  theme: { hue: 240 },
  art: "smart-account",
  lessons: [
    {
      id: "kinds",
      icon: "wallet",
      learnMore: "/developers/docs/accounts/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2, art: "smart-account" },
        {
          id: "stolen",
          type: "choice",
          options: ["freeze", "nothing", "limit"],
          correct: ["nothing"],
        },
        { id: "sort", type: "interactive", widget: "account-sort" },
        {
          id: "wake",
          type: "choice",
          options: ["itself", "validators", "called"],
          correct: ["called"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "rules",
      icon: "shield",
      learnMore: "/roadmap/account-abstraction/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "setup", type: "interactive", widget: "account-rules" },
        {
          id: "contacts",
          type: "choice",
          options: ["alone", "needs", "never"],
          correct: ["needs"],
        },
        {
          id: "phone",
          type: "choice",
          options: ["everything", "small", "nothing"],
          correct: ["nothing"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "fees",
      icon: "fuel",
      learnMore: "/roadmap/account-abstraction/#better-user-experience",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "who",
          type: "choice",
          options: ["sponsor", "nobody", "you"],
          correct: ["sponsor"],
        },
        {
          id: "flow",
          type: "order",
          items: ["choose", "sign", "send", "check", "run"],
        },
        {
          id: "free",
          type: "choice",
          options: ["free", "key", "action"],
          correct: ["action"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "delegation",
      icon: "link",
      learnMore: "/roadmap/pectra/7702/",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        {
          id: "key",
          type: "choice",
          options: ["rules", "yes", "limit"],
          correct: ["yes"],
        },
        {
          id: "recap",
          type: "fill",
          blanks: ["delegation", "code", "key"],
          extras: ["approval", "balance", "contacts"],
        },
        {
          id: "power",
          type: "choice",
          options: ["token", "once", "everything"],
          correct: ["everything"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "risks",
      icon: "alert",
      learnMore: "/roadmap/pectra/7702/#security-considerations",
      steps: [
        { id: "intro", type: "concept", paragraphs: 2 },
        { id: "inspect", type: "interactive", widget: "delegation-check" },
        {
          id: "prize",
          type: "choice",
          options: ["familiar", "reject", "small"],
          correct: ["reject"],
        },
        {
          id: "signed",
          type: "choice",
          options: ["wait", "revoke", "move"],
          correct: ["move"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "control",
      source: "/developers/docs/accounts/#types-of-account",
      type: "choice",
      options: ["code", "key", "app"],
    },
    {
      id: "trigger",
      source: "/developers/docs/accounts/#key-differences",
      type: "choice",
      options: ["timer", "validator", "transaction"],
    },
    {
      id: "thief",
      source: "/roadmap/account-abstraction/#beyond-seed-phrases",
      type: "choice",
      options: ["limit", "name", "approvers", "tip"],
      multi: true,
    },
    {
      id: "recover",
      source: "/roadmap/account-abstraction/#beyond-seed-phrases",
      type: "choice",
      options: ["support", "contacts", "validators"],
    },
    {
      id: "sponsored",
      source: "/roadmap/account-abstraction/#better-user-experience",
      type: "choice",
      options: ["free", "token", "eth"],
    },
    {
      id: "unexpected",
      source: "/security/#double-check-transactions",
      type: "choice",
      options: ["what", "free", "fast"],
    },
    {
      id: "same",
      source: "/roadmap/pectra/#7702",
      type: "choice",
      options: ["new", "run", "drop"],
    },
    {
      id: "bypass",
      source: "/roadmap/pectra/7702/#abstract",
      type: "choice",
      options: ["no", "limit", "yes"],
    },
    {
      id: "claim",
      source: "/roadmap/pectra/7702/#security-considerations",
      type: "choice",
      options: ["gift", "trap", "required"],
    },
    {
      id: "safe",
      source: "/roadmap/pectra/7702/#best-practices",
      type: "choice",
      options: ["app", "familiar", "wallet"],
    },
  ],
}
