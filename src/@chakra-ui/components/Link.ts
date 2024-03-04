import { defineStyleConfig } from "@chakra-ui/react"

import { defineMergeStyles, linkDefaultTheme } from "./components.utils"
import { Text } from "./Text"

export const Link = defineStyleConfig({
  baseStyle: defineMergeStyles(linkDefaultTheme.baseStyle, {
    color: "primary.base",
    textDecor: "underline",
    textUnderlineOffset: "3px",
    _focusVisible: {
      boxShadow: "none",
      outline: "2px solid",
      outlineColor: "primary.hover",
      outlineOffset: "2px",
      borderRadius: "sm",
    },
    _hover: {
      color: "primary.hover",
    },
    "&[data-inline-link]": {
      _visited: {
        color: "primary.visited",
      },
    },
  }),
  sizes: Text.sizes,
})
