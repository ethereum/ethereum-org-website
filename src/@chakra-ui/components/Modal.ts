import { modalAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

import { defineMergeStyles, modalDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const {
  baseStyle: defaultBaseStyle,
  sizes: defaultSizes,
  defaultProps,
} = modalDefaultTheme

export const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) =>
    defineMergeStyles(defaultBaseStyle?.(props), {
      overlay: {
        bg: "gray.500",
      },
      dialog: {
        bg: "background.base",
        gap: "4",
        padding: "8",
        maxW: "464px",
        borderRadius: "md",
        boxShadow: "none",
      },
      header: {
        padding: 0,
        fontWeight: "bold",
        fontSize: "2xl",
      },
      closeButton: {
        boxSize: "8",
        color: "body.base",
        top: "8",
        insetInlineEnd: "8",
      },
      body: {
        padding: 0,
        fontWeight: "normal",
        fontSize: "md",
      },
      footer: {
        gap: "8px",
        px: 0,
        pt: 8,
        pb: 0,
      },
    })
  ),
  sizes: defaultSizes,

  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
