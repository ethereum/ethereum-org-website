import { createContext } from "react"

export type QuizStatus = "neutral" | "success" | "error"

interface ContextState {
  next?: string
  status: QuizStatus
  score: number
  completed: number
}

const initialState: ContextState = {
  next: undefined,
  status: "neutral",
  score: 0,
  completed: 0,
}

export const QuizzesHubContext = createContext(initialState)
