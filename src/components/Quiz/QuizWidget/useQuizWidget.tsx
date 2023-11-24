import { useEffect, useMemo, useRef, useState } from "react"
import { shuffle } from "lodash"
import { useTranslation } from "next-i18next"

import {
  AnswerChoice,
  Question,
  Quiz,
  RawQuestion,
  RawQuiz,
} from "@/lib/interfaces"

import allQuizzesData from "@/data/quizzes"
import questionBank from "@/data/quizzes/questionBank"

import { getNextQuiz } from "../utils"

import { QuizWidgetProps } from "."

export type AnswerStatus = "correct" | "incorrect" | null

export const useQuizWidget = ({
  quizKey,
}: Pick<QuizWidgetProps, "quizKey">) => {
  const { t } = useTranslation()

  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [nextQuiz, setNextQuiz] = useState<string | undefined>(undefined)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)

    useEffect(() => {
      setNextQuiz(getNextQuiz(quizKey))
    }, [quizKey])

  const initialize = () => {
    setQuizData(null)
    setSelectedAnswer(undefined)

    const currentQuizKey =
      quizKey ||
      Object.keys(allQuizzesData).filter((quizUri) =>
        window?.location.href.includes(quizUri)
      )[0] ||
      null

    if (!currentQuizKey) return

    // Get quiz data from key, shuffle, then truncate if necessary
    const rawQuiz: RawQuiz = allQuizzesData[currentQuizKey]
    const questions: Array<Question> = rawQuiz.questions.map((id) => {
      const rawQuestion: RawQuestion = questionBank[id]
      return { id, ...rawQuestion }
    })
    const shuffledQuestions = shuffle(questions)
    const quiz: Quiz = {
      title: t(rawQuiz.title),
      questions: shuffledQuestions,
    }

    setQuizData(quiz)
  }

  useEffect(initialize, [quizKey, t])

  const currentQuestionIndex = userQuizProgress.length
  const showResults = currentQuestionIndex === quizData?.questions.length

  /**
   * Determines the status of a submitted answer choice.
   *
   * @returns {('correct'|'incorrect'|null)} Returns `correct` if the answer is correct, `incorrect` if the answer is incorrect, or `null` if an answer has not yet been given.
   */
  const answerStatus = useMemo<AnswerStatus>(() => {
    if (!showAnswer) return null

    if (currentQuestionAnswerChoice?.isCorrect) return "correct"

    return "incorrect"
  }, [currentQuestionAnswerChoice?.isCorrect, showAnswer])

  const numberOfCorrectAnswers = userQuizProgress.filter(
    ({ isCorrect }) => isCorrect
  ).length

  const ratioCorrect = !quizData
    ? 0
    : numberOfCorrectAnswers / quizData.questions.length

  const quizScore = Math.floor(ratioCorrect * 100)

  return {
    quizData,
    answerStatus,
    showResults,
    currentQuestionIndex,
    userQuizProgress,
    selectedAnswer,
    currentQuestionAnswerChoice,
    numberOfCorrectAnswers,
    nextQuiz,
    quizScore,
    initialize,
    setUserQuizProgress,
    setSelectedAnswer,
    setShowAnswer,
    setCurrentQuestionAnswerChoice
  }
}
