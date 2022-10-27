// Import data types
import { RawQuizzes } from "../../types"

// Declare hash-map of quizzes based on slug key
const quizzes: RawQuizzes = {
  "what-is-ethereum": {
    title: "What is Ethereum?",
    questions: ["a001", "a002", "a003", "a004", "a005"],
  },
  "what-is-ether": {
    title: "What is ether?",
    questions: ["b001", "b002", "b003", "b004"],
  },
  web3: {
    title: "Web3",
    questions: ["c001", "c002", "c003", "c004", "c005"],
  },
  wallets: {
    title: "Wallets",
    questions: ["d001", "d002", "d003", "d004"],
  },
  security: {
    title: "Security",
    questions: ["e001", "e002", "e003", "e004", "d003"],
  },
  nfts: {
    title: "NFTs",
    questions: ["f001", "f002", "f003", "f004", "f005"],
  },
  "layer-2": {
    title: "Layer 2s",
    questions: ["g001", "g002", "g003", "g004"],
  },
  merge: {
    title: "The Merge",
    questions: ["h001", "h002", "h003", "h004", "h005"],
  },
}

export default quizzes
