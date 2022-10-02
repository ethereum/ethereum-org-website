import { PartsStyleObject } from "@chakra-ui/react"
import type { ComponentMultiStyleConfig } from "@chakra-ui/theme"

const baseStyleControl = {
  bg: "background",
  border: {},
  _checked: {
    bg: "primary400",
    _hover: null,
  },
  _focusVisible: null,
  // pointerEvents: "none",
}

const baseStyleContainer = {
  border: "1px",
  borderColor: "black50",
  borderRadius: "3px",
  transition: "all 150ms",
  pointerEvents: "none",
}

const baseStyleLabel = {
  _hover: {
    boxShadow: "tableItemBoxShadow",
    border: "1px",
    borderStyle: "solid",
    borderColor: "primary600",
    transition: "transform 0.1s",
    transform: "scale(1.02)",
  },
  // pointerEvents: "none",
  class: "pippo",
}

const baseStyleInput = {
  pointerEvents: "none",
  class: "pippo",
}

export const Checkbox: ComponentMultiStyleConfig = {
  // icon: baseStyleIcon,
  // container: baseStyleContainer,
  // label: baseStyleLabel,
  parts: ["control", "container", "label", "input"],
  baseStyle: {
    control: baseStyleControl,
    container: baseStyleContainer,
    label: baseStyleLabel,
    input: baseStyleInput,
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
