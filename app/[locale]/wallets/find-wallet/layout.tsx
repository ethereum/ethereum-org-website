import type { ReactNode } from "react"

// The `modal` parallel slot hosts the intercepted wallet-detail route, so a
// wallet opens as an overlay over the list while a direct load renders the
// full `[wallet]` page.
const FindWalletLayout = ({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) => (
  <>
    {children}
    {modal}
  </>
)

export default FindWalletLayout
