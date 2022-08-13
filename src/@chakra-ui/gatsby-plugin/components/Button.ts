import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
    _hover: {
      textDecoration: "none",
      boxShadow: "primary",
    },
  },
  variants: {
    // solid is the default variant used by chakra
    solid: {
      color: "buttonColor",
      bg: "primary",
      border: "1px",
      borderColor: "transparent",
      _hover: {
        bg: "primaryHover",
      },
      _active: {
        bg: "primaryActive",
      },
    },
    // custom secondary variant
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
  },
}
