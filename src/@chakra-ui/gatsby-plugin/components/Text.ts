import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const sizes = {
  "6xl": defineStyle({
    fontSize: "6xl",
    lineHeight: "4xs",
  }),
  "5xl": defineStyle({
    fontSize: "5xl",
    lineHeight: "4xs",
  }),
  "4xl": defineStyle({
    fontSize: "4xl",
    lineHeight: "sm",
  }),
  "3xl": defineStyle({
    fontSize: "3xl",
    lineHeight: "sm",
  }),
  "2xl": defineStyle({
    fontSize: "2xl",
    lineHeight: "sm",
  }),
  xl: defineStyle({
    fontSize: "xl",
    lineHeight: "sm",
  }),
  lg: defineStyle({
    fontSize: "lg",
    lineHeight: "base",
  }),
  md: defineStyle({
    fontSize: "md",
    lineHeight: "base",
  }),
  sm: defineStyle({
    fontSize: "sm",
    lineHeight: "base",
  }),
  xs: defineStyle({
    fontSize: "xs",
    lineHeight: "base",
  }),
}

export const Text = defineStyleConfig({
  sizes,
})
