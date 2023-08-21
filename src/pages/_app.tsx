import type { AppProps } from "next/app"
// ChakraProvider import updated as recommended on https://github.com/chakra-ui/chakra-ui/issues/4975#issuecomment-1174234230
// to reduce bundle size. Should be reverted to "@chakra-ui/react" in case on theme issues
import { ChakraProvider } from "@chakra-ui/provider"
import { Inter } from "next/font/google"
import { IBM_Plex_Mono } from "next/font/google"

// Chakra custom theme
import theme from "@/@chakra-ui/theme"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  fallback: ["sans-serif"],
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  fallback: ["Courier", "monospace"],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
