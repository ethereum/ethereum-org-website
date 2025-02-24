import merge from "lodash.merge"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { SkipLink } from "@/components/SkipLink"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { DEFAULT_LOCALE } from "@/lib/constants"

import Providers from "./providers"

import "@/styles/global.css"

import { routing } from "@/i18n/routing"

const FeedbackWidget = dynamic(() => import("@/components/FeedbackWidget"), {
  ssr: false,
})

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  let messages = await getMessages({ locale })

  if (locale !== DEFAULT_LOCALE) {
    // This is to ensure that the default locale messages are always available
    // even if they are not present in the current locale
    const defaultMessages = await getMessages({ locale: DEFAULT_LOCALE })
    messages = merge(defaultMessages, messages)
  }

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers locale={locale} messages={messages}>
          <SkipLink />
          <div className="mx-auto max-w-screen-2xl">
            <Nav />

            {/* TODO: FIX TRANSLATION BANNER LOGIC FOR https://github.com/ethereum/ethereum-org-website/issues/11305 */}
            {/* <TranslationBanner
            shouldShow={shouldShowTranslationBanner}
            isPageContentEnglish={contentNotTranslated}
            originalPagePath={originalPagePath}
          />

          <TranslationBannerLegal
            shouldShow={shouldShowLegalTranslationBanner}
            originalPagePath={originalPagePath}
          /> */}

            {children}

            <Footer lastDeployLocaleTimestamp={lastDeployLocaleTimestamp} />
          </div>
          {/**
           * The Feedback Widget is positioned below the container to ensure it is not affecting the
           * layout on initial load.
           */}

          <FeedbackWidget />
        </Providers>
      </body>
    </html>
  )
}
