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
  textTransform: "uppercase",
})

const variantSecondary = defineStyle({
  borderColor: "orange.100",
  color: "text",
})

const variantSolid = defineStyle({
  color: "black300",
  background: "primary100",
})

const variantGreen = defineStyle({
  color: "white",
  background: "green.500",
})

const variantBlue = defineStyle({
  color: "black",
  background: "blue.300",
})

const variantRed = defineStyle({
  color: "white",
  background: "red.500",
})

const variantPink = defineStyle({
  color: "black",
  background: "red.100",
})

const variantGray = defineStyle({
  color: "black",
  background: "gray.300",
})

export const Badge = defineStyleConfig({
  baseStyle,
  variants: {
    solid: variantSolid,
    secondary: variantSecondary,
    green: variantGreen,
    purple: variantSolid,
    red: variantRed,
    pink: variantPink,
    gray: variantGray,
    blue: variantBlue,
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
