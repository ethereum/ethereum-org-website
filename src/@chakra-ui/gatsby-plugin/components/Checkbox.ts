import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    bg: "background",
    border: "1px",
    borderColor: "black50",
    borderRadius: "3px",
    transition: "all 150ms",
    iconColor: "primary400",
    _hover: {
      boxShadow: "tableItemBoxShadow",
      border: "1px",
      borderStyle: "solid",
      borderColor: "primary600",
      transition: "transform 0.1s",
      transform: "scale(1.02)",
    },
  },
  sizes: {
    md: {
      h: "1.5rem",
      w: "1.5rem",
      minW: "1.5rem",
    },
  },
  defaultProps: {
    size: "md",
  },
}
