// Libraries
import React, { useMemo } from "react"
import { Box, Circle, Text, useColorMode } from "@chakra-ui/react"

// Components
import Button from "../Button"

// Types
import { Question } from "../../types"

export interface IProps {
  questionData: Question
  showAnswer: boolean
  handleSelection: (answerId: string) => void
  selectedAnswer: string | null
}

const QuizQuestion: React.FC<IProps> = ({
  questionData,
  showAnswer,
  handleSelection,
  selectedAnswer,
}) => {
  const { colorMode } = useColorMode()
  const { answers, prompt } = questionData
  const explanation = useMemo<string>(() => {
    if (!selectedAnswer) return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
  }, [selectedAnswer])

  return (
    <Box w={"100%"}>
      <Text fontWeight={"700"} fontSize={"2xl"}>
        {prompt}
      </Text>
      {answers.map(({ id, label }, index) => {
        const active = selectedAnswer === id
        const iconBackgroundDark = active ? "orange.800" : "gray.500"
        const iconBackgroundLight = active ? "blue.300" : "gray.400"
        const display =
          !showAnswer || id === selectedAnswer ? "inline-flex" : "none"
        return (
          <Button
            display={display}
            variant={"quizButton"}
            isActive={active}
            onClick={() => handleSelection(id)}
            textAlign="start"
            h="fit-content"
            p={2}
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
                  {String.fromCharCode(97 + index).toUpperCase()}
                </Text>
              </Circle>
            }
          >
            {label}
          </Button>
        )
      })}
      {showAnswer && (
        <>
          <Text fontWeight="bold">Explanation</Text>
          <Text>{explanation}</Text>
        </>
      )}
    </Box>
  )
}

export default QuizQuestion
