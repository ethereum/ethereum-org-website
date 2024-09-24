import { useEffect, useMemo, useState } from "react"
import isChromatic from "chromatic"
import shuffle from "lodash/shuffle"
import { useTranslation } from "next-i18next"

import type {
  AnswerChoice,
  Question,
  Quiz,
  QuizKey,
  RawQuestion,
  RawQuiz,
} from "@/lib/types"

import allQuizzesData from "@/data/quizzes"
import questionBank from "@/data/quizzes/questionBank"

import { PASSING_QUIZ_SCORE } from "@/lib/constants"

import { getNextQuiz } from "../utils"

import { QuizWidgetProps } from "."

export type AnswerStatus = "correct" | "incorrect" | null

export const useQuizWidget = ({
  quizKey,
  updateUserStats,
}: Pick<QuizWidgetProps, "quizKey" | "updateUserStats">) => {
  const { t } = useTranslation()

  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [nextQuiz, setNextQuiz] = useState<QuizKey | undefined>(undefined)
  const [userQuizProgress, setUserQuizProgress] = useState<AnswerChoice[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)

  useEffect(() => {
    setNextQuiz(getNextQuiz(quizKey))
  }, [quizKey])

  const initialize = () => {
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)

    // Get quiz data from key, shuffle, then truncate if necessary
    const rawQuiz: RawQuiz = allQuizzesData[quizKey]
    const questions: Question[] = rawQuiz.questions.map((id) => {
      const rawQuestion: RawQuestion = questionBank[id]
      return { id, ...rawQuestion }
    })

    // ! Do not shuffle questions in Chromatic to keep the modal story snapshot stable
    const shuffledQuestions = isChromatic() ? questions : shuffle(questions)
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
  const isPassingScore = quizScore > PASSING_QUIZ_SCORE

  const showConfetti = !!quizData && showResults && isPassingScore

  useEffect(() => {
    if (!showResults) return

    updateUserStats((prevStats) => {
      const { completed } = prevStats
      const hasResultsSaved = !!completed[quizKey]
      const lastScore = hasResultsSaved ? prevStats.completed[quizKey][1] : 0

      if (numberOfCorrectAnswers < lastScore) return prevStats

      return {
        score: prevStats.score + numberOfCorrectAnswers - lastScore,
        average: [...prevStats.average, quizScore],
        completed: {
          ...prevStats.completed,
          [quizKey]: [
            quizScore === 100,
            quizScore > lastScore ? numberOfCorrectAnswers : lastScore,
          ],
        },
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults])

  return {
    quizData,
    answerStatus,
    showResults,
    currentQuestionIndex,
    userQuizProgress,
    currentQuestionAnswerChoice,
    numberOfCorrectAnswers,
    nextQuiz,
    quizScore,
    ratioCorrect,
    showConfetti,
    isPassingScore,
    initialize,
    setUserQuizProgress,
    setShowAnswer,
    setCurrentQuestionAnswerChoice,
  }
}
