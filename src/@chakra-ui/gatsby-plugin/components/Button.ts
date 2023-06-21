import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
import { buttonDefaultTheme, defineMergeStyles } from "./components.utils"

const {
  baseStyle: defaultBaseStyle,
  sizes: defaultSizes,
  variants: defaultVariants,
  defaultProps,
} = buttonDefaultTheme

const baseStyle = defineMergeStyles(defaultBaseStyle, {
  fontWeight: "normal",
  borderRadius: "base",
  _hover: {
    textDecoration: "none",
    boxShadow: "primary",
    _disabled: {
      boxShadow: "none",
    },
  },
  _focus: {
    boxShadow: "outline",
    outline: 0,
  },
})

const disabledStylesSolid = defineStyle({
  bg: "disabled",
  opacity: 1,
})

const disabledStylesOutline = defineStyle({
  color: "disabled",
  borderColor: "disabled",
  opacity: 1,
})

const commonOutline = defineStyle({
  border: "1px",
  color: "text",
  bg: "transparent",
  borderColor: "text",
  _hover: {
    color: "primary.base",
    bg: "background.base",
    borderColor: "primary.base",
    _disabled: {
      ...disabledStylesOutline,
    },
  },
  _active: {
    color: "primary.base",
    bg: "primary.light",
    borderColor: "primary.base",
  },
  _focus: {
    color: "primary.base",
    borderColor: "background.base",
    _disabled: {
      ...disabledStylesOutline,
    },
  },
  _disabled: {
    ...disabledStylesOutline,
  },
})

const variantSolid = defineStyle((props) =>
  defineMergeStyles(defaultVariants?.solid(props), {
    color: "buttonColor",
    bg: "primary.base",
    border: 0,
    _hover: {
      bg: "primary.base",
      opacity: 0.8,
      _disabled: {
        ...disabledStylesSolid,
      },
    },
    _active: {
      bg: "primary.hover",
    },
    _disabled: {
      ...disabledStylesSolid,
    },
  })
)

const variantOutline = defineStyle((props) =>
  defineMergeStyles(defaultVariants?.outline(props), commonOutline)
)

const variantOutlineColor = defineStyle({
  ...commonOutline,
  color: "primary.base",
  borderColor: "primary.base",
})

const variantIcon = defineStyle({
  appearance: "none",
  background: "inherit",
  padding: "initial",
  border: 0,
  color: "inherit",
  boxShadow: "none",
  _hover: {
    color: "primary.base",
    boxShadow: "none",
  },
})

export const Button = defineStyleConfig({
  baseStyle,
  sizes: defineMergeStyles(defaultSizes, {
    md: {
      h: "42px",
    },
  }),
  variants: {
    ...buttonDefaultTheme.variants,
    // solid is the default variant used by chakra
    solid: variantSolid,
    outline: variantOutline,
    "outline-color": variantOutlineColor,
    icon: variantIcon,
  },
  defaultProps,
})
