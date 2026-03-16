import { defineRouting } from "next-intl/routing"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

export const routing = defineRouting({
  locales: LOCALES_CODES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  alternateLinks: false,
  localeDetection: false,
})
