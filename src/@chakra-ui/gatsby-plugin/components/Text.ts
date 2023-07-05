import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const sizes = {
  "7xl": defineStyle({
    fontSize: "6xl",
    lineHeight: "4xs",
  }),
  "6xl": defineStyle({
    fontSize: "5xl",
    lineHeight: "4xs",
  }),
  "5xl": defineStyle({
    fontSize: "4xl",
    lineHeight: "sm",
  }),
  "4xl": defineStyle({
    fontSize: "3xl",
    lineHeight: "sm",
  }),
  "3xl": defineStyle({
    fontSize: "2xl",
    lineHeight: "sm",
  }),
  "2xl": defineStyle({
    fontSize: "xl",
    lineHeight: "sm",
  }),
  xl: defineStyle({
    fontSize: "lg",
    lineHeight: "base",
  }),
  lg: defineStyle({
    fontSize: "md",
    lineHeight: "base",
  }),
  md: defineStyle({
    fontSize: "sm",
    lineHeight: "base",
  }),
  sm: defineStyle({
    fontSize: "xs",
    lineHeight: "base",
  }),
}

export const Text = defineStyleConfig({
  sizes,
  defaultProps: {
    size: "lg",
  },
})
