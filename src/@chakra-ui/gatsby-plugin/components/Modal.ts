import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { modalAnatomy } from "@chakra-ui/anatomy"
import { defineMergeStyles, modalDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const {
  baseStyle: defaultBaseStyle,
  sizes: defaultSizes,
  defaultProps,
} = modalDefaultTheme

// Remove all the comment line once the review is completed & PR will able to merge

/* const variantCode = definePartsStyle((props) => ({
 
})) */

export const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) =>
    defineMergeStyles(defaultBaseStyle?.(props), {
      overlay: {
        bg: "rgba(0, 0, 0, 0.7)",
      },
      dialog: {
        size: "2xl",
        /* maxW: "464px", */
        my: "64px",
        mx: "8px",
        padding: "32px",
        maxHeight: "70%",
        borderRadius: "4px",
      },
      header: {
        /* bg: props.colorMode === "dark" ? "rgb(25, 25, 25)" : "rgb(247, 247, 247)", */
        borderColor:
          props.colorMode == "dark" ? "rgb(242, 242, 242)" : "rgb(51, 51, 51)",
        /* borderTop: "1px solid",
        borderBottom: "1px solid", */
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "2xl",
        fontFamily: "Inter",
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
        right: 4,
        bottom: 4,
      },
      body: {
        padding: 0,
        fontWeight: "normal",
        fontSize: "md",
        fontFamily: "Inter",
      },
    })
  ),
  sizes: defaultSizes,
  /* variants: {
    code: variantCode,
  }, */
  defaultProps: {
    ...defaultProps,
    variant: undefined,
  },
})
