import React from "react"
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react"

import { scrollIntoView } from "../../utils/scrollIntoView"

export interface IProps extends ButtonProps {
  toId?: string
}

const Button: React.FC<IProps> = ({ toId, children, ...props }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (toId) {
      scrollIntoView(toId)
    }

    props.onClick?.(e)
  }

  return (
    <ChakraButton {...props} onClick={handleOnClick}>
      {children}
    </ChakraButton>
  )
}

export default Button
