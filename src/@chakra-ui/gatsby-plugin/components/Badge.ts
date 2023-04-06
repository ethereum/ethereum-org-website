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
  borderColor: "primary100",
  color: "text",
})

const variantSolid = defineStyle({
  color: "black300",
  background: "primary100",
})

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
