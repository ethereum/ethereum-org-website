"use client"

import * as React from "react"

import { Sheet as BaseSheet } from "./sheet"

import { useCloseOnNavigate } from "@/hooks/useCloseOnNavigate"

type BaseSheetProps = React.ComponentProps<typeof BaseSheet>

const SheetCloseOnNavigate: React.FC<BaseSheetProps> = ({
  children,
  ...props
}) => {
  const [open, setOpen] = useCloseOnNavigate()

  return (
    <BaseSheet open={open} onOpenChange={setOpen} {...props}>
      {children}
    </BaseSheet>
  )
}

export { SheetCloseOnNavigate }
