import { pick } from "lodash"
import { getMessages, setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

import I18nProvider from "@/components/I18nProvider"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

/**
 * Wraps the whole find-wallet subtree (index, persona pages, wallet detail, and
 * the `@modal` slot) in the client i18n provider so the client catalog island
 * and detail leaves share one set of messages, and activates the parallel
 * `@modal` slot used for intercepted wallet detail.
 */
export default async function FindWalletLayout({
  children,
  modal,
  params,
}: {
  children: ReactNode
  modal: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage("/wallets/find-wallet")
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
      {modal}
    </I18nProvider>
  )
}
