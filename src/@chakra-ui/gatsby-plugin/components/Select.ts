import { selectAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/react"
import { defineMergeStyles, selectDefaultTheme } from "./components.utils"
import { Input as inputTheme } from "./Input"

const { baseStyle: inputBaseStyles } = inputTheme

const baseFieldStyles = inputBaseStyles?.({} as never).field

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const baseStyleField = defineMergeStyles(selectDefaultTheme.baseStyle?.field, {
  ...baseFieldStyles,
  cursor: "pointer",
  py: 2,
  ps: 2,
  pe: 8,
  h: 10.5,
  _focusVisible: {
    outline: "3px solid",
    outlineColor: "primary.hover",
    outlineOffset: "-1px",
  },
  "&:not(:disabled)": {
    _hover: {
      ...baseFieldStyles?.["&:not(:disabled)"],
      boxShadow: "buttonHover",
    },
  },
})

const baseStyleIcon = defineMergeStyles(selectDefaultTheme.baseStyle?.icon, {
  _peerHover: {
    color: "primary.base",
  },
})

const baseStyle = definePartsStyle({
  field: baseStyleField,
  icon: baseStyleIcon,
})

const variantOutline = definePartsStyle({
  field: {
    borderRadius: "base",
  },
})

const flushedBorderColor = "transparent !important"

const variantFlushed = definePartsStyle({
  field: {
    borderBottomRadius: 0,
    borderTopColor: flushedBorderColor,
    borderInlineColor: flushedBorderColor,
    "&:not(:disabled)": {
      _hover: {
        borderTopColor: flushedBorderColor,
        borderInlineColor: flushedBorderColor,
      },
    },
  },
})

const variants = {
  outline: variantOutline,
  flushed: variantFlushed,
}

export const Select = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "outline",
  },
})
