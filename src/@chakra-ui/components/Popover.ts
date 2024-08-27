import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import { cssVar } from "@chakra-ui/react"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

import { defineMergeStyles, popoverDefaultTheme } from "./components.utils"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const {
  baseStyle: defaultBaseStyle,
  sizes: defaultSizes,
  defaultProps,
} = popoverDefaultTheme

const $arrowBg = cssVar("popper-arrow-bg")
const $arrowSize = cssVar("popper-arrow-size")
const $arrowShadowColor = cssVar("popper-arrow-shadow-color")

const baseStyle = definePartsStyle(
  defineMergeStyles(defaultBaseStyle, {
    popper: {
      borderRadius: "base",
      zIndex: "popover",
    },
    content: {
      [$arrowSize.variable]: "8px",
      p: 2,
      bg: "background.highlight",
      borderRadius: "base",
      boxShadow: `0px 0px 16px 0px #00000040`,
      fontSize: "sm",
      border: "none",
      minWidth: "48", // 12rem
      maxWidth: "xs", // 20rem
      lineHeight: "base",
      w: "auto",
      _focusVisible: {
        boxShadow: "none",
      },
    },
    body: {
      color: "body.base",
      fontWeight: "normal",
      textTransform: "none",
    },
    header: {
      border: "none",
    },
    arrow: {
      [$arrowBg.variable]: "colors.background.highlight",
      [$arrowShadowColor.variable]: "colors.background.highlight",
      border: "none",
    },
  })
)

export const Popover = defineMultiStyleConfig({
  baseStyle,
  sizes: defaultSizes,
  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
