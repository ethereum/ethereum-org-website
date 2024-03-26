import { breadcrumbAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

import { breadcrumbDefaultTheme, defineMergeStyles } from "./components.utils"

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  breadcrumbAnatomy.keys
)

const baseStyle = defineMergeStyles(breadcrumbDefaultTheme.baseStyle, {
  list: {
    m: 0,
    lineHeight: "base",
    flexWrap: "wrap",
  },
  item: {
    color: "body.medium",
    letterSpacing: "wider",
    m: 0,
  },
  link: {
    fontWeight: "normal",
    _hover: {
      color: "primary.base",
      textDecor: "none",
    },
    _active: {
      color: "primary.base",
    },
    /*
     * `&[aria-current="page"]`
     * Redundancy to ensure styling on the active
     * link is applied.
     */
    _activeLink: {
      color: "primary.base",
    },
  },
  separator: {
    mx: "2.5",
  },
})

export const Breadcrumb = defineMultiStyleConfig({
  baseStyle,
})
