import { CompletedQuizzes, UserStats } from "@/lib/types"
import { RawQuizzes } from "@/lib/interfaces"

import { useLocalStorage } from "@/hooks/useLocalStorage"

type UseLocalQuizDataProps = {
  userStatsKey: string
  allQuizData: RawQuizzes
}

export const useLocalQuizData = ({
  userStatsKey,
  allQuizData,
}: UseLocalQuizDataProps) => {
  /**
   * Contains each quiz id as key and <boolean, number> to indicate if its completed and the highest score in that quiz
   *
   * Initialize all quizzes as not completed
   */
  const INITIAL_COMPLETED_QUIZZES = Object.keys(
    allQuizData
  ).reduce<CompletedQuizzes>(
    (object, key) => ({ ...object, [key]: [false, 0] }),
    {}
  )

  const INITIAL_USER_STATS: UserStats = {
    score: 0,
    average: [],
    completed: INITIAL_COMPLETED_QUIZZES,
  }

  const data = useLocalStorage(userStatsKey, INITIAL_USER_STATS)

  return data
}
