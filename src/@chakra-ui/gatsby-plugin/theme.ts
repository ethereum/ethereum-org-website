import { extendTheme, type ThemeConfig, type Theme } from "@chakra-ui/react"

const config: ThemeConfig = {
  cssVarPrefix: "eth",
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme: Theme = {
  colors: {
    primary: "rebeccapurple",
  },
}

export default extendTheme({ config, theme })
