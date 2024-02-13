import { useCallback } from "react"
import { Text, type TextProps, VStack } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { useQuizWidgetContext } from "./context"

type QuizContentProps = ChildOnlyProp

export const QuizContent = ({ children }: QuizContentProps) => {
  const { answerStatus, title } = useQuizWidgetContext()

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
      <Text fontWeight="bold" textAlign="center" color={getTitleTextColor()}>
        {getTitleContent()}
      </Text>
      {children}
    </VStack>
  )
}
