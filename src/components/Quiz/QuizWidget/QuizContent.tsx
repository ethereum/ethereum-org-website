import * as React from "react"
import { Center, Container, Text, TextProps, VStack } from "@chakra-ui/react"
import QuizSummary from "../QuizSummary"
import QuizRadioGroup from "../QuizRadioGroup"
import { PROGRESS_BAR_GAP } from "../../../constants"
import { Question } from "../../../types"

export type QuizContentProps = {
  showAnswer: boolean
  showResults: boolean
  isCurrentQuestionCorrect: boolean | undefined
  questions: Question[]
  title: string
  progressBarBackground: (index: number) => string
  quizSummaryProps: Omit<
    React.ComponentPropsWithoutRef<typeof QuizSummary>,
    "quizData"
  >
  currentQuestionIndex: number
  quizRadioGroupProps: Omit<
    React.ComponentPropsWithoutRef<typeof QuizRadioGroup>,
    "questionData" | "showAnswer"
  >
}

export const QuizContent = ({
  showAnswer,
  isCurrentQuestionCorrect,
  questions,
  title,
  progressBarBackground,
  showResults,
  quizSummaryProps,
  currentQuestionIndex,
  quizRadioGroupProps,
}: QuizContentProps) => {
  const getTitleTextColor = (): TextProps["color"] => {
    if (showAnswer) {
      return isCurrentQuestionCorrect ? "success.base" : "fail.base"
    }

    return "primary.hover"
  }

  const getTitleContent = (): string => {
    if (showAnswer) {
      return isCurrentQuestionCorrect ? "Correct!" : "Incorrect"
    }

    return title
  }

  return (
    <VStack spacing="4">
      {/* Quiz title */}

      <Text
        as="span"
        fontWeight="700"
        textAlign="center"
        color={getTitleTextColor()}
      >
        {getTitleContent()}
      </Text>

      {!showResults ? (
        <>
          {/* Progress bar */}
          <Center gap={PROGRESS_BAR_GAP} w="full">
            {questions.map(({ id }, index) => {
              /* Calculate width percent based on number of questions */
              const width = `calc(${Math.floor(
                100 / questions.length
              )}% - ${PROGRESS_BAR_GAP})`

              return (
                <Container
                  key={id}
                  bg={progressBarBackground(index)}
                  h="4px"
                  w={width}
                  maxW={`min(${width}, 2rem)`}
                  marginInline={0}
                  p={0}
                />
              )
            })}
          </Center>
          <QuizRadioGroup
            questionData={questions[currentQuestionIndex]}
            showAnswer={showAnswer}
            {...quizRadioGroupProps}
          />
        </>
      ) : (
        <QuizSummary {...quizSummaryProps} />
      )}
    </VStack>
  )
}
