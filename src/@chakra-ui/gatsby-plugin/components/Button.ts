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
    color: "primary",
    bg: "background",
    borderColor: "primary",
    _disabled: {
      ...disabledStylesOutline,
    },
  },
  _active: {
    color: "primary",
    bg: "primaryLight",
    borderColor: "primary",
  },
  _focus: {
    color: "primary",
    borderColor: "background",
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
    bg: "primary",
    border: 0,
    _hover: {
      bg: "primary",
      opacity: 0.8,
      _disabled: {
        ...disabledStylesSolid,
      },
    },
    _active: {
      bg: "primaryHover",
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
  color: "primary",
  borderColor: "primary",
})

const variantIcon = defineStyle({
  appearance: "none",
  background: "inherit",
  padding: "initial",
  border: 0,
  color: "inherit",
  boxShadow: "none",
  _hover: {
    color: "primary",
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
