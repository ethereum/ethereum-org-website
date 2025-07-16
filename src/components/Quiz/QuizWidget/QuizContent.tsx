import { type ReactNode, useCallback } from "react"

import { VStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { AnswerStatus } from "./useQuizWidget"

type QuizContentProps = {
  answerStatus: AnswerStatus
  title: string
  children: ReactNode
}

export const QuizContent = ({
  answerStatus,
  title,
  children,
}: QuizContentProps) => {
  const getTitleContent = useCallback((): string => {
    if (!answerStatus) return title

    return answerStatus === "correct" ? "Correct!" : "Incorrect"
  }, [answerStatus, title])

  const getTitleTextColor = () => {
    if (!answerStatus) return "text-primary-hover"
    return answerStatus === "correct" ? "text-success" : "text-error"
  }

  return (
    <VStack className="gap-4">
      <span
        className={cn(getTitleTextColor(), "text-center font-bold")}
        data-testid={`answer-status-${answerStatus}`}
      >
        {getTitleContent()}
      </span>
      {children}
    </VStack>
  )
}
