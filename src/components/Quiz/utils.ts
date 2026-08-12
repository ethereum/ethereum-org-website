import type { CompletedQuizzes, QuizKey, QuizShareStats } from "@/lib/types"

import { numberFormat, numberToPercent } from "@/lib/utils/numbers"

import allQuizzesData, { allQuizzesInOrder } from "@/data/quizzes"
import type {
  QuizStatsData,
  QuizStatsEntry,
} from "@/data-layer/fetchers/fetchQuizStats"

export const getTotalQuizzesPoints = () =>
  Object.values(allQuizzesData)
    .map((quiz) => quiz.questions.length)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

export const getNumberOfCompletedQuizzes = (quizzes: CompletedQuizzes) =>
  Object.values(quizzes)
    .map((v) => v[0])
    .filter((v) => v).length

export const getNextQuiz = (currentQuiz?: string) => {
  const nextQuiz = allQuizzesInOrder.find((quiz) => quiz.id === currentQuiz)

  return nextQuiz ? nextQuiz.next : undefined
}

export const shareOnTwitter = ({ score, total }: QuizShareStats): void => {
  const url = "https://ethereum.org/quizzes"
  const hashtags = ["ethereumquiz", "ethereum", "quiz"]
  const tweet =
    score > 0
      ? `${encodeURI(
          `I took Ethereum quizzes on ethereum.org and overall scored ${score} out of ${total}! Try it yourself at ${url}`
        )}`
      : `${encodeURI(
          `How well do you know Ethereum? Check out these Ethereum quizzes on ethereum.org: ${url}`
        )}`

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}

// These are averages over large samples; more precision than this is noise.
const PERCENT_OPTIONS: Intl.NumberFormatOptions = { maximumFractionDigits: 1 }

// Values arrive as 0-100, not 0-1.
const asPercent = (value: number, locale: string) =>
  numberToPercent(value / 100, locale, PERCENT_OPTIONS)

const mean = (values: number[]) =>
  values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0

export const getFormattedUserAverageScore = (
  locale: string,
  valueSet: number[]
) => asPercent(mean(valueSet), locale)

/** How many quizzes carry the "popular" tag on the hub. */
const POPULAR_QUIZ_COUNT = 5

export type QuizStatsByQuiz = QuizStatsData["byQuiz"]

/**
 * Ids of the most-answered quizzes, normalised by question count: a six-question
 * quiz logs 50% more answers than a four-question one for the same audience, so
 * raw event totals would just rank by length.
 */
export const getPopularQuizIds = (byQuiz?: QuizStatsByQuiz | null): QuizKey[] =>
  // Keys are quiz ids, but a stale blob can name a quiz that has since been
  // removed, so filter before treating them as QuizKeys.
  (Object.entries(byQuiz || {}) as [QuizKey, QuizStatsEntry][])
    .filter(([id]) => id in allQuizzesData)
    .map(([id, { questionsAnswered }]) => ({
      id,
      perQuestion: questionsAnswered / allQuizzesData[id].questions.length,
    }))
    .sort((a, b) => b.perQuestion - a.perQuestion)
    .slice(0, POPULAR_QUIZ_COUNT)
    .map(({ id }) => id)

/** Formatted per-quiz figures for a single row on the hub. */
export const getQuizStatValues = (
  locale: string,
  { averageScore, questionsAnswered }: QuizStatsEntry
) => ({
  averageScore: asPercent(averageScore, locale),
  questionsAnswered: numberFormat(locale, { style: "decimal" }).format(
    questionsAnswered
  ),
})

/** Label/value rows for the community stats panel, in display order. */
export const getCommunityStatRows = (
  locale: string,
  { averageScore, questionsAnswered, retryRate }: QuizStatsData
) => [
  { labelId: "average-score", value: asPercent(averageScore, locale) },
  {
    labelId: "questions-answered",
    // Exact, since these come from a daily Matomo fetch: rounding made the old
    // hard-coded figures read as invented.
    value: numberFormat(locale, { style: "decimal" }).format(questionsAnswered),
  },
  { labelId: "retry", value: asPercent(retryRate, locale) },
]
