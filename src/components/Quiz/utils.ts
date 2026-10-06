import type { CompletedQuizzes, QuizShareStats } from "@/lib/types"

import { numberFormat, numberToPercent } from "@/lib/utils/numbers"

import allQuizzesData, { allQuizzesInOrder } from "@/data/quizzes"
import type { QuizStatsData } from "@/data-layer/fetchers/fetchQuizStats"

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
