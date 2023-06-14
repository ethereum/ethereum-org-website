import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { menuAnatomy } from "@chakra-ui/anatomy"
import { menuDefaultTheme, defineMergeStyles } from "./components.utils"

const { baseStyle: defaultBaseStyle } = menuDefaultTheme

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle(
  defineMergeStyles(defaultBaseStyle, {
    list: {
      py: 2,
      borderRadius: "base",
      border: "1px",
      borderColor: "text",
      bg: "dropdownBackground",
    },
    item: {
      p: 2,
      textAlign: "center",
      justifyContent: "center",
      _hover: {
        color: "primary",
        bg: "dropdownBackgroundHover",
      },
      _focus: {
        color: "primary",
        bg: "dropdownBackgroundHover",
      },
    },
  })
)

export const Menu = defineMultiStyleConfig({
  ...menuDefaultTheme,
  baseStyle,
})
