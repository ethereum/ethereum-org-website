import { useCallback } from "react"
import { Text, VStack } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { useQuizWidgetContext } from "./context"

type QuizContentProps = ChildOnlyProp

export const QuizContent = ({ children }: QuizContentProps) => {
  const { answerStatus, quizData } = useQuizWidgetContext()

  const getTitleContent = useCallback((): string => {
    if (!answerStatus) return quizData.title
    
    return answerStatus === 'correct' ? "Correct!" : "Incorrect"
  }, [answerStatus, quizData.title])
  
  return (
    <VStack spacing="4">
      <Text>{getTitleContent()}</Text>
      {children}
    </VStack>
  )
}
