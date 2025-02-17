import type { Meta, StoryObj } from "@storybook/react"

import QuizzesStats from "../QuizzesStats"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizzesStats",
  component: QuizzesStats,
  args: {
    averageScoresArray: [],
    completedQuizzes: {
      "layer-2": [false, 0],
      "run-a-node": [false, 0],
      merge: [false, 0],
      "staking-solo": [false, 0],
      "what-is-ether": [false, 0],
      "what-is-ethereum": [false, 0],
      nfts: [false, 0],
      scaling: [false, 0],
      security: [false, 0],
      wallets: [false, 0],
      web3: [false, 0],
      daos: [false, 0],
      stablecoins: [false, 0],
      defi: [false, 0],
    },
    totalCorrectAnswers: 0,
  },
} satisfies Meta<typeof QuizzesStats>

export default meta

type Story = StoryObj<typeof meta>

export const StartingStats: Story = {}

export const OneCompletedQuiz = {
  args: {
    averageScoresArray: [100],
    completedQuizzes: {
      ...meta.args.completedQuizzes,
      "layer-2": [true, 4],
    },
    totalCorrectAnswers: 4,
  },
} satisfies Story

export const HasIncompleteQuiz: Story = {
  args: {
    averageScoresArray: [...OneCompletedQuiz.args.averageScoresArray, 50],
    completedQuizzes: {
      ...OneCompletedQuiz.args.completedQuizzes,
      "what-is-ether": [false, 2],
    },
    totalCorrectAnswers: OneCompletedQuiz.args.totalCorrectAnswers + 2,
  },
}
