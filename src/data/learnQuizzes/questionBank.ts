// Import data types
import { QuestionBank } from "../../types"

// Declare hash map of question bank
const questionBank: QuestionBank = {
  // TODO: Use hash of English prompt to generate this key
  a001: {
    prompt: "What is the biggest difference between Bitcoin and Ethereum?",
    answers: [
      {
        id: "a001-a", // TODO: Use hash of English question label to generate this id
        label:
          "Bitcoin has middlemen that mediate transactions, Ethereum does not",
        explanation:
          "The whole point of cryptocurrency, any cryptocurrency, is that you can transact directly with whoever you wish, without the need for middlemen",
      },
      {
        id: "a001-b",
        label: "Ethereum is programmable, Bitcoin is not",
        explanation:
          "Unlike Bitcoin, Ethereum has smart contracts, expanding the utility of the network past payments.",
      },
      {
        id: "a001-c",
        label:
          "Ethereum has middlemen that mediate transactions, Bitcoin does not",
        explanation:
          "The whole point of cryptocurrency, any cryptocurrency, is that you can transact directly with whoever you wish, without the need for middlemen",
      },
      {
        id: "a001-d",
        label: "Ethereum preserves privacy, Bitcoin does not",
        explanation:
          "Every node needs to be able to verify the blockchain's history from the beginning until the present. Therefore, there are no secrets on the blockchain. The only way to preserve privacy on the blockchain is to use private keys (and therefore identities) that cannot be traced back to you. This is possible on both Bitcoin and Ethereum.",
      },
    ],
    correctAnswerId: "a001-b",
  },
  a002: {
    prompt: "Ethereum consumes less electricity than:",
    answers: [
      {
        id: "a002-a",
        label: "YouTube",
        explanation:
          "YouTube consumes approximately 244 TW/year, while Ethereum consumes approximately 0.01 TW/year.",
      },
      {
        id: "a002-b",
        label: "Netflix",
        explanation:
          "Netflix consumes approximately 94 TW/year, while Ethereum consumes approximately 0.01 TW/year.",
      },
      {
        id: "a002-c",
        label: "PayPal",
        explanation:
          "PayPal consumes approximately 0.26 TW/year, while Ethereum consumes approximately 0.01 TW/year.",
      },
      {
        id: "a002-d",
        label: "All of the above",
        explanation:
          "Ethereum consumes approximately 0.01 TW/year, while YouTube consumes ~244 TW/year, Netflix ~94 TW/year, and PayPal ~0.26 TW/year.",
      },
    ],
    correctAnswerId: "a002-d",
  },
}

export default questionBank
