import { tableAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/react"

import { defineMergeStyles, tableDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const $bgColor = cssVar("bg-color")

const cellPadding = defineStyle({
  p: 4,
})

const baseStyle = defineMergeStyles(
  tableDefaultTheme.baseStyle,
  definePartsStyle({
    table: {
      [$bgColor.variable]: "colors.background.highlight",
    },
    th: {
      borderBottom: "1px",
      borderColor: "body.base",
      color: "body.base",
      textTransform: "none",
      verticalAlign: "bottom",
      ...cellPadding,
    },
    tr: {
      "th, td": {
        _notLast: {
          borderInlineEnd: "2px",
          borderInlineEndColor: "background.base",
        },
      },
    },
    td: {
      ...cellPadding,
    },
    tbody: {
      tr: {
        verticalAlign: "top",
        _hover: {
          /**
           * Override specificity when hovering
           * over even rows in 'striped' variant.
           */
          bg: $bgColor.reference,
        },
      },
    },
  })
)

const variantMinimalStriped = definePartsStyle({
  tbody: {
    tr: {
      _even: {
        bg: $bgColor.reference,
      },
    },
  },
})

const variantSimpleStriped = definePartsStyle({
  ...variantMinimalStriped,
  thead: {
    bg: $bgColor.reference,
  },
})

const variantSimple = definePartsStyle({
  thead: {
    bg: $bgColor.reference,
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  variants: {
    minimal: {},
    "minimal-striped": variantMinimalStriped,
    simple: variantSimple,
    "simple-striped": variantSimpleStriped,
  },
  defaultProps: {
    variant: "simple",
  },
})
