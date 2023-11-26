import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import {
  Center,
  Heading,
  Spinner,
  Stack,
  StackProps,
  VStack,
} from "@chakra-ui/react"

import { QuizStatus, UserStats } from "@/lib/types"

import Translation from "@/components/Translation"

import { useLocalQuizData } from "../useLocalQuizData"

import { AnswerIcon } from "./AnswerIcon"
import { QuizWidgetProvider } from "./context"
import { QuizButtonGroup } from "./QuizButtonGroup"
import { QuizConfetti } from "./QuizConfetti"
import { QuizContent } from "./QuizContent"
import { QuizProgressBar } from "./QuizProgressBar"
import { QuizRadioGroup } from "./QuizRadioGroup"
import { QuizSummary } from "./QuizSummary"
import { useQuizWidget } from "./useQuizWidget"

type CommonProps = {
  quizKey: string
  updateUserStats: Dispatch<SetStateAction<UserStats>>
}

type StandaloneQuizProps = CommonProps & {
  isStandaloneQuiz: true
  currentHandler?: never
  statusHandler?: never
}

type QuizPageProps = CommonProps & {
  currentHandler: (nextKey: string) => void
  statusHandler: (status: QuizStatus) => void
  isStandaloneQuiz?: false
}

export type QuizWidgetProps = StandaloneQuizProps | QuizPageProps

const QuizWidget = ({
  isStandaloneQuiz = false,
  quizKey,
  updateUserStats,
  currentHandler,
  statusHandler,
}: QuizWidgetProps) => {
  const {
    quizData,
    answerStatus,
    showResults,
    currentQuestionIndex,
    userQuizProgress,
    selectedAnswer,
    currentQuestionAnswerChoice,
    numberOfCorrectAnswers,
    nextQuiz,
    quizScore,
    ratioCorrect,
    showConfetti,
    initialize,
    setSelectedAnswer,
    setShowAnswer,
    setUserQuizProgress,
    setCurrentQuestionAnswerChoice,
  } = useQuizWidget({ quizKey, updateUserStats })

  const quizPageProps = useRef<
    | (Required<Pick<QuizWidgetProps, "currentHandler" | "statusHandler">> & {
        nextQuiz: string | undefined
      })
    | false
  >(false)

  useEffect(() => {
    if (isStandaloneQuiz) return

    quizPageProps.current = {
      currentHandler: currentHandler!,
      statusHandler: statusHandler!,
      nextQuiz,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMainContainerBg = (): StackProps["bg"] => {
    if (!answerStatus) {
      return "neutral"
    }

    if (answerStatus === "correct") {
      return "success.neutral"
    }

    return "error.neutral"
  }

  return (
    <VStack spacing="12" width="full" maxW="600px">
      <Stack
        w="full"
        gap="8"
        px={{ base: "8", md: "12", lg: "16" }}
        // Reduce padding when showing Spinner
        pt={!!!quizData ? "10" : { base: "5", md: "12" }}
        pb={!!!quizData ? "5" : { base: "4", md: "8" }}
        bg={getMainContainerBg()}
        borderRadius="base"
        boxShadow={isStandaloneQuiz ? "drop" : "none"}
        position="relative"
      >
        {showConfetti && <QuizConfetti />}

        <Center
          position={{ base: "relative", md: "absolute" }}
          top={{ base: 2, md: 0 }}
          left={{ md: "50%" }}
          transform="auto"
          translateX={{ md: "-50%" }}
          translateY={{ md: "-50%" }}
        >
          <AnswerIcon answerStatus={answerStatus} />
        </Center>
        <Stack spacing="8" justifyContent="space-between">
          {!!quizData ? (
            <QuizWidgetProvider
              value={{
                ...quizData,
                answerStatus,
                currentQuestionIndex,
                userQuizProgress,
                selectedAnswer,
                showResults,
                currentQuestionAnswerChoice,
                quizPageProps: quizPageProps.current,
                numberOfCorrectAnswers,
                quizScore,
                ratioCorrect,
                initialize,
                setUserQuizProgress,
                setSelectedAnswer,
                setShowAnswer,
                setCurrentQuestionAnswerChoice,
              }}
            >
              <QuizContent>
                {!showResults ? (
                  <>
                    <QuizProgressBar />
                    <QuizRadioGroup />
                  </>
                ) : (
                  <QuizSummary />
                )}
              </QuizContent>
              <QuizButtonGroup />
            </QuizWidgetProvider>
          ) : (
            <Center>
              <Spinner />
            </Center>
          )}
        </Stack>
      </Stack>
    </VStack>
  )
}

export default QuizWidget

/**
 * For use of the widget on single pages (not the quizzes page)
 */
export const StandaloneQuizWidget = (
  props: Pick<QuizWidgetProps, "quizKey">
) => {
  const [_, updateUserStats] = useLocalQuizData()
  return (
    <VStack spacing="12" my="16">
      <Heading
        as="h2"
        textAlign="center"
        scrollBehavior="smooth"
        scrollMarginTop="24"
        id="quiz"
      >
        <Translation id="learn-quizzes:test-your-knowledge" />
      </Heading>
      <QuizWidget
        {...props}
        updateUserStats={updateUserStats}
        isStandaloneQuiz
      />
    </VStack>
  )
}
