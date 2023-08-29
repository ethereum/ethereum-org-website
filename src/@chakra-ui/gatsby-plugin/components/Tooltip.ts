import {
  cssVar,
  defineStyle,
  defineStyleConfig,
  getToken,
} from "@chakra-ui/react"

const $arrowBg = cssVar("popper-arrow-bg")

const baseStyle = defineStyle((props) => {
  const tableBoxShadow = getToken("colors", "tableBoxShadow")(props.theme)

  return {
    maxW: 48,
    p: 2,
    bg: "background.highlight",
    fontSize: "sm",
    fontWeight: "normal",
    borderRadius: "base",
    cursor: "default",
    textAlign: "center",
    zIndex: "docked",
    boxShadow: tableBoxShadow,
    [$arrowBg.variable]: "colors.background.highlight",
  }
})

export const Tooltip = defineStyleConfig({
  baseStyle,
})
