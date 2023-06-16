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
  Container,
} from "@chakra-ui/react"
import { shuffle } from "lodash"
import { FaTwitter } from "react-icons/fa"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Button from "../Button"
import QuizRadioGroup from "./QuizRadioGroup"
import QuizSummary from "./QuizSummary"
import Translation from "../Translation"

import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "../icons/quiz"

import { QuizzesHubContext } from "./context"

import { trackCustomEvent } from "../../utils/matomo"

import {
  PASSING_QUIZ_SCORE,
  PROGRESS_BAR_GAP,
  USER_STATS_KEY,
} from "../../constants"
import { INITIAL_USER_STATS } from "../../pages/quizzes"

import { getNextQuiz } from "./utils"

import {
  AnswerChoice,
  RawQuiz,
  Quiz,
  RawQuestion,
  Question,
  QuizStatus,
} from "../../types"

import allQuizzesData from "../../data/quizzes"
import questionBank from "../../data/quizzes/questionBank"

interface IProps {
  quizKey?: string
  currentHandler: (next?: string) => void
  statusHandler: (status: QuizStatus) => void
  maxQuestions?: number
  isStandaloneQuiz?: boolean
}

// TODO: Fix a11y keyboard tab stops
const QuizWidget: React.FC<IProps> = ({
  quizKey,
  currentHandler,
  statusHandler,
  maxQuestions,
  isStandaloneQuiz = true,
}) => {
  const { t } = useTranslation()
  const [quizData, setQuizData] = useState<Quiz | null>(null)
  const [nextQuiz, setNextQuiz] = useState<string | undefined>(undefined)
  const [userQuizProgress, setUserQuizProgress] = useState<Array<AnswerChoice>>(
    []
  )
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const [currentQuestionAnswerChoice, setCurrentQuestionAnswerChoice] =
    useState<AnswerChoice | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const { setUserStats } = useContext(QuizzesHubContext)

  useEffect(() => {
    // If quiz is standalone (out of Quiz Hub page),
    // stats required to be initialized on localStorage first
    const item = window.localStorage.getItem(USER_STATS_KEY)

    if (item === null) {
      localStorage.setItem(USER_STATS_KEY, JSON.stringify(INITIAL_USER_STATS))
    }

    setNextQuiz(getNextQuiz(quizKey))
  }, [quizKey])

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

  const currentQuestionIndex = userQuizProgress.length
  const showResults = currentQuestionIndex === quizData?.questions.length

  const progressBarBackground = useCallback(
    (index: number): string => {
      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          currentQuestionAnswerChoice?.isCorrect) ||
        userQuizProgress[index]?.isCorrect
      ) {
        return "success.base"
      }

      if (
        (showAnswer &&
          index === currentQuestionIndex &&
          !currentQuestionAnswerChoice?.isCorrect) ||
        (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
      ) {
        return "error.base"
      }

      if (index === currentQuestionIndex) {
        return "gray.400"
      }

      return "gray.500"
    },
    [
      showAnswer,
      currentQuestionIndex,
      currentQuestionAnswerChoice,
      userQuizProgress,
    ]
  )

  const numberOfCorrectAnswers = userQuizProgress.filter(
    ({ isCorrect }) => isCorrect
  ).length

  const ratioCorrect = !quizData
    ? 0
    : numberOfCorrectAnswers / quizData.questions.length

  const quizScore = Math.floor(ratioCorrect * 100)
  const isPassingScore = quizScore > PASSING_QUIZ_SCORE

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

  const handleSubmitAnswer = (questionId: string, answer: AnswerChoice) => {
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
      eventCategory: "quiz_hub_events",
      eventAction: "Secondary button clicks",
      eventName: "Twitter_share_quiz",
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
    currentHandler(nextQuiz)
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
        h={isStandaloneQuiz ? "100%" : { base: "$100vh", md: "100%" }}
        px={{ base: 8, md: 12, lg: 16 }}
        // Reduce padding when showing Spinner
        pt={!quizData ? 10 : { base: 10, md: 12 }}
        pb={!quizData ? 2 : { base: 4, md: 8 }}
        justifyContent="space-between"
        bg={
          !showAnswer
            ? "neutral"
            : currentQuestionAnswerChoice?.isCorrect
            ? "success.neutral"
            : "error.neutral"
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
                ? "primary.base"
                : currentQuestionAnswerChoice?.isCorrect
                ? "success.base"
                : "error.base"
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
                      ? "success.base"
                      : showAnswer && !currentQuestionAnswerChoice?.isCorrect
                      ? "fail.base"
                      : "primary.hover"
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
              <Center gap={PROGRESS_BAR_GAP} mb={6}>
                {quizData?.questions.map(({ id }, index) => {
                  /* Calculate width percent based on number of questions */
                  const width = `calc(${Math.floor(
                    100 / quizData?.questions.length
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
                  // QuizSummary is receiving quizKey & setUserStats as props as it can be rendered on
                  // other pages without access to the Context values defined on /quizzes
                  <QuizSummary
                    quizKey={quizKey!}
                    numberOfCorrectAnswers={numberOfCorrectAnswers}
                    isPassingScore={isPassingScore}
                    questionCount={quizData.questions.length}
                    ratioCorrect={ratioCorrect}
                    quizScore={quizScore}
                    setUserStats={setUserStats}
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

                  {showResults && quizScore < 100 && (
                    <Button
                      onClick={initialize}
                      variant="unstyled"
                      color="primary.base"
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
                    handleSubmitAnswer(
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
