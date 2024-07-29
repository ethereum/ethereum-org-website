import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor, within } from "@storybook/test"

import { getTranslation } from "@/storybook-utils"

import { StandaloneQuizWidget } from "../QuizWidget"

import { LAYER_2_QUIZ_KEY, layer2Questions } from "./utils"

const meta = {
  title: "Molecules / Display Content / Quiz / QuizWidget",
  component: StandaloneQuizWidget,
  args: {
    quizKey: LAYER_2_QUIZ_KEY,
  },
  argTypes: {
    quizKey: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof StandaloneQuizWidget>

export default meta

type Story = StoryObj<typeof meta>

export const AllCorrectQuestions: Story = {
  play: async ({ canvasElement, step, args }) => {
    const translatedQuizKey = getTranslation(args.quizKey, "common")
    const translatedPassedQuiz = getTranslation("passed", "learn-quizzes")

    const canvas = within(canvasElement)

    const quizWidget = canvas.getByTestId("quiz-widget")
    await expect(quizWidget).toBeInTheDocument()

    await waitFor(() =>
      expect(canvas.getByTestId("answer-status-null")).toHaveTextContent(
        translatedQuizKey
      )
    )

    await waitFor(() =>
      expect(canvas.getByTestId("check-answer-button")).toBeDisabled()
    )

    await step("Answer all questions correctly", async () => {
      for (let i = 0; i < layer2Questions.length; i++) {
        const questionGroupId = canvas.getByTestId("question-group").id
        const questionAnswers = canvas.getAllByTestId("quiz-question-answer")
        const currentQuestionBank = layer2Questions.find(
          ({ id }) => id === questionGroupId
        )!
        await userEvent.click(
          questionAnswers.find(
            (answer) => answer.id === currentQuestionBank.correctAnswerId
          )!
        )

        await userEvent.click(canvas.getByTestId("check-answer-button"))
        await expect(
          canvas.getByTestId("answer-status-correct")
        ).toBeInTheDocument()

        if (i === layer2Questions.length - 1) {
          await userEvent.click(canvas.getByTestId("see-results-button"))
        } else {
          await userEvent.click(canvas.getByTestId("next-question-button"))
        }
      }
    })

    await step("Check for successful results page", async () => {
      await expect(canvasElement).toHaveTextContent(translatedPassedQuiz)
    })
  },
}

export const AllIncorrectQuestions: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const quizWidget = canvas.getByTestId("quiz-widget")
    await expect(quizWidget).toBeInTheDocument()

    await waitFor(() =>
      expect(canvas.getByTestId("check-answer-button")).toBeDisabled()
    )

    await step("Answer some questions incorrectly", async () => {
      for (let i = 0; i < layer2Questions.length; i++) {
        const questionGroupId = canvas.getByTestId("question-group").id
        const questionAnswers = canvas.getAllByTestId("quiz-question-answer")
        const currentQuestionBank = layer2Questions.find(
          ({ id }) => id === questionGroupId
        )!
        await userEvent.click(
          questionAnswers.find(
            (answer) => answer.id !== currentQuestionBank.correctAnswerId
          )!
        )

        await userEvent.click(canvas.getByTestId("check-answer-button"))
        await expect(
          canvas.getByTestId("answer-status-incorrect")
        ).toBeInTheDocument()

        if (i === layer2Questions.length - 1) {
          await userEvent.click(canvas.getByTestId("see-results-button"))
        } else {
          await userEvent.click(canvas.getByTestId("next-question-button"))
        }
      }
    })

    await step("Check for failed results page", async () => {
      await expect(canvasElement).toHaveTextContent("Your results")
    })
  },
}
