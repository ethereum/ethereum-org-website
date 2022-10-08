// Libraries
import React, { useState } from "react"
import { Box, Circle, Text, useColorMode } from "@chakra-ui/react"

// Components
import Button from "../Button"

// Types
export interface IProps {
  questionData: any
  onAnswerSelect: (answerId: string) => void
}

const QuizQuestion: React.FC<IProps> = ({ questionData, onAnswerSelect }) => {
  const { colorMode } = useColorMode()
  const { answers, question } = questionData
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  )

  const handleSelection = (answerId: string) => {
    setSelectedAnswer(answerId)
    onAnswerSelect(answerId)
  }
  return (
    <Box w={"100%"}>
      <Text fontWeight={"700"} fontSize={"2xl"}>
        {question}
      </Text>
      {Object.keys(answers).map((key) => {
        const active = selectedAnswer === key
        const iconBackgroundDark = active ? "orange.800" : "gray.500"
        const iconBackgroundLight = active ? "blue.300" : "gray.400"

        return (
          <Button
            variant={"quizButton"}
            isActive={active}
            onClick={() => handleSelection(key)}
            textAlign="start"
            leftIcon={
              <Circle
                size={"25px"}
                bg={
                  colorMode === "dark"
                    ? iconBackgroundDark
                    : iconBackgroundLight
                }
              >
                <Text
                  m="0"
                  fontWeight={"700"}
                  fontSize={"lg"}
                  color={active ? "white" : "text"}
                >
                  {key.toUpperCase()}
                </Text>
              </Circle>
            }
          >
            {answers[key].label}
          </Button>
        )
      })}
    </Box>
  )
}

export default QuizQuestion
