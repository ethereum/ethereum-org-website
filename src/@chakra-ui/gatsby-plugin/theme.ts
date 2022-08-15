import {
  extendTheme,
  type ThemeConfig,
  type ThemeOverride,
} from "@chakra-ui/react"

import { cssVarPrefix } from "./constants"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import foundations from "./foundations"

// Component style overrides
import * as components from "./components"

import semanticTokens from "./semanticTokens"

const config: ThemeConfig = {
  cssVarPrefix,
  initialColorMode: "light",
  useSystemColorMode: true,
}

const theme: ThemeOverride = {
  config,
  styles,
  ...foundations,
  semanticTokens,
  components,
}

export default extendTheme(theme)
