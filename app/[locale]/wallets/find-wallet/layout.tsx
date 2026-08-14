import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"

/** Activates the `@modal` slot used for intercepted wallet detail. */
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
