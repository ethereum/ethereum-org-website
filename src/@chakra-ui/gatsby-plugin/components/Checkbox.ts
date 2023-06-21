import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"
import { checkboxAnatomy } from "@chakra-ui/anatomy"
import { checkboxDefaultTheme, defineMergeStyles } from "./components.utils"

const { baseStyle: defaultBaseStyle } = checkboxDefaultTheme

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyleControl = defineStyle((props) =>
  defineMergeStyles(defaultBaseStyle?.(props).control, {
    bg: "background.base",
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
  })
)

const sizes = {
  md: defineStyle({
    control: {
      h: "1.5rem",
      w: "1.5rem",
    },
    icon: {
      fontSize: "md",
    },
  }),
}

const variantAlignTop = definePartsStyle({
  control: {
    mt: "0.25rem",
  },
})

export const Checkbox = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => ({
    ...defaultBaseStyle?.(props),
    control: baseStyleControl(props),
  })),
  sizes,
  variants: {
    // TODO: remove this variant
    alignTop: variantAlignTop,
  },
  defaultProps: {
    size: "md",
  },
})
