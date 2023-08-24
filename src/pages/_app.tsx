import type { AppProps } from "next/app"
// ChakraProvider import updated as recommended on https://github.com/chakra-ui/chakra-ui/issues/4975#issuecomment-1174234230
// to reduce bundle size. Should be reverted to "@chakra-ui/react" in case on theme issues
import { ChakraProvider } from "@chakra-ui/provider"

// Chakra custom theme
import theme from "@/@chakra-ui/theme"

// Fonts
import { inter, mono } from "@/lib/fonts"

// Layouts
import { RootLayout } from "@/layouts"

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
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </>
  )
}

export default App
