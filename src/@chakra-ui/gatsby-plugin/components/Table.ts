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
      borderColor: "primaryVisited",
      color: "primaryVisited",
      textTransform: "capitalize",
      ...cellPadding,
      ...numericStyles,
    },
    tr: {
      verticalAlign: "text-top",
      "th, td": {
        _notLast: {
          borderRight: "2px",
          borderRightColor: "background",
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
          bg: "backgroundHighlight !important",
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
          bg: "backgroundHighlight",
        },
      },
    },
  },
})

const variantSimple = definePartsStyle({
  table: {
    thead: {
      bg: "backgroundHighlight",
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
})
