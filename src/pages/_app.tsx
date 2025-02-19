import { useEffect } from "react"
import { useRouter } from "next/router"
import { appWithTranslation } from "next-i18next"
import { WagmiProvider } from "wagmi"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { init } from "@socialgouv/matomo-next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AppPropsWithLayout } from "@/lib/types"

import ThemeProvider from "@/components/ThemeProvider"

import "@/styles/global.css"

import { rainbowkitConfig } from "@/config/rainbow-kit"
import { BaseLayout } from "@/layouts/BaseLayout"

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale } = useRouter()

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
    <ThemeProvider>
      <TooltipProvider>
        <WagmiProvider config={rainbowkitConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider locale={locale as Locale}>
              <BaseLayout
                contentIsOutdated={!!pageProps.frontmatter?.isOutdated}
                contentNotTranslated={pageProps.contentNotTranslated}
                lastDeployLocaleTimestamp={pageProps.lastDeployLocaleTimestamp}
              >
                {getLayout(<Component {...pageProps} />)}
              </BaseLayout>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
