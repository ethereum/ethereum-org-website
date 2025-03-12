import pick from "lodash.pick"
import { notFound } from "next/navigation"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"

import Providers from "./providers"

import "@/styles/global.css"

import { routing } from "@/i18n/routing"
import { BaseLayout } from "@/layouts/BaseLayout"

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
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers locale={locale} messages={messages}>
          <BaseLayout lastDeployLocaleTimestamp={lastDeployLocaleTimestamp}>
            {children}
          </BaseLayout>
        </Providers>
      </body>
    </html>
  )
}
