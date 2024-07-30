import type { QuizzesSection, RawQuizzes } from "@/lib/types"

// Declare hash-map of quizzes based on slug key
const quizzes = {
  "what-is-ethereum": {
    title: "what-is-ethereum",
    questions: ["a001", "a002", "a003", "a004", "a005"],
  },
  "what-is-ether": {
    title: "what-is-ether",
    questions: ["b001", "b002", "b003", "b004"],
  },
  web3: {
    title: "web3",
    questions: ["c001", "c002", "c003", "c004", "c005"],
  },
  wallets: {
    title: "wallets",
    questions: ["d001", "d002", "d003", "d004"],
  },
  security: {
    title: "ethereum-security",
    questions: ["e001", "e002", "e003", "e004", "d003"],
  },
  nfts: {
    title: "nft-page",
    questions: ["f001", "f002", "f003", "f004", "f005"],
  },
  "layer-2": {
    title: "layer-2",
    questions: ["g001", "g002", "g003", "g004"],
  },
  merge: {
    title: "learn-quizzes:page-assets-merge",
    questions: ["h001", "h002", "h003", "h004", "h005"],
  },
  daos: {
    title: "DAOs",
    questions: ["i001", "i002", "i003", "i004", "i005"],
  },
  "solo-staking": {
    title: "solo",
    questions: ["j001", "j002", "j004", "j005", "j006", "j007", "j008"],
  },
  scaling: {
    title: "scaling",
    questions: ["k001", "k002", "k003", "k004"],
  },
  "run-a-node": {
    title: "run-a-node",
    questions: ["l001", "l002", "l003", "l004", "l005", "l006"],
  },
} satisfies RawQuizzes

export const ethereumBasicsQuizzes: QuizzesSection[] = [
  {
    id: "what-is-ethereum",
    level: "beginner",
    next: "what-is-ether",
  },
  {
    id: "what-is-ether",
    level: "beginner",
    next: "wallets",
  },
  {
    id: "wallets",
    level: "beginner",
    next: "web3",
  },
  {
    id: "web3",
    level: "beginner",
    next: "security",
  },
  {
    id: "security",
    level: "beginner",
    next: "merge",
  },
  {
    id: "merge",
    level: "intermediate",
  },
]

export const usingEthereumQuizzes: QuizzesSection[] = [
  {
    id: "nfts",
    level: "beginner",
    next: "layer-2",
  },
  {
    id: "layer-2",
    level: "intermediate",
    next: "daos",
  },
  {
    id: "daos",
    level: "intermediate",
    next: "run-a-node",
  },
  {
    id: "run-a-node",
    level: "intermediate",
    next: "scaling",
  },
  {
    id: "scaling",
    level: "advanced",
    next: "solo-staking",
  },
  {
    id: "solo-staking",
    level: "advanced",
  },
]

export default quizzes
