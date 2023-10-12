import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { tabsAnatomy } from "@chakra-ui/anatomy"
import { tabsDefaultTheme } from "./components.utils"

const { baseStyle, sizes, defaultProps } = tabsDefaultTheme

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const variantPrimary = definePartsStyle({
  tab: {
    borderTopRadius: "0.3rem",
    borderBottom: "1px solid",
    borderBottomColor: "primary.base",
    px: 4,
    py: "0.3rem",
    _selected: {
      color: "background.base",
      bg: "primary.base",
    },
  },
  tabpanels: {
    mt: 4,
  },
  tabpanel: {
    p: 6,
    bg: "ednBackground",
    border: "1px solid",
    borderColor: "lightBorder",
    borderRadius: "lg",
  },
})

export const Tabs = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    primary: variantPrimary,
  },
  defaultProps: {
    ...defaultProps,
    variant: "primary",
  },
})
