// Libraries
import React, { useEffect, useState, useMemo } from "react"
import {
  Box,
  ButtonGroup,
  Center,
  Circle,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { shuffle } from "lodash"
import { FaTwitter } from "react-icons/fa"

// Components
import Button from "../Button"
import QuizQuestion from "./QuizQuestion"
import QuizSummary from "./QuizSummary"
import Translation from "../Translation"

// SVG import
import Trophy from "../../assets/quiz/trophy.svg"
import Correct from "../../assets/quiz/correct.svg"
import Incorrect from "../../assets/quiz/incorrect.svg"
import StarConfetti from "../../assets/quiz/star-confetti.svg"

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
  // TODO: Add loading state indicator and error handling
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

  const initialize = () => {
    // Reset state
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)
    setSelectedAnswer(null)

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
  }
  useEffect(initialize, [quizKey])

  // Memoized values
  const currentQuestionIndex = useMemo<number>(
    () => userQuizProgress.length || 0,
    [userQuizProgress]
  )

  // TODO: Allow user to submit quiz for storage
  const showResults = useMemo<boolean>(
    () => userQuizProgress.length === quizData?.questions.length,
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

  const correctCount = useMemo<number>(
    () => userQuizProgress.filter(({ isCorrect }) => isCorrect).length,
    [userQuizProgress]
  )

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
    setCurrentQuestionAnswerChoice(null)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }
  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return
    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)
  }

  return (
    quizData && (
      <Flex width="full" direction="column" alignItems="center">
        <Heading as="h2">
          <Translation id="quiz-test-your-knowledge" />
        </Heading>
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
          position="relative"
        >
          <Circle
            size="50px"
            bg={
              !showAnswer
                ? "primary"
                : currentQuestionAnswerChoice?.isCorrect
                ? "#48BB78"
                : "#B80000"
            }
            position="absolute"
            top={0}
            left="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            <Icon
              as={
                !showAnswer
                  ? Trophy
                  : currentQuestionAnswerChoice?.isCorrect
                  ? Correct
                  : Incorrect
              }
              fontSize="1.75rem"
              color="background"
            />
          </Circle>
          {showResults &&
            Math.floor((correctCount / quizData.questions.length) * 100) >
              65 && (
              <>
                <Icon
                  as={StarConfetti}
                  fontSize="184px"
                  position="absolute"
                  left={0}
                  top={-6}
                />
                <Icon
                  as={StarConfetti}
                  fontSize="184px"
                  position="absolute"
                  right={0}
                  top={-6}
                  transform="scaleX(-100%)"
                />
              </>
            )}
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
            {showResults ? (
              <QuizSummary
                correctCount={correctCount}
                questionCount={quizData.questions.length}
              />
            ) : (
              <QuizQuestion
                questionData={quizData.questions[currentQuestionIndex]}
                showAnswer={showAnswer}
                handleSelection={handleSelection}
                selectedAnswer={selectedAnswer}
              />
            )}
          </Center>
          <Center>
            <ButtonGroup>
              {showAnswer &&
                currentQuestionAnswerChoice &&
                !currentQuestionAnswerChoice.isCorrect && (
                  <Button
                    onClick={handleRetryQuestion}
                    variant={"outline-color"}
                  >
                    Try again
                  </Button>
                )}
              {showResults ? (
                <Flex gap={4}>
                  <Button leftIcon={<Icon as={FaTwitter} />}>
                    Share results
                  </Button>
                  <Button onClick={initialize}>Take quiz again</Button>
                </Flex>
              ) : showAnswer ? (
                <Button onClick={handleContinue}>
                  {userQuizProgress.length === quizData.questions.length - 1
                    ? "See results"
                    : "Next question"}
                </Button>
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
  )
}

export default QuizWidget
