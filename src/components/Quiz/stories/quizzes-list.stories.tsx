import { useTranslations } from "next-intl"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import type { CompletedQuizzes } from "@/lib/types"

import { quizzesSections } from "@/data/quizzes"

import QuizzesListComponent from "../QuizzesList"
import { getPopularQuizIds, type QuizStatsByQuiz } from "../utils"

// ethereum-vs-bitcoin is left out to show a row with no figures yet
const quizStats: QuizStatsByQuiz = {
  "what-is-ethereum": { averageScore: 72.5, timesTaken: 18369 },
  "what-is-ether": { averageScore: 83.3, timesTaken: 9927 },
  wallets: { averageScore: 75.3, timesTaken: 15461 },
  "what-are-apps": { averageScore: 71.8, timesTaken: 407 },
  web3: { averageScore: 73.3, timesTaken: 12900 },
}

/**
 * This story also renders the `QuizItem` component.
 *
 * Creating a separate story for this subcomponent is arguably unnecessary.
 */

const meta = {
  title: "Components / Features / Quiz / QuizzesList",
  component: QuizzesListComponent,
  tags: ["autodocs"],
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
    quizStats,
    popularQuizIds: getPopularQuizIds(quizStats),
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
