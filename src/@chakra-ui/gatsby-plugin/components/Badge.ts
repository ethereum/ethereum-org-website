import { ComponentStyleConfig, SystemStyleObject } from "@chakra-ui/react"

const variantSecondary: SystemStyleObject = {
  borderColor: "primary100",
  color: "text",
}

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "base",
    border: "1px solid",
    borderColor: "transparent",
    color: "black300",
    fontWeight: "initial",
    py: 1,
    px: 2,
    textTransform: "uppercase",
  },
  variants: {
    secondary: variantSecondary,
  },
  sizes: {
    sm: {
      py: 0,
    },
    lg: {
      px: 3,
    },
  },
  defaultProps: {
    // Remove the default from Chakra
    variant: "",
  },
}
