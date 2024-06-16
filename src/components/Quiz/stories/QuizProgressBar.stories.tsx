import type { Meta, StoryObj } from "@storybook/react"

import allQuizzesData from "@/data/quizzes"
import questionBank from "@/data/quizzes/questionBank"

import { getTranslation } from "@/storybook-utils"

import { QuizContent } from "../QuizWidget/QuizContent"
import { QuizProgressBar } from "../QuizWidget/QuizProgressBar"

const LAYER_2_QUIZ_KEY = "layer-2" as const

// TODO: Can a util be created to extract this question data here and in prod?
const questions = allQuizzesData[LAYER_2_QUIZ_KEY].questions.map((id) => {
  const rawQuestion = questionBank[id]
  return { id, ...rawQuestion }
})

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / ProgressBar",
  component: QuizProgressBar,
  args: {
    questions,
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
    currentQuestionIndex: questions.length,
    userQuizProgress: questions.map((question) => ({
      answerId: question.correctAnswerId,
      isCorrect: true,
    })),
  },
}

export const AllIncorrectAnswers: Story = {
  args: {
    answerStatus: "incorrect",
    currentQuestionIndex: questions.length,
    userQuizProgress: questions.map((question) => ({
      answerId: question.correctAnswerId,
      isCorrect: false,
    })),
  },
}

const partialQuestionSet = questions.slice(0, 2)

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
