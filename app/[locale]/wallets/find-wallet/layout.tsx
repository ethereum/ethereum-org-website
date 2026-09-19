import type { ReactNode } from "react"

/** Activates the `@modal` slot used for intercepted wallet detail. */
export default function FindWalletLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
