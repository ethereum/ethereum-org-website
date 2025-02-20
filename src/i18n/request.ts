import { getRequestConfig } from "next-intl/server"

import { Lang } from "@/lib/types"

import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as Lang)) {
    locale = routing.defaultLocale
  }

  // TODO: load all namespaces
  const ns = "common"

  const messages = {
    [ns]: (await import(`../intl/${locale}/${ns}.json`)).default,
  }

  return {
    locale,
    messages,
  }
})
