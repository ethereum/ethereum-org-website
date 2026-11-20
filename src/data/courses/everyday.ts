import type { Course } from "./types"

/**
 * The first course: each lesson starts from an everyday object, lets the
 * learner play with it, then names the Ethereum term it stands for.
 */
export const everydayCourse: Course = {
  id: "everyday",
  level: "beginner",
  theme: "purple",
  art: "notebook",
  lessons: [
    {
      id: "notebook",
      icon: "scroll",
      learnMore: "/what-is-the-ethereum-network/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "notebook" },
        { id: "try", type: "interactive", widget: "shared-notebook" },
        { id: "reveal", type: "concept", paragraphs: 2 },
        {
          id: "change",
          type: "choice",
          options: ["counts", "ignored", "copied"],
          correct: ["ignored"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "cash",
      icon: "coins",
      learnMore: "/what-is-ether/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "coins" },
        { id: "try", type: "interactive", widget: "cash-sort" },
        { id: "reveal", type: "concept", paragraphs: 1 },
        {
          id: "approve",
          type: "choice",
          options: ["bank", "both", "none"],
          correct: ["none"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "mailbox",
      icon: "key",
      learnMore: "/wallets/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "mailbox" },
        { id: "try", type: "interactive", widget: "mailbox" },
        { id: "reveal", type: "concept", paragraphs: 2 },
        {
          id: "phone",
          type: "choice",
          options: ["gone", "maker", "address"],
          correct: ["address"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "stamp",
      icon: "fuel",
      learnMore: "/gas/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "stamp" },
        { id: "try", type: "interactive", widget: "postage" },
        { id: "reveal", type: "concept", paragraphs: 2 },
        {
          id: "amount",
          type: "choice",
          options: ["more", "same", "less"],
          correct: ["same"],
        },
        {
          id: "busy",
          type: "choice",
          options: ["skip", "wait", "small"],
          correct: ["wait"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "machine",
      icon: "code",
      learnMore: "/smart-contracts/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "vending" },
        { id: "try", type: "interactive", widget: "snack-machine" },
        { id: "reveal", type: "concept", paragraphs: 1 },
        {
          id: "tickets",
          type: "choice",
          options: ["anyway", "staff", "refused"],
          correct: ["refused"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "undo",
      icon: "shield",
      learnMore: "/security/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "vault" },
        {
          id: "try",
          type: "choice",
          options: ["spare", "stranger", "maker"],
          correct: ["spare"],
        },
        { id: "hide", type: "interactive", widget: "spare-key-sort" },
        { id: "reveal", type: "concept", paragraphs: 1 },
        {
          id: "support",
          type: "choice",
          options: ["send", "half", "scam"],
          correct: ["scam"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
    {
      id: "story",
      icon: "send",
      learnMore: "/guides/how-to-use-a-wallet/",
      steps: [
        { id: "picture", type: "concept", paragraphs: 1, art: "diamond" },
        {
          id: "try",
          type: "order",
          items: ["address", "fee", "key", "notebook", "arrives"],
        },
        { id: "reveal", type: "concept", paragraphs: 1 },
        {
          id: "twins",
          type: "match",
          pairs: ["blockchain", "address", "key", "fee"],
        },
        { id: "takeaway", type: "concept", paragraphs: 1, takeaway: true },
      ],
    },
  ],
  exam: [
    {
      id: "notebook",
      source: "/what-is-the-ethereum-network/",
      type: "choice",
      options: ["wallet", "blockchain", "eth"],
    },
    {
      id: "change",
      source: "/what-is-ethereum/",
      type: "choice",
      options: ["counts", "spreads", "ignored"],
    },
    {
      id: "cash",
      source: "/what-is-ether/",
      type: "choice",
      options: ["cash", "card", "check"],
    },
    {
      id: "slot",
      source: "/guides/how-to-use-a-wallet/#receive-cryptocurrency",
      type: "choice",
      options: ["address", "key", "fee"],
    },
    {
      id: "wallet",
      source:
        "/guides/how-to-use-a-wallet/#can-i-use-the-same-address-on-multiple-devices",
      type: "choice",
      options: ["key", "eth", "bank"],
    },
    {
      id: "stamp",
      source: "/gas/",
      type: "choice",
      options: ["key", "fee", "contract"],
    },
    {
      id: "machine",
      source: "/smart-contracts/#vending-machine",
      type: "choice",
      options: ["wallet", "contract", "address"],
    },
    {
      id: "undo",
      source: "/security/#double-check-transactions",
      type: "choice",
      options: ["bank", "nobody", "support"],
    },
    {
      id: "spare",
      source:
        "/guides/how-to-create-an-ethereum-account/#step-4-store-your-recovery-phrase",
      type: "choice",
      options: ["phrase", "address", "fee"],
    },
    {
      id: "support",
      source: "/security/#support-scams",
      type: "choice",
      options: ["send", "scam", "half"],
    },
  ],
}
