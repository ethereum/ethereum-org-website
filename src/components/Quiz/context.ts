import { createContext } from "react"

import { QuizStatus } from "../../types"

interface ContextState {
  status: QuizStatus
  next?: string
  score: number
  average: number
  completed: string
}

const INITIAL_CONTEXT_STATE: ContextState = {
  status: "neutral",
  next: undefined,
  score: 0,
  average: 0,
  completed: JSON.stringify({}),
}

export const QuizzesHubContext = createContext(INITIAL_CONTEXT_STATE)
