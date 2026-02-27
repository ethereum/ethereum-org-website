"use client"

import * as React from "react"

import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"

import HamburgerButton from "./HamburgerButton"

import { useCloseOnNavigate } from "@/hooks/useCloseOnNavigate"
import { useTranslation } from "@/hooks/useTranslation"

// Lazy-load the menu content to avoid including it in initial RSC payload
// This saves ~82KB by not SSR'ing navigation data that's hidden behind a click
const lazyImport = () => import("./MobileMenuContent")
const MobileMenuContent = React.lazy(lazyImport)

function MobileMenuContentSkeleton() {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  )
}

type MobileMenuClientProps = {
  className?: string
  side: "left" | "right"
}

const MobileMenuClient = ({ className, side }: MobileMenuClientProps) => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useCloseOnNavigate()
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  // Track if menu has ever been opened to keep content loaded after first open
  const [hasBeenOpened, setHasBeenOpened] = React.useState(false)

  // Prefetch the menu chunk after the page is idle
  React.useEffect(() => {
    if (hasBeenOpened) return
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => lazyImport())
      return () => window.cancelIdleCallback(id)
    }
  }, [hasBeenOpened])

  const handleOpenChange = (nextOpen: boolean) => {
    // Set hasBeenOpened synchronously to avoid an empty frame before the skeleton
    if (nextOpen && !hasBeenOpened) {
      setHasBeenOpened(true)
    }
    setOpen(nextOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <HamburgerButton
          ref={triggerRef}
          className={cn("-me-2", className)}
          isMenuOpen={open}
          onPointerEnter={() => lazyImport()}
        />
      </SheetTrigger>

      <PersistentPanel
        open={open}
        side={side}
        className="flex flex-col"
        onOpenChange={handleOpenChange}
        triggerRef={triggerRef}
        aria-label={t("site-title")}
        data-testid="mobile-menu-dialog"
      >
        {hasBeenOpened && (
          <React.Suspense fallback={<MobileMenuContentSkeleton />}>
            <MobileMenuContent />
          </React.Suspense>
        )}
      </PersistentPanel>
    </Sheet>
  )
}

export default MobileMenuClient
