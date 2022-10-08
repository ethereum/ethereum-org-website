// Libraries
import React, { useEffect, useState, useMemo } from "react"
import {
  Box,
  ButtonGroup,
  Center,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { shuffle } from "lodash"

// Components
import Button from "../Button"
import QuizQuestion from "./QuizQuestion"

// Data
import allQuizData from "../../data/learnQuizzes"
import questionBank from "../../data/learnQuizzes/questionBank"

// Type
import { AnswerChoice, RawQuiz, Quiz, RawQuestion, Question } from "../../types"

export interface IProps {
  quizKey?: string
  maxQuestions?: number
}

const Quiz: React.FC<IProps> = ({ quizKey, maxQuestions }) => {
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === "dark"

  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )

  useEffect(() => {
    // Reset state
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])

    // Get quiz key
    const currentQuizKey =
      quizKey ||
      Object.keys(allQuizData).filter((quizUri) =>
        window?.location.href.includes(quizUri)
      )[0] ||
      null

    // Get quiz data, shuffle, then truncate if necessary
    if (currentQuizKey) {
      const rawQuiz: RawQuiz = allQuizData[currentQuizKey]
      const questions: Array<Question> = rawQuiz.questions.map((id) => {
        const rawQuestion: RawQuestion = questionBank[id]
        return { id, ...rawQuestion }
      })
      const shuffledQuestions = shuffle(questions)
      const trimmedQuestions = maxQuestions
        ? shuffledQuestions.slice(0, maxQuestions)
        : shuffledQuestions
      const quiz: Quiz = { title: rawQuiz.title, questions: trimmedQuestions }
      setQuizData(quiz)
    } else {
      setQuizData(null)
    }
  }, [quizKey, window.location.href])

  // Memos
  const currentQuestionIndex = useMemo<number>(
    () => userQuizProgress.length || 0,
    [userQuizProgress]
  )
  const showResults = useMemo<boolean>(
    () => userQuizProgress.length !== quizData?.questions.length,
    [userQuizProgress, quizData]
  )
  // TODO: if (showResults) { render summary view }

  // Handlers
  const handleSelectAnswerChoice = (answerId: string) => {
    const isCorrect =
      answerId === quizData?.questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }
  const handleRetryQuestion = () => {
    setCurrentQuestionAnswerChoice(null)
    // Setting this to `null` should reset the question
  }
  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return
    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
  }

  const handleSubmit = () => {
    // TODO: Allow user to submit quiz for storage
  }

  return !quizData ? null : (
    <Box
      w={{
        md: "600px",
        sm: "300px",
      }}
      bg={isDarkMode ? "gray.900" : "white"}
      borderRadius="base" // 4px
      boxShadow="0px 9px 16px -6px rgba(0, 0, 0, 0.13)"
      padding={{
        md: "49px 62px", // TODO: Remove magic numbers
        base: "20px 30px",
      }}
    >
      <Center>
        <Text
          fontStyle={"normal"}
          fontWeight={"700"}
          color={isDarkMode ? "orange.300" : "blue.300"}
        >
          {quizData.title}
        </Text>
      </Center>
      <Center gap={1} marginBottom={6}>
        {quizData.questions.map(() => (
          <Container
            bg="red"
            h="4px"
            maxW="2rem"
            width="full"
            marginInline={0}
          />
        ))}
      </Center>
      <Center>
        <QuizQuestion
          questionData={quizData.questions[currentQuestionIndex]}
          onAnswerSelect={handleSelectAnswerChoice}
        />
      </Center>
      <Center>
        <ButtonGroup>
          {currentQuestionIndex > 0 ? (
            <Button onClick={handleRetryQuestion} variant={"outline-color"}>
              Try again
            </Button>
          ) : null}
          <Button
            onClick={handleContinue}
            disabled={!currentQuestionAnswerChoice}
          >
            Submit answer
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  )
}

export default Quiz
