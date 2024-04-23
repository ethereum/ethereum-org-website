import type { CompletedQuizzes, UserStats } from "@/lib/types"

import { USER_STATS_KEY } from "@/lib/constants"

import { useLocalStorage } from "@/hooks/useLocalStorage"

export const INITIAL_USER_STATS: UserStats = {
  score: 0,
  average: [],
  completed: {} as CompletedQuizzes,
}

export const useLocalQuizData = () => {
  const data = useLocalStorage(USER_STATS_KEY, INITIAL_USER_STATS)

  // If the user has an old version of the app, convert the
  // `completed` value from a string to an object.
  const [current, setCurrent] = data
  if (typeof current.completed === "string") {
    setCurrent({ ...current, completed: JSON.parse(current.completed) })
  }

  return data
}
