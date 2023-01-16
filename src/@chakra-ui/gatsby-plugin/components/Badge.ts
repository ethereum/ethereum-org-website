import { ComponentStyleConfig, SystemStyleObject } from "@chakra-ui/react"

const variantSecondary: SystemStyleObject = {
  borderColor: "primary100",
  color: "text",
}

const variantSolid: SystemStyleObject = {
  color: "black300",
  background: "primary100",
}

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "base",
    border: "1px solid",
    borderColor: "transparent",
    fontWeight: "initial",
    py: 1,
    px: 2,
    textTransform: "uppercase",
  },
  variants: {
    solid: variantSolid,
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
    variant: "solid",
  },
}
