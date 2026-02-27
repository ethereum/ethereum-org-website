"use client"

import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl"

/**
 * Page-level i18n provider that merges parent messages with page-specific messages.
 *
 * This allows the layout-level provider to supply the "common" namespace once,
 * while page providers only add their page-specific namespaces. The merge happens
 * on the client, so "common" is only serialized once in the HTML (from the layout).
 */
export default function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
}) {
  const parentMessages = useMessages()
  const merged = { ...parentMessages, ...messages }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={merged}
      onError={() => {}}
      getMessageFallback={({ key }) => {
        const keyOnly = key.split(".").pop()
        return keyOnly || key
      }}
    >
      {children}
    </NextIntlClientProvider>
  )
}
