import { getI18n, useTranslation } from "react-i18next"
import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, waitFor, within } from "@storybook/test"

import questionBank from "@/data/quizzes/questionBank"

import { StandaloneQuizWidget } from "./"

const layer2QuestionBank = Object.entries(questionBank).reduce<
  { id: string; correctAnswer: string }[]
>((arr, curr) => {
  if (!curr[0].startsWith("g")) return [...arr]

  return [
    ...arr,
    {
      id: curr[0],
      correctAnswer: curr[1].correctAnswerId,
    },
  ]
}, [])

type QuizWidgetType = typeof StandaloneQuizWidget

const meta = {
  title: "QuizWidget",
  component: StandaloneQuizWidget,
  argTypes: {
    quizKey: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<QuizWidgetType>

export default meta

export const QuizWidgetAllCorrect: StoryObj<typeof meta> = {
  args: {
    quizKey: "layer-2",
  },
  render: (args) => <StandaloneQuizWidget {...args} />,

  play: async ({ canvasElement, step, args }) => {
    const { t } = getI18n()

    const translatedQuizKey = t(args.quizKey, { ns: "common" })
    const translatedPassedQuiz = t("passed", { ns: "learn-quizzes" })

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
      for (let i = 0; i < layer2QuestionBank.length; i++) {
        const questionGroupId = canvas.getByTestId("question-group").id
        const questionAnswers = canvas.getAllByTestId("quiz-question-answer")
        const currentQuestionBank = layer2QuestionBank.find(
          ({ id }) => id === questionGroupId
        )!
        await userEvent.click(
          questionAnswers.find(
            (answer) => answer.id === currentQuestionBank.correctAnswer
          )!
        )

        await userEvent.click(canvas.getByTestId("check-answer-button"))
        await expect(
          canvas.getByTestId("answer-status-correct")
        ).toBeInTheDocument()

        if (i === layer2QuestionBank.length - 1) {
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

export const QuizWidgetAllIncorrect: StoryObj<typeof meta> = {
  args: {
    quizKey: "layer-2",
  },
  render: (args) => <StandaloneQuizWidget {...args} />,

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    const quizWidget = canvas.getByTestId("quiz-widget")
    await expect(quizWidget).toBeInTheDocument()

    await waitFor(() =>
      expect(canvas.getByTestId("check-answer-button")).toBeDisabled()
    )

    await step("Answer some questions incorrectly", async () => {
      for (let i = 0; i < layer2QuestionBank.length; i++) {
        const questionGroupId = canvas.getByTestId("question-group").id
        const questionAnswers = canvas.getAllByTestId("quiz-question-answer")
        const currentQuestionBank = layer2QuestionBank.find(
          ({ id }) => id === questionGroupId
        )!
        await userEvent.click(
          questionAnswers.find(
            (answer) => answer.id !== currentQuestionBank.correctAnswer
          )!
        )

        await userEvent.click(canvas.getByTestId("check-answer-button"))
        await expect(
          canvas.getByTestId("answer-status-incorrect")
        ).toBeInTheDocument()

        if (i === layer2QuestionBank.length - 1) {
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
