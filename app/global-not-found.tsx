import { pick } from "lodash"
import { getMessages } from "next-intl/server"

import NotFoundPage from "@/components/NotFoundPage"

import { toLanguageTag } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import Providers from "./[locale]/providers"
import { ibmPlexMono, inter } from "./fonts"

import "@/styles/global.css"

// This boundary renders outside the `[locale]` segment, so there is no root
// param to read: it must stay self-contained and use only explicit-locale
// next-intl APIs. In dev, Next.js renders it alongside every page request
// within the same request-scoped cache, so any implicit API
// (`getTranslations()`, `getLocale()`, ...) here poisons the locale of the
// actual page being rendered. It is only reached for locale-less paths the
// proxy matcher excludes; localized 404s render via app/[locale]/not-found.tsx
// with the full site chrome.
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
