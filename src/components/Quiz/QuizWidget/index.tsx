import { Dispatch, SetStateAction, useEffect, useRef } from "react"

import type { QuizKey, QuizStatus, UserStats } from "@/lib/types"

import Translation from "@/components/Translation"
import { Center, Stack, VStack } from "@/components/ui/flex"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils/cn"

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

  const getMainContainerBg = () => {
    if (!isStandaloneQuiz) return "bg-transparent"
    if (!answerStatus) return "bg-background-highlight"
    if (answerStatus === "correct")
      return "!bg-success-light dark:!bg-success-dark"
    return "!bg-error-light dark:!bg-error-dark"
  }

  return (
    <VStack data-testid="quiz-widget" className="w-full max-w-[600px] gap-12">
      <div
        className={cn(
          "grid w-full rounded [&>*]:[grid-area:1/1]",
          getMainContainerBg()
        )}
      >
        {showConfetti && <QuizConfetti />}
        <Stack
          className={cn(
            "relative w-full gap-8",
            // Reduce padding when showing Spinner
            !quizData ? "pb-5 pt-10" : "pb-4 pt-5 md:pb-8 md:pt-12",
            isStandaloneQuiz && "px-4 shadow-drop"
          )}
        >
          <Center
            className={cn(
              "relative top-2 md:absolute md:start-1/2 md:top-0 md:-translate-y-1/2",
              isRtl
                ? "md:translate-x-[calc(50%_*_1)]"
                : "md:translate-x-[calc(50%_*_-1)]"
            )}
          >
            <AnswerIcon answerStatus={answerStatus} />
          </Center>
          <Stack className="justify-between gap-8 max-sm:mt-8">
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
                  setCurrentQuestionAnswerChoice={
                    setCurrentQuestionAnswerChoice
                  }
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
      </div>
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
    <VStack className="my-16 gap-12">
      <h2 id="quiz" className="scroll-mt-24 scroll-smooth text-center">
        <Translation id="learn-quizzes:test-your-knowledge" />
      </h2>
      <QuizWidget
        {...props}
        updateUserStats={updateUserStats}
        isStandaloneQuiz
      />
    </VStack>
  )
}
