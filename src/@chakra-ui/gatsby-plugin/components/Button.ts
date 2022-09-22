import type { ComponentStyleConfig } from "@chakra-ui/theme"

const commonOutline = {
  border: "1px",
  color: "text",
  bg: "transparent",
  borderColor: "text",
  _hover: {
    color: "primary",
    bg: "background",
    borderColor: "primary",
  },
  _active: {
    color: "primary",
    bg: "primaryLight",
    borderColor: "primary",
  },
  _focus: {
    color: "primary",
    borderColor: "background",
  },
  _disabled: {
    color: "disabled",
    borderColor: "disabled",
    opacity: 1,
  },
}

const quizButton = {
  width: "100%",
  whiteSpace: "inherit",
  justifyContent: "start",
  marginBottom: "16px",
  bg: "quizButton",
  border: "1px",
  borderColor: "transparent",
  _hover: {
    borderColor: "primary",
    boxSizing: "border-box",
  },
  _focus: {
    borderColor: "transparent",
    boxShadow: "none",
  },
  _active: {
    bg: "primary",
    color: "buttonColor",
  },
}

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
      outline: 0,
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
      ...commonOutline,
    },
    "outline-color": {
      ...commonOutline,
      color: "primary",
      borderColor: "primary",
    },
    quizButton: {
      ...quizButton,
    },
  },
}
