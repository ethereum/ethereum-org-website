import {
  extendTheme,
  type ThemeConfig,
  type ThemeOverride,
} from "@chakra-ui/react"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import foundations from "./foundations"

import semanticTokens from "./semanticTokens"

const config: ThemeConfig = {
  cssVarPrefix: "eth",
  initialColorMode: "light",
  useSystemColorMode: true,
}

const theme: ThemeOverride = {
  config,
  styles,
  ...foundations,
  semanticTokens,
}

export default extendTheme(theme)
