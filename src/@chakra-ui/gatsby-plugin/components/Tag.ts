import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Tag: ComponentStyleConfig = {
  baseStyle: {
    container: {
      display: "flex",
      alignItems: "center",
      bgImage:
        "radial-gradient(46.28% 66.31% at 66.95% 58.35%,rgba(127, 127, 213, 0.2) 0%,rgba(134, 168, 231, 0.2) 50%,rgba(145, 234, 228, 0.2) 100%)",
      mb: 2,
      mr: 2,
      p: 2,
      borderRadius: "base",
      textTransform: "uppercase",
      fontSize: "sm",
      fontWeight: "normal",
      boxShadow: "table",
      border: "1px solid",
      borderColor: "white800",
      cursor: "pointer",
      opacity: "0.7",
      color: "text",
      _hover: {
        color: "primary",
        borderColor: "text200",
        opacity: "1",
      },
    },
  },
  variants: {
    active: {
      container: {
        borderColor: "primary300",
        opacity: "1",
        boxShadow: "none",
      },
    },
    custom: {}, // empty variant
  },
}
