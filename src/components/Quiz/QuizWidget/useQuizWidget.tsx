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
  const [nextQuiz, setNextQuiz] = useState<string | undefined>(undefined)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
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
  const isPassingScore = quizScore > PASSING_QUIZ_SCORE

  const showConfetti = useMemo<boolean>(
    () => !!quizData && showResults && isPassingScore,
    [quizData, showResults, isPassingScore]
  )

  useEffect(() => {
    if (!showResults) return

    updateUserStats((prevStats) => {
      const lastScore = prevStats.completed[quizKey][1]

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
