import type { Meta, StoryObj } from "@storybook/react"

import { QuizContent } from "../QuizWidget/QuizContent"
import { QuizSummary } from "../QuizWidget/QuizSummary"

import { LAYER_2_QUIZ_TITLE, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / Summary",
  component: QuizSummary,
  args: {
    questionsLength: layer2Questions.length,
  },
  decorators: [
    (Story) => (
      <QuizContent title={LAYER_2_QUIZ_TITLE} answerStatus={null}>
        <Story />
      </QuizContent>
    ),
  ],
} satisfies Meta<typeof QuizSummary>

export default meta

type Story = StoryObj<typeof meta>

const getRatioCorrect = (numberOfCorrectAnswers: number) =>
  numberOfCorrectAnswers / layer2Questions.length

export const Passed: Story = {
  args: {
    isPassingScore: true,
    numberOfCorrectAnswers: layer2Questions.length,
    ratioCorrect: getRatioCorrect(layer2Questions.length),
  },
}

export const NonPassingResults: Story = {
  args: {
    isPassingScore: false,
    numberOfCorrectAnswers: 1,
    ratioCorrect: getRatioCorrect(1),
  },
}
