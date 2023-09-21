import { inputAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { defineMergeStyles, inputDefaultTheme } from "./components.utils"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle((props) => {
  const {
    focusBorderColor: fc = "primaryHover",
    errorBorderColor: ec = "errorOutline",
  } = props

  return defineMergeStyles(
    inputDefaultTheme.baseStyle,
    inputDefaultTheme.variants?.outline(props),
    {
      field: {
        borderColor: "currentColor",
        borderRadius: "base",
        outline: "3px solid transparent",
        lineHeight: 1,
        _placeholder: {
          color: "disabled",
          opacity: 1,
        },
        _focusVisible: {
          outlineColor: fc,
          outlineOffset: "-1px",
          borderColor: "transparent",
          boxShadow: "none",
        },
        _hover: null, // override default
        _groupHover: {
          borderColor: "primary.hover",
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
          _active: {
            bg: "background.highlight",
            borderColor: "primary.highContrast",
          },
        },
      },
      element: {
        fontSize: "2xl",
        transitionProperty: "common",
        transitionDuration: "normal",
        _groupHover: {
          color: "primary.hover",
        },
        _peerFocusVisible: {
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
          color: "primary.dark",
          _dark: {
            color: "primary.highContrast",
          },
        },
      },
    }
  )
})

const size = {
  md: defineStyle({
    h: 10.5,
    px: 2,
  }),
  sm: defineStyle({
    h: 8,
    px: 1,
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    element: size.md,
  }),
  sm: definePartsStyle({
    field: { ...size.sm, fontSize: "sm" },
    element: {
      ...size.sm,
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
