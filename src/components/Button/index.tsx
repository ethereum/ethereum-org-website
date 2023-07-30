import React from "react"
import {
  Button as ChakraButton,
  ButtonProps,
  forwardRef,
} from "@chakra-ui/react"

import { scrollIntoView } from "../../utils/scrollIntoView"

export interface IProps extends ButtonProps {
  toId?: string
}

const Button = forwardRef<IProps, "button">(({ toId, onClick, ...props }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (toId) {
      scrollIntoView(toId)
    }

    onClick?.(e)
  }

  return <ChakraButton onClick={handleOnClick} {...props} />
})

export default Button
