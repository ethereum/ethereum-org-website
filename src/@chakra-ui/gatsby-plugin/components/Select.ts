import { selectAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/react"
import { defineMergeStyles, selectDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const $borderBaseWidth = cssVar("border-base-width")

const baseStyleField = defineMergeStyles(selectDefaultTheme.baseStyle?.field, {
  [$borderBaseWidth.variable]: "1px",
  borderColor: "currentColor",
  cursor: "pointer",
  py: 2,
  ps: 2,
  pe: 8,
  _active: {
    bg: "primaryLowContrast",
    boxShadow: "none",
  },
  _hover: {
    boxShadow: "buttonHover",
    color: "primary",
  },
  _focusVisible: {
    outline: "3px solid",
    outlineColor: "primaryHover",
    outlineOffset: "-1px",
  },
})

const baseStyle = definePartsStyle({
  field: baseStyleField,
  icon: selectDefaultTheme.baseStyle?.icon,
})

const variantOutline = definePartsStyle({
  field: {
    borderRadius: "base",
    borderWidth: $borderBaseWidth.reference,
  },
})

const variantFlushed = definePartsStyle({
  field: {
    borderTopRadius: "base",
    borderBottomWidth: $borderBaseWidth.reference,
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
