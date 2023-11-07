import { Circle, SquareProps } from "@chakra-ui/react"
import * as React from "react"
import { ChildOnlyProp } from "../../../types"
import { CorrectIcon, IncorrectIcon, TrophyIcon } from "../../icons/quiz"

interface AnswerIconProps {
  showAnswer: boolean
  isCurrentQuestionCorrect: boolean | undefined
}

/**
 * Icon shown for the answer
 *
 * Defaults to the `TrophyIcon` prior to answering a question
 */
export const AnswerIcon = ({
  showAnswer,
  isCurrentQuestionCorrect,
}: AnswerIconProps) => {
  const commonProps = {
    color: "neutral",
  }

  const IconWrapper = (props: ChildOnlyProp) => {
    const getWrapperBg = (): SquareProps["bg"] => {
      if (!showAnswer) {
        return "primary.base"
      }
      if (isCurrentQuestionCorrect) {
        return "success.base"
      }
      return "error.base"
    }

    return <Circle size="50px" bg={getWrapperBg()} {...props} />
  }

  if (!showAnswer) {
    return (
      <IconWrapper>
        <TrophyIcon {...commonProps} />
      </IconWrapper>
    )
  }

  if (isCurrentQuestionCorrect) {
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
