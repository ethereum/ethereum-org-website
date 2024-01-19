import { CompletedQuizzes, UserStats } from "@/lib/types"

import { USER_STATS_KEY } from "@/lib/constants"

import { useLocalStorage } from "@/hooks/useLocalStorage"

export const INITIAL_USER_STATS: UserStats = {
  score: 0,
  average: [],
  completed: {} as CompletedQuizzes,
}

export const useLocalQuizData = () => useLocalStorage<UserStats>(USER_STATS_KEY, INITIAL_USER_STATS)
