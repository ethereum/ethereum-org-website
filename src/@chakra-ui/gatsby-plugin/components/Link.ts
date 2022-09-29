import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Link: ComponentStyleConfig = {
  baseStyle: {
    color: "primary",
    textDecoration: "underline",
    _focus: {
      boxShadow: "none",
    },
    _focusVisible: {
      boxShadow: "none",
      outline: "auto",
    },
  },
}
