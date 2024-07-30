import { tagAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  theme,
} from "@chakra-ui/react"

import { defineMergeStyles } from "../components.utils"

import { $badgeBg, $badgeColor, STATUS_COLORS } from "./utils"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)

const { Tag: tagTheme } = theme.components

const baseStyleContainer = defineMergeStyles(tagTheme.baseStyle?.container, {
  border: "1px",
  borderColor: "transparent",
  boxSizing: "border-box",
  gap: 1,
  borderRadius: "full",
  px: 2,
  py: 0.5,
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
  lineHeight: 1.6,
})

const baseStyleCloseButton = defineStyle({
  ...tagTheme.baseStyle?.closeButton,
  opacity: 1,
  m: 0,
  // Clear default
  _focusVisible: null,
})

const baseStyle = definePartsStyle({
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton,
})

const getStatusStyles = (status: string, variant: string) => {
  const statusStyles = STATUS_COLORS[status][variant]

  return {
    container: statusStyles,
  }
}

const variantSubtle = definePartsStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.subtle(props)
  const statusStyles = getStatusStyles(status, "subtle")
  return {
    container: {
      ...defaultStyles?.container,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles.container,
    },
    closeButton: {
      "&:focus-visible, &:hover": {
        bg: "white",
      },
    },
  }
})

const variantSolid = definePartsStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.solid(props)
  const statusStyles = getStatusStyles(status, "solid")
  return {
    container: {
      ...defaultStyles?.container,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles.container,
    },
    closeButton: {
      "&:focus-visible, &:hover": {
        bg: "white",
        color: $badgeBg.reference,
      },
    },
  }
})

const variantOutline = definePartsStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.outline(props)
  const statusStyles = getStatusStyles(status, "outline")
  return {
    container: {
      ...defaultStyles?.container,
      boxShadow: "none",
      borderColor: $badgeColor.reference,
      // Remove default dark mode styles
      _dark: {},
      ...statusStyles.container,
    },
    closeButton: {
      "&:focus-visible, &:hover": {
        bg: "body.light",
      },
    },
  }
})

const variantHighContrast = definePartsStyle((props) => {
  const { status = "normal" } = props
  const defaultStyles = tagTheme.variants?.outline(props)
  const statusStyles = getStatusStyles(status, "highContrast")
  return {
    container: {
      ...defaultStyles?.container,
      boxShadow: "none",

      // Remove default dark mode styles
      _dark: {},
      ...statusStyles.container,
    },
  }
})
const variants = {
  subtle: variantSubtle,
  solid: variantSolid,
  outline: variantOutline,
  highContrast: variantHighContrast,
}

export const Tag = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "subtle",
  },
})
