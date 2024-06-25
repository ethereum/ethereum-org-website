import { type ReactNode, useCallback } from "react"
import { Text, type TextProps, VStack } from "@chakra-ui/react"

import type { AnswerStatus } from "./useQuizWidget"

type QuizContentProps = {
  answerStatus: AnswerStatus
  title: string
  children: ReactNode
}

export const QuizContent = ({
  answerStatus,
  title,
  children,
}: QuizContentProps) => {
  const getTitleContent = useCallback((): string => {
    if (!answerStatus) return title

    return answerStatus === "correct" ? "Correct!" : "Incorrect"
  }, [answerStatus, title])

  const getTitleTextColor = (): TextProps["color"] => {
    if (!answerStatus) return "primary.hover"
    return answerStatus === "correct" ? "success.base" : "fail.base"
  }

  return (
    <VStack spacing="4">
      <Text
        fontWeight="bold"
        textAlign="center"
        data-testid={`answer-status-${answerStatus}`}
        color={getTitleTextColor()}
      >
        {getTitleContent()}
      </Text>
      {children}
    </VStack>
  )
}
