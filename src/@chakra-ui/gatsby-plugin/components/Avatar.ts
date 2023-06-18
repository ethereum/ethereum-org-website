import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/react"
import { avatarAnatomy } from "@chakra-ui/anatomy"
import { avatarDefaultTheme, defineMergeStyles } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys)

const { baseStyle: defaultBaseStyle, sizes: defaultSizes } = avatarDefaultTheme

const $avatarBg = cssVar("avatar-background")
const $border = cssVar("avatar-border-color", "transparent")
const $mlBySize = cssVar("ml-by-size")

const baseStyleContainer = defineStyle((props) =>
  defineMergeStyles(defaultBaseStyle?.(props).container, {
    [$border.variable]: "transparent",
    bg: $avatarBg.reference,
    borderWidth: "1px",
    "&:hover, [data-peer]:hover ~ &": {
      boxShadow: "buttonHover",
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
        marginLeft: $mlBySize.reference,
      },
    },
  })
)

const baseStyleExessLabel = defineStyle((props) =>
  defineMergeStyles(defaultBaseStyle?.(props).excessLabel, {
    bg: "body",
    color: "background.base",
    ms: $mlBySize.reference,
  })
)

const baseStyle = definePartsStyle((props) => ({
  container: baseStyleContainer(props),
  excessLabel: baseStyleExessLabel(props),
}))

const sizes = defineMergeStyles(defaultSizes, {
  "2xs": {
    group: {
      [$mlBySize.variable]: "space.-0.5",
    },
    excessLabel: {
      fontSize: "0.5rem",
    },
  },
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
  // @ts-expect-error
  sizes,
})
