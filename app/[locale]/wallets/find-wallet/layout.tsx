import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

/**
 * Activates the parallel `@modal` slot used for intercepted wallet detail. The
 * catalog island and detail leaves receive pre-localized strings as props (built
 * on the server), so no client i18n provider is needed in this subtree.
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

  return (
    <>
      {children}
      {modal}
    </>
  )
}
