import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, fn, within } from "@storybook/test"

import { QuizContent } from "../QuizWidget/QuizContent"
import { QuizRadioGroup } from "../QuizWidget/QuizRadioGroup"

import { LAYER_2_QUIZ_TITLE, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget / RadioGroup",
  component: QuizRadioGroup,
  decorators: [
    (Story, { args }) => (
      <QuizContent title={LAYER_2_QUIZ_TITLE} answerStatus={args.answerStatus}>
        <Story />
      </QuizContent>
    ),
  ],
} satisfies Meta<typeof QuizRadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const StartQuestion: Story = {
  args: {
    answerStatus: null,
    currentQuestionIndex: 0,
    questions: layer2Questions,
    setCurrentQuestionAnswerChoice: fn(),
  },
}

const clickAnswer = async (
  selectedId: `rollups-1-${string}`,
  answers: HTMLElement[]
) => {
  const selectedAnswer = answers.find((answer) => answer.id === selectedId)

  await expect(selectedAnswer).toBeInTheDocument()

  await fireEvent.click(selectedAnswer!)
}

export const SelectedAnswer: Story = {
  ...StartQuestion,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const answers = canvas.getAllByTestId("quiz-question-answer")

    // Click the first answer ("which is the correct answer")
    await clickAnswer("rollups-1-a", answers)
  },
}

export const SelectedCorrectAnswer: Story = {
  args: {
    ...SelectedAnswer.args,
    answerStatus: "correct",
  },
  play: SelectedAnswer.play,
}

export const SelectedIncorrectAnswer: Story = {
  args: {
    ...SelectedAnswer.args,
    answerStatus: "incorrect",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const answers = canvas.getAllByTestId("quiz-question-answer")

    // Click the second answer ("which is the incorrect answer")
    await clickAnswer("rollups-1-b", answers)
  },
}
