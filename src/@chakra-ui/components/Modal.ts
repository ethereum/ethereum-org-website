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

const variantCode = definePartsStyle((props) => ({
  overlay: {
    bg: "rgba(0, 0, 0, 0.7)",
  },
  dialog: {
    maxW: "100vw",
    marginTop: "auto",
    marginBottom: 0,
    maxHeight: "50%",
    borderRadius: 0,
  },
  header: {
    bg: props.colorMode === "dark" ? "rgb(25, 25, 25)" : "rgb(247, 247, 247)",
    borderColor:
      props.colorMode == "dark" ? "rgb(242, 242, 242)" : "rgb(51, 51, 51)",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    textTransform: "uppercase",
    fontWeight: "normal",
    fontSize: "md",
    fontFamily: "monospace",
  },
  closeButton: {
    padding: 0,
    width: "24px",
    height: "24px",
    borderRadius: 0,
    color: "rgb(178, 178, 178)",
    fontSize: "sm",
    margin: 0,
    top: 4,
    insetInlineEnd: 4,
    bottom: 4,
  },
  body: {
    padding: 0,
  },
}))

export const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) =>
    defineMergeStyles(defaultBaseStyle?.(props), {
      dialog: {
        my: 0,
      },
    })
  ),
  sizes: defaultSizes,
  variants: {
    code: variantCode,
  },
  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
