import type { QuestionBank, QuestionBankConfig } from "@/lib/types"

/**
 * This file is used to generate the question bank for the quizzes.
 *
 * questionBankConfig declares the skeleton for the question bank.
 *
 * "key" becomes the prefix for the complementary learn-quizzes.json string keys
 * "value" is an array of objects with the following properties:
 *   - totalAnswers: number of answers for the question
 *   - correctAnswer: number representing the correct answer (1-indexed)
 *
 * Each entry in the array represents a single question for the topic.
 *
 * Corresponding strings must be added to learn-quizzes.json for each question,
 * and must match the structure declared in this configuration.
 *
 * @example
 * "what-is-ethereum": [
 *  { totalAnswers: 4, correctAnswer: 2 }
 * ]
 *
 * Requires the following strings in learn-quizzes.json:
 * - "what-is-ethereum-1-prompt"
 * - "what-is-ethereum-1-a-label"
 * - "what-is-ethereum-1-a-explanation"
 * - "what-is-ethereum-1-b-label"
 * - "what-is-ethereum-1-b-explanation"
 * - "what-is-ethereum-1-c-label"
 * - "what-is-ethereum-1-c-explanation"
 * - "what-is-ethereum-1-d-label"
 * - "what-is-ethereum-1-d-explanation"
 */
const questionBankConfig: QuestionBankConfig = {
  "what-is-ethereum": [
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  "what-is-ether": [
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  web3: [
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 3 },
  ],
  wallets: [
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 2, correctAnswer: 2 },
  ],
  security: [
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 2, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 2, correctAnswer: 2 },
  ],
  nfts: [
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 2, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 2, correctAnswer: 2 },
  ],
  rollups: [
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  merge: [
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 2, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 2 },
  ],
  daos: [
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  "staking-solo": [
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  scaling: [
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 2 },
  ],
  "run-a-node": [
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 2, correctAnswer: 2 },
  ],
  stablecoins: [
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 3 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 4 },
  ],
  defi: [
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 2 },
    { totalAnswers: 4, correctAnswer: 1 },
    { totalAnswers: 4, correctAnswer: 4 },
    { totalAnswers: 4, correctAnswer: 1 },
  ],
}

const charFromIdx = (idx: number) => String.fromCharCode(97 + idx)

// Reduce to satisfy QuestionBank data shape for use in front end
const questionBank = Object.entries(questionBankConfig).reduce(
  (acc, [topicKey, value]) => {
    for (const [idx, question] of value.entries()) {
      const { totalAnswers, correctAnswer } = question
      const questionKey = `${topicKey}-${idx + 1}`
      const questionObject = {
        prompt: `${questionKey}-prompt`,
        answers: Array(totalAnswers)
          .fill(0)
          .map((_, i) => {
            const choice = charFromIdx(i) as "a" | "b" | "c" | "d"
            const id = `${questionKey}-${choice}`
            return {
              id,
              label: `${id}-label`,
              explanation: `${id}-explanation`,
            }
          }),
        correctAnswerId: `${questionKey}-${charFromIdx(correctAnswer - 1)}`,
      }
      // Add question object to accumulator
      acc[questionKey] = questionObject
    }
    return acc
  },
  {}
) as QuestionBank

export default questionBank
