import { pick } from "lodash"
import { getMessages } from "next-intl/server"

import NotFoundPage from "@/components/NotFoundPage"

import { toLanguageTag } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import Providers from "./[locale]/providers"
import { ibmPlexMono, inter } from "./fonts"

import "@/styles/global.css"

export default async function GlobalNotFound() {
  const allMessages = await getMessages({ locale: DEFAULT_LOCALE })
  const messages = pick(allMessages, "common")

  return (
    <html
      lang={toLanguageTag(DEFAULT_LOCALE)}
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Providers locale={DEFAULT_LOCALE} messages={messages}>
          <NotFoundPage />
        </Providers>
      </body>
    </html>
  )
}
