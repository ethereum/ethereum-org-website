// Libraries
import React, { useEffect, useState } from "react"
import { Box, Center, Text, useColorMode } from "@chakra-ui/react"

// Components
import QuizQuestion from "./QuizQuestion"

// Data
import quizzes from "../../data/learnQuzzes/index"

// Types
export interface IProps {
  quizKey?: string | undefined
}

const Quiz: React.FC<IProps> = ({ quizKey }) => {
  const { colorMode } = useColorMode()
  const [currentQuestionIndex, updateCurrentQuestionIndex] = useState(0)
  const [quizData, setQuizData] = useState(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseQuizKey =
        quizKey ||
        Object.keys(quizzes).filter((quizUri) =>
          window.location.href.includes(quizUri)
        )[0]
      setQuizData({
        ...quizzes[baseQuizKey],
        questions: quizzes[baseQuizKey].questions.map((question) => {
          return {
            ...question,
            userAnswer: undefined,
          }
        }),
      })
    }
  }, [])

  console.log(quizData)

  return !quizData ? null : (
    <Box
      w={{
        md: "600px",
        sm: "300px",
      }}
      bg={colorMode === "dark" ? "gray.900" : "white"}
      borderRadius={"4px"}
      boxShadow={"0px 9px 16px -6px rgba(0, 0, 0, 0.13)"}
      padding={{
        md: "49px 62px",
        base: "20px 30px",
      }}
    >
      <Center>
        <Text
          fontStyle={"normal"}
          fontWeight={"700"}
          color={colorMode === "dark" ? "orange.300" : "blue.300"}
        >
          {quizData.title}
        </Text>
      </Center>
      <Center>
        <QuizQuestion questionData={quizData.questions[currentQuestionIndex]} />
      </Center>
    </Box>
  )
}

export default Quiz
