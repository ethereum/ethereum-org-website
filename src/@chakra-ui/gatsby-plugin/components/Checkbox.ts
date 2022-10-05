import type { ComponentMultiStyleConfig } from "@chakra-ui/theme"

const baseStyleControl = {
  bg: "background",
  _checked: {
    bg: "primary400",
    _hover: null,
  },
  border: "1px",
  borderColor: "black50",
  borderRadius: "3px",
  transition: "all 150ms",
  _focusVisible: null,
  _hover: {
    boxShadow: "tableItemBoxShadow",
    border: "1px",
    borderStyle: "solid",
    borderColor: "primary600",
    transition: "transform 0.1s",
    transform: "scale(1.02)",
  },
}

export const Checkbox: ComponentMultiStyleConfig = {
  parts: ["control"],
  baseStyle: {
    control: baseStyleControl,
  },
  sizes: {
    md: {
      control: {
        h: "1.5rem",
        w: "1.5rem",
        minW: "1.5rem",
      },
      icon: {
        fontSize: "md",
      },
    },
  },
  defaultProps: {
    size: "md",
  },
}
