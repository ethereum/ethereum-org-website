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
  !isSecondary ? "primary.base" : "body.base"

const baseStyle = defineStyle((props) => ({
  borderRadius: "base",
  border: "1px",
  color: getBaseColor(props.isSecondary),
  lineHeight: "1.6",
  transitionProperty: "common",
  transitionDuration: "normal",
  whiteSpace: "normal",
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
}))

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
  color: "primary.base",
  fontWeight: 700,
  textDecor: "underline",
  py: 0,
  px: 1,
  _active: {
    color: "primary.base",
  },
})

/**
 * @deprecated This is no longer needed. Styling for just the icon is not
 * unique compared to the variants used for text (as of the new DS)
 */
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
