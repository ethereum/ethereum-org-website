"use client"

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl"

export default function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={() => {
        // Suppress errors by default, enable if needed to debug
        // console.error(error)
      }}
      getMessageFallback={({ key }) => {
        const keyOnly = key.split(".").pop()
        return keyOnly || key
      }}
    >
      {children}
    </NextIntlClientProvider>
  )
}
