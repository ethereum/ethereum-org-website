import { useCallback } from "react"
import { Center, ChakraProps, Container } from "@chakra-ui/react"

import type { AnswerChoice, Question } from "@/lib/types"

import { PROGRESS_BAR_GAP } from "@/lib/constants"

import type { AnswerStatus } from "./useQuizWidget"

type QuizProgressBarProps = {
  questions: Question[]
  answerStatus: AnswerStatus
  currentQuestionIndex: number
  userQuizProgress: AnswerChoice[]
}

export const QuizProgressBar = ({
  questions,
  answerStatus,
  currentQuestionIndex,
  userQuizProgress,
}: QuizProgressBarProps) => {
  const progressBarBackground = useCallback(
    (index: number): ChakraProps["bg"] => {
      if (
        (answerStatus &&
          index === currentQuestionIndex &&
          answerStatus === "correct") ||
        userQuizProgress[index]?.isCorrect
      ) {
        return "success.base"
      }

      if (
        (answerStatus === "incorrect" && index === currentQuestionIndex) ||
        (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
      ) {
        return "error.base"
      }

      if (index === currentQuestionIndex) {
        return "gray.400"
      }

      return "gray.500"
    },
    [answerStatus, currentQuestionIndex, userQuizProgress]
  )
  return (
    <Center gap={PROGRESS_BAR_GAP} w="full">
      {questions.map(({ id }, idx, arr) => {
        /* Calculate width percent based on number of questions */
        const width = `calc(${Math.floor(
          100 / arr.length
        )}% - ${PROGRESS_BAR_GAP})`

        return (
          <Container
            key={id}
            bg={progressBarBackground(idx)}
            h="4px"
            w={width}
            maxW={`min(${width}, 2rem)`}
            marginInline={0}
            p={0}
          />
        )
      })}
    </Center>
  )
}
