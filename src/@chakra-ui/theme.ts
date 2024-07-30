import { extendBaseTheme, type ThemeConfig } from "@chakra-ui/react"

import components from "./components"
import foundations from "./foundations"
import semanticTokens from "./semanticTokens"

const config: ThemeConfig = {
  cssVarPrefix: "eth",
  initialColorMode: "system",
  useSystemColorMode: true,
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
