import * as React from "react"
import { IconProps } from "@chakra-ui/react"

import { StarConfettiIcon } from "../../icons/quiz"

export const QuizConfetti = () => {
  const commonProps: IconProps = {
    fontSize: "184px",
    position: "absolute",
    top: 0,
  }
  return (
    <>
      <StarConfettiIcon {...commonProps} insetInlineStart={0} />

      <StarConfettiIcon
        {...commonProps}
        insetInlineEnd={0}
        transform="scaleX(-100%)"
      />
    </>
  )
}
