import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = definePartsStyle({
  popper: {
    zIndex: "popover",
  },
  content: {
    maxW: 48,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    fontWeight: "normal",
    borderRadius: "base",
    cursor: "default",
    textAlign: "center",
    userSelect: "none",
    outline: 0,
    boxShadow: `0px 0px 16px 0px #00000040`,
  },
  arrow: {
    [$arrowBg.variable]: "colors.background.highlight",
  },
})

export const Popover = defineMultiStyleConfig({
  baseStyle,
})
