import React from "react"
import {
  Button as ChakraButton,
  ButtonProps,
  useStyleConfig,
} from "@chakra-ui/react"

import { scrollIntoView } from "../../utils/scrollIntoView"

export interface IProps extends ButtonProps {
  toId?: string
  isSecondary?: boolean
}

const Button: React.FC<IProps> = ({ toId, isSecondary, onClick, ...props }) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (toId) {
      scrollIntoView(toId)
    }

    onClick?.(e)
  }

  /**
   *  Prevent React warning that does not recognize `isSecondary` on DOM
   *  while still sending prop to the theme config
   */
  const styles = useStyleConfig("Button", { ...props, isSecondary })

  // `styles` object sent to `sx` prop per convention
  return <ChakraButton onClick={handleOnClick} sx={styles} {...props} />
}

export default Button
