import { useRouter } from "next/router"
import { appWithTranslation } from "next-i18next"
// ChakraProvider import updated as recommended on https://github.com/chakra-ui/chakra-ui/issues/4975#issuecomment-1174234230
// to reduce bundle size. Should be reverted to "@chakra-ui/react" in case on theme issues
import { ChakraProvider } from "@chakra-ui/provider"
import { extendBaseTheme } from "@chakra-ui/react"

import customTheme from "@/@chakra-ui/theme"

import { AppPropsWithLayout, Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { inter, mono } from "@/lib/fonts"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  const { locale } = useRouter()

  const theme = extendBaseTheme({
    ...customTheme,
    direction: isLangRightToLeft(locale as Lang) ? "rtl" : "ltr",
  })

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
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  )
}

export default appWithTranslation(App)
