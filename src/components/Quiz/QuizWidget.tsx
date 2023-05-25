import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react"
import {
  Box,
  Center,
  Circle,
  Flex,
  Heading,
  Icon,
  Text,
  Spinner,
  Stack,
} from "@chakra-ui/react"
import { shuffle } from "lodash"
import { FaTwitter } from "react-icons/fa"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Button from "../Button"
import QuizRadioGroup from "./QuizRadioGroup"
import QuizSummary from "./QuizSummary"
import Translation from "../Translation"

import { QuizzesHubContext } from "./context"

import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "../icons/quiz"

import { trackCustomEvent } from "../../utils/matomo"

import {
  AnswerChoice,
  RawQuiz,
  Quiz,
  RawQuestion,
  Question,
  QuizStatus,
  UserStats,
} from "../../types"

import { PASSING_QUIZ_SCORE } from "../../constants"
import { USER_STATS_KEY } from "../../pages/quizzes"
import QuizProgressBar from "./QuizProgressBar"

import allQuizzesData from "../../data/quizzes"
import questionBank from "../../data/quizzes/questionBank"
import { updateUserStats } from "./utils"

interface IProps {
  quizKey?: string
  nextHandler: (next?: string) => void
  statusHandler: (status: QuizStatus) => void
  maxQuestions?: number
  setUserStats: (stats: UserStats) => void
  isStandaloneQuiz?: boolean
}

// TODO: Fix a11y keyboard tab stops
const QuizWidget: React.FC<IProps> = ({
  quizKey,
  nextHandler,
  statusHandler,
  maxQuestions,
  setUserStats,
  isStandaloneQuiz = true,
}) => {
  const { t } = useTranslation()
  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const {
    next: nextQuiz,
    score: userScore,
    average,
    completed,
  } = useContext(QuizzesHubContext)

  const hasNextQuiz = !isStandaloneQuiz && !!nextQuiz
  const finishedQuiz =
    userQuizProgress.length === quizData?.questions.length! - 1

  // Reset quiz state
  const initialize = () => {
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)
    setSelectedAnswer(null)

    if (!isStandaloneQuiz) {
      statusHandler("neutral")
    }

    const currentQuizKey =
      quizKey ||
      Object.keys(allQuizzesData).filter((quizUri) =>
        window?.location.href.includes(quizUri)
      )[0] ||
      null

    if (!currentQuizKey) return

    // Get quiz data from key, shuffle, then truncate if necessary
    const rawQuiz: RawQuiz = allQuizzesData[currentQuizKey]
    const questions: Array<Question> = rawQuiz.questions.map((id) => {
      const rawQuestion: RawQuestion = questionBank[id]
      return { id, ...rawQuestion }
    })
    const shuffledQuestions = shuffle(questions)
    const trimmedQuestions = maxQuestions
      ? shuffledQuestions.slice(0, maxQuestions)
      : shuffledQuestions
    const quiz: Quiz = {
      title: t(rawQuiz.title),
      questions: trimmedQuestions,
    }
    setQuizData(quiz)
  }

  useEffect(initialize, [quizKey])

  // Memoized values
  const currentQuestionIndex = useMemo<number>(
    () => userQuizProgress.length || 0,
    [userQuizProgress]
  )

  const showResults = useMemo<boolean>(
    () => userQuizProgress.length === quizData?.questions.length,
    [userQuizProgress, quizData]
  )

  const progressBarBackground = useCallback(
    (index: number): string => {
      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          currentQuestionAnswerChoice?.isCorrect) ||
        userQuizProgress[index]?.isCorrect
      )
        return "success"
      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          !currentQuestionAnswerChoice?.isCorrect) ||
        (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
      )
        return "error"
      if (index === currentQuestionIndex) return "gray.400"
      return "gray.500"
    },
    [
      showAnswer,
      currentQuestionIndex,
      currentQuestionAnswerChoice,
      userQuizProgress,
    ]
  )

  const numberOfCorrectAnswers = useMemo<number>(() => {
    return userQuizProgress.filter(({ isCorrect }) => isCorrect).length
  }, [userQuizProgress])

  const ratioCorrect = useMemo<number>(
    () => (!quizData ? 0 : numberOfCorrectAnswers / quizData.questions.length),
    [quizData, numberOfCorrectAnswers]
  )

  const quizScore = useMemo<number>(
    () => Math.floor(ratioCorrect * 100),
    [ratioCorrect]
  )

  const isPassingScore = useMemo<boolean>(
    () => quizScore > PASSING_QUIZ_SCORE,
    [quizScore]
  )

  const showConfetti = useMemo<boolean>(
    () => !!quizData && showResults && isPassingScore,
    [quizData, showResults, isPassingScore]
  )

  const handleSelectAnswerChoice = (answerId: string) => {
    const isCorrect =
      answerId === quizData?.questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }

  const handleSelection = (answerId: string) => {
    setSelectedAnswer(answerId)
    handleSelectAnswerChoice(answerId)
  }

  const handleShowAnswer = (questionId: string, answer: AnswerChoice) => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Question answered",
      eventName: `QID: ${questionId}`,
      eventValue: answer.isCorrect ? "1" : "0",
    })

    setShowAnswer(true)

    if (!isStandaloneQuiz) {
      if (currentQuestionAnswerChoice?.isCorrect) {
        statusHandler("success")
      }

      if (!currentQuestionAnswerChoice?.isCorrect) {
        statusHandler("error")
      }
    }
  }

  const handleRetryQuestion = () => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Retry question",
    })

    setCurrentQuestionAnswerChoice(null)
    setSelectedAnswer(null)
    setShowAnswer(false)

    if (!isStandaloneQuiz) {
      statusHandler("neutral")
    }
  }

  const handleShare = () => {
    if (!quizData || !window) return
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Share results",
    })

    const url = `https://ethereum.org${window.location.pathname}%23quiz`
    const hashtags = ["ethereumquiz", "ethereum", "quiz"]
    const tweet = `${encodeURI(
      `I just took the "${quizData.title}" quiz on ethereum.org and scored ${numberOfCorrectAnswers} out of ${quizData.questions.length}! Try it yourself at ${url}`
    )}`

    window.open(
      `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
    )
  }

  const handleContinue = () => {
    if (!currentQuestionAnswerChoice) return

    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)

    // Reset quiz status (modifies bg color for mobile)
    if (!isStandaloneQuiz) {
      statusHandler("neutral")
    }

    if (finishedQuiz) {
      trackCustomEvent({
        eventCategory: "Quiz widget",
        eventAction: "Other",
        eventName: "Submit results",
        eventValue: `${quizScore}%`,
      })
    }
  }

  const handleNextQuiz = () => {
    updateUserStats({
      average, // Context
      completed, // Context
      numberOfCorrectAnswers, // Set in Context
      quizKey, // PROP
      quizScore, // Set in Context
      setUserStats, // PROP
      userScore, // Context
    })

    // Move to next quiz
    nextHandler(nextQuiz)
  }

  const AnswerIcon = () => {
    const commonProps = {
      color: "neutral",
    }

    if (!showAnswer) {
      return <TrophyIcon {...commonProps} />
    }

    return currentQuestionAnswerChoice?.isCorrect ? (
      <CorrectIcon {...commonProps} />
    ) : (
      <IncorrectIcon {...commonProps} />
    )
  }

  // Render QuizWidget component
  return (
    <Flex width="full" direction="column" alignItems="center">
      {/* Hide heading if quiz is not in Learning Quizzes Hub page */}
      {isStandaloneQuiz && (
        <Heading
          as="h2"
          mb={12}
          textAlign="center"
          scrollBehavior="smooth"
          scrollMarginTop={24}
          id="quiz"
        >
          <Translation id="test-your-knowledge" />
        </Heading>
      )}

      <Stack
        w="full"
        maxW="600px"
        h={isStandaloneQuiz ? "100%" : { base: "100vh", md: "100%" }}
        px={{ base: 8, md: 12, lg: 16 }}
        // Reduce padding when showing Spinner
        pt={!quizData ? 10 : { base: 10, md: 12 }}
        pb={!quizData ? 2 : { base: 4, md: 8 }}
        justifyContent="space-between"
        bg={
          !showAnswer
            ? "neutral"
            : currentQuestionAnswerChoice?.isCorrect
            ? "successNeutral"
            : "errorNeutral"
        }
        borderRadius="base"
        boxShadow={isStandaloneQuiz ? "drop" : "none"}
        position="relative"
        isolation="isolate"
      >
        {showConfetti && (
          <>
            <StarConfettiIcon
              fontSize="184px"
              position="absolute"
              zIndex={-1}
              top={0}
              left={0}
            />

            <StarConfettiIcon
              fontSize="184px"
              position="absolute"
              zIndex={-1}
              top={0}
              right={0}
              transform="scaleX(-100%)"
            />
          </>
        )}

        <Box mb={isStandaloneQuiz ? 8 : { base: 0, md: 8 }}>
          {/* Answer Icon - defaults to TrophyIcon */}
          <Circle
            size="50px"
            bg={
              !showAnswer
                ? "primary"
                : currentQuestionAnswerChoice?.isCorrect
                ? "success"
                : "error"
            }
            position={{ base: "relative", md: "absolute" }}
            top={{ base: 2, md: 0 }}
            left="50%"
            transform="translateX(-50%) translateY(-50%)"
          >
            <AnswerIcon />
          </Circle>

          {quizData ? (
            <>
              {/* Quiz title */}
              <Center mb={-2}>
                <Text
                  fontStyle="normal"
                  fontWeight="700"
                  color={
                    showAnswer && currentQuestionAnswerChoice?.isCorrect
                      ? "success"
                      : showAnswer && !currentQuestionAnswerChoice?.isCorrect
                      ? "fail"
                      : "primaryHover"
                  }
                >
                  {showAnswer && currentQuestionAnswerChoice?.isCorrect
                    ? "Correct!"
                    : showAnswer && !currentQuestionAnswerChoice?.isCorrect
                    ? "Incorrect"
                    : quizData.title}
                </Text>
              </Center>

              {/* Progress bar */}
              <Center mb={6}>
                <QuizProgressBar
                  progressBarBackground={progressBarBackground}
                  questions={quizData.questions}
                />
              </Center>

              {/* Quiz main body */}
              <Center>
                {showResults ? (
                  <QuizSummary
                    numberOfCorrectAnswers={numberOfCorrectAnswers}
                    isPassingScore={isPassingScore}
                    questionCount={quizData.questions.length}
                    ratioCorrect={ratioCorrect}
                  />
                ) : (
                  <QuizRadioGroup
                    questionData={quizData.questions[currentQuestionIndex]}
                    showAnswer={showAnswer}
                    handleSelection={handleSelection}
                    selectedAnswer={selectedAnswer}
                  />
                )}
              </Center>
            </>
          ) : (
            <Flex justify="center">
              <Spinner />
            </Flex>
          )}
        </Box>

        {/* Quiz buttons */}
        {quizData && (
          <Center>
            <Flex
              gap={{ base: 4, md: 6 }}
              flex={{ base: 1, sm: "unset" }}
              direction={{ base: "column", sm: "row" }}
              justifyContent="flex-start"
              sx={{
                button: { width: { base: "100%", sm: "fit-content" } },
              }}
            >
              {showAnswer &&
                currentQuestionAnswerChoice &&
                !currentQuestionAnswerChoice.isCorrect && (
                  <Button onClick={handleRetryQuestion} variant="outline-color">
                    <Translation id="try-again" />
                  </Button>
                )}

              {showResults ? (
                <Flex
                  direction="column"
                  alignItems="center"
                  gap={{ base: 6, md: 2 }}
                  mt={isStandaloneQuiz ? 8 : { md: 8 }}
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 4, md: 2 }}
                    w="100%"
                  >
                    <Button
                      variant="outline-color"
                      leftIcon={<Icon as={FaTwitter} />}
                      onClick={handleShare}
                    >
                      <Translation id="share-results" />
                    </Button>

                    {/* Show `Next Quiz` button if quiz is opened from hub page */}
                    {hasNextQuiz && (
                      <Button onClick={handleNextQuiz}>
                        <Translation id="next-quiz" />
                      </Button>
                    )}
                  </Flex>

                  {showResults && (
                    <Button
                      onClick={initialize}
                      variant="unstyled"
                      color="primary"
                      _hover={{ boxShadow: "none" }}
                    >
                      <Text textDecoration="underline" fontWeight="bold" m={0}>
                        <Translation id="try-again" />
                      </Text>
                    </Button>
                  )}
                </Flex>
              ) : showAnswer ? (
                <Button onClick={handleContinue}>
                  {finishedQuiz ? t("see-results") : t("next-question")}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleShowAnswer(
                      quizData.questions[currentQuestionIndex].id,
                      currentQuestionAnswerChoice!
                    )
                  }
                  isDisabled={!currentQuestionAnswerChoice}
                >
                  <Translation id="submit-answer" />
                </Button>
              )}
            </Flex>
          </Center>
        )}
      </Stack>
    </Flex>
  )
}

export default QuizWidget
