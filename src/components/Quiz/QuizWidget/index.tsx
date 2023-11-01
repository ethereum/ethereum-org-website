import * as React from "react"
import { Center, Spinner, Stack, StackProps, VStack } from "@chakra-ui/react"

import { StandaloneQuizHeading } from "./StandaloneQuizHeading"
import { AnswerIcon } from "./AnswerIcon"
import { QuizConfetti } from "./QuizConfetti"
import { QuizContent } from "./QuizContent"
import { QuizButtonGroup } from "./QuizButtonGroup"
import { useQuizWidget } from "./useQuizWidget"

import { QuizStatus } from "../../../types"

export interface IProps {
  quizKey?: string
  currentHandler?: (next?: string) => void
  statusHandler?: (status: QuizStatus) => void
  maxQuestions?: number
  isStandaloneQuiz?: boolean
}

const QuizWidget: React.FC<IProps> = (props) => {
  const {
    quizData,
    showAnswer,
    currentQuestionAnswerChoice,
    showConfetti,
    progressBarBackground,
    currentQuestionIndex,
    finishedQuiz,
    handleContinue,
    handleRetryQuestion,
    handleSelection,
    handleShare,
    handleSubmitAnswer,
    hasNextQuiz,
    initialize,
    isPassingScore,
    numberOfCorrectAnswers,
    quizScore,
    ratioCorrect,
    selectedAnswer,
    setUserStats,
    showResults,
    handleNextQuiz,
  } = useQuizWidget(props)

  const { quizKey, isStandaloneQuiz = false } = props

  const getMainContainerBg = (): StackProps["bg"] => {
    if (!showAnswer) {
      return "neutral"
    }

    if (currentQuestionAnswerChoice?.isCorrect) {
      return "success.neutral"
    }

    return "error.neutral"
  }

  // Render QuizWidget component
  return (
    <VStack spacing="12" width="full" maxW="600px">
      {/* Inner Container */}
      <Stack
        w="full"
        gap="8"
        px={{ base: "8", md: "12", lg: "16" }}
        // Reduce padding when showing Spinner
        pt={!quizData ? "10" : { base: "5", md: "12" }}
        pb={!quizData ? "5" : { base: "4", md: "8" }}
        bg={getMainContainerBg()}
        borderRadius="base"
        boxShadow={isStandaloneQuiz ? "drop" : "none"}
        position="relative"
        isolation="isolate"
      >
        {showConfetti && <QuizConfetti />}

        <Center
          position={{ base: "relative", md: "absolute" }}
          top={{ base: 2, md: 0 }}
          left={{ md: "50%" }}
          transform="auto"
          translateX={{ md: "-50%" }}
          translateY={{ md: "-50%" }}
        >
          <AnswerIcon
            showAnswer={showAnswer}
            isCurrentQuestionCorrect={currentQuestionAnswerChoice?.isCorrect}
          />
        </Center>
        <Stack spacing="8" justifyContent="space-between">
          {quizData ? (
            <>
              <QuizContent
                showAnswer={showAnswer}
                isCurrentQuestionCorrect={
                  currentQuestionAnswerChoice?.isCorrect
                }
                currentQuestionIndex={currentQuestionIndex}
                title={quizData.title}
                questions={quizData.questions}
                showResults={showResults}
                quizSummaryProps={{
                  quizKey: quizKey!,
                  numberOfCorrectAnswers,
                  isPassingScore,
                  questionCount: quizData.questions.length,
                  ratioCorrect,
                  quizScore,
                  setUserStats,
                }}
                quizRadioGroupProps={{
                  handleSelection,
                  selectedAnswer,
                }}
                progressBarBackground={progressBarBackground}
              />
              <QuizButtonGroup
                currentQuestionAnswerChoice={currentQuestionAnswerChoice}
                finishedQuiz={finishedQuiz}
                handleContinue={handleContinue}
                handleNextQuiz={handleNextQuiz}
                handleRetryQuestion={handleRetryQuestion}
                handleSubmitAnswer={handleSubmitAnswer}
                handleShare={handleShare}
                hasNextQuiz={hasNextQuiz}
                handleReset={initialize}
                currentQuestionIndex={currentQuestionIndex}
                questions={quizData.questions}
                quizScore={quizScore}
                showAnswer={showAnswer}
                showResults={showResults}
              />
            </>
          ) : (
            <Spinner />
          )}
        </Stack>
      </Stack>
    </VStack>
  )
}

export default QuizWidget

/**
 * For use of the widget on single pages (not the quizzes page)
 */
export const StandaloneQuizWidget = (
  props: Omit<IProps, "isStandaloneQuiz">
) => (
  <VStack spacing="12" my="16">
    <StandaloneQuizHeading />
    <QuizWidget {...props} isStandaloneQuiz />
  </VStack>
)
