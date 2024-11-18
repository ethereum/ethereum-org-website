import type { QuizzesSection, RawQuizzes } from "@/lib/types"

import { addNextQuiz } from "@/components/Quiz/utils"

// Declare hash-map of quizzes based on slug key
const quizzes = {
  "what-is-ethereum": {
    title: "what-is-ethereum",
    questions: [
      "ethereum-1",
      "ethereum-2",
      "ethereum-3",
      "ethereum-4",
      "ethereum-5",
    ],
  },
  "what-is-ether": {
    title: "what-is-ether",
    questions: ["ether-1", "ether-2", "ether-3", "ether-4"],
  },
  web3: {
    title: "web3",
    questions: ["web3-1", "web3-2", "web3-3", "web3-4", "web3-5"],
  },
  wallets: {
    title: "wallets",
    questions: ["wallets-1", "wallets-2", "wallets-3", "wallets-4"],
  },
  security: {
    title: "ethereum-security",
    questions: [
      "security-1",
      "security-2",
      "security-3",
      "security-4",
      "wallets-3",
    ],
  },
  nfts: {
    title: "nft-page",
    questions: ["nfts-1", "nfts-2", "nfts-3", "nfts-4", "nfts-5"],
  },
  "layer-2": {
    title: "layer-2",
    questions: ["rollups-1", "rollups-2", "rollups-3", "rollups-4"],
  },
  merge: {
    title: "learn-quizzes:page-assets-merge",
    questions: ["merge-1", "merge-2", "merge-3", "merge-4", "merge-5"],
  },
  daos: {
    title: "DAOs",
    questions: ["daos-1", "daos-2", "daos-3", "daos-4", "daos-5"],
  },
  "solo-staking": {
    title: "solo",
    questions: [
      "staking-1",
      "staking-2",
      "staking-4",
      "staking-5",
      "staking-6",
      "staking-7",
      "staking-8",
    ],
  },
  scaling: {
    title: "scaling",
    questions: ["scaling-1", "scaling-2", "scaling-3", "scaling-4"],
  },
  "run-a-node": {
    title: "run-a-node",
    questions: [
      "run-a-node-1",
      "run-a-node-2",
      "run-a-node-3",
      "run-a-node-4",
      "run-a-node-5",
      "run-a-node-6",
    ],
  },
  stablecoins: {
    title: "stablecoins",
    questions: [
      "stablecoins-1",
      "stablecoins-2",
      "stablecoins-3",
      "stablecoins-4",
      "stablecoins-5",
    ],
  },
  defi: {
    title: "DeFi",
    questions: ["n001", "n002", "n003", "n004", "n005"],
  },
} satisfies RawQuizzes

const ethereumBasicsQuizzesRaw: QuizzesSection[] = [
  {
    id: "what-is-ethereum",
    level: "beginner",
  },
  {
    id: "what-is-ether",
    level: "beginner",
  },
  {
    id: "wallets",
    level: "beginner",
  },
  {
    id: "web3",
    level: "beginner",
  },
  {
    id: "security",
    level: "beginner",
  },
]
export const ethereumBasicsQuizzes: QuizzesSection[] = addNextQuiz(
  ethereumBasicsQuizzesRaw
)

const usingEthereumQuizzesRaw: QuizzesSection[] = [
  {
    id: "nfts",
    level: "beginner",
  },
  {
    id: "stablecoins",
    level: "beginner",
  },
  {
    id: "defi",
    level: "beginner",
  },
  {
    id: "layer-2",
    level: "intermediate",
  },
  {
    id: "daos",
    level: "intermediate",
  },
  {
    id: "run-a-node",
    level: "intermediate",
  },
  {
    id: "merge",
    level: "intermediate",
  },
  {
    id: "scaling",
    level: "advanced",
  },
  {
    id: "solo-staking",
    level: "advanced",
  },
]

export const usingEthereumQuizzes: QuizzesSection[] = addNextQuiz(
  usingEthereumQuizzesRaw
)

export default quizzes
