// Import data types
import type { QuestionBank } from "@/lib/types"

// Declare hash map of question bank
const questionBank = {
  // What is Ethereum?
  "ethereum-1": {
    prompt: "ethereum-1-prompt",
    answers: [
      {
        id: "ethereum-1-a",
        label: "ethereum-1-a-label",
        explanation: "ethereum-1-a-explanation",
      },
      {
        id: "ethereum-1-b",
        label: "ethereum-1-b-label",
        explanation: "ethereum-1-b-explanation",
      },
      {
        id: "ethereum-1-c",
        label: "ethereum-1-c-label",
        explanation: "ethereum-1-c-explanation",
      },
      {
        id: "ethereum-1-d",
        label: "ethereum-1-d-label",
        explanation: "ethereum-1-d-explanation",
      },
    ],
    correctAnswerId: "ethereum-1-b",
  },
  "ethereum-2": {
    prompt: "ethereum-2-prompt",
    answers: [
      {
        id: "ethereum-2-a",
        label: "ethereum-2-a-label",
        explanation: "ethereum-2-a-explanation",
      },
      {
        id: "ethereum-2-b",
        label: "ethereum-2-b-label",
        explanation: "ethereum-2-b-explanation",
      },
      {
        id: "ethereum-2-c",
        label: "ethereum-2-c-label",
        explanation: "ethereum-2-c-explanation",
      },
      {
        id: "ethereum-2-d",
        label: "ethereum-2-d-label",
        explanation: "ethereum-2-d-explanation",
      },
    ],
    correctAnswerId: "ethereum-2-a",
  },
  "ethereum-3": {
    prompt: "ethereum-3-prompt",
    answers: [
      {
        id: "ethereum-3-a",
        label: "ethereum-3-a-label",
        explanation: "ethereum-3-a-explanation",
      },
      {
        id: "ethereum-3-b",
        label: "ethereum-3-b-label",
        explanation: "ethereum-3-b-explanation",
      },
      {
        id: "ethereum-3-c",
        label: "ethereum-3-c-label",
        explanation: "ethereum-3-c-explanation",
      },
      {
        id: "ethereum-3-d",
        label: "ethereum-3-d-label",
        explanation: "ethereum-3-d-explanation",
      },
    ],
    correctAnswerId: "ethereum-3-d",
  },
  "ethereum-4": {
    prompt: "ethereum-4-prompt",
    answers: [
      {
        id: "ethereum-4-a",
        label: "ethereum-4-a-label",
        explanation: "ethereum-4-explanation",
      },
      {
        id: "ethereum-4-b",
        label: "ethereum-4-b-label",
        explanation: "ethereum-4-explanation",
      },
      {
        id: "ethereum-4-c",
        label: "ethereum-4-c-label",
        explanation: "ethereum-4-explanation",
      },
      {
        id: "ethereum-4-d",
        label: "ethereum-4-d-label",
        explanation: "ethereum-4-explanation",
      },
    ],
    correctAnswerId: "ethereum-4-a",
  },
  "ethereum-5": {
    prompt: "ethereum-5-prompt",
    answers: [
      {
        id: "ethereum-5-a",
        label: "ethereum-5-a-label",
        explanation: "ethereum-5-a-explanation",
      },
      {
        id: "ethereum-5-b",
        label: "ethereum-5-b-label",
        explanation: "ethereum-5-b-explanation",
      },
      {
        id: "ethereum-5-c",
        label: "ethereum-5-c-label",
        explanation: "ethereum-5-c-explanation",
      },
      {
        id: "ethereum-5-d",
        label: "ethereum-5-d-label",
        explanation: "ethereum-5-d-explanation",
      },
    ],
    correctAnswerId: "ethereum-5-d",
  },
  // What is ether?
  "ether-1": {
    prompt: "ether-1-prompt",
    answers: [
      {
        id: "ether-1-a",
        label: "ether-1-a-label",
        explanation: "ether-1-a-explanation",
      },
      {
        id: "ether-1-b",
        label: "ether-1-b-label",
        explanation: "ether-1-b-explanation",
      },
      {
        id: "ether-1-c",
        label: "ether-1-c-label",
        explanation: "ether-1-c-explanation",
      },
      {
        id: "ether-1-d",
        label: "ether-1-d-label",
        explanation: "ether-1-d-explanation",
      },
    ],
    correctAnswerId: "ether-1-c",
  },
  "ether-2": {
    prompt: "ether-2-prompt",
    answers: [
      {
        id: "ether-2-a",
        label: "ether-2-a-label",
        explanation: "ether-2-a-explanation",
      },
      {
        id: "ether-2-b",
        label: "ether-2-b-label",
        explanation: "ether-2-b-explanation",
      },
      {
        id: "ether-2-c",
        label: "ether-2-c-label",
        explanation: "ether-2-c-explanation",
      },
      {
        id: "ether-2-d",
        label: "ether-2-d-label",
        explanation: "ether-2-d-explanation",
      },
    ],
    correctAnswerId: "ether-2-b",
  },
  "ether-3": {
    prompt: "ether-3-prompt",
    answers: [
      {
        id: "ether-3-a",
        label: "ether-3-a-label",
        explanation: "ether-3-a-explanation",
      },
      {
        id: "ether-3-b",
        label: "ether-3-b-label",
        explanation: "ether-3-b-explanation",
      },
      {
        id: "ether-3-c",
        label: "ether-3-c-label",
        explanation: "ether-3-c-explanation",
      },
      {
        id: "ether-3-d",
        label: "ether-3-d-label",
        explanation: "ether-3-d-explanation",
      },
    ],
    correctAnswerId: "ether-3-b",
  },
  "ether-4": {
    prompt: "ether-4-prompt",
    answers: [
      {
        id: "ether-4-a",
        label: "ether-4-a-label",
        explanation: "ether-4-a-explanation",
      },
      {
        id: "ether-4-b",
        label: "ether-4-b-label",
        explanation: "ether-4-b-explanation",
      },
      {
        id: "ether-4-c",
        label: "ether-4-c-label",
        explanation: "ether-4-c-explanation",
      },
      {
        id: "ether-4-d",
        label: "ether-4-d-label",
        explanation: "ether-4-d-explanation",
      },
    ],
    correctAnswerId: "ether-4-d",
  },
  // Web3
  "web3-1": {
    prompt: "web3-1-prompt",
    answers: [
      {
        id: "web3-1-a",
        label: "web3-1-a-label",
        explanation: "web3-1-a-explanation",
      },
      {
        id: "web3-1-b",
        label: "web3-1-b-label",
        explanation: "web3-1-b-explanation",
      },
      {
        id: "web3-1-c",
        label: "web3-1-c-label",
        explanation: "web3-1-c-explanation",
      },
      {
        id: "web3-1-d",
        label: "web3-1-d-label",
        explanation: "web3-1-d-explanation",
      },
    ],
    correctAnswerId: "web3-1-b",
  },
  "web3-2": {
    prompt: "web3-2-prompt",
    answers: [
      {
        id: "web3-2-a",
        label: "web3-2-a-label",
        explanation: "web3-2-a-explanation",
      },
      {
        id: "web3-2-b",
        label: "web3-2-b-label",
        explanation: "web3-2-b-explanation",
      },
      {
        id: "web3-2-c",
        label: "web3-2-c-label",
        explanation: "web3-2-c-explanation",
      },
      {
        id: "web3-2-d",
        label: "web3-2-d-label",
        explanation: "web3-2-d-explanation",
      },
    ],
    correctAnswerId: "web3-2-c",
  },
  "web3-3": {
    prompt: "web3-3-prompt",
    answers: [
      {
        id: "web3-3-a",
        label: "web3-3-a-label",
        explanation: "web3-3-a-explanation",
      },
      {
        id: "web3-3-b",
        label: "web3-3-b-label",
        explanation: "web3-3-b-explanation",
      },
      {
        id: "web3-3-c",
        label: "web3-3-c-label",
        explanation: "web3-3-c-explanation",
      },
      {
        id: "web3-3-d",
        label: "web3-3-d-label",
        explanation: "web3-3-d-explanation",
      },
    ],
    correctAnswerId: "web3-3-c",
  },
  "web3-4": {
    prompt: "web3-4-prompt",
    answers: [
      {
        id: "web3-4-a",
        label: "web3-4-a-label",
        explanation: "web3-4-a-explanation",
      },
      {
        id: "web3-4-b",
        label: "web3-4-b-label",
        explanation: "web3-4-b-explanation",
      },
      {
        id: "web3-4-c",
        label: "web3-4-c-label",
        explanation: "web3-4-c-explanation",
      },
      {
        id: "web3-4-d",
        label: "web3-4-d-label",
        explanation: "web3-4-d-explanation",
      },
    ],
    correctAnswerId: "web3-4-a",
  },
  "web3-5": {
    prompt: "web3-5-prompt",
    answers: [
      {
        id: "web3-5-a",
        label: "web3-5-a-label",
        explanation: "web3-5-a-explanation",
      },
      {
        id: "web3-5-b",
        label: "web3-5-b-label",
        explanation: "web3-5-b-explanation",
      },
      {
        id: "web3-5-c",
        label: "web3-5-c-label",
        explanation: "web3-5-c-explanation",
      },
      {
        id: "web3-5-d",
        label: "web3-5-d-label",
        explanation: "web3-5-d-explanation",
      },
    ],
    correctAnswerId: "web3-5-c",
  },
  // Wallets
  "wallets-1": {
    prompt: "wallets-1-prompt",
    answers: [
      {
        id: "wallets-1-a",
        label: "wallets-1-a-label",
        explanation: "wallets-1-a-explanation",
      },
      {
        id: "wallets-1-b",
        label: "wallets-1-b-label",
        explanation: "wallets-1-b-explanation",
      },
      {
        id: "wallets-1-c",
        label: "wallets-1-c-label",
        explanation: "wallets-1-c-explanation",
      },
      {
        id: "wallets-1-d",
        label: "wallets-1-d-label",
        explanation: "wallets-1-d-explanation",
      },
    ],
    correctAnswerId: "wallets-1-b",
  },
  "wallets-2": {
    prompt: "wallets-2-prompt",
    answers: [
      {
        id: "wallets-2-a",
        label: "wallets-2-a-label",
        explanation: "wallets-2-a-explanation",
      },
      {
        id: "wallets-2-b",
        label: "wallets-2-b-label",
        explanation: "wallets-2-b-explanation",
      },
      {
        id: "wallets-2-c",
        label: "wallets-2-c-label",
        explanation: "wallets-2-c-explanation",
      },
      {
        id: "wallets-2-d",
        label: "wallets-2-d-label",
        explanation: "wallets-2-d-explanation",
      },
    ],
    correctAnswerId: "wallets-2-d",
  },
  "wallets-3": {
    prompt: "wallets-3-prompt",
    answers: [
      {
        id: "wallets-3-a",
        label: "wallets-3-a-label",
        explanation: "wallets-3-a-explanation",
      },
      {
        id: "wallets-3-b",
        label: "wallets-3-b-label",
        explanation: "wallets-3-b-explanation",
      },
      {
        id: "wallets-3-c",
        label: "wallets-3-c-label",
        explanation: "wallets-3-c-explanation",
      },
      {
        id: "wallets-3-d",
        label: "wallets-3-d-label",
        explanation: "wallets-3-d-explanation",
      },
    ],
    correctAnswerId: "wallets-3-d",
  },
  "wallets-4": {
    prompt: "wallets-4-prompt",
    answers: [
      {
        id: "wallets-4-a",
        label: "wallets-4-a-label",
        explanation: "wallets-4-a-explanation",
      },
      {
        id: "wallets-4-b",
        label: "wallets-4-b-label",
        explanation: "wallets-4-b-explanation",
      },
    ],
    correctAnswerId: "wallets-4-b",
  },
  // Security
  "security-1": {
    prompt: "security-1-prompt",
    answers: [
      {
        id: "security-1-a",
        label: "security-1-a-label",
        explanation: "security-1-a-explanation",
      },
      {
        id: "security-1-b",
        label: "security-1-b-label",
        explanation: "security-1-b-explanation",
      },
      {
        id: "security-1-c",
        label: "security-1-c-label",
        explanation: "security-1-c-explanation",
      },
      {
        id: "security-1-d",
        label: "security-1-d-label",
        explanation: "security-1-d-explanation",
      },
    ],
    correctAnswerId: "security-1-d",
  },
  "security-2": {
    prompt: "security-2-prompt",
    answers: [
      {
        id: "security-2-a",
        label: "security-2-a-label",
        explanation: "security-2-a-explanation",
      },
      {
        id: "security-2-b",
        label: "security-2-b-label",
        explanation: "security-2-b-explanation",
      },
    ],
    correctAnswerId: "security-2-b",
  },
  "security-3": {
    prompt: "security-3-prompt",
    answers: [
      {
        id: "security-3-a",
        label: "security-3-a-label",
        explanation: "security-3-a-explanation",
      },
      {
        id: "security-3-b",
        label: "security-3-b-label",
        explanation: "security-3-b-explanation",
      },
      {
        id: "security-3-c",
        label: "security-3-c-label",
        explanation: "security-3-c-explanation",
      },
      {
        id: "security-3-d",
        label: "security-3-d-label",
        explanation: "security-3-d-explanation",
      },
    ],
    correctAnswerId: "security-3-d",
  },
  "security-4": {
    prompt: "security-4-prompt",
    answers: [
      {
        id: "security-4-a",
        label: "security-4-a-label",
        explanation: "security-4-a-explanation",
      },
      {
        id: "security-4-b",
        label: "security-4-b-label",
        explanation: "security-4-b-explanation",
      },
    ],
    correctAnswerId: "security-4-b",
  },
  // NFTs
  "nfts-1": {
    prompt: "nfts-1-prompt",
    answers: [
      {
        id: "nfts-1-a",
        label: "nfts-1-a-label",
        explanation: "nfts-1-a-explanation", // with an owner
      },
      {
        id: "nfts-1-b",
        label: "nfts-1-b-label",
        explanation: "nfts-1-b-explanation",
      },
      {
        id: "nfts-1-c",
        label: "nfts-1-c-label",
        explanation: "nfts-1-c-explanation",
      },
      {
        id: "nfts-1-d",
        label: "nfts-1-d-label",
        explanation: "nfts-1-d-explanation",
      },
    ],
    correctAnswerId: "nfts-1-a",
  },
  "nfts-2": {
    prompt: "nfts-2-prompt",
    answers: [
      {
        id: "nfts-2-a",
        label: "nfts-2-a-label",
        explanation: "nfts-2-a-explanation",
      },
      {
        id: "nfts-2-b",
        label: "nfts-2-b-label",
        explanation: "nfts-2-b-explanation",
      },
    ],
    correctAnswerId: "nfts-2-b",
  },
  "nfts-3": {
    prompt: "nfts-3-prompt",
    answers: [
      {
        id: "nfts-3-a",
        label: "nfts-3-a-label",
        explanation: "nfts-3-a-explanation",
      },
      {
        id: "nfts-3-b",
        label: "nfts-3-b-label",
        explanation: "nfts-3-b-explanation",
      },
      {
        id: "nfts-3-c",
        label: "nfts-3-c-label",
        explanation: "nfts-3-c-explanation",
      },
      {
        id: "nfts-3-d",
        label: "nfts-3-d-label",
        explanation: "nfts-3-d-explanation",
      },
    ],
    correctAnswerId: "nfts-3-b",
  },
  "nfts-4": {
    prompt: "nfts-4-prompt",
    answers: [
      {
        id: "nfts-4-a",
        label: "nfts-4-a-label",
        explanation: "nfts-4-a-explanation",
      },
      {
        id: "nfts-4-b",
        label: "nfts-4-b-label",
        explanation: "nfts-4-b-explanation",
      },
      {
        id: "nfts-4-c",
        label: "nfts-4-c-label",
        explanation: "nfts-4-c-explanation",
      },
      {
        id: "nfts-4-d",
        label: "nfts-4-d-label",
        explanation: "nfts-4-d-explanation",
      },
    ],
    correctAnswerId: "nfts-4-c",
  },
  "nfts-5": {
    prompt: "nfts-5-prompt",
    answers: [
      {
        id: "nfts-5-a",
        label: "nfts-5-a-label",
        explanation: "nfts-5-a-explanation",
      },
      {
        id: "nfts-5-b",
        label: "nfts-5-b-label",
        explanation: "nfts-5-b-explanation",
      },
    ],
    correctAnswerId: "nfts-5-b",
  },
  // Layer 2
  "rollups-1": {
    prompt: "rollups-1-prompt",
    answers: [
      {
        id: "rollups-1-a",
        label: "rollups-1-a-label",
        explanation: "rollups-1-a-explanation",
      },
      {
        id: "rollups-1-b",
        label: "rollups-1-b-label",
        explanation: "rollups-1-b-explanation",
      },
      {
        id: "rollups-1-c",
        label: "rollups-1-c-label",
        explanation: "rollups-1-c-explanation",
      },
      {
        id: "rollups-1-d",
        label: "rollups-1-d-label",
        explanation: "rollups-1-d-explanation",
      },
    ],
    correctAnswerId: "rollups-1-a",
  },
  "rollups-2": {
    prompt: "rollups-2-prompt",
    answers: [
      {
        id: "rollups-2-a",
        label: "rollups-2-a-label",
        explanation: "rollups-2-a-explanation",
      },
      {
        id: "rollups-2-b",
        label: "rollups-2-b-label",
        explanation: "rollups-2-b-explanation",
      },
      {
        id: "rollups-2-c",
        label: "rollups-2-c-label",
        explanation: "rollups-2-c-explanation",
      },
      {
        id: "rollups-2-d",
        label: "rollups-2-d-label",
        explanation: "rollups-2-d-explanation",
      },
    ],
    correctAnswerId: "rollups-2-d",
  },
  "rollups-3": {
    prompt: "rollups-3-prompt",
    answers: [
      {
        id: "rollups-3-a",
        label: "rollups-3-a-label",
        explanation: "rollups-3-a-explanation",
      },
      {
        id: "rollups-3-b",
        label: "rollups-3-b-label",
        explanation: "rollups-3-b-explanation",
      },
      {
        id: "rollups-3-c",
        label: "rollups-3-c-label",
        explanation: "rollups-3-c-explanation",
      },
      {
        id: "rollups-3-d",
        label: "rollups-3-d-label",
        explanation: "rollups-3-d-explanation",
      },
    ],
    correctAnswerId: "rollups-3-d",
  },
  "rollups-4": {
    prompt: "rollups-4-prompt",
    answers: [
      {
        id: "rollups-4-a",
        label: "rollups-4-a-label",
        explanation: "rollups-4-a-explanation",
      },
      {
        id: "rollups-4-b",
        label: "rollups-4-b-label",
        explanation: "rollups-4-b-explanation",
      },
      {
        id: "rollups-4-c",
        label: "rollups-4-c-label",
        explanation: "rollups-4-c-explanation",
      },
      {
        id: "rollups-4-d",
        label: "rollups-4-d-label",
        explanation: "rollups-4-d-explanation",
      },
    ],
    correctAnswerId: "rollups-4-d",
  },
  // The Merge
  "merge-1": {
    prompt: "merge-1-prompt",
    answers: [
      {
        id: "merge-1-a",
        label: "merge-1-a-label",
        explanation: "merge-1-a-explanation",
      },
      {
        id: "merge-1-b",
        label: "merge-1-b-label",
        explanation: "merge-1-b-explanation",
      },
      {
        id: "merge-1-c",
        label: "merge-1-c-label",
        explanation: "merge-1-c-explanation",
      },
      {
        id: "merge-1-d",
        label: "merge-1-d-label",
        explanation: "merge-1-d-explanation",
      },
    ],
    correctAnswerId: "merge-1-b",
  },
  "merge-2": {
    prompt: "merge-2-prompt",
    answers: [
      {
        id: "merge-2-a",
        label: "merge-2-a-label",
        explanation: "merge-2-a-explanation",
      },
      {
        id: "merge-2-b",
        label: "merge-2-b-label",
        explanation: "merge-2-b-explanation",
      },
      {
        id: "merge-2-c",
        label: "merge-2-c-label",
        explanation: "merge-2-c-explanation",
      },
      {
        id: "merge-2-d",
        label: "merge-2-d-label",
        explanation: "merge-2-d-explanation",
      },
    ],
    correctAnswerId: "merge-2-d",
  },
  "merge-3": {
    prompt: "merge-3-prompt",
    answers: [
      {
        id: "merge-3-a",
        label: "merge-3-a-label",
        explanation: "merge-3-a-explanation",
      },
      {
        id: "merge-3-b",
        label: "merge-3-b-label",
        explanation: "merge-3-b-explanation",
      },
      {
        id: "merge-3-c",
        label: "merge-3-c-label",
        explanation: "merge-3-c-explanation",
      },
      {
        id: "merge-3-d",
        label: "merge-3-d-label",
        explanation: "merge-3-d-explanation",
      },
    ],
    correctAnswerId: "merge-3-a",
  },
  "merge-4": {
    prompt: "merge-4-prompt",
    answers: [
      {
        id: "merge-4-a",
        label: "merge-4-a-label",
        explanation: "merge-4-a-explanation",
      },
      {
        id: "merge-4-b",
        label: "merge-4-b-label",
        explanation: "merge-4-b-explanation",
      },
    ],
    correctAnswerId: "merge-4-b",
  },
  "merge-5": {
    prompt: "merge-5-prompt",
    answers: [
      {
        id: "merge-5-a",
        label: "merge-5-a-label",
        explanation: "merge-5-a-explanation",
      },
      {
        id: "merge-5-b",
        label: "merge-5-b-label",
        explanation: "merge-5-b-explanation",
      },
      {
        id: "merge-5-c",
        label: "merge-5-c-label",
        explanation: "merge-5-c-explanation",
      },
      {
        id: "merge-5-d",
        label: "merge-5-d-label",
        explanation: "merge-5-d-explanation",
      },
    ],
    correctAnswerId: "merge-5-b",
  },
  // DAOs
  "daos-1": {
    prompt: "daos-1-prompt",
    answers: [
      {
        id: "daos-1-a",
        label: "daos-1-a-label",
        explanation: "daos-1-a-explanation",
      },
      {
        id: "daos-1-b",
        label: "daos-1-b-label",
        explanation: "daos-1-b-explanation",
      },
      {
        id: "daos-1-c",
        label: "daos-1-c-label",
        explanation: "daos-1-c-explanation",
      },
      {
        id: "daos-1-d",
        label: "daos-1-d-label",
        explanation: "daos-1-d-explanation",
      },
    ],
    correctAnswerId: "daos-1-d",
  },
  "daos-2": {
    prompt: "daos-2-prompt",
    answers: [
      {
        id: "daos-2-a",
        label: "daos-2-a-label",
        explanation: "daos-2-a-explanation",
      },
      {
        id: "daos-2-b",
        label: "daos-2-b-label",
        explanation: "daos-2-b-explanation",
      },
      {
        id: "daos-2-c",
        label: "daos-2-c-label",
        explanation: "daos-2-c-explanation",
      },
      {
        id: "daos-2-d",
        label: "daos-2-d-label",
        explanation: "daos-2-d-explanation",
      },
    ],
    correctAnswerId: "daos-2-d",
  },
  "daos-3": {
    prompt: "daos-3-prompt",
    answers: [
      {
        id: "daos-3-a",
        label: "daos-3-a-label",
        explanation: "daos-3-a-explanation",
      },
      {
        id: "daos-3-b",
        label: "daos-3-b-label",
        explanation: "daos-3-b-explanation",
      },
      {
        id: "daos-3-c",
        label: "daos-3-c-label",
        explanation: "daos-3-c-explanation",
      },
      {
        id: "daos-3-d",
        label: "daos-3-d-label",
        explanation: "daos-3-d-explanation",
      },
    ],
    correctAnswerId: "daos-3-b",
  },
  "daos-4": {
    prompt: "daos-4-prompt",
    answers: [
      {
        id: "daos-4-a",
        label: "daos-4-a-label",
        explanation: "daos-4-a-explanation",
      },
      {
        id: "daos-4-b",
        label: "daos-4-b-label",
        explanation: "daos-4-b-explanation",
      },
      {
        id: "daos-4-c",
        label: "daos-4-c-label",
        explanation: "daos-4-c-explanation",
      },
      {
        id: "daos-4-d",
        label: "daos-4-d-label",
        explanation: "daos-4-d-explanation",
      },
    ],
    correctAnswerId: "daos-4-c",
  },
  "daos-5": {
    prompt: "daos-5-prompt",
    answers: [
      {
        id: "daos-5-a",
        label: "daos-5-a-label",
        explanation: "daos-5-a-explanation",
      },
      {
        id: "daos-5-b",
        label: "daos-5-b-label",
        explanation: "daos-5-b-explanation",
      },
      {
        id: "daos-5-c",
        label: "daos-5-c-label",
        explanation: "daos-5-c-explanation",
      },
      {
        id: "daos-5-d",
        label: "daos-5-d-label",
        explanation: "daos-5-d-explanation",
      },
    ],
    correctAnswerId: "daos-5-d",
  },
  // Solo staking
  "staking-1": {
    prompt: "staking-1-prompt",
    answers: [
      {
        id: "staking-1-a",
        label: "staking-1-a-label",
        explanation: "staking-1-a-explanation",
      },
      {
        id: "staking-1-b",
        label: "staking-1-b-label",
        explanation: "staking-1-b-explanation",
      },
      {
        id: "staking-1-c",
        label: "staking-1-c-label",
        explanation: "staking-1-c-explanation",
      },
      {
        id: "staking-1-d",
        label: "staking-1-d-label",
        explanation: "staking-1-d-explanation",
      },
    ],
    correctAnswerId: "staking-1-d",
  },
  "staking-2": {
    prompt: "staking-2-prompt",
    answers: [
      {
        id: "staking-2-a",
        label: "staking-2-a-label",
        explanation: "staking-2-a-explanation",
      },
      {
        id: "staking-2-b",
        label: "staking-2-b-label",
        explanation: "staking-2-b-explanation",
      },
      {
        id: "staking-2-c",
        label: "staking-2-c-label",
        explanation: "staking-2-c-explanation",
      },
      {
        id: "staking-2-d",
        label: "staking-2-d-label",
        explanation: "staking-2-d-explanation",
      },
    ],
    correctAnswerId: "staking-2-b",
  },
  "staking-3": {
    prompt: "staking-3-prompt",
    answers: [
      {
        id: "staking-3-a",
        label: "staking-3-a-label",
        explanation: "staking-3-a-explanation",
      },
      {
        id: "staking-3-b",
        label: "staking-3-b-label",
        explanation: "staking-3-b-explanation",
      },
      {
        id: "staking-3-c",
        label: "staking-3-c-label",
        explanation: "staking-3-c-explanation",
      },
      {
        id: "staking-3-d",
        label: "staking-3-d-label",
        explanation: "staking-3-d-explanation",
      },
    ],
    correctAnswerId: "staking-3-b",
  },
  "staking-4": {
    prompt: "staking-4-prompt",
    answers: [
      {
        id: "staking-4-a",
        label: "staking-4-a-label",
        explanation: "staking-4-a-explanation",
      },
      {
        id: "staking-4-b",
        label: "staking-4-b-label",
        explanation: "staking-4-b-explanation",
      },
      {
        id: "staking-4-c",
        label: "staking-4-c-label",
        explanation: "staking-4-c-explanation",
      },
      {
        id: "staking-4-d",
        label: "staking-4-d-label",
        explanation: "staking-4-d-explanation",
      },
    ],
    correctAnswerId: "staking-4-d",
  },
  "staking-5": {
    prompt: "staking-5-prompt",
    answers: [
      {
        id: "staking-5-a",
        label: "staking-5-a-label",
        explanation: "staking-5-a-explanation",
      },
      {
        id: "staking-5-b",
        label: "staking-5-b-label",
        explanation: "staking-5-b-explanation",
      },
      {
        id: "staking-5-c",
        label: "staking-5-c-label",
        explanation: "staking-5-c-explanation",
      },
      {
        id: "staking-5-d",
        label: "staking-5-d-label",
        explanation: "staking-5-d-explanation",
      },
    ],
    correctAnswerId: "staking-5-c",
  },
  "staking-6": {
    prompt: "staking-6-prompt",
    answers: [
      {
        id: "staking-6-a",
        label: "staking-6-a-label",
        explanation: "staking-6-a-explanation",
      },
      {
        id: "staking-6-b",
        label: "staking-6-b-label",
        explanation: "staking-6-b-explanation",
      },
      {
        id: "staking-6-c",
        label: "staking-6-c-label",
        explanation: "staking-6-b-explanation",
      },
      {
        id: "staking-6-d",
        label: "staking-6-d-label",
        explanation: "staking-6-b-explanation",
      },
    ],
    correctAnswerId: "staking-6-a",
  },
  "staking-7": {
    prompt: "staking-7-prompt",
    answers: [
      {
        id: "staking-7-a",
        label: "staking-7-a-label",
        explanation: "staking-7-a-explanation",
      },
      {
        id: "staking-7-b",
        label: "staking-7-b-label",
        explanation: "staking-7-b-explanation",
      },
      {
        id: "staking-7-c",
        label: "staking-7-c-label",
        explanation: "staking-7-c-explanation",
      },
      {
        id: "staking-7-d",
        label: "staking-7-d-label",
        explanation: "staking-7-d-explanation",
      },
    ],
    correctAnswerId: "staking-7-c",
  },
  "staking-8": {
    prompt: "staking-8-prompt",
    answers: [
      {
        id: "staking-8-a",
        label: "staking-8-a-label",
        explanation: "staking-8-a-explanation",
      },
      {
        id: "staking-8-b",
        label: "staking-8-b-label",
        explanation: "staking-8-b-explanation",
      },
      {
        id: "staking-8-c",
        label: "staking-8-c-label",
        explanation: "staking-8-c-explanation",
      },
      {
        id: "staking-8-d",
        label: "staking-8-d-label",
        explanation: "staking-8-d-explanation",
      },
    ],
    correctAnswerId: "staking-8-d",
  },
  // Scaling
  "scaling-1": {
    prompt: "scaling-1-prompt",
    answers: [
      {
        id: "scaling-1-a",
        label: "scaling-1-a-label",
        explanation: "scaling-1-a-explanation",
      },
      {
        id: "scaling-1-b",
        label: "scaling-1-b-label",
        explanation: "scaling-1-b-explanation",
      },
      {
        id: "scaling-1-c",
        label: "scaling-1-c-label",
        explanation: "scaling-1-c-explanation",
      },
      {
        id: "scaling-1-d",
        label: "scaling-1-d-label",
        explanation: "scaling-1-d-explanation",
      },
    ],
    correctAnswerId: "scaling-1-d",
  },
  "scaling-2": {
    prompt: "scaling-2-prompt",
    answers: [
      {
        id: "scaling-2-a",
        label: "scaling-2-a-label",
        explanation: "scaling-2-a-explanation",
      },
      {
        id: "scaling-2-b",
        label: "scaling-2-b-label",
        explanation: "scaling-2-b-explanation",
      },
      {
        id: "scaling-2-c",
        label: "scaling-2-c-label",
        explanation: "scaling-2-c-explanation",
      },
      {
        id: "scaling-2-d",
        label: "scaling-2-d-label",
        explanation: "scaling-2-d-explanation",
      },
    ],
    correctAnswerId: "scaling-2-c",
  },
  "scaling-3": {
    prompt: "scaling-3-prompt",
    answers: [
      {
        id: "scaling-3-a",
        label: "scaling-3-a-label",
        explanation: "scaling-3-a-explanation",
      },
      {
        id: "scaling-3-b",
        label: "scaling-3-b-label",
        explanation: "scaling-3-b-explanation",
      },
      {
        id: "scaling-3-c",
        label: "scaling-3-c-label",
        explanation: "scaling-3-c-explanation",
      },
      {
        id: "scaling-3-d",
        label: "scaling-3-d-label",
        explanation: "scaling-3-d-explanation",
      },
    ],
    correctAnswerId: "scaling-3-d",
  },
  "scaling-4": {
    prompt: "scaling-4-prompt",
    answers: [
      {
        id: "scaling-4-a",
        label: "scaling-4-a-label",
        explanation: "scaling-4-a-explanation",
      },
      {
        id: "scaling-4-b",
        label: "scaling-4-b-label",
        explanation: "scaling-4-b-explanation",
      },
      {
        id: "scaling-4-c",
        label: "scaling-4-c-label",
        explanation: "scaling-4-c-explanation",
      },
      {
        id: "scaling-4-d",
        label: "scaling-4-d-label",
        explanation: "scaling-4-d-explanation",
      },
    ],
    correctAnswerId: "scaling-4-b",
  },
  // Run a node
  "run-a-node-1": {
    prompt: "run-a-node-1-prompt",
    answers: [
      {
        id: "run-a-node-1-a",
        label: "run-a-node-1-a-label",
        explanation: "run-a-node-1-a-explanation",
      },
      {
        id: "run-a-node-1-b",
        label: "run-a-node-1-b-label",
        explanation: "run-a-node-1-b-explanation",
      },
      {
        id: "run-a-node-1-c",
        label: "run-a-node-1-c-label",
        explanation: "run-a-node-1-c-explanation",
      },
      {
        id: "run-a-node-1-d",
        label: "run-a-node-1-d-label",
        explanation: "run-a-node-1-d-explanation",
      },
    ],
    correctAnswerId: "run-a-node-1-a",
  },
  "run-a-node-2": {
    prompt: "run-a-node-2-prompt",
    answers: [
      {
        id: "run-a-node-2-a",
        label: "run-a-node-2-a-label",
        explanation: "run-a-node-2-a-explanation",
      },
      {
        id: "run-a-node-2-b",
        label: "run-a-node-2-b-label",
        explanation: "run-a-node-2-a-explanation",
      },
      {
        id: "run-a-node-2-c",
        label: "run-a-node-2-c-label",
        explanation: "run-a-node-2-a-explanation",
      },
      {
        id: "run-a-node-2-d",
        label: "run-a-node-2-d-label",
        explanation: "run-a-node-2-d-explanation",
      },
    ],
    correctAnswerId: "run-a-node-2-a",
  },
  "run-a-node-3": {
    prompt: "run-a-node-3-prompt",
    answers: [
      {
        id: "run-a-node-3-a",
        label: "run-a-node-3-a-label",
        explanation: "run-a-node-3-a-explanation",
      },
      {
        id: "run-a-node-3-b",
        label: "run-a-node-3-b-label",
        explanation: "run-a-node-3-b-explanation",
      },
      {
        id: "run-a-node-3-c",
        label: "run-a-node-3-c-label",
        explanation: "run-a-node-3-c-explanation",
      },
      {
        id: "run-a-node-3-d",
        label: "run-a-node-3-d-label",
        explanation: "run-a-node-3-d-explanation",
      },
    ],
    correctAnswerId: "run-a-node-3-d",
  },
  "run-a-node-4": {
    prompt: "run-a-node-4-prompt",
    answers: [
      {
        id: "run-a-node-4-a",
        label: "run-a-node-4-a-label",
        explanation: "run-a-node-4-a-explanation",
      },
      {
        id: "run-a-node-4-b",
        label: "run-a-node-4-b-label",
        explanation: "run-a-node-4-b-explanation",
      },
      {
        id: "run-a-node-4-c",
        label: "run-a-node-4-c-label",
        explanation: "run-a-node-4-c-explanation",
      },
      {
        id: "run-a-node-4-d",
        label: "run-a-node-4-d-label",
        explanation: "run-a-node-4-d-explanation",
      },
    ],
    correctAnswerId: "run-a-node-4-c",
  },
  "run-a-node-5": {
    prompt: "run-a-node-5-prompt",
    answers: [
      {
        id: "run-a-node-5-a",
        label: "run-a-node-5-a-label",
        explanation: "run-a-node-5-a-explanation",
      },
      {
        id: "run-a-node-5-b",
        label: "run-a-node-5-b-label",
        explanation: "run-a-node-5-b-explanation",
      },
      {
        id: "run-a-node-5-c",
        label: "run-a-node-5-c-label",
        explanation: "run-a-node-5-c-explanation",
      },
      {
        id: "run-a-node-5-d",
        label: "run-a-node-5-d-label",
        explanation: "run-a-node-5-d-explanation",
      },
    ],
    correctAnswerId: "run-a-node-5-a",
  },
  "run-a-node-6": {
    prompt: "run-a-node-6-prompt",
    answers: [
      {
        id: "run-a-node-6-a",
        label: "run-a-node-6-a-label",
        explanation: "run-a-node-6-a-explanation",
      },
      {
        id: "run-a-node-6-b",
        label: "run-a-node-6-b-label",
        explanation: "run-a-node-6-a-explanation",
      },
    ],
    correctAnswerId: "run-a-node-6-b",
  },
  // Stablecoins
  "stablecoins-1": {
    prompt: "stablecoins-1-prompt",
    answers: [
      {
        id: "stablecoins-1-a",
        label: "stablecoins-1-a-label",
        explanation: "stablecoins-1-a-explanation",
      },
      {
        id: "stablecoins-1-b",
        label: "stablecoins-1-b-label",
        explanation: "stablecoins-1-b-explanation",
      },
      {
        id: "stablecoins-1-c",
        label: "stablecoins-1-c-label",
        explanation: "stablecoins-1-c-explanation",
      },
      {
        id: "stablecoins-1-d",
        label: "stablecoins-1-d-label",
        explanation: "stablecoins-1-d-explanation",
      },
    ],
    correctAnswerId: "stablecoins-1-a",
  },
  "stablecoins-2": {
    prompt: "stablecoins-2-prompt",
    answers: [
      {
        id: "stablecoins-2-a",
        label: "stablecoins-2-a-label",
        explanation: "stablecoins-2-a-explanation",
      },
      {
        id: "stablecoins-2-b",
        label: "stablecoins-2-b-label",
        explanation: "stablecoins-2-b-explanation",
      },
      {
        id: "stablecoins-2-c",
        label: "stablecoins-2-c-label",
        explanation: "stablecoins-2-c-explanation",
      },
      {
        id: "stablecoins-2-d",
        label: "stablecoins-2-d-label",
        explanation: "stablecoins-2-d-explanation",
      },
    ],
    correctAnswerId: "stablecoins-2-c",
  },
  "stablecoins-3": {
    prompt: "stablecoins-3-prompt",
    answers: [
      {
        id: "stablecoins-3-a",
        label: "stablecoins-3-a-label",
        explanation: "stablecoins-3-a-explanation",
      },
      {
        id: "stablecoins-3-b",
        label: "stablecoins-3-b-label",
        explanation: "stablecoins-3-b-explanation",
      },
      {
        id: "stablecoins-3-c",
        label: "stablecoins-3-c-label",
        explanation: "stablecoins-3-c-explanation",
      },
      {
        id: "stablecoins-3-d",
        label: "stablecoins-3-d-label",
        explanation: "stablecoins-3-d-explanation",
      },
    ],
    correctAnswerId: "stablecoins-3-d",
  },
  "stablecoins-4": {
    prompt: "stablecoins-4-prompt",
    answers: [
      {
        id: "stablecoins-4-a",
        label: "stablecoins-4-a-label",
        explanation: "stablecoins-4-a-explanation",
      },
      {
        id: "stablecoins-4-b",
        label: "stablecoins-4-b-label",
        explanation: "stablecoins-4-b-explanation",
      },
      {
        id: "stablecoins-4-c",
        label: "stablecoins-4-c-label",
        explanation: "stablecoins-4-c-explanation",
      },
      {
        id: "stablecoins-4-d",
        label: "stablecoins-4-d-label",
        explanation: "stablecoins-4-d-explanation",
      },
    ],
    correctAnswerId: "stablecoins-4-b",
  },
  "stablecoins-5": {
    prompt: "stablecoins-5-prompt",
    answers: [
      {
        id: "stablecoins-5-a",
        label: "stablecoins-5-a-label",
        explanation: "stablecoins-5-a-explanation",
      },
      {
        id: "stablecoins-5-b",
        label: "stablecoins-5-b-label",
        explanation: "stablecoins-5-b-explanation",
      },
      {
        id: "stablecoins-5-c",
        label: "stablecoins-5-c-label",
        explanation: "stablecoins-5-c-explanation",
      },
      {
        id: "stablecoins-5-d",
        label: "stablecoins-5-d-label",
        explanation: "stablecoins-5-d-explanation",
      },
    ],
    correctAnswerId: "stablecoins-5-d",
  },
  // DeFi
  "defi-1": {
    prompt: "defi-1-prompt",
    answers: [
      {
        id: "defi-1-a",
        label: "defi-1-a-label",
        explanation: "defi-1-a-explanation",
      },
      {
        id: "defi-1-b",
        label: "defi-1-b-label",
        explanation: "defi-1-b-explanation",
      },
      {
        id: "defi-1-c",
        label: "defi-1-c-label",
        explanation: "defi-1-c-explanation",
      },
      {
        id: "defi-1-d",
        label: "defi-1-d-label",
        explanation: "defi-1-d-explanation",
      },
    ],
    correctAnswerId: "defi-1-a",
  },
  "defi-2": {
    prompt: "defi-2-prompt",
    answers: [
      {
        id: "defi-2-a",
        label: "defi-2-a-label",
        explanation: "defi-2-a-explanation",
      },
      {
        id: "defi-2-b",
        label: "defi-2-b-label",
        explanation: "defi-2-b-explanation",
      },
      {
        id: "defi-2-c",
        label: "defi-2-c-label",
        explanation: "defi-2-c-explanation",
      },
      {
        id: "defi-2-d",
        label: "defi-2-d-label",
        explanation: "defi-2-d-explanation",
      },
    ],
    correctAnswerId: "defi-2-b",
  },
  "defi-3": {
    prompt: "defi-3-prompt",
    answers: [
      {
        id: "defi-3-a",
        label: "defi-3-a-label",
        explanation: "defi-3-a-explanation",
      },
      {
        id: "defi-3-b",
        label: "defi-3-b-label",
        explanation: "defi-3-b-explanation",
      },
      {
        id: "defi-3-c",
        label: "defi-3-c-label",
        explanation: "defi-3-c-explanation",
      },
      {
        id: "defi-3-d",
        label: "defi-3-d-label",
        explanation: "defi-3-d-explanation",
      },
    ],
    correctAnswerId: "defi-3-a",
  },
  "defi-4": {
    prompt: "defi-4-prompt",
    answers: [
      {
        id: "defi-4-a",
        label: "defi-4-a-label",
        explanation: "defi-4-a-explanation",
      },
      {
        id: "defi-4-b",
        label: "defi-4-b-label",
        explanation: "defi-4-b-explanation",
      },
      {
        id: "defi-4-c",
        label: "defi-4-c-label",
        explanation: "defi-4-c-explanation",
      },
      {
        id: "defi-4-d",
        label: "defi-4-d-label",
        explanation: "defi-4-d-explanation",
      },
    ],
    correctAnswerId: "defi-4-d",
  },
  "defi-5": {
    prompt: "defi-5-prompt",
    answers: [
      {
        id: "defi-5-a",
        label: "defi-5-a-label",
        explanation: "defi-5-a-explanation",
      },
      {
        id: "defi-5-b",
        label: "defi-5-b-label",
        explanation: "defi-5-b-explanation",
      },
      {
        id: "defi-5-c",
        label: "defi-5-c-label",
        explanation: "defi-5-c-explanation",
      },
      {
        id: "defi-5-d",
        label: "defi-5-d-label",
        explanation: "defi-5-d-explanation",
      },
    ],
    correctAnswerId: "defi-5-a",
  },
} as const satisfies QuestionBank

export default questionBank
