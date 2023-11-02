import { ColorModeScript } from "@chakra-ui/react"
import { Html, Head, Main, NextScript } from "next/document"

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
