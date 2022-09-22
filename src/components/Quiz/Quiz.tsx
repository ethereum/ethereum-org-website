// Libraries
import React, { useEffect, useState } from "react"
import {
  Box,
  ButtonGroup,
  Center,
  Container,
  Grid,
  GridItem,
  Text,
  useColorMode,
} from "@chakra-ui/react"

// Components
import Button from "../Button"
import QuizQuestion from "./QuizQuestion"

// Data
import quizzes from "../../data/learnQuzzes/index"

// Types
export interface IProps {
  quizKey?: string | undefined
}

const Quiz: React.FC<IProps> = ({ quizKey }) => {
  const { colorMode } = useColorMode()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1)
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
      <Center gap={"4px"} marginBottom={"23px"}>
        {quizData.questions.map((question) => {
          console.log(question)
          return (
            <Container
              bg={"red"}
              h="4px"
              maxW={"32px"}
              width={"50px"}
              marginInlineStart={"0"}
              marginInlineEnd={"0"}
            />
          )
        })}
      </Center>
      <Center>
        <QuizQuestion questionData={quizData.questions[currentQuestionIndex]} />
      </Center>
      <Center>
        <ButtonGroup>
          {currentQuestionIndex > 0 ? (
            <Button
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1)
              }}
              variant={"outline-color"}
            >
              Go back
            </Button>
          ) : null}
          <Button>Submit answer</Button>
        </ButtonGroup>
      </Center>
    </Box>
  )
}

export default Quiz
