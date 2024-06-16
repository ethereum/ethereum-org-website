import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { QuizButtonGroup } from "../QuizWidget/QuizButtonGroup"
import { QuizContent } from "../QuizWidget/QuizContent"

import { LAYER_2_QUIZ_TITLE, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / ButtonGroup",
  component: QuizButtonGroup,
  args: {
    answerStatus: null,
    currentQuestionAnswerChoice: null,
    currentQuestionIndex: 0,
    numberOfCorrectAnswers: 0,
    questions: layer2Questions,
    quizPageProps: false,
    quizScore: 0,
    showResults: false,
    title: LAYER_2_QUIZ_TITLE,
    userQuizProgress: [],
    handleReset: fn(),
    setCurrentQuestionAnswerChoice: fn(),
    setShowAnswer: fn(),
  },
  decorators: [
    (Story, { args }) => (
      <QuizContent title={LAYER_2_QUIZ_TITLE} answerStatus={args.answerStatus}>
        <Story />
      </QuizContent>
    ),
  ],
} satisfies Meta<typeof QuizButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const NoSelectedAnswer: Story = {}

export const SelectedAnswer: Story = {
  args: {
    currentQuestionAnswerChoice: { answerId: "g001-a", isCorrect: true },
  },
}

export const CorrectAnswer: Story = {
  args: {
    answerStatus: "correct",
  },
}

export const IncorrectAnswer: Story = {
  args: {
    answerStatus: "incorrect",
  },
}

export const FinishQuizIncorrect: Story = {
  name: "Finish Quiz - Incorrect Answer",
  args: {
    answerStatus: "incorrect",
    userQuizProgress: Array.from({ length: layer2Questions.length - 1 }),
  },
}

export const FinishQuizCorrect: Story = {
  name: "Finish Quiz - Correct Answer",
  args: {
    answerStatus: "correct",
    userQuizProgress: Array.from({ length: layer2Questions.length - 1 }),
  },
}

export const ResultsSummary: Story = {
  args: {
    showResults: true,
  },
}
