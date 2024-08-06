import { accordionAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    "& > :is(h2, h3)": {
      fontSize: "initial",
      fontWeight: "initial",
    },
  },
  button: {
    py: "2",
    px: { base: "2", md: "4" },
    gap: "2",
    _hover: { bg: "background.highlight", color: "primary.hover" },
    _focusVisible: {
      outline: "4px solid",
      outlineColor: "primary.hover",
      outlineOffset: -1,
      bg: "background.highlight",
      color: "primary.hover",
      borderRadius: "base",
    },
    _expanded: {
      bg: "background.highlight",
      color: "primary.highContrast",
      svg: { transform: "rotate(180deg)" },
    },
  },
  panel: {
    mt: "2",
    p: { base: 2, md: 4 },
    fontSize: "sm",
  },
  icon: {
    fontSize: "2xl",
    transform: "rotate(270deg)",
  },
})

export const Accordion = defineMultiStyleConfig({
  baseStyle,
})
