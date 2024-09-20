import { extendBaseTheme, type ThemeConfig } from "@chakra-ui/react"

import components from "./components"
import foundations from "./foundations"
import semanticTokens from "./semanticTokens"

const config: ThemeConfig = {
  cssVarPrefix: "eth",
  initialColorMode: "light",
  /**
   * Disable Chakra's system color subscription, as it works differently from
   * `next-themes` and causes a desync with it.
   *
   * Chakra will always change the color mode based on the system preference.
   * While `next-themes` will only change to the system preference if the user
   * has `system` as their active theme.
   */
  useSystemColorMode: false,
}

/**
 * Override default styles with our custom theme.
 *
 * The complete list of default Chakra styles can be found here:
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src
 */
const theme = {
  config,
  ...foundations,
  semanticTokens,
  components,
}

export default extendBaseTheme(theme)
