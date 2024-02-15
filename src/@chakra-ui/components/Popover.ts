import { popoverAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys)

const variantResponsive = definePartsStyle({
  popper: {
    minWidth: "unset !important",
    width: "unset",
  },
})

export const Popover = defineMultiStyleConfig({
  variants: {
    responsive: variantResponsive,
  },
})
