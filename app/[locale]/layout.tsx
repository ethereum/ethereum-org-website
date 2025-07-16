import { Suspense } from "react"
import { pick } from "lodash"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import Matomo from "@/components/Matomo"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"

import Providers from "./providers"

import "@/styles/global.css"

import { routing } from "@/i18n/routing"
import { BaseLayout } from "@/layouts/BaseLayout"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono",
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

  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, "common")

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers locale={locale} messages={messages}>
          <Suspense>
            <Matomo />
          </Suspense>

          <BaseLayout lastDeployLocaleTimestamp={lastDeployLocaleTimestamp}>
            {children}
          </BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
