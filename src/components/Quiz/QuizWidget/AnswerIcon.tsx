import * as React from "react"
import { Circle, SquareProps } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { CorrectIcon, IncorrectIcon, TrophyIcon } from "../../icons/quiz"

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
    color: "neutral",
  }

  const IconWrapper = (props: ChildOnlyProp) => {
    const getWrapperBg = (): SquareProps["bg"] => {
      if (!answerStatus) {
        return "primary.base"
      }
      if (answerStatus === "correct") {
        return "success.base"
      }
      return "error.base"
    }

    return <Circle size="50px" bg={getWrapperBg()} {...props} />
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
