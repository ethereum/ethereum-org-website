"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook that provides open/close state that automatically closes on navigation.
 * Useful for modals, sheets, panels, etc. that should close when the user navigates.
 */
export function useCloseOnNavigate(initialOpen = false) {
  const pathname = usePathname()
  const [open, setOpen] = useState(initialOpen)

  React.useEffect(() => {
    if (open) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return [open, setOpen] as const
}
