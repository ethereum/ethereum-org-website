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

const Button: React.FC<IProps> = forwardRef(
  ({ toId, children, ...props }, ref) => {
    const handleOnClick = () => {
      if (!toId) {
        return
      }

      scrollIntoView(toId)
    }

    return (
      <ChakraButton ref={ref} onClick={handleOnClick} {...props}>
        {children}
      </ChakraButton>
    )
  }
)

export default Button
