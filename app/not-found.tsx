import { pick } from "lodash"
import { getMessages } from "next-intl/server"

import NotFoundPage from "@/components/NotFoundPage"

import { toLanguageTag } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import Providers from "./[locale]/providers"
import { ibmPlexMono, inter } from "./fonts"

import "@/styles/global.css"

// Catches `notFound()` from `[locale]/layout.tsx` for invalid locales (e.g. `/foo.bar`), which `global-not-found` doesn't (vercel/next.js#85446).
// `next/root-params` still returns the invalid segment here, so the locale is passed explicitly.
export default async function NotFound() {
  const allMessages = await getMessages({ locale: DEFAULT_LOCALE })
  const messages = pick(allMessages, "common")

  return (
    <html
      lang={toLanguageTag(DEFAULT_LOCALE)}
      className={`${inter.variable} ${ibmPlexMono.variable}`}
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
