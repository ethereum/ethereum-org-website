import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Link: ComponentStyleConfig = {
  baseStyle: {
    color: "primary",
    textDecoration: "underline",
    _focus: {
      boxShadow: "none",
      outline: "1px solid",
      outlineColor: "primary",
      outlineOffset: "2px",
    },
  },
}
