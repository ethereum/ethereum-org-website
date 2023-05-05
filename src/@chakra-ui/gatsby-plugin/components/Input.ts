import { inputAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { calc } from "@chakra-ui/theme-tools"
import { defineMergeStyles, inputDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const {
    focusBorderColor: fc = "primary",
    errorBorderColor: ec = "errorOutline",
  } = props

  return defineMergeStyles(
    inputDefaultTheme.baseStyle,
    inputDefaultTheme.variants?.outline(props),
    {
      field: {
        borderColor: "body",
        borderRadius: "base",
        _placeholder: {
          color: "disabled",
          opacity: 1,
        },
        _focusVisible: {
          borderColor: fc,
          boxShadow: "none",
        },
        _hover: null, // override default
        _groupHover: {
          borderColor: "primaryHover",
        },
        _invalid: {
          borderColor: ec,
          boxShadow: "none",
        },
        _disabled: {
          borderColor: "disabled",
          opacity: 1,
        },
        "&:not(:disabled)": {
          _hover: {
            borderColor: "primaryHover",
          },
          _active: {
            bg: "backgroundHighlight",
            borderColor: "primaryHighContrast",
          },
        },
      },
      element: {
        transitionProperty: "common",
        transitionDuration: "normal",
        _groupHover: {
          color: "primaryHover",
        },
        _peerFocus: {
          color: fc,
          _peerInvalid: {
            color: ec,
          },
          _peerDisabled: {
            color: "disabled",
          },
        },
        _peerDisabled: {
          color: "disabled",
        },
        "[data-peer]:not(:disabled):active ~ &": {
          color: "primaryDark",
          _dark: {
            color: "primaryHighContrast",
          },
        },
      },
    }
  )
})

const size = {
  md: defineStyle({
    h: 10.5,
    px: 9,
  }),
  sm: defineStyle({
    fontSize: "sm",
    h: 8,
    px: 1,
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    element: {
      fontSize: "2xl",
    },
  }),
  sm: definePartsStyle({
    field: size.sm,
    element: {
      fontSize: "xl",
    },
  }),
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    variant: "outline",
    size: "md",
  },
})
