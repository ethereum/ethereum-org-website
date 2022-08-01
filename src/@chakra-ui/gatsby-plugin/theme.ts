import {
  extendTheme,
  type ThemeConfig,
  type ThemeOverride,
} from "@chakra-ui/react"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import foundations from "./foundations"

// Component style overrides
import Link from "./components/Link"

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
  components: {
    Link,
  },
}

export default extendTheme(theme)
