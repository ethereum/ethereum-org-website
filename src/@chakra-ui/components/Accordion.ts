import { defineStyleConfig } from "@chakra-ui/react"

import { accordionDefaultTheme, defineMergeStyles } from "./components.utils"

export const Accordion = defineStyleConfig({
  baseStyle: defineMergeStyles(accordionDefaultTheme.baseStyle, {
    button: {
      _hover: { bg: "background.highlight", color: "primary.hover" },
      _focus: {
        outline: "4px solid var(--eth-colors-primary-hover)",
        outlineOffset: "-4px",
        bg: "background.highlight",
        color: "primary.hover",
        borderRadius: "md",
      },
      _expanded: { bg: "background.highlight" },
      py: "2",
      px: { base: 2, md: 4 },
    },
    panel: {
      p: { base: 2, md: 4 },
    },
  }),
})
