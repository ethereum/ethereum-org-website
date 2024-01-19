import { CompletedQuizzes, UserStats } from "@/lib/types"

import allQuizzesData from "@/data/quizzes"

import { USER_STATS_KEY } from "@/lib/constants"

import { useLocalStorage } from "@/hooks/useLocalStorage"

export const INITIAL_USER_STATS: UserStats = {
  score: 0,
  average: [],
  completed: {},
}

export const useLocalQuizData = () => {
  const data = useLocalStorage(USER_STATS_KEY, INITIAL_USER_STATS)

  return data
}
