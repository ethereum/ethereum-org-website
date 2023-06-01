import { createContext } from "react"

import { QuizStatus, UserStats } from "../../types"

interface ContextState {
  status: QuizStatus
  next?: string
  score: number
  quizKey?: string
  average: number[]
  completed: string
  setUserStats: (stats: UserStats) => void
}

const INITIAL_CONTEXT_STATE: ContextState = {
  status: "neutral",
  next: undefined,
  score: 0,
  quizKey: undefined,
  average: [],
  completed: JSON.stringify({}),
  setUserStats: () => {},
}

export const QuizzesHubContext = createContext(INITIAL_CONTEXT_STATE)
