import { createContext } from "react"

export type QuizStatus = "neutral" | "success" | "error"

interface ContextState {
  next?: string
  status: QuizStatus
}

const initialState: ContextState = {
  next: undefined,
  status: "neutral",
}

export const QuizzesHubContext = createContext(initialState)
