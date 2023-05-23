// Import libraries
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
  Container,
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

// Import components
import Button from "../Button"
import QuizRadioGroup from "./QuizRadioGroup"
import QuizSummary from "./QuizSummary"
import Translation from "../Translation"

// Import SVGs
import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "../icons/quiz"

// Import data
import allQuizzesData from "../../data/quizzes"
import questionBank from "../../data/quizzes/questionBank"

// Import utilities
import { trackCustomEvent } from "../../utils/matomo"

// Import types
import { AnswerChoice, RawQuiz, Quiz, RawQuestion, Question } from "../../types"

// Import constants
import { PASSING_QUIZ_SCORE } from "../../constants"
import { QuizStatus, QuizzesHubContext } from "./context"

// Constants
const PROGRESS_BAR_GAP = "4px"

// Interfaces
export interface IProps {
  quizKey?: string
  // TODO: update type
  nextHandler: (next?: string) => {}
  statusHandler: (status: QuizStatus) => {}
  maxQuestions?: number
  // TODO: update setUserScore interface
  setUserScore: () => {}
  isStandaloneQuiz?: boolean
}

// Component
const QuizWidget: React.FC<IProps> = ({
  quizKey,
  nextHandler,
  statusHandler,
  maxQuestions,
  setUserScore,
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

  const { next: nextQuiz, status } = useContext(QuizzesHubContext)

  // TODO: move somewhere else
  const USER_SCORE_KEY = "userScoreKey"

  const initialize = (): void => {
    // Reset state
    setQuizData(null)
    setCurrentQuestionAnswerChoice(null)
    setUserQuizProgress([])
    setShowAnswer(false)
    setSelectedAnswer(null)
    statusHandler("neutral")

    // Get quiz key
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

  const correctCount = useMemo<number>(() => {
    const numberOfCorrectAnswers = userQuizProgress.filter(
      ({ isCorrect }) => isCorrect
    ).length
    // TODO: remove clog
    console.log({ numberOfCorrectAnswers })
    localStorage.setItem(USER_SCORE_KEY, numberOfCorrectAnswers.toString())

    return numberOfCorrectAnswers
  }, [userQuizProgress])

  const ratioCorrect = useMemo<number>(
    () => (!quizData ? 0 : correctCount / quizData.questions.length),
    [quizData, correctCount]
  )

  const score = useMemo<number>(
    () => Math.floor(ratioCorrect * 100),
    [ratioCorrect]
  )

  const isPassingScore = useMemo<boolean>(
    () => score > PASSING_QUIZ_SCORE,
    [score]
  )

  const showConfetti = useMemo<boolean>(
    () => !!quizData && showResults && isPassingScore,
    [quizData, showResults, isPassingScore]
  )

  // Handlers
  const handleSelectAnswerChoice = (answerId: string): void => {
    const isCorrect =
      answerId === quizData?.questions[currentQuestionIndex].correctAnswerId
    setCurrentQuestionAnswerChoice({ answerId, isCorrect })
  }

  const handleSelection = (answerId: string): void => {
    setSelectedAnswer(answerId)
    handleSelectAnswerChoice(answerId)
  }

  const handleShowAnswer = (questionId: string, answer: AnswerChoice): void => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Question answered",
      eventName: `QID: ${questionId}`,
      eventValue: answer.isCorrect ? "1" : "0",
    })

    setShowAnswer(true)

    if (currentQuestionAnswerChoice?.isCorrect) {
      console.log("success")
      statusHandler("success")
    }

    if (!currentQuestionAnswerChoice?.isCorrect) {
      console.log("error")
      statusHandler("error")
    }
  }

  const handleRetryQuestion = (): void => {
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Retry question",
    })

    setCurrentQuestionAnswerChoice(null)
    setSelectedAnswer(null)
    setShowAnswer(false)
    statusHandler("neutral")
  }

  const handleContinue = (): void => {
    if (!currentQuestionAnswerChoice) return

    setUserQuizProgress((prev) => [...prev, currentQuestionAnswerChoice])
    setCurrentQuestionAnswerChoice(null)
    setShowAnswer(false)

    // TODO: duplicated const, refactor
    const numberOfCorrectAnswers = userQuizProgress.filter(
      ({ isCorrect }) => isCorrect
    ).length

    // Reset quiz status (modifies bg color for mobile)
    statusHandler("neutral")

    const computeUserScore =
      parseInt(localStorage.getItem(USER_SCORE_KEY)!) + numberOfCorrectAnswers

    console.log({ computeUserScore })

    localStorage.setItem(USER_SCORE_KEY, computeUserScore.toString())
    setUserScore(computeUserScore.toString())

    if (showResults) {
      // TODO: does this code executes??
      trackCustomEvent({
        eventCategory: "Quiz widget",
        eventAction: "Other",
        eventName: "Submit results",
        eventValue: `${score}%`,
      })
    }
  }

  const handleShare = (): void => {
    if (!quizData || !window) return
    trackCustomEvent({
      eventCategory: "Quiz widget",
      eventAction: "Other",
      eventName: "Share results",
    })
    const url = `https://ethereum.org${window.location.pathname}%23quiz` // %23 is # character, needs to added to already encoded tweet string
    const tweet =
      encodeURI(
        `I just took the "${quizData.title}" quiz on ethereum.org and scored ${correctCount} out of ${quizData.questions.length}! Try it yourself at `
      ) + url
    window.open(
      `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${"ethereumquiz"}`
    )
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

  // TODO: Allow user to submit quiz for storage
  // TODO: Fix a11y keyboard tab stops
  const hasNextQuiz = !isStandaloneQuiz && !!nextQuiz

  // Render QuizWidget component
  return (
    <Flex
      width="full"
      direction="column"
      // alignItems="center"
      // justifyContent="center"
    >
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
        h={{ base: "100vh", md: "100%" }}
        px={{ base: 8, md: 12, lg: 16 }}
        pt={{ base: 10, md: 12 }}
        pb={{ base: 4, md: 8 }}
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
              top={isStandaloneQuiz ? -8 : 0}
              left={0}
            />

            <StarConfettiIcon
              fontSize="184px"
              position="absolute"
              zIndex={-1}
              top={isStandaloneQuiz ? -8 : 0}
              right={0}
              transform="scaleX(-100%)"
            />
          </>
        )}

        <Box mb={{ md: 8 }}>
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
                  // TODO: refactor get color
                  color={
                    showAnswer && currentQuestionAnswerChoice?.isCorrect
                      ? "success"
                      : showAnswer && !currentQuestionAnswerChoice?.isCorrect
                      ? "fail"
                      : "primaryHover"
                  }
                >
                  {/* TODO: refactor get title */}
                  {showAnswer && currentQuestionAnswerChoice?.isCorrect
                    ? "Correct!"
                    : showAnswer && !currentQuestionAnswerChoice?.isCorrect
                    ? "Incorrect"
                    : quizData.title}
                </Text>
              </Center>

              {/* Progress bar */}
              <Center gap={PROGRESS_BAR_GAP} mb={6}>
                {quizData.questions.map(({ id }, index) => {
                  /* Calculate width percent based on number of questions */
                  const width = `calc(${Math.floor(
                    100 / quizData.questions.length
                  )}% - ${PROGRESS_BAR_GAP})`
                  return (
                    <Container
                      key={id}
                      bg={progressBarBackground(index)}
                      h="4px"
                      w={width}
                      maxW={`min(${width}, 2rem)`}
                      marginInline={0}
                      p={0}
                    />
                  )
                })}
              </Center>

              {/* Quiz main body */}
              <Center>
                {showResults ? (
                  <QuizSummary
                    correctCount={correctCount}
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
        <Box border="1px solid blue">
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
                    <Button
                      onClick={handleRetryQuestion}
                      variant="outline-color"
                    >
                      <Translation id="try-again" />
                    </Button>
                  )}

                {showResults ? (
                  <Flex
                    alignItems={isStandaloneQuiz ? "initial" : "center"}
                    direction={isStandaloneQuiz ? "row" : "column"}
                    gap={{ base: 6, md: 2 }}
                  >
                    <Flex gap={{ base: 4, md: 2 }} w="100%">
                      <Button
                        variant="outline-color"
                        leftIcon={<Icon as={FaTwitter} />}
                        onClick={handleShare}
                      >
                        <Translation id="share-results" />
                      </Button>

                      {/* Show `Next Quiz` button if quiz is opened from hub page */}
                      {hasNextQuiz && (
                        <Button onClick={() => nextHandler(nextQuiz)}>
                          {/* TODO: move to translations */}
                          Next quiz
                        </Button>
                      )}
                    </Flex>

                    {score < 100 && isStandaloneQuiz ? (
                      <Button onClick={initialize}>
                        <Translation id="try-again" />
                      </Button>
                    ) : (
                      <Button
                        onClick={initialize}
                        variant="unstyled"
                        color="primary"
                        _hover={{ boxShadow: "none" }}
                      >
                        <Text
                          textDecoration="underline"
                          fontWeight="bold"
                          m={0}
                        >
                          <Translation id="try-again" />
                        </Text>
                      </Button>
                    )}
                  </Flex>
                ) : showAnswer ? (
                  <Button onClick={handleContinue}>
                    {userQuizProgress.length === quizData.questions.length - 1
                      ? t("see-results")
                      : t("next-question")}
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
        </Box>
      </Stack>
    </Flex>
  )
}

export default QuizWidget
