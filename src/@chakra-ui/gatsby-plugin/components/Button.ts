import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
    borderRadius: "base",
    _hover: {
      textDecoration: "none",
      boxShadow: "primary",
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
        bg: "primaryActive",
      },
    },
    outline: {
      color: "text",
      bg: "transparent",
      borderColor: "text",
      _hover: {
        color: "primary",
        bg: "transparent",
        border: "1px",
        borderColor: "primary",
      },
      _active: {
        bg: "secondaryButtonBackgroundActive",
      },
    },
    "outline-color": {
      color: "primary",
      bg: "transparent",
      borderColor: "primary",
      _hover: {
        color: "primary",
        bg: "transparent",
        border: "1px",
        borderColor: "primary",
      },
      _active: {
        bg: "secondaryButtonBackgroundActive",
      },
    },
  },
}
