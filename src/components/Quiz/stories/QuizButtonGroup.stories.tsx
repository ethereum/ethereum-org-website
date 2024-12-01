import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { QuizButtonGroup } from "../QuizWidget/QuizButtonGroup"
import { QuizContent } from "../QuizWidget/QuizContent"

import { LAYER_2_QUIZ_TITLE, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / ButtonGroup",
  component: QuizButtonGroup,
  args: {
    answerStatus: undefined,
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
    setUserQuizProgress: fn(),
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
    currentQuestionAnswerChoice: { answerId: "rollups-1-a", isCorrect: true },
  },
}

export const CorrectAnswer: Story = {
  args: {
    answerStatus: "correct" as const,
  },
}

export const IncorrectAnswer: Story = {
  args: {
    answerStatus: "incorrect" as const,
  },
}

export const FinishQuizIncorrect = {
  name: "Finish Quiz - Incorrect Answer",
  args: {
    answerStatus: "incorrect" as const,
    userQuizProgress: Array.from({ length: layer2Questions.length - 1 }),
  },
} satisfies Story

export const FinishQuizCorrect: Story = {
  name: "Finish Quiz - Correct Answer",
  args: {
    ...FinishQuizIncorrect.args,
    answerStatus: "correct" as const,
  },
}

export const ResultsSummary: Story = {
  args: {
    showResults: true,
  },
}
