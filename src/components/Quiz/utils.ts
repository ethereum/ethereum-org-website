import type {
  CompletedQuizzes,
  QuizShareStats,
  QuizzesSection,
} from "@/lib/types"

import { numberFormat } from "@/lib/utils/numbers"

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

const mean = (values: number[]) =>
  values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0

export const getFormattedStats = (
  locale: string,
  valueSet: number[],
  communityStats: QuizStatsData | null
) => {
  // Initialize number and percent formatters
  const numberFormatter = numberFormat(locale, {
    style: "decimal",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const percentFormatter = numberFormat(locale, {
    style: "percent",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const computedAverage = valueSet.length > 0 ? mean(valueSet) : 0

  return {
    formattedUserAverageScore: percentFormatter.format(computedAverage / 100), // Normalize user average
    formattedCollectiveQuestionsAnswered: numberFormatter.format(
      communityStats?.questionsAnswered ?? 0
    ),
    formattedCollectiveAverageScore: percentFormatter.format(
      (communityStats?.averageScore ?? 0) / 100
    ),
    formattedCollectiveRetryRate: percentFormatter.format(
      (communityStats?.retryRate ?? 0) / 100
    ),
  }
}

export const addNextQuiz = (quizzes: QuizzesSection[]) =>
  quizzes.map((quiz, idx) => ({
    ...quiz,
    next: quizzes[idx + 1]?.id,
  }))
