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

const getBaseColor = (isSecondary: boolean) =>
  !isSecondary ? "primary" : "body"

const baseStyle = defineStyle((props) => ({
  borderRadius: "base",
  color: getBaseColor(props.isSecondary),
  transitionProperty: "common",
  transitionDuration: "normal",
  whiteSpace: "normal",
  _focusVisible: {
    outline: "4px solid",
    outlineColor: "primaryHover",
    outlineOffset: -1,
  },
  _disabled: {
    color: "disabled",
    pointerEvents: "none",
  },
  _hover: {
    color: "primaryHover",
  },
  p: {
    m: 0,
  },
}))

const HOVER_BOX_SHADOW = "buttonHover"

const variantSolid = defineStyle({
  color: "background",
  bg: "primary",
  _hover: {
    color: "background",
    bg: "primaryHover",
    boxShadow: HOVER_BOX_SHADOW,
  },
  _active: {
    boxShadow: "none",
  },
})

const variantOutline = defineStyle({
  border: "1px",
  _hover: {
    boxShadow: HOVER_BOX_SHADOW,
  },
  _active: {
    boxShadow: "none",
  },
})

const variantGhost = {}

const variantLink = defineStyle({
  color: "primary",
  fontWeight: 700,
  textDecor: "underline",
  py: 0,
  px: 1,
  _active: {
    color: "primary",
  },
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

const sizes = {
  md: {
    py: "2 !important",
    px: "4 !important",
    [ICON_SELECTOR]: {
      fontSize: "2xl",
    },
  },
  sm: {
    fontSize: "xs",
    py: "1.5 !important",
    px: "2 !important",
    lineHeight: "3xs",
    [ICON_SELECTOR]: {
      fontSize: "md",
    },
  },
}

const variants = {
  solid: variantSolid,
  outline: variantOutline,
  ghost: variantGhost,
  link: variantLink,
  icon: variantIcon,
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
