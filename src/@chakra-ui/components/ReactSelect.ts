import { createMultiStyleConfigHelpers, cssVar } from "@chakra-ui/react"

import { reactSelectAnatomyKeys } from "@/components/Select/innerComponents"

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
  },
  control: {
    border: $borderBaseWidth.reference,
    borderColor: "currentColor",
    outlineOffset: "-2px",
    p: 2,
    gap: 4,
    _hover: {
      color: "primary.base",
      borderColor: "primary.lowContrast",
    },
    "&[data-expanded=true]": {
      bg: "background.highlight",
      color: "primary.base",
      borderColor: "primary.lowContrast",
    },
    "&:focus-within:not([data-expanded=true])": {
      outline: "3px solid",
      outlineColor: "primary.hover",
      borderColor: "transparent",
    },
  },
  groupHeading: {
    color: "body.medium",
  },
  indicatorIcon: {
    fontSize: "sm",
    transitionProperty: "common",
    transitionDuration: "normal",
    "*[data-expanded=true] &": {
      transform: "rotate(180deg)",
    },
  },
  menuList: {
    bg: "background.highlight",
    w: "full",
    maxH: "xs",
    overflowY: "auto",
  },
  option: {
    color: "body.base",
    p: 2,
    "&[data-focused=true]": {
      bg: "primary.lowContrast",
      color: "primary.base",
    },
    "&[data-active=true]": {
      bg: "body.light",
      color: "primary.visited",
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
    borderTopColor: "transparent",
    borderInlineColor: "transparent",
    _hover: {
      borderTopColor: "transparent",
      borderInlineColor: "transparent",
    },
    "&[data-expanded=true]": {
      borderColor: "body.light",
      borderBottomColor: "primary.base",
    },
  },
  menuList: {
    borderInline: $borderBaseWidth.reference,
    borderBottom: $borderBaseWidth.reference,
    borderColor: "body.light",
    borderBottomRadius: "base",
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
    "&[data-expanded=true]": {
      borderBottomColor: "transparent",
      borderBottomRadius: "none",
    },
  },
  menuList: {
    borderInline: $borderBaseWidth.reference,
    borderBottom: $borderBaseWidth.reference,
    borderColor: "primary.lowContrast",
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
