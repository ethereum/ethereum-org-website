import type {
  CompletedQuizzes,
  Lang,
  QuizShareStats,
  QuizzesSection,
} from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import allQuizzesData, {
  ethereumBasicsQuizzes,
  usingEthereumQuizzes,
} from "@/data/quizzes"

import {
  TOTAL_QUIZ_AVERAGE_SCORE,
  TOTAL_QUIZ_QUESTIONS_ANSWERED,
  TOTAL_QUIZ_RETRY_RATE,
} from "@/lib/constants"

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
  const allQuizzes = [...ethereumBasicsQuizzes, ...usingEthereumQuizzes]
  const nextQuiz = allQuizzes.find((quiz) => quiz.id === currentQuiz)

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

export const getFormattedStats = (language, average) => {
  const localeForNumbers = getLocaleForNumberFormat(language as Lang)

  // Initialize number and percent formatters
  const numberFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "decimal",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const percentFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "percent",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const computedAverage = average.length > 0 ? mean(average) : 0

  // Convert collective stats to fraction for percentage format
  const normalizedCollectiveAverageScore = TOTAL_QUIZ_AVERAGE_SCORE / 100
  const normalizedCollectiveRetryRate = TOTAL_QUIZ_RETRY_RATE / 100

  return {
    formattedUserAverageScore: percentFormatter.format(computedAverage / 100), // Normalize user average
    formattedCollectiveQuestionsAnswered: numberFormatter.format(
      TOTAL_QUIZ_QUESTIONS_ANSWERED
    ),
    formattedCollectiveAverageScore: percentFormatter.format(
      normalizedCollectiveAverageScore
    ),
    formattedCollectiveRetryRate: percentFormatter.format(
      normalizedCollectiveRetryRate
    ),
  }
}

export const addNextQuiz = (quizzes: QuizzesSection[]) =>
  quizzes.map((quiz, idx) => ({
    ...quiz,
    next: quizzes[idx + 1]?.id,
  }))
