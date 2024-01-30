import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/react"

import { reactSelectAnatomyKeys } from "@/components/ReactSelect/innerComponents"

const $borderBaseWidth = cssVar("border-base-width")

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(reactSelectAnatomyKeys)

const baseStyle = definePartsStyle({
  container: {
    [$borderBaseWidth.variable]: "borders.1px",
    w: "full",
    minH: 10.5,
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
    "& > .react-select__menu": {
      zIndex: -1,
    },
    _hover: {
      boxShadow: "buttonHover",
    },
    "&[data-expanded=true]": {
      boxShadow: "buttonHover",
    },
  },
  control: {
    borderColor: "currentColor",
    p: 2,
    gap: 4,
    _hover: {
      color: "primary.base",
    },
    "&[data-expanded=true]": {
      bg: "background.highlight",
      color: "primary.base",
    },
    "&:focus-within:not([data-expanded=true])": {
      outline: "3px solid",
      outlineColor: "primary.hover",
    },
  },
  indicatorIcon: {
    transitionProperty: "common",
    transitionDuration: "normal",
    "*[data-expanded=true] &": {
      transform: "rotate(180deg)",
    },
  },
  menuList: {
    bg: "background.highlight",
    w: "full",
    boxShadow: "buttonHover",
    maxH: "xs",
    overflowY: "scroll",
  },
  option: {
    color: "primary.base",
    p: 2,
    "&[data-focused=true], &[data-active=true]": {
      bg: "primary.hover",
      color: "primary.lowContrast",
    },
  },
})

const $borderTopRadius = cssVar("border-top-radius")

const variantFlushed = definePartsStyle({
  container: {
    [$borderTopRadius.variable]: "radii.base",
    borderTopRadius: $borderTopRadius.reference,
  },
  control: {
    borderTopRadius: $borderTopRadius.reference,
    borderBottom: $borderBaseWidth.reference,
  },
})

const $borderOutlineRadius = cssVar("border-outline-radius")

const variantOutline = definePartsStyle({
  container: {
    [$borderOutlineRadius.variable]: "radii.base",
    borderRadius: $borderOutlineRadius.reference,
  },
  control: {
    borderRadius: $borderOutlineRadius.reference,
    border: $borderBaseWidth.reference,
    "&[data-expanded=true]": {
      borderBottomColor: "transparent",
      borderBottomRadius: "none",
    },
  },
  menuList: {
    borderInline: $borderBaseWidth.reference,
    borderBottom: $borderBaseWidth.reference,
    borderColor: "primary.base",
    borderBottomRadius: "base",
  },
})

const variants = {
  flushed: variantFlushed,
  outline: variantOutline,
}

export const ReactSelect = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "flushed",
  },
})
