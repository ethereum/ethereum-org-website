import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
    borderRadius: "base",
    _hover: {
      textDecoration: "none",
      boxShadow: "primary",
    },
    _focus: {
      boxShadow: "outline",
    },
  },
  sizes: {
    md: {
      h: 42,
    },
  },
  variants: {
    // solid is the default variant used by chakra
    solid: {
      color: "buttonColor",
      bg: "primary",
      border: 0,
      _hover: {
        bg: "primary",
        opacity: 0.8,
      },
      _active: {
        bg: "primaryHover",
      },
      _disabled: {
        bg: "disabled",
        opacity: 1,
      },
    },
    outline: {
      border: "1px",
      color: "text",
      bg: "transparent",
      borderColor: "text",
      _hover: {
        color: "primary",
        bg: "transparent",
        borderColor: "primary",
      },
      _active: {
        color: "primary",
        bg: "primaryLight",
        borderColor: "primary",
      },
      _disabled: {
        color: "disabled",
        borderColor: "disabled",
        opacity: 1,
      },
    },
    "outline-color": {
      border: "1px",
      color: "primary",
      bg: "transparent",
      borderColor: "primary",
      _hover: {
        color: "primary",
        bg: "transparent",
        borderColor: "primary",
      },
      _active: {
        color: "primary",
        bg: "primaryLight",
        borderColor: "primary",
      },
      _disabled: {
        color: "disabled",
        borderColor: "disabled",
        opacity: 1,
      },
    },
  },
}
