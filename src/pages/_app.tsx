import { useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { NextIntlClientProvider } from "next-intl"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { init } from "@socialgouv/matomo-next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AppPropsWithLayout } from "@/lib/types"

import ThemeProvider from "@/components/ThemeProvider"

import { DEFAULT_LOCALE } from "@/lib/constants"

import "@/styles/global.css"

import { FeedbackWidgetProvider } from "@/contexts/FeedbackWidgetContext"
import { BaseLayout } from "@/layouts/BaseLayout"

// Dynamically import Wagmi/RainbowKit components
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
})

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()

  useEffect(() => {
    if (!process.env.IS_PREVIEW_DEPLOY) {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL!,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
      })
    }
  }, [])

  // Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <NextIntlClientProvider
      locale={(router.query.locale as string) || DEFAULT_LOCALE}
      messages={pageProps.messages || {}}
      onError={() => {
        // Suppress errors by default, enable if needed to debug
        // console.error(error)
      }}
      getMessageFallback={({ key }) => {
        const keyOnly = key.split(".").pop()
        return keyOnly || key
      }}
    >
      <ThemeProvider>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <WalletProviders locale={router.query.locale as string}>
              <FeedbackWidgetProvider>
                <BaseLayout
                  // contentIsOutdated={!!pageProps.frontmatter?.isOutdated}
                  // contentNotTranslated={pageProps.contentNotTranslated}
                  lastDeployLocaleTimestamp={
                    pageProps.lastDeployLocaleTimestamp
                  }
                >
                  {getLayout(<Component {...pageProps} />)}
                </BaseLayout>
              </FeedbackWidgetProvider>
            </WalletProviders>
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default App
