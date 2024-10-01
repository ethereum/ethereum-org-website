import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import type { CompletedQuizzes } from "@/lib/types"

import { ethereumBasicsQuizzes } from "@/data/quizzes"

import { getTranslation } from "@/storybook-utils"

import QuizzesListComponent from "../QuizzesList"

/**
 * This story also renders the `QuizItem` component.
 *
 * Creating a separate story for this subcomponent is arguably unnecessary.
 */

const meta = {
  title: "Molecules / Display Content / Quiz / QuizzesList",
  component: QuizzesListComponent,
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
} satisfies Meta<typeof QuizzesListComponent>

export default meta

export const Default: StoryObj<typeof meta> = {
  render: ({ headingId, descriptionId, ...args }) => (
    <QuizzesListComponent
      {...args}
      headingId={getTranslation(headingId, "learn-quizzes")}
      descriptionId={getTranslation(descriptionId, "learn-quizzes")}
    />
  ),
}

export const OneCompletedQuiz: StoryObj<typeof meta> = {
  args: {
    ...meta.args,
    userStats: {
      average: [100],
      score: 4,
      completed: {
        ...meta.args.userStats.completed,
        "what-is-ethereum": [true, 5],
      },
    },
  },
  render: ({ headingId, descriptionId, ...args }) => (
    <QuizzesListComponent
      {...args}
      headingId={getTranslation(headingId, "learn-quizzes")}
      descriptionId={getTranslation(descriptionId, "learn-quizzes")}
    />
  ),
}
