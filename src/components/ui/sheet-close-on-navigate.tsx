"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"

import { Sheet as BaseSheet } from "./sheet"

type BaseSheetProps = React.ComponentProps<typeof BaseSheet>

const SheetCloseOnNavigate: React.FC<BaseSheetProps> = ({
  children,
  ...props
}) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    if (open) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <BaseSheet open={open} onOpenChange={setOpen} {...props}>
      {children}
    </BaseSheet>
  )
}

export { SheetCloseOnNavigate }
