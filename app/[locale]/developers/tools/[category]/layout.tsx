import type { ReactNode } from "react"

// `modal` parallel slot for tools opened from a category page; intercepts the
// child `[tool]` route as an overlay.
const CategoryLayout = ({
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

export default CategoryLayout
