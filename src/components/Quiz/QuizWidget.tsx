// Libraries
import React, { useEffect, useState, useMemo } from "react"
import {
  Box,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { shuffle } from "lodash"

// Components
import Button from "../Button"
import QuizQuestion from "./QuizQuestion"
import Translation from "../Translation"

// Data
import allQuizData from "../../data/learnQuizzes"
import questionBank from "../../data/learnQuizzes/questionBank"

// Type
import { AnswerChoice, RawQuiz, Quiz, RawQuestion, Question } from "../../types"

export interface IProps {
  quizKey?: string
  maxQuestions?: number
}
const QuizWidget: React.FC<IProps> = ({ quizKey, maxQuestions }) => {
  // TODO: Add loading indictor
  // TODO: Add error handling
  // TODO: Add summary page once userQuizProgress.length === quizData.length
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === "dark"

  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  useEffect(() => {
    // Reset state
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)

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
  }, [quizKey])

  // Memos
  const currentQuestionIndex = useMemo<number>(
    () => userQuizProgress.length || 0,
    [userQuizProgress]
  )
  const showResults = useMemo<boolean>(
    () => userQuizProgress.length !== quizData?.questions.length,
    [userQuizProgress, quizData]
  )

  const cardBackground = useMemo<string>(() => {
    if (showAnswer) {
      if (currentQuestionAnswerChoice?.isCorrect)
        return isDarkMode ? "#0A160E" : "#C8F7D8"
      return isDarkMode ? "#1B0C0C" : "#F7C8C8"
    }
    return isDarkMode ? "gray.900" : "white"
  }, [isDarkMode, showAnswer])

  // Handlers
  const handleSelectAnswerChoice = (answerId: string) => {
    const isCorrect =
      answerId === quizData?.questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }
  // TODO: Confirm both handleSelectAnswerChoice & handleSelection are necessary
  const handleSelection = (answerId: string) => {
    setSelectedAnswer(answerId)
    handleSelectAnswerChoice(answerId)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }
  const handleRetryQuestion = () => {
    // TODO: Tell QuizQuestion component to reset
    setCurrentQuestionAnswerChoice(null) // Setting to `null` should reset the question
    setSelectedAnswer(null) // Being passed to child component
    setShowAnswer(false)
  }
  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return
    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setShowAnswer(false)
  }

  const handleSubmit = () => {
    // TODO: Allow user to submit quiz for storage
  }

  return !quizData ? null : (
    <Flex width="full" direction="column" alignItems="center">
      <h2>
        <Translation id="quiz-test-your-knowledge" />
      </h2>
      <Box
        w={{
          md: "600px",
          sm: "300px",
        }}
        bg={cardBackground}
        borderRadius="base"
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
          {quizData.questions.map(({ id }, index) => {
            let bg: string
            if (
              (showAnswer &&
                index === currentQuestionIndex &&
                currentQuestionAnswerChoice?.isCorrect) ||
              userQuizProgress[index]?.isCorrect
            ) {
              bg = "#48BB78"
            } else if (
              (showAnswer &&
                index === currentQuestionIndex &&
                !currentQuestionAnswerChoice?.isCorrect) ||
              (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
            ) {
              bg = "#B80000"
            } else if (index === currentQuestionIndex) {
              bg = "#B0B0B0"
            } else {
              bg = "#646464"
            }
            return (
              <Container
                key={id}
                bg={bg}
                h="4px"
                maxW="2rem"
                width="full"
                marginInline={0}
              />
            )
          })}
        </Center>
        <Center>
          <QuizQuestion
            questionData={quizData.questions[currentQuestionIndex]}
            showAnswer={showAnswer}
            handleSelection={handleSelection}
            selectedAnswer={selectedAnswer}
          />
        </Center>
        <Center>
          <ButtonGroup>
            {showAnswer &&
              currentQuestionAnswerChoice &&
              !currentQuestionAnswerChoice.isCorrect && (
                <Button onClick={handleRetryQuestion} variant={"outline-color"}>
                  Try again
                </Button>
              )}
            {showAnswer ? (
              <Button onClick={handleContinue}>Next question</Button>
            ) : (
              <Button
                onClick={handleShowAnswer}
                disabled={!currentQuestionAnswerChoice}
              >
                Submit answer
              </Button>
            )}
          </ButtonGroup>
        </Center>
      </Box>
    </Flex>
  )
}

export default QuizWidget
