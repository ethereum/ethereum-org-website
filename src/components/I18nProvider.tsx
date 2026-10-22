"use client"

import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl"

type I18nProviderProps = {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
}

/** The app-level provider. `useMessages()` throws without a parent, so the root can't inherit. */
export const RootI18nProvider = ({
  children,
  locale,
  messages,
}: I18nProviderProps) => (
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

/**
 * A page-scoped provider. Keeps the enclosing provider's namespaces so shared components
 * inside the page (search, the feedback widget) still find `common`. Messages are keyed by
 * namespace, so a shallow spread is enough.
 */
export default function I18nProvider({
  messages,
  ...props
}: I18nProviderProps) {
  return (
    <RootI18nProvider {...props} messages={{ ...useMessages(), ...messages }} />
  )
}
