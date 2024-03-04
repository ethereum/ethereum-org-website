import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import { cssVar } from "@chakra-ui/react"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const $arrowBg = cssVar("popper-arrow-bg")
const $arrowSize = cssVar("popper-arrow-size")

const baseStyle = definePartsStyle({
  popper: {
    zIndex: "popover",
    boxShadow: `0px 0px 16px 0px #00000040`,
    borderRadius: "base",
  },
  content: {
    [$arrowSize.variable]: "8px",
    minW: 12,
    maxW: 80,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    borderRadius: "base",
  },
  arrow: {
    [$arrowBg.variable]: "colors.background.highlight",
  },
})

export const Popover = defineMultiStyleConfig({
  baseStyle,
})
