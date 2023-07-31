import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

// Chakra custom theme
import theme from "@/@chakra-ui/theme"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
