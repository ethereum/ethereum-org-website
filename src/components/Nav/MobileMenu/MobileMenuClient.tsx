"use client"

import * as React from "react"

import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"

import HamburgerButton from "./HamburgerButton"

import { useCloseOnNavigate } from "@/hooks/useCloseOnNavigate"

type MobileMenuClientProps = {
  className?: string
  side: "left" | "right"
  children: React.ReactNode
}

const MobileMenuClient = ({
  className,
  side,
  children,
}: MobileMenuClientProps) => {
  const [open, setOpen] = useCloseOnNavigate()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <HamburgerButton className={cn("-me-2", className)} isMenuOpen={open} />
      </SheetTrigger>

      <PersistentPanel
        open={open}
        side={side}
        className="flex flex-col"
        onOpenChange={setOpen}
      >
        {children}
      </PersistentPanel>
    </Sheet>
  )
}

export default MobileMenuClient
