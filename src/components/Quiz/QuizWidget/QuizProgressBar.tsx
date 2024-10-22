import { useCallback } from "react"

import type { AnswerChoice, Question } from "@/lib/types"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { PROGRESS_BAR_GAP } from "@/lib/constants"

import type { AnswerStatus } from "./useQuizWidget"

type QuizProgressBarProps = {
  questions: Question[]
  answerStatus: AnswerStatus
  currentQuestionIndex: number
  userQuizProgress: AnswerChoice[]
}

export const QuizProgressBar = ({
  questions,
  answerStatus,
  currentQuestionIndex,
  userQuizProgress,
}: QuizProgressBarProps) => {
  const progressBarBackground = useCallback(
    (index: number) => {
      if (
        (answerStatus &&
          index === currentQuestionIndex &&
          answerStatus === "correct") ||
        userQuizProgress[index]?.isCorrect
      ) {
        return "bg-success"
      }

      if (
        (answerStatus === "incorrect" && index === currentQuestionIndex) ||
        (userQuizProgress[index] && !userQuizProgress[index].isCorrect)
      ) {
        return "bg-error"
      }

      if (index === currentQuestionIndex) {
        return "bg-body-medium"
      }

      return "bg-disabled"
    },
    [answerStatus, currentQuestionIndex, userQuizProgress]
  )
  return (
    <Center className="w-full" style={{ gap: PROGRESS_BAR_GAP }}>
      {questions.map(({ id }, idx, arr) => {
        /* Calculate width percent based on number of questions */
        const width = `calc(${Math.floor(
          100 / arr.length
        )}% - ${PROGRESS_BAR_GAP})`

        return (
          <div
            key={id}
            className={cn(progressBarBackground(idx), "mx-0 h-[4px] p-0")}
            style={{ width, maxWidth: `min(${width}, 2rem)` }}
          />
        )
      })}
    </Center>
  )
}
