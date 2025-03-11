import type { QuizzesSection, RawQuizzes } from "@/lib/types"

import { addNextQuiz } from "@/components/Quiz/utils"

// Declare hash-map of quizzes based on slug key
const quizzes = {
  "what-is-ethereum": {
    title: "what-is-ethereum",
    questions: [
      "what-is-ethereum-1",
      "what-is-ethereum-2",
      "what-is-ethereum-3",
      "what-is-ethereum-4",
      "what-is-ethereum-5",
    ],
  },
  "what-is-ether": {
    title: "what-is-ether",
    questions: [
      "what-is-ether-1",
      "what-is-ether-2",
      "what-is-ether-3",
      "what-is-ether-4",
    ],
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
  "staking-solo": {
    title: "solo",
    questions: [
      "staking-solo-1",
      "staking-solo-2",
      "staking-solo-4",
      "staking-solo-5",
      "staking-solo-6",
      "staking-solo-7",
      "staking-solo-8",
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
    questions: ["defi-1", "defi-2", "defi-3", "defi-4", "defi-5"],
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
    id: "staking-solo",
    level: "advanced",
  },
]

export const usingEthereumQuizzes: QuizzesSection[] = addNextQuiz(
  usingEthereumQuizzesRaw
)

export default quizzes
