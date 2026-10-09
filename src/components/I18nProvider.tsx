"use client"

import { merge } from "lodash"
import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl"

type I18nProviderProps = {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
  /**
   * Whether to keep the messages an enclosing provider already supplied. A page scopes
   * its provider to the namespaces it renders, which silently removed everything else
   * from its subtree -- a shared component mounted inside it (search, the feedback
   * widget) lost `common` and rendered its keys. Inheriting costs no payload: those
   * messages are already on the client for the chrome around the page.
   *
   * The root provider has nothing to inherit from, so it passes `false`.
   */
  inherit?: boolean
}

const Provider = ({
  children,
  locale,
  messages,
}: Omit<I18nProviderProps, "inherit">) => (
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

const InheritingProvider = ({
  messages,
  ...props
}: Omit<I18nProviderProps, "inherit">) => (
  <Provider {...props} messages={merge({}, useMessages(), messages)} />
)

export default function I18nProvider({
  inherit = true,
  ...props
}: I18nProviderProps) {
  return inherit ? <InheritingProvider {...props} /> : <Provider {...props} />
}
