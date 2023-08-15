import { defineStyleConfig } from "@chakra-ui/react"
import { defineMergeStyles, linkDefaultTheme } from "./components.utils"

export const Link = defineStyleConfig({
  baseStyle: defineMergeStyles(linkDefaultTheme.baseStyle, {
    color: "primary.base",
    textDecoration: "underline",
    _focus: {
      boxShadow: "none",
    },
    _focusVisible: {
      boxShadow: "none",
      outline: "auto",
    },
  }),
})
