import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

/**
 * This selector over the more specific `& .chakra-button__icon` accounts
 * for icons used both as a singleton (in IconButton) and as aside element
 * with text. The mention classname is not used for the singleton.
 *
 * And because the icons `fontSize` is different than the text, the icon size
 * needs to stay the same when a singleton.
 */
const ICON_SELECTOR = "& svg"

const baseStyle = defineStyle({
  borderRadius: "base",
  border: "1px",
  color: "primary.base",
  fontWeight: "normal",
  lineHeight: "1.6",
  transitionProperty: "common",
  transitionDuration: "normal",
  whiteSpace: "normal",
  p: "unset",
  _focusVisible: {
    outline: "4px solid",
    outlineColor: "primary.hover",
    outlineOffset: -1,
  },
  _disabled: {
    color: "disabled",
    pointerEvents: "none",
  },
  _hover: {
    color: "primary.hover",
  },
  "&[data-secondary='true']": {
    color: "body.base",
  },
  "&.chakra-link": {
    textDecoration: "none",
    _hover: {
      textDecoration: "none",
    },
  },
})

const variantSolid = defineStyle({
  color: "background.base",
  bg: "primary.base",
  borderColor: "transparent",
  _disabled: {
    bg: "disabled",
    color: "background.base",
  },
  _hover: {
    color: "background.base",
    bg: "primary.hover",
    boxShadow: "buttonHover",
  },
  _active: {
    boxShadow: "none",
  },
})

const variantOutline = defineStyle({
  _hover: {
    boxShadow: "buttonHover",
  },
  _active: {
    boxShadow: "none",
  },
})

const variantGhost = {
  borderColor: "transparent",
}

const variantLink = defineStyle({
  borderColor: "transparent",
  fontWeight: 700,
  textDecor: "underline",
  py: 0,
  px: 1,
  _active: {
    color: "primary.base",
  },
})

const sizes = {
  md: defineStyle({
    py: "2",
    px: "4",
    [ICON_SELECTOR]: {
      fontSize: "2xl",
    },
  }),
  sm: defineStyle({
    fontSize: "xs",
    py: "1.5",
    px: "2",
    [ICON_SELECTOR]: {
      fontSize: "md",
    },
  }),
}

const variants = {
  solid: variantSolid,
  outline: variantOutline,
  ghost: variantGhost,
  link: variantLink,
}

export const Button = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "solid",
  },
})
