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
      dialog: {
        bg: "background.base",
        gap: "4",
        padding: "8",
        borderRadius: "base",
        boxShadow: "none",
      },
      header: {
        padding: "0",
        fontWeight: "bold",
        fontSize: "2xl",
        minHeight: "6",
        me: "8",
      },
      closeButton: {
        boxSize: "8",
        color: "body.base",
        top: "8",
        insetInlineEnd: "8",
      },
      body: {
        padding: "0",
        fontWeight: "normal",
        fontSize: "md",
      },
      footer: {
        gap: "2",
        px: "0",
        pt: "8",
        pb: "0",
      },
    })
  ),
  sizes: defaultSizes,

  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
