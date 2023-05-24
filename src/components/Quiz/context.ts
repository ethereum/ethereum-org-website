import { createContext } from "react"

import { CompletedQuizzes, QuizStatus } from "../../types"

interface ContextState {
  status: QuizStatus
  next?: string
  score: number
  average: number
  completed: CompletedQuizzes
}

const INITIAL_CONTEXT_STATE: ContextState = {
  status: "neutral",
  next: undefined,
  score: 0,
  average: 0,
  completed: {},
}

export const QuizzesHubContext = createContext(INITIAL_CONTEXT_STATE)
