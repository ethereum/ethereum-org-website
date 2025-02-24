import { headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import { Lang } from "@/lib/types"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { HEADER_PATHNAME_KEY } from "@/lib/constants"

import { getMessages } from "./loadMessages"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as Lang)) {
    locale = routing.defaultLocale
  }

  const allMessages = await getMessages(locale)

  const headersList = headers()
  const fullPathname = headersList.get(HEADER_PATHNAME_KEY)
  const pathname = fullPathname?.replace(`/${locale}`, "")

  const requiredNamespaces = getRequiredNamespacesForPage(pathname || "/")

  const messages = requiredNamespaces.reduce(
    (acc, ns) => {
      acc[ns] = allMessages[ns]
      return acc
    },
    {} as Record<string, string>
  )

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
