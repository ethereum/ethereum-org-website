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
  // TODO: fonts object to be removed (it'll now be in the 'foundation' directory)
  fonts: {
    // old fonts from the previous theme
    // TODO: update the fonts when we transition to the Design System
    heading:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    body: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    monospace:
      "SFMono-Regular, Consolas, 'Roboto Mono', 'Droid Sans Mono', 'Liberation Mono', Menlo, Courier, monospace",
  },
  styles,
  ...foundations,
  semanticTokens,
  components,
}

export default extendBaseTheme(theme)
