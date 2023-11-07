import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { shuffle } from "lodash"
import { useTranslation } from "gatsby-plugin-react-i18next"

import allQuizzesData from "../../../data/quizzes"
import {
  AnswerChoice,
  Question,
  Quiz,
  RawQuestion,
  RawQuiz,
} from "../../../types"
import questionBank from "../../../data/quizzes/questionBank"
import { PASSING_QUIZ_SCORE, USER_STATS_KEY } from "../../../constants"
import { trackCustomEvent } from "../../../utils/matomo"
import { INITIAL_USER_STATS } from "../../../pages/quizzes"

import { QuizzesHubContext } from "../context"
import { getNextQuiz } from "../utils"
import type { IProps } from "./index"

export const useQuizWidget = ({
  currentHandler,
  statusHandler,
  isStandaloneQuiz,
  maxQuestions,
  quizKey,
}: IProps) => {
  const { t } = useTranslation()

  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [nextQuiz, setNextQuiz] = useState<string | undefined>(undefined)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const { setUserStats } = useContext(QuizzesHubContext)

  useEffect(() => {
    // If quiz is standalone (out of Quiz Hub page),
    // stats required to be initialized on localStorage first
    const item = window.localStorage.getItem(USER_STATS_KEY)

    if (item === null) {
      localStorage.setItem(USER_STATS_KEY, JSON.stringify(INITIAL_USER_STATS))
    }

    setNextQuiz(getNextQuiz(quizKey))
  }, [quizKey])

  const hasNextQuiz = !isStandaloneQuiz && !!nextQuiz
  const finishedQuiz =
    userQuizProgress.length === quizData?.questions.length! - 1

  // Reset quiz state
  const initialize = () => {
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)
    setSelectedAnswer(null)

    if (!isStandaloneQuiz) {
      statusHandler?.("neutral")
    }

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
    const trimmedQuestions = maxQuestions
      ? shuffledQuestions.slice(0, maxQuestions)
      : shuffledQuestions
    const quiz: Quiz = {
      title: t(rawQuiz.title),
      questions: trimmedQuestions,
    }

    setQuizData(quiz)
  }

  useEffect(initialize, [quizKey])

  const currentQuestionIndex = userQuizProgress.length
  const showResults = currentQuestionIndex === quizData?.questions.length

  const progressBarBackground = useCallback(
    (index: number): string => {
      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          currentQuestionAnswerChoice?.isCorrect) ||
        userQuizProgress[index]?.isCorrect
      ) {
        return "success.base"
      }

      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          !currentQuestionAnswerChoice?.isCorrect) ||
        (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
      ) {
        return "error.base"
      }

      if (index === currentQuestionIndex) {
        return "gray.400"
      }

      return "gray.500"
    },
    [
      showAnswer,
      currentQuestionIndex,
      currentQuestionAnswerChoice,
      userQuizProgress,
    ]
  )

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

  const handleSelectAnswerChoice = (answerId: string) => {
    const isCorrect =
      answerId === quizData?.questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }

  const handleSelection = (answerId: string) => {
    setSelectedAnswer(answerId)
    handleSelectAnswerChoice(answerId)
  }

  const handleSubmitAnswer = (questionId: string, answer: AnswerChoice) => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Question answered",
      eventName: `QID: ${questionId}`,
      eventValue: answer.isCorrect ? "1" : "0",
    })

    setShowAnswer(true)

    if (!isStandaloneQuiz) {
      if (currentQuestionAnswerChoice?.isCorrect) {
        statusHandler?.("success")
      }

      if (!currentQuestionAnswerChoice?.isCorrect) {
        statusHandler?.("error")
      }
    }
  }

  const handleRetryQuestion = () => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Retry question",
    })

    setCurrentQuestionAnswerChoice(null)
    setSelectedAnswer(null)
    setShowAnswer(false)

    if (!isStandaloneQuiz) {
      statusHandler?.("neutral")
    }
  }

  const handleShare = () => {
    if (!quizData || !window) return

    trackCustomEvent({
      eventCategory: "quiz_hub_events",
      eventAction: "Secondary button clicks",
      eventName: "Twitter_share_quiz",
    })

    const url = `https://ethereum.org${window.location.pathname}%23quiz`
    const hashtags = ["ethereumquiz", "ethereum", "quiz"]
    const tweet = `${encodeURI(
      `I just took the "${quizData.title}" quiz on ethereum.org and scored ${numberOfCorrectAnswers} out of ${quizData.questions.length}! Try it yourself at ${url}`
    )}`

    window.open(
      `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
    )
  }

  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return

    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)

    // Reset quiz status (modifies bg color for mobile)
    if (!isStandaloneQuiz) {
      statusHandler?.("neutral")
    }

    if (finishedQuiz) {
      trackCustomEvent({
        eventCategory: "Quiz widget",
        eventAction: "Other",
        eventName: "Submit results",
        eventValue: `${quizScore}%`,
      })
    }
  }

  const handleNextQuiz = () => {
    currentHandler?.(nextQuiz)
  }

  return {
    quizData,
    showAnswer,
    currentQuestionAnswerChoice,
    showConfetti,
    progressBarBackground,
    showResults,
    numberOfCorrectAnswers,
    isPassingScore,
    ratioCorrect,
    quizScore,
    setUserStats,
    currentQuestionIndex,
    handleSelection,
    selectedAnswer,
    handleRetryQuestion,
    handleShare,
    hasNextQuiz,
    handleContinue,
    initialize,
    finishedQuiz,
    handleSubmitAnswer,
    handleNextQuiz,
  }
}
