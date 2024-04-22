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
        flex: "1",
        padding: "0",
        fontWeight: "bold",
        fontSize: "2xl",
        me: "8",
      },
      closeButton: {
        position: "static",
        color: "body.base",
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
  sizes: {
    ...defaultSizes,
    full: {
      dialog: {
        h: "full",
        minH: "unset",
        maxH: {
          base: "calc(100vh - 1rem)",
          md: "min(calc(100vh - 2rem), 792px)",
        },
        maxW: {
          base: "calc(100vw - 1rem)",
          md: "min(calc(100vw - 2rem), 1000px)",
        },
      },
    },
  },

  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
