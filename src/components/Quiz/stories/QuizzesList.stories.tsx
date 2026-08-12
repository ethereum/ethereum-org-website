import { useTranslations } from "next-intl"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import type { CompletedQuizzes } from "@/lib/types"

import { quizzesSections } from "@/data/quizzes"
import quizStatsMock from "@/data-layer/mocks/fetch-quiz-stats.json"

import QuizzesListComponent from "../QuizzesList"
import { getPopularQuizIds } from "../utils"

/**
 * This story also renders the `QuizItem` component.
 *
 * Creating a separate story for this subcomponent is arguably unnecessary.
 */

const meta = {
  title: "Molecules / Display Content / Quiz / QuizzesList",
  component: QuizzesListComponent,
  args: {
    sectionId: quizzesSections[0].id,
    content: quizzesSections[0].quizzes,
    headingId: quizzesSections[0].titleKey,
    descriptionId: quizzesSections[0].descriptionKey,
    userStats: {
      score: 0,
      average: [],
      completed: {} as CompletedQuizzes,
    },
    quizHandler: fn(),
    modalHandler: fn(),
    quizStats: quizStatsMock.byQuiz,
    popularQuizIds: getPopularQuizIds(quizStatsMock.byQuiz),
  },
} satisfies Meta<typeof QuizzesListComponent>

export default meta

export const Default: StoryObj<typeof meta> = {
  render: (args) => {
    const t = useTranslations("learn-quizzes")
    return (
      <QuizzesListComponent
        {...args}
        headingId={t(args.headingId)}
        descriptionId={t(args.descriptionId)}
      />
    )
  },
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
  render: (args) => {
    const t = useTranslations("learn-quizzes")
    return (
      <QuizzesListComponent
        {...args}
        headingId={t(args.headingId)}
        descriptionId={t(args.descriptionId)}
      />
    )
  },
}
