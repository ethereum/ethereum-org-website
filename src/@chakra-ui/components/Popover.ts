import { popoverAnatomy as parts } from "@chakra-ui/anatomy"
import { cssVar } from "@chakra-ui/react"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

import { popoverDefaultTheme } from "./components.utils"

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

const variantTooltip = definePartsStyle({
  popper: {
    borderRadius: "base",
  },
  content: {
    [$arrowSize.variable]: "8px",
    boxShadow: `0px 0px 16px 0px #00000040`,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    borderRadius: "base",
    border: "none",
  },
  arrow: {
    [$arrowBg.variable]: "colors.background.highlight",
    [$arrowShadowColor.variable]: "colors.background.highlight",
    border: "none",
  },
})

export const Popover = defineMultiStyleConfig({
  baseStyle: defaultBaseStyle,
  sizes: defaultSizes,
  variants: {
    tooltip: variantTooltip,
  },
  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
