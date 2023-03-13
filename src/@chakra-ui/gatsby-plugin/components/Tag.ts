import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { tagAnatomy } from "@chakra-ui/anatomy"
import { defineMergeStyles, tagDefaultTheme } from "./components.utils"

const { baseStyle: baseDefaultStyle, sizes, defaultProps } = tagDefaultTheme

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tagAnatomy.keys
)

const baseContainerStyle = defineMergeStyles(baseDefaultStyle?.container, {
  display: "flex",
  alignItems: "center",
  bgImage:
    "radial-gradient(46.28% 66.31% at 66.95% 58.35%,rgba(127, 127, 213, 0.2) 0%,rgba(134, 168, 231, 0.2) 50%,rgba(145, 234, 228, 0.2) 100%)",
  mb: 2,
  mr: 2,
  p: 2,
  borderRadius: "base",
  textTransform: "uppercase",
  fontSize: "sm",
  fontWeight: "normal",
  boxShadow: "table",
  border: "1px solid",
  borderColor: "white800",
  cursor: "pointer",
  opacity: "0.7",
  color: "text",
  _hover: {
    color: "primary",
    borderColor: "text200",
    opacity: "1",
  },
})

export const Tag = defineMultiStyleConfig({
  baseStyle: {
    ...baseDefaultStyle,
    container: baseContainerStyle,
  },
  sizes,
  variants: {
    active: {
      container: {
        borderColor: "primary300",
        opacity: "1",
        boxShadow: "none",
      },
    },
    // TODO: remove this variant, as it doesn't exist on the DS
    custom: {}, // empty variant
  },
  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
