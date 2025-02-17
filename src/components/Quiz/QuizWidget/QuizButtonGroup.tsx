import { type Dispatch, type SetStateAction, useMemo } from "react"
import { FaXTwitter } from "react-icons/fa6"

import type { AnswerChoice, Question, QuizKey, QuizStatus } from "@/lib/types"

import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { AnswerStatus } from "./useQuizWidget"

type QuizButtonGroupProps = {
  showResults: boolean
  handleReset: () => void
  currentQuestionAnswerChoice: AnswerChoice | null
  title: string
  questions: Question[]
  currentQuestionIndex: number
  quizPageProps:
    | {
        currentHandler: (nextKey: QuizKey) => void
        statusHandler: (status: QuizStatus) => void
        nextQuiz: QuizKey | undefined
      }
    | false
  answerStatus: AnswerStatus
  numberOfCorrectAnswers: number
  userQuizProgress: AnswerChoice[]
  quizScore: number
  setCurrentQuestionAnswerChoice: (answer: AnswerChoice | null) => void
  setUserQuizProgress: Dispatch<SetStateAction<AnswerChoice[]>>
  setShowAnswer: (prev: boolean) => void
}

export const QuizButtonGroup = ({
  showResults,
  handleReset,
  currentQuestionAnswerChoice,
  title,
  questions,
  currentQuestionIndex,
  quizPageProps,
  answerStatus,
  numberOfCorrectAnswers,
  userQuizProgress,
  quizScore,
  setCurrentQuestionAnswerChoice,
  setUserQuizProgress,
  setShowAnswer,
}: QuizButtonGroupProps) => {
  const finishedQuiz = useMemo(
    () => userQuizProgress.length === questions.length! - 1,
    [questions.length, userQuizProgress.length]
  )

  const handleShare = () => {
    if (!window) return

    trackCustomEvent({
      eventCategory: "quiz_hub_events",
      eventAction: "Secondary button clicks",
      eventName: "Twitter_share_quiz",
    })

    const url = `https://ethereum.org${window.location.pathname}%23quiz`
    const hashtags = ["ethereumquiz", "ethereum", "quiz"]
    const tweet = `${encodeURI(
      `I just took the "${title}" quiz on ethereum.org and scored ${numberOfCorrectAnswers} out of ${questions.length}! Try it yourself at ${url}`
    )}`

    window.open(
      `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
    )
  }

  const handleSubmitAnswer = () => {
    if (!currentQuestionAnswerChoice) return

    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Question answered",
      eventName: `QID: ${questions[currentQuestionIndex].id}`,
      eventValue: currentQuestionAnswerChoice.isCorrect ? "1" : "0",
    })

    setShowAnswer(true)

    if (quizPageProps) {
      if (currentQuestionAnswerChoice.isCorrect) {
        return quizPageProps.statusHandler?.("success")
      }

      return quizPageProps.statusHandler?.("error")
    }
  }

  const handleRetryQuestion = () => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Retry question",
    })

    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)

    if (quizPageProps) {
      quizPageProps.statusHandler("neutral")
    }
  }

  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return

    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)

    // Reset quiz status (modifies bg color for mobile)
    if (quizPageProps) {
      quizPageProps.statusHandler("neutral")
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

  const hasNotPerfectQuizScore = quizScore < 100

  const MainButtons = () => {
    if (showResults) {
      const hasNextQuiz = quizPageProps && !!quizPageProps.nextQuiz

      return (
        <>
          <Center className="w-full gap-4 max-md:flex-col md:gap-2">
            <Button variant="outline" onClick={handleShare}>
              <>
                <FaXTwitter />
                <Translation id="learn-quizzes:share-results" />
              </>
            </Button>

            {/* Show `Next Quiz` button if quiz is opened from hub page */}
            {hasNextQuiz && (
              <Button
                onClick={() => {
                  quizPageProps.currentHandler(quizPageProps.nextQuiz!)
                }}
              >
                <Translation id="learn-quizzes:next-quiz" />
              </Button>
            )}
          </Center>

          {hasNotPerfectQuizScore ? (
            <Button
              onClick={handleReset}
              variant="ghost"
              className="font-bold underline"
            >
              <Translation id="learn-quizzes:try-again" />
            </Button>
          ) : null}
        </>
      )
    }

    if (answerStatus) {
      return (
        <>
          {answerStatus === "incorrect" && (
            <Button onClick={handleRetryQuestion} variant="outline">
              <Translation id="learn-quizzes:try-again" />
            </Button>
          )}
          <Button
            onClick={handleContinue}
            data-testid={
              finishedQuiz ? "see-results-button" : "next-question-button"
            }
          >
            <Translation
              id={
                finishedQuiz
                  ? "learn-quizzes:see-results"
                  : "learn-quizzes:next-question"
              }
            />
          </Button>
        </>
      )
    }

    return (
      <Button
        onClick={handleSubmitAnswer}
        disabled={!currentQuestionAnswerChoice}
        data-testid="check-answer-button"
      >
        <Translation id="learn-quizzes:submit-answer" />
      </Button>
    )
  }

  return (
    <Center className="flex-wrap gap-4 max-sm:w-full max-sm:flex-col md:gap-6 max-sm:[&>button]:w-full">
      <MainButtons />
    </Center>
  )
}
