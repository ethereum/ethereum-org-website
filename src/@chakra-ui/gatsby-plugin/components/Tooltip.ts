import { cssVar, defineStyle, defineStyleConfig } from "@chakra-ui/react"

const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = defineStyle((props) => {
  return {
    w: 44,
    maxW: 48,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    fontWeight: "normal",
    borderRadius: "base",
    cursor: "default",
    textAlign: "center",
    zIndex: "docked",
    boxShadow: `0px 0px 16px 0px #00000040`,
    [$arrowBg.variable]: "colors.background.highlight",
  }
})

export const Tooltip = defineStyleConfig({
  baseStyle,
})
