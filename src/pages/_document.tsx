import { Head, Html, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

import theme from "@/@chakra-ui/theme"

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
