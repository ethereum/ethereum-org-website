import type { ChildOnlyProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import CorrectIcon from "../../icons/quiz/correct-icon.svg"
import IncorrectIcon from "../../icons/quiz/incorrect-icon.svg"
import TrophyIcon from "../../icons/quiz/trophy-icon.svg"

import { AnswerStatus } from "./useQuizWidget"

type AnswerIconProps = {
  answerStatus: AnswerStatus
}

/**
 * Icon shown for the answer
 *
 * Defaults to the `TrophyIcon` prior to answering a question
 */
export const AnswerIcon = ({ answerStatus }: AnswerIconProps) => {
  const commonProps = {
    className: "text-background-highlight",
  }

  const IconWrapper = ({ children }: ChildOnlyProp) => {
    const getWrapperBgClass = () => {
      if (!answerStatus) return "bg-primary"
      if (answerStatus === "correct") return "bg-success"
      return "bg-error"
    }

    return (
      <div className={cn("size-[50px] rounded-full", getWrapperBgClass())}>
        {children}
      </div>
    )
  }

  if (!answerStatus) {
    return (
      <IconWrapper>
        <TrophyIcon {...commonProps} />
      </IconWrapper>
    )
  }

  if (answerStatus === "correct") {
    return (
      <IconWrapper>
        <CorrectIcon {...commonProps} />
      </IconWrapper>
    )
  }

  return (
    <IconWrapper>
      <IncorrectIcon {...commonProps} />
    </IconWrapper>
  )
}
