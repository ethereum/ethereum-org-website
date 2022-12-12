import { ComponentStyleConfig, SystemStyleObject } from "@chakra-ui/react"

const variantPrimary: SystemStyleObject = {
  background: "primary100",
  color: "black300",
}

const variantSecondary: SystemStyleObject = {
  border: "1px solid",
  borderColor: "primary100",
}

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    background: "transparent",
    borderRadius: "base",
    fontWeight: "initial",
    py: 1,
    px: 2,
    textTransform: "uppercase",
  },
  variants: {
    primary: variantPrimary,
    secondary: variantSecondary,
  },
  defaultProps: {
    variant: "primary",
  },
}
