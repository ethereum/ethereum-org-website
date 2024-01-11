import { CompletedQuizzes, UserStats } from "@/lib/types"

import allQuizzesData from "@/data/quizzes"

import { USER_STATS_KEY } from "@/lib/constants"

import { useLocalStorage } from "@/hooks/useLocalStorage"

/**
 * Contains each quiz id as key and <boolean, number> to indicate if its completed and the highest score in that quiz
 *
 * Initialize all quizzes as not completed
 */
const INITIAL_COMPLETED_QUIZZES: CompletedQuizzes = Object.keys(
  allQuizzesData
).reduce((object, key) => ({ ...object, [key]: [false, 0] }), {})

export const INITIAL_USER_STATS: UserStats = {
  score: 0,
  average: [],
  completed: INITIAL_COMPLETED_QUIZZES,
}

export const useLocalQuizData = () => {
  const data = useLocalStorage(
    USER_STATS_KEY,
    INITIAL_USER_STATS
  )

  return data
}
