import React from "react"
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react"

import { scrollIntoView } from "../../utils/scrollIntoView"

export interface IProps extends ButtonProps {
  toId?: string
}

const Button: React.FC<IProps> = ({ toId, children, ...props }) => {
  const handleOnClick = () => {
    if (!toId) {
      return
    }

    scrollIntoView(toId)
  }

  return (
    <ChakraButton onClick={handleOnClick} {...props}>
      {children}
    </ChakraButton>
  )
}

export default Button
