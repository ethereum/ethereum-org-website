import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $arrowBg = cssVar("popper-arrow-bg")
const $arrowSize = cssVar("popper-arrow-size")

const baseStyle = definePartsStyle({
  popper: {
    zIndex: "popover",
    boxShadow: `0px 0px 16px 0px #00000040`,
  },
  content: {
    [$arrowSize.variable]: "8px",
    minW: 12,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    fontWeight: "normal",
    borderRadius: "base",
    cursor: "default",
    textAlign: "center",
    userSelect: "none",
    outline: 0,
  },
  arrow: {
    [$arrowBg.variable]: "colors.background.highlight",
  },
})

export const Popover = defineMultiStyleConfig({
  baseStyle,
})
