import React, { useContext } from "react"
import { VisuallyHidden as ChakraVisuallyHidden } from "@chakra-ui/react"

import { ZenModeContext } from "../contexts/ZenModeContext"

export interface IProps {
  children?: React.ReactNode
}

const ZenMode: React.FC<IProps> = ({ children }) => {
  const { isZenMode } = useContext(ZenModeContext)

  return isZenMode ? (
    <ChakraVisuallyHidden>{children}</ChakraVisuallyHidden>
  ) : (
    <>{children}</>
  )
}

export default ZenMode
