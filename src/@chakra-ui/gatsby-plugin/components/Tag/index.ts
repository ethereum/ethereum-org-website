import {
  createMultiStyleConfigHelpers,
  theme,
  defineStyle,
} from "@chakra-ui/react"
import { tagAnatomy } from "@chakra-ui/anatomy"
import { $badgeColor, STATUS_COLORS } from "./utils"
import { defineMergeStyles } from "../components.utils"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)

const { Tag: tagTheme } = theme.components

const baseStyleContainer = defineMergeStyles(tagTheme.baseStyle?.container, {
  border: "1px",
  borderColor: "transparent",
  gap: 1,
  borderRadius: "full",
  px: 2,
  minH: 8,
  fontWeight: 300,
  "&:any-link": {
    textDecor: "none",
    _focusWithin: {
      outline: "4px solid",
      outlineColor: "transparent",
      outlineOffset: 0,
    },
  },
})

const baseStyleLabel = defineStyle({
  ...tagTheme.baseStyle?.label,
  fontSize: "xs",
  textTransform: "uppercase",
  textAlign: "center",
})

const baseStyleCloseButton = defineStyle({
  ...tagTheme.baseStyle?.closeButton,
  opacity: 1,
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
})

const variantSubtle = defineStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.subtle(props)
  const statusStyles = STATUS_COLORS[status].subtle
  return {
    container: {
      ...defaultStyles?.container,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles,
    },
    label: {
      // ...warningLabelStyles
    },
  }
})

const variantSolid = defineStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.solid(props)
  const statusStyles = STATUS_COLORS[status].solid
  return {
    container: {
      ...defaultStyles?.container,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles,
    },
  }
})

const variantOutline = defineStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.outline(props)
  const statusStyles = STATUS_COLORS[status].outline
  return {
    container: {
      ...defaultStyles?.container,
      boxShadow: "none",
      borderColor: $badgeColor.reference,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles,
    },
  }
})

const variants = {
  subtle: variantSubtle,
  solid: variantSolid,
  outline: variantOutline,
}

export const Tag = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
  },
})
