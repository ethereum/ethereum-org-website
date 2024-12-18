import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import QuizWidget, { type QuizWidgetProps } from "../QuizWidget"
import QuizzesModal from "../QuizzesModal"

import { LAYER_2_QUIZ_KEY } from "./utils"

type ModalPropsAndWidgetArgs = ComponentProps<typeof QuizzesModal> & {
  widgetProps: QuizWidgetProps
}

const meta = {
  title: "Molecules / Display Content / Quiz / Modal",
  component: QuizzesModal,
  args: {
    isQuizModalOpen: true,
    quizStatus: "neutral",
    onQuizModalOpenChange: fn(),
    children: "",
    widgetProps: {
      quizKey: LAYER_2_QUIZ_KEY,
      updateUserStats: fn(),
      currentHandler: fn(),
      statusHandler: fn(),
      isStandaloneQuiz: false,
    },
  },
} satisfies Meta<ModalPropsAndWidgetArgs>

export default meta

type Story = StoryObj<ModalPropsAndWidgetArgs>

export const Modal: Story = {
  render: ({ widgetProps, ...args }) => (
    <QuizzesModal {...args}>
      <QuizWidget {...widgetProps} />
    </QuizzesModal>
  ),
}
