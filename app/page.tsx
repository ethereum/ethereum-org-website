import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { routing } from "@/i18n/routing"

export default function Page() {
  // Get the accept-language header
  const headersList = headers()
  const acceptLanguage = headersList.get("accept-language") || ""

  // Try to find a matching locale from the accept-language header
  const preferredLocale =
    routing.locales.find((locale) =>
      acceptLanguage.toLowerCase().includes(locale.toLowerCase())
    ) || DEFAULT_LOCALE

  // Redirect to the preferred locale
  redirect(`/${preferredLocale}`)
}
