import React, { useContext } from "react"
import { VisuallyHidden as ChakraVisuallyHidden } from "@chakra-ui/react"

import { ZenModeContext } from "../contexts/ZenModeContext"

// Todo: Refactor to from isHidden boolean

export interface IProps {
  children?: React.ReactNode
}

const VisuallyHidden: React.FC<IProps> = ({ children }) => {
  const { isZenMode } = useContext(ZenModeContext)

  return isZenMode ? (
    <ChakraVisuallyHidden>{children}</ChakraVisuallyHidden>
  ) : (
    <>{children}</>
  )
}

export default VisuallyHidden
