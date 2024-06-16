import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import {
  calc,
  Center,
  Heading,
  Spinner,
  Stack,
  StackProps,
  VStack,
} from "@chakra-ui/react"

import type { QuizKey, QuizStatus, UserStats } from "@/lib/types"

import Translation from "@/components/Translation"

import { useLocalQuizData } from "../useLocalQuizData"

import { AnswerIcon } from "./AnswerIcon"
import { QuizButtonGroup } from "./QuizButtonGroup"
import { QuizConfetti } from "./QuizConfetti"
import { QuizContent } from "./QuizContent"
import { QuizProgressBar } from "./QuizProgressBar"
import { QuizRadioGroup } from "./QuizRadioGroup"
import { QuizSummary } from "./QuizSummary"
import { useQuizWidget } from "./useQuizWidget"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type CommonProps = {
  quizKey: QuizKey
  updateUserStats: Dispatch<SetStateAction<UserStats>>
}

type StandaloneQuizProps = CommonProps & {
  isStandaloneQuiz: true
  currentHandler?: never
  statusHandler?: never
}

type QuizPageProps = CommonProps & {
  currentHandler: (nextKey: QuizKey) => void
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
    currentQuestionAnswerChoice,
    numberOfCorrectAnswers,
    nextQuiz,
    quizScore,
    ratioCorrect,
    showConfetti,
    isPassingScore,
    initialize,
    setShowAnswer,
    setUserQuizProgress,
    setCurrentQuestionAnswerChoice,
  } = useQuizWidget({ quizKey, updateUserStats })

  const { isRtl } = useRtlFlip()

  const quizPageProps = useRef<
    | (Required<Pick<QuizWidgetProps, "currentHandler" | "statusHandler">> & {
        nextQuiz: QuizKey | undefined
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
    return () => {
      if (quizPageProps.current) {
        /**
         * If modal for widget unmounts when viewing a question's answer, ensure
         * the status is back to neutral when the modal is opened again.
         */
        quizPageProps.current.statusHandler("neutral")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuiz])

  const getMainContainerBg = (): StackProps["bg"] => {
    if (!answerStatus) {
      return isStandaloneQuiz ? "background.highlight" : "background.base"
    }

    if (answerStatus === "correct") {
      return "success.neutral"
    }

    return "error.neutral"
  }

  return (
    <VStack data-testid="quiz-widget" spacing="12" width="full" maxW="600px">
      <Stack
        w="full"
        gap="8"
        px={isStandaloneQuiz ? "4" : "0"}
        // Reduce padding when showing Spinner
        pt={!quizData ? "10" : { base: "5", md: "12" }}
        pb={!quizData ? "5" : { base: "4", md: "8" }}
        bg={getMainContainerBg()}
        borderRadius="base"
        boxShadow={isStandaloneQuiz ? "drop" : "none"}
        position="relative"
      >
        {showConfetti && <QuizConfetti />}

        <Center
          position={{ base: "relative", md: "absolute" }}
          top={{ base: 2, md: 0 }}
          insetInlineStart={{ md: "50%" }}
          transform="auto"
          translateX={{ md: calc.multiply("50%", isRtl ? 1 : -1) }}
          translateY={{ md: "-50%" }}
        >
          <AnswerIcon answerStatus={answerStatus} />
        </Center>
        <Stack
          spacing="8"
          justifyContent="space-between"
          mt={{ base: 8, sm: 0 }}
        >
          {quizData ? (
            <>
              <QuizContent answerStatus={answerStatus} title={quizData.title}>
                {!showResults ? (
                  <>
                    <QuizProgressBar
                      answerStatus={answerStatus}
                      currentQuestionIndex={currentQuestionIndex}
                      questions={quizData.questions}
                      userQuizProgress={userQuizProgress}
                    />
                    <QuizRadioGroup
                      answerStatus={answerStatus}
                      currentQuestionIndex={currentQuestionIndex}
                      questions={quizData.questions}
                      setCurrentQuestionAnswerChoice={
                        setCurrentQuestionAnswerChoice
                      }
                    />
                  </>
                ) : (
                  <QuizSummary
                    questionsLength={quizData.questions.length}
                    isPassingScore={isPassingScore}
                    numberOfCorrectAnswers={numberOfCorrectAnswers}
                    ratioCorrect={ratioCorrect}
                  />
                )}
              </QuizContent>
              <QuizButtonGroup
                answerStatus={answerStatus}
                currentQuestionAnswerChoice={currentQuestionAnswerChoice}
                currentQuestionIndex={currentQuestionIndex}
                handleReset={initialize}
                numberOfCorrectAnswers={numberOfCorrectAnswers}
                questions={quizData.questions}
                quizPageProps={quizPageProps.current}
                quizScore={quizScore}
                setCurrentQuestionAnswerChoice={setCurrentQuestionAnswerChoice}
                setShowAnswer={setShowAnswer}
                showResults={showResults}
                title={quizData.title}
                userQuizProgress={userQuizProgress}
                setUserQuizProgress={setUserQuizProgress}
              />
            </>
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
