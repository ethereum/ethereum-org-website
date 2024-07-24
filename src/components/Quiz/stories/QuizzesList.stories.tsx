import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import type { CompletedQuizzes } from "@/lib/types"

import { ethereumBasicsQuizzes } from "@/data/quizzes"

import { getTranslation } from "@/storybook-utils"

import { langViewportModes } from "../../../../.storybook/modes"
import QuizzesListComponent from "../QuizzesList"

/**
 * This story also renders the `QuizItem` component.
 *
 * Creating a separate story for this subcomponent is arguably unnecessary.
 */

const meta = {
  title: "Molecules / Display Content / Quiz / QuizzesList",
  component: QuizzesListComponent,
  parameters: {
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof QuizzesListComponent>

export default meta

export const QuizzesList: StoryObj<typeof meta> = {
  args: {
    content: ethereumBasicsQuizzes,
    headingId: "basics",
    descriptionId: "basics-description",
    userStats: {
      score: 0,
      average: [],
      completed: {} as CompletedQuizzes,
    },
    quizHandler: fn(),
    modalHandler: fn(),
  },

  render: ({ headingId, descriptionId, ...args }) => (
    <QuizzesListComponent
      {...args}
      headingId={getTranslation(headingId, "learn-quizzes")}
      descriptionId={getTranslation(descriptionId, "learn-quizzes")}
    />
  ),
}
