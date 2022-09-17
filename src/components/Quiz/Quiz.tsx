// Libraries
import React, { useState } from "react"
import { Box, Center, Text, useColorMode } from "@chakra-ui/react"

// Components
import QuizQuestion from "./QuizQuestion"

// Types
export interface IProps {
  quiz: any
}

const Quiz: React.FC<IProps> = ({ quiz }) => {
  const { colorMode } = useColorMode()
  const [currentQuestionIndex, updateCurrentQuestionIndex] = useState(0)
  const [quizData, setQuizdata] = useState(
    quiz.questions.map((question) => {
      return {
        ...question,
        userAnswer: undefined,
      }
    })
  )

  return (
    <Box
      w={{
        md: "600px",
        sm: "300px",
      }}
      bg={colorMode === "dark" ? "gray.900" : "white"}
      borderRadius={"4px"}
      boxShadow={"0px 9px 16px -6px rgba(0, 0, 0, 0.13)"}
      padding={"49px 62px"}
    >
      <Center>
        <Text
          fontStyle={"normal"}
          fontWeight={"700"}
          color={colorMode === "dark" ? "orange.300" : "blue.300"}
        >
          {quiz.title}
        </Text>
      </Center>
      <Center>
        <QuizQuestion questionData={quizData[currentQuestionIndex]} />
      </Center>
    </Box>
  )
}

export default Quiz
