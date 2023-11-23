import { createContext, useContext } from "react";

import { AnswerChoice, Quiz } from "@/lib/interfaces";

import { AnswerStatus } from "./useQuizWidget";

type QuizWidgetContextType = {
  quizData: Quiz
  answerStatus: AnswerStatus
  currentQuestionIndex: number
  userQuizProgress: AnswerChoice[]
  selectedAnswer: string | undefined
  setSelectedAnswer: (answer: string) => void
  setCurrentQuestionAnswerChoice: (answer: AnswerChoice | null) => void
}

const QuizWidgetContext = createContext<QuizWidgetContextType | null>(null)

export const QuizWidgetProvider = QuizWidgetContext.Provider

export const useQuizWidgetContext = () => {
  const context = useContext(QuizWidgetContext)

  if (!context) {
    throw new Error("useQuizWidgetContext must be used within a QuizWidgetProvider")
  }

  return context
}
