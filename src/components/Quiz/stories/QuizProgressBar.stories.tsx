import type { Meta, StoryObj } from "@storybook/react"

import allQuizzesData from "@/data/quizzes"

import { getTranslation } from "@/storybook-utils"

import { QuizContent } from "../QuizWidget/QuizContent"
import { QuizProgressBar } from "../QuizWidget/QuizProgressBar"

import { LAYER_2_QUIZ_KEY, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / ProgressBar",
  component: QuizProgressBar,
  args: {
    questions: layer2Questions,
  },
  decorators: [
    (Story, { args }) => (
      <QuizContent
        title={getTranslation(allQuizzesData[LAYER_2_QUIZ_KEY].title)}
        answerStatus={args.answerStatus}
      >
        <Story />
      </QuizContent>
    ),
  ],
} satisfies Meta<typeof QuizProgressBar>

export default meta

type Story = StoryObj<typeof meta>

export const QuizStart: Story = {
  args: {
    answerStatus: null,
    currentQuestionIndex: 0,
    userQuizProgress: [],
  },
}
export const AllCorrectAnswers: Story = {
  args: {
    answerStatus: "correct",
    currentQuestionIndex: layer2Questions.length,
    userQuizProgress: layer2Questions.map((question) => ({
      answerId: question.correctAnswerId,
      isCorrect: true,
    })),
  },
}

export const AllIncorrectAnswers: Story = {
  args: {
    answerStatus: "incorrect",
    currentQuestionIndex: layer2Questions.length,
    userQuizProgress: layer2Questions.map((question) => ({
      answerId: question.correctAnswerId,
      isCorrect: false,
    })),
  },
}

const partialQuestionSet = layer2Questions.slice(0, 2)

export const IncompleteProgress: Story = {
  args: {
    answerStatus: "incorrect",
    currentQuestionIndex: partialQuestionSet.length,
    userQuizProgress: partialQuestionSet.map((question) => ({
      answerId: question.correctAnswerId,
      isCorrect: true,
    })),
  },
}
