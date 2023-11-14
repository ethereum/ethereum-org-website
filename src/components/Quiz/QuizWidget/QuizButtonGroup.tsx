import * as React from "react"
import { FaTwitter } from "react-icons/fa"
import { Center, Icon } from "@chakra-ui/react"

import { AnswerChoice, Question } from "@/lib/interfaces"

import { Button } from "../../Buttons"
import Translation from "../../Translation"

export type QuizButtonGroupProps = {
  showAnswer: boolean
  showResults: boolean
  quizScore: number
  handleReset: () => void
  currentQuestionIndex: number
  currentQuestionAnswerChoice: AnswerChoice | null
  questions: Question[]
  finishedQuiz: boolean
  handleRetryQuestion: () => void
  handleShare: () => void
  handleNextQuiz: () => void
  hasNextQuiz: boolean
  handleContinue: () => void
  handleSubmitAnswer: (questionId: string, answerChoice: AnswerChoice) => void
}

export const QuizButtonGroup = ({
  showAnswer,
  showResults,
  quizScore,
  questions,
  handleReset,
  currentQuestionIndex,
  currentQuestionAnswerChoice,
  finishedQuiz,
  handleRetryQuestion,
  handleShare,
  handleNextQuiz,
  hasNextQuiz,
  handleContinue,
  handleSubmitAnswer,
}: QuizButtonGroupProps) => {
  const hasFailedAnswer =
    currentQuestionAnswerChoice && !currentQuestionAnswerChoice.isCorrect

  const hasNotPerfectQuizScore = quizScore < 100

  const MainButtons = () => {
    if (showResults) {
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
              <Button onClick={handleNextQuiz}>
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

    if (showAnswer) {
      return (
        <>
          {hasFailedAnswer ? (
            <Button onClick={handleRetryQuestion} variant="outline">
              <Translation id="learn-quizzes:try-again" />
            </Button>
          ) : null}
          <Button onClick={handleContinue}>
            <Translation id={finishedQuiz ? "learn-quizzes:see-results" : "learn-quizzes:next-question"} />
          </Button>
        </>
      )
    }

    return (
      <Button
        onClick={() =>
          handleSubmitAnswer(
            questions[currentQuestionIndex].id,
            currentQuestionAnswerChoice!
          )
        }
        isDisabled={!currentQuestionAnswerChoice}
      >
        <Translation id="learn-quizzes:submit-answer" />
      </Button>
    )
  }

  // Render QuizButtonGroup component
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
