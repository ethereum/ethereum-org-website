import { merge } from "lodash"
import { notFound } from "next/navigation"
import * as rootParams from "next/root-params"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "./routing"

import { loadMessages } from "@/lib/i18n/loadMessages"

export default getRequestConfig(async ({ locale }) => {
  // Only read from `next/root-params` if no explicit
  // override is provided by the caller
  if (!locale) {
    const paramValue = await rootParams.locale()
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue
    } else {
      notFound()
    }
  }

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
