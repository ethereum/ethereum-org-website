import { createContext, Dispatch, SetStateAction, useContext } from "react"

import { AnswerChoice, Quiz, QuizKey, QuizStatus, UserStats } from "@/lib/types"

import { AnswerStatus } from "./useQuizWidget"

type QuizWidgetContextType = Quiz & {
  answerStatus: AnswerStatus
  currentQuestionIndex: number
  userQuizProgress: AnswerChoice[]
  showResults: boolean
  currentQuestionAnswerChoice: AnswerChoice | null
  quizPageProps:
  | {
    currentHandler: (nextKey: QuizKey) => void
    statusHandler: (status: QuizStatus) => void
    nextQuiz: QuizKey | undefined
  }
  | false
  numberOfCorrectAnswers: number
  quizScore: number
  ratioCorrect: number
  isPassingScore: boolean
  initialize: () => void
  setUserQuizProgress: Dispatch<SetStateAction<AnswerChoice[]>>
  setShowAnswer: (prev: boolean) => void
  setCurrentQuestionAnswerChoice: (answer: AnswerChoice | null) => void
}

const QuizWidgetContext = createContext<QuizWidgetContextType | null>(null)

export const QuizWidgetProvider = QuizWidgetContext.Provider

export const useQuizWidgetContext = () => {
  const context = useContext(QuizWidgetContext)

  if (!context) {
    throw new Error(
      "useQuizWidgetContext must be used within a QuizWidgetProvider"
    )
  }

  return context
}
