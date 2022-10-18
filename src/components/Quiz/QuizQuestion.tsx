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
  const isDarkMode = colorMode === "dark"
  const { answers, prompt, correctAnswerId } = questionData

  // Memoized values
  const explanation = useMemo<string>(() => {
    if (!selectedAnswer) return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
  }, [selectedAnswer])
  const buttonBg = useMemo<string>(() => {
    if (!showAnswer) return "primary"
    return correctAnswerId === selectedAnswer ? "green.500" : "red.500"
  }, [questionData, selectedAnswer, showAnswer])
  const letterColor = useMemo<string>(() => {
    if (!showAnswer) return "white"
    return correctAnswerId === selectedAnswer ? "green.500" : "red.500"
  }, [questionData, selectedAnswer, showAnswer])
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
            data-group
            display={display}
            variant={"quizButton"}
            isActive={active}
            onClick={() => handleSelection(id)}
            textAlign="start"
            h="fit-content"
            p={2}
            _active={{ bg: buttonBg, color: "white" }}
            leftIcon={
              <Circle
                size={"25px"}
                bg={
                  showAnswer
                    ? "white"
                    : isDarkMode
                    ? iconBackgroundDark
                    : iconBackgroundLight
                }
                _groupHover={{
                  bg: isDarkMode ? "orange.700" : "blue.300",
                }}
              >
                <Text
                  m="0"
                  fontWeight={"700"}
                  fontSize={"lg"}
                  color={letterColor}
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
          <Text fontWeight="bold" my={2}>
            Explanation
          </Text>
          <Text>{explanation}</Text>
        </>
      )}
    </Box>
  )
}

export default QuizQuestion
