import { useEffect } from "react"
import { appWithTranslation } from "next-i18next"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { init } from "@socialgouv/matomo-next"

import { AppPropsWithLayout } from "@/lib/types"

import ThemeProvider from "@/components/ThemeProvider"

import "@/styles/global.css"

import { BaseLayout } from "@/layouts/BaseLayout"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
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
        <BaseLayout
          contentIsOutdated={!!pageProps.frontmatter?.isOutdated}
          contentNotTranslated={pageProps.contentNotTranslated}
          lastDeployLocaleTimestamp={pageProps.lastDeployLocaleTimestamp}
        >
          {getLayout(<Component {...pageProps} />)}
        </BaseLayout>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
