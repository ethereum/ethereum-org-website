// Import data types
import { RawQuizzes } from "../../types"

// Declare hash-map of quizzes based on slug key
const quizzes: RawQuizzes = {
  "what-is-ethereum": {
    title: "What is Ethereum?",
    questions: ["a001", "a002"],
  },
  "what-is-ether": {
    title: "What is ether?",
    questions: [],
  },
}

export default quizzes
