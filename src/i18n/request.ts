import { merge } from "lodash"
import * as rootParams from "next/root-params"
import { getRequestConfig } from "next-intl/server"

import { Lang } from "@/lib/types"

import { routing } from "./routing"

import { loadMessages } from "@/lib/i18n/loadMessages"

export default getRequestConfig(async ({ locale: localeOverride }) => {
  // `next/root-params` reads the `[locale]` segment without opting the request
  // into dynamic rendering, so pages stay static without `setRequestLocale`.
  // It isn't available in Route Handlers and Server Actions yet, so an explicit
  // locale passed by the caller still takes precedence.
  const paramValue = localeOverride ?? (await rootParams.locale())

  // The `[locale]` segment also catches unknown routes (e.g. `/unknown.txt`),
  // and pages outside of it have no segment at all.
  const locale =
    paramValue && routing.locales.includes(paramValue as Lang)
      ? paramValue
      : routing.defaultLocale

  const allLocaleMessages = await loadMessages(locale)
  const allDefaultMessages = await loadMessages(routing.defaultLocale)
  const messages = merge({}, allDefaultMessages, allLocaleMessages)

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
