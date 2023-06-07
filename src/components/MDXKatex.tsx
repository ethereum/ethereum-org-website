import React from "react"
import { Box, Text } from "@chakra-ui/react"
import TeX from "@matejmazur/react-katex"

import type { ClassNameChildOnlyProps } from "../types"

export const Div = (props: ClassNameChildOnlyProps) => {
  require("katex/dist/katex.min.css")
  if (props.className?.includes("math-display")) {
    return (
      <Box maxW="100%" overflowX="scroll">
        <TeX block math={props.children?.toString()} />
      </Box>
    )
  }
  return <Box {...props} />
}

export const Span = (props: ClassNameChildOnlyProps) => {
  require("katex/dist/katex.min.css")
  if (props.className?.includes("math-inline"))
    return <TeX math={props.children?.toString()} />
  return <Text as="span" {...props} />
}
