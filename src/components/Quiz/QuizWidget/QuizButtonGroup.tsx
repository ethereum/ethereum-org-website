import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { FaTwitter } from "react-icons/fa"
import { Center, Icon } from "@chakra-ui/react"

import { Button } from "@/components/Buttons"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useQuizWidgetContext } from "./context"

export const QuizButtonGroup = () => {
  const {
    showResults,
    initialize: handleReset,
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
  } = useQuizWidgetContext()

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

    if (!!quizPageProps) {
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
          <Center
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 2 }}
            w="100%"
          >
            <Button
              variant="outline-color"
              leftIcon={<Icon as={FaTwitter} />}
              onClick={handleShare}
            >
              <Translation id="learn-quizzes:share-results" />
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
              fontWeight="bold"
              textDecoration="underline"
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
          <Button onClick={handleContinue}>
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
        isDisabled={!currentQuestionAnswerChoice}
      >
        <Translation id="learn-quizzes:submit-answer" />
      </Button>
    )
  }

  return (
    <Center
      gap={{ base: 4, md: 6 }}
      w={{ base: "full", sm: "auto" }}
      flexDirection={{ base: "column", sm: "row" }}
      flexWrap="wrap"
      sx={{
        button: { width: { base: "100%", sm: "fit-content" } },
      }}
    >
      <MainButtons />
    </Center>
  )
}
