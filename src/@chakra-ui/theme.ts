import {
  extendBaseTheme,
  type ThemeConfig,
  type ThemeOverride,
} from "@chakra-ui/react"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import foundations from "./foundations"

// Component style overrides
import components from "./components"

import semanticTokens from "./semanticTokens"

const config: ThemeConfig = {
  cssVarPrefix: "eth",
  initialColorMode: "light",
  useSystemColorMode: true,
}

/**
 * Override default styles with our custom theme.
 *
 * The complete list of default Chakra styles can be found here:
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src
 */
const theme: ThemeOverride = {
  config,
  styles,
  ...foundations,
  semanticTokens,
  components,
}

export default extendBaseTheme(theme)
