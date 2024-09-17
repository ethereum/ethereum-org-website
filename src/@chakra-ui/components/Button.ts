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
  // Sizing and positioning classes:
  borderRadius: "base",
  border: "1px",
  fontWeight: "normal",
  lineHeight: "1.6",
  transitionProperty: "common",
  transitionDuration: "normal",
  whiteSpace: "normal",
  p: "unset",
  // Base default styling is "outline" pattern, primary color for text, border matches, no bg
  borderColor: "currentColor",
  color: "primary.base",
  // Hover: Default hover adds box-shadow, text (border) to --primary-hover
  _hover: {
    color: "primary.hover",
    boxShadow: "buttonHover",
  },
  // Focus: Add 4px outline to all buttons, --primary-hover
  _focusVisible: {
    outline: "4px solid",
    outlineColor: "primary.hover",
    outlineOffset: -1,
  },
  // Active: text (border) to --primary-hover instead of primary, hide shadow
  _active: {
    color: "primary.hover",
    boxShadow: "none",
  },
  // Disabled: Pointer events none, text (border) to --disabled
  _disabled: {
    color: "disabled",
    pointerEvents: "none",
  },
  // isSecondary: Switch text (border) to --body instead of --primary
  "&[data-secondary='true']": {
    color: "body.base",
  },
  "&.chakra-link": {
    textDecoration: "none",
    _hover: {
      textDecoration: "none",
    },
  },
  [ICON_SELECTOR]: {
    flexShrink: 0,
  },
})

const variantSolid = defineStyle({
  color: "white",
  bg: "primary.action",
  borderColor: "transparent !important",
  _hover: {
    color: "white !important",
    bg: "primary.actionHover",
  },
  _active: {
    bg: "primary.actionHover",
  },
  _disabled: {
    bg: "disabled",
    color: "background.base",
  },
})

const variantOutline = defineStyle({}) // "outline" is base styling above

const variantGhost = {
  borderColor: "transparent",
  _hover: { shadow: "none" },
}

const variantLink = defineStyle({
  borderColor: "transparent",
  // fontWeight: 700, // TODO: Not in DS; confirm then remove
  _hover: { shadow: "none" },
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
