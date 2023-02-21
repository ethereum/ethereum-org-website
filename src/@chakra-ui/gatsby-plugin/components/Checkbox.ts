import type { ComponentMultiStyleConfig } from "@chakra-ui/theme"

const baseStyleControl = {
  bg: "background",
  _checked: {
    bg: "primary400",
    _hover: {
      bg: "primary400",
      borderColor: "primary600",
    },
    borderColor: "black50",
  },
  border: "1px",
  borderColor: "black50",
  borderRadius: "3px",
  transition: "all 150ms",
  _focusVisible: {
    boxShadow: "none",
  },
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
      },
      icon: {
        fontSize: "md",
      },
    },
  },
  variants: {
    alignTop: {
      control: {
        mt: "0.25rem",
      },
    },
  },
  defaultProps: {
    size: "md",
  },
}
