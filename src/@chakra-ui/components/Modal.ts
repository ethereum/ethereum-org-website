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
        padding: { base: "4", sm: "8" },
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
        bg: "background.base",
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
    full: definePartsStyle((props) => ({
      dialogContainer: {
        alignItems: { base: "flex-start", md: "center" },
      },
      dialog: {
        padding: { base: "4", sm: "8", md: "16" },
        my: { base: "4", md: props.isCentered ? "auto" : "4" },
        mx: "4",
        minH: {
          base: "calc(100vh - 2rem)",
          md: "min(100vh, 792px)",
        },
        maxW: {
          base: "calc(100vw - 2rem)",
          md: "min(100vw, 1000px)",
        },
      },
    })),
  },

  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
