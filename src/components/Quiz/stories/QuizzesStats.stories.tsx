import type { Meta, StoryObj } from "@storybook/react"

import QuizzesStats from "../QuizzesStats"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizzesStats",
  component: QuizzesStats,
  args: {
    averageScoresArray: [],
    completedQuizzes: {
      "ai-basics": [false, 0],
      "machine-learning": [false, 0],
      programming: [false, 0],
      "web-development": [false, 0],
      security: [false, 0],
      "data-structures": [false, 0],
      "cloud-computing": [false, 0],
      databases: [false, 0],
      devops: [false, 0],
      algorithms: [false, 0],
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
      "ai-basics": [true, 4],
    },
    totalCorrectAnswers: 4,
  },
} satisfies Story

export const HasIncompleteQuiz: Story = {
  args: {
    averageScoresArray: [...OneCompletedQuiz.args.averageScoresArray, 50],
    completedQuizzes: {
      ...OneCompletedQuiz.args.completedQuizzes,
      programming: [false, 2],
    },
    totalCorrectAnswers: OneCompletedQuiz.args.totalCorrectAnswers + 2,
  },
}
