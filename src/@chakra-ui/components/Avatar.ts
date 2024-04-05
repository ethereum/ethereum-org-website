import pick from "lodash/pick"
import { avatarAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
  getToken,
} from "@chakra-ui/react"

import { avatarDefaultTheme, defineMergeStyles } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const { baseStyle: defaultBaseStyle, sizes: defaultSizes } = avatarDefaultTheme

const $border = cssVar("avatar-border-color", "transparent")
const $mlBySize = cssVar("ml-by-size")

const baseStyleContainer = defineStyle((props) => {
  const primaryLowContrast = getToken(
    "colors",
    "primary.lowContrast"
  )(props.theme)

  return defineMergeStyles(defaultBaseStyle?.(props).container, {
    [$border.variable]: "transparent",
    borderWidth: "1px",
    "&:hover, [data-peer]:hover ~ &": {
      boxShadow: `0.15em 0.15em 0 ${primaryLowContrast}`,
    },
    _focus: {
      outline: "4px solid",
      outlineColor: "primary.hover",
      outlineOffset: "-1px",
    },
    _active: {
      [$border.variable]: "colors.primary.hover",
      boxShadow: "none",
      "& img": {
        opacity: 0.7,
      },
    },
    "[role='group'] &": {
      [$border.variable]: "colors.background.base",
      _notLast: {
        ms: $mlBySize.reference,
      },
    },
  })
})

const baseStyleExessLabel = defineStyle((props) =>
  defineMergeStyles(defaultBaseStyle?.(props).excessLabel, {
    bg: "body.base",
    color: "background.base",
    ms: $mlBySize.reference,
  })
)

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
  excessLabel: baseStyleExessLabel(props),
}))

const USED_SIZES = ["xs", "sm", "md", "lg"] as const

const pickedDefaultSizes: { [k in (typeof USED_SIZES)[number]]?: object } =
  pick(defaultSizes, ...USED_SIZES)

const sizes = defineMergeStyles(pickedDefaultSizes, {
  xs: {
    group: {
      [$mlBySize.variable]: "space.-1",
    },
    excessLabel: {
      fontSize: "0.563rem",
    },
  },
  sm: {
    group: {
      [$mlBySize.variable]: "space.-2",
    },
    excessLabel: {
      fontSize: "sm",
    },
  },
})

export const Avatar = defineMultiStyleConfig({
  baseStyle,
  // @ts-expect-error incompatible type shapes
  sizes,
})
