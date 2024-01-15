import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

import { badgeDefaultTheme, defineMergeStyles } from "./components.utils"

const { baseStyle: defaultBaseStyle } = badgeDefaultTheme

const baseStyle = defineMergeStyles(defaultBaseStyle, {
  borderRadius: "base",
  border: "1px solid",
  borderColor: "transparent",
  fontWeight: "initial",
  py: 1,
  px: 2,
  lineHeight: "1.6rem",
  textTransform: "uppercase",
})

const COLOR_SCHEME_MAP = {
  purple: {
    color: "black300",
    background: "primary100",
    borderColor: "primary100",
  },
  orange: {
    color: "text",
    background: "orange.100",
    borderColor: "orange.100",
  },
  green: {
    color: "white",
    background: "green.500",
    borderColor: "green.500",
  },
  blue: {
    color: "black",
    background: "blue.300",
    borderColor: "blue.300",
  },
  red: {
    color: "white",
    background: "red.500",
    borderColor: "red.500",
  },
  pink: {
    color: "black",
    background: "red.100",
    borderColor: "red.100",
  },
  gray: {
    color: "black",
    background: "gray.300",
    borderColor: "gray.300",
  },
}

const variantSecondary = defineStyle(({ colorScheme: c = "orange" }) => ({
  ...COLOR_SCHEME_MAP[c],
  background: "transparent",
}))

const variantSolid = defineStyle(({ colorScheme: c = "purple" }) => ({
  ...COLOR_SCHEME_MAP[c],
  borderColor: "transparent",
}))

export const Badge = defineStyleConfig({
  baseStyle,
  variants: {
    solid: variantSolid,
    secondary: variantSecondary,
  },
  sizes: {
    sm: {
      py: 0,
    },
    lg: {
      px: 3,
    },
  },
  defaultProps: {
    variant: "solid",
  },
})
