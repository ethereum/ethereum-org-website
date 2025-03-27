import merge from "lodash.merge"
import { getRequestConfig } from "next-intl/server"

import { Lang } from "@/lib/types"

import { getMessages } from "./loadMessages"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as Lang)) {
    locale = routing.defaultLocale
  }

  const allLocaleMessages = await getMessages(locale)
  const allDefaultMessages = await getMessages(routing.defaultLocale)
  const messages = merge(allDefaultMessages, allLocaleMessages)

  return {
    locale,
    messages,
    onError: () => {
      // Suppress errors by default, enable if needed to debug
      // console.error(error)
    },
    getMessageFallback: ({ key }) => {
      const keyOnly = key.split(".").pop()
      return keyOnly || key
    },
  }
})
