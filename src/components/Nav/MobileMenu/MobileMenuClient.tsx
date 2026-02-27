"use client"

import * as React from "react"

import { ErrorBoundary } from "@/components/ui/error-boundary"
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
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-12" />
      </div>

      {/* Nav sections (5 collapsible rows) */}
      <div className="flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border-b border-body-light px-4 py-4 first:border-t"
          >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-5 w-36" />
          </div>
        ))}
      </div>

      {/* Footer (3-column grid) */}
      <div className="grid h-[108px] shrink-0 grid-cols-3 border-t border-body-light px-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
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
          <ErrorBoundary
            fallback={({ reset }) => (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-body-medium">Failed to load menu</p>
                <div className="flex gap-3">
                  <button
                    className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary-hover"
                    onClick={reset}
                  >
                    Try again
                  </button>
                  <button
                    className="rounded-md border border-body-light px-4 py-2 text-sm text-body hover:bg-background-highlight"
                    onClick={() => handleOpenChange(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          >
            <React.Suspense fallback={<MobileMenuContentSkeleton />}>
              <MobileMenuContent />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </PersistentPanel>
    </Sheet>
  )
}

export default MobileMenuClient
