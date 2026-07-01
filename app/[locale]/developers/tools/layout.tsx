import type { ReactNode } from "react"

// The `modal` parallel slot hosts the intercepted tool-detail route so a tool
// opens as an overlay over the catalog index, while a direct load renders the
// full `[tool]` page.
const ToolsLayout = ({
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

export default ToolsLayout
