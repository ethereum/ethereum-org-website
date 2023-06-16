import { tableAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"
import { defineMergeStyles, tableDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const cellPadding = defineStyle({
  p: 4,
})

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
})

const baseStyle = defineMergeStyles(tableDefaultTheme.baseStyle, {
  table: {
    minW: "556px",
    th: {
      borderBottom: "1px",
      borderColor: "primary.visited",
      color: "primary.visited",
      textTransform: "capitalize",
      ...cellPadding,
      ...numericStyles,
    },
    tr: {
      verticalAlign: "text-top",
      "th, td": {
        _notLast: {
          borderRight: "2px",
          borderRightColor: "background.base",
        },
      },
    },
    td: {
      ...cellPadding,
      ...numericStyles,
    },
    tbody: {
      tr: {
        _hover: {
          /**
           * Override specificity when hovering
           * over even rows in 'striped' variant.
           */
          bg: "background.highlight !important",
        },
      },
    },
  },
})

const variantStriped = definePartsStyle({
  table: {
    tbody: {
      tr: {
        _even: {
          bg: "background.highlight",
        },
      },
    },
  },
})

const variantSimple = definePartsStyle({
  table: {
    thead: {
      bg: "background.highlight",
    },
  },
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  variants: {
    minimal: {},
    striped: variantStriped,
    simple: variantSimple,
  },
  defaultProps: {
    variant: "simple",
  },
})
