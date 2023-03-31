import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
} from "@chakra-ui/react"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(["trigger", "triggerIcon", "content", "option"])

const $borderBaseWidth = cssVar("border-base-width")

const baseStyleTrigger = defineStyle({
  [$borderBaseWidth.variable]: "1px",
  borderColor: "currentColor",
  borderStyle: "solid",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 4,
  p: 2,
  width: "full",
  _active: {
    bg: "primaryLowContrast",
    boxShadow: "none",
  },
  _hover: {
    boxShadow: "buttonHover",
    color: "primary",
  },
  _focusVisible: {
    outline: "3px solid",
    outlineColor: "primaryHover",
  },
  _expanded: {
    bg: "backgroundHighlight",
    color: "primary",
    boxShadow: "buttonHover",
    outline: "none",
  },
})

const baseStyleTriggerIcon = defineStyle({
  "[data-expanded] > &": {
    transform: "rotate(180deg)",
  },
})

const baseStyleContent = defineStyle({
  listStyle: "none",
  bg: "backgroundHighlight",
  width: "var(--reference-width)",
  boxShadow: "buttonHover",
  borderRadius: "base",
  borderTopRadius: "none",
  color: "primary",
  m: 0,
})

const baseStyleOption = defineStyle({
  p: 2,
  m: 0,
  cursor: "pointer",
  "&[aria-selected='true'], &:hover": {
    bg: "primaryHover",
    color: "primaryLowContrast",
  },
  "&[data-focus]": {
    outline: "3px solid",
    outlineColor: "primaryHover",
    outlineOffset: -3,
  },
})

const baseStyle = definePartsStyle({
  trigger: baseStyleTrigger,
  triggerIcon: baseStyleTriggerIcon,
  content: baseStyleContent,
  option: baseStyleOption,
})

const variantOutline = definePartsStyle({
  trigger: {
    borderRadius: "base",
    borderWidth: $borderBaseWidth.reference,
    _expanded: {
      borderBottomColor: "transparent",
      borderBottomRadius: 0,
    },
  },
  content: {
    border: "1px",
    borderColor: "currentColor",
    borderTop: "0",
  },
})
const variantFlushed = definePartsStyle({
  trigger: {
    borderTopRadius: "base",
    borderBottomWidth: $borderBaseWidth.reference,
  },
  content: {
    borderTop: "1px",
    borderColor: "currentColor",
  },
})

const variants = {
  outline: variantOutline,
  flushed: variantFlushed,
}

export const Dropdown = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "outline",
  },
})
