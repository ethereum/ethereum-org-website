import { defineStyleConfig } from "@chakra-ui/react"
import components from "."
import { defineMergeStyles, linkDefaultTheme } from "./components.utils"
import { Text } from "./Text"

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
  sizes: Text.sizes,
})
