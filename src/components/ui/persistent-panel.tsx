import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils/cn"

interface PersistentPanelProps {
  open: boolean
  side?: "left" | "right" | "top" | "bottom"
  className?: string
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

/**
 * PersistentPanel keeps content mounted after first render to avoid expensive
 * re-renders. It controls visibility with CSS instead of mounting/unmounting.
 *
 * Use this as an alternative to Sheet, Dialog, or Drawer content when the
 * content is expensive to render (e.g., complex filter forms, large lists).
 *
 * Features:
 * - Lazy mount: only renders after first open
 * - Stays mounted: avoids re-render cost on subsequent opens
 * - Animated: slide-in/out transitions work correctly
 * - Accessible: escape key, overlay click, scroll lock, aria attributes
 */
const PersistentPanel = ({
  open,
  side = "left",
  className,
  children,
  onOpenChange,
}: PersistentPanelProps) => {
  // Track if component should be in DOM (lazy mount, stays mounted after first open)
  const [isMounted, setIsMounted] = React.useState(false)
  // Track CSS visibility state for animations (separate from open to allow animation timing)
  const [showContent, setShowContent] = React.useState(false)

  const overlayRef = React.useRef<HTMLDivElement>(null)

  // Mount component on first open
  React.useEffect(() => {
    if (open && !isMounted) {
      setIsMounted(true)
    }
  }, [open, isMounted])

  // Handle animation timing - runs after isMounted changes
  React.useEffect(() => {
    if (!isMounted) return

    if (open) {
      // Small delay ensures browser paints the hidden state first,
      // allowing the CSS transition to animate
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 20)
      return () => clearTimeout(timer)
    } else {
      // Close immediately to trigger exit animation
      setShowContent(false)
    }
  }, [open, isMounted])

  // Handle overlay click to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current && onOpenChange) {
      onOpenChange(false)
    }
  }

  // Handle escape key
  React.useEffect(() => {
    if (!isMounted || !open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onOpenChange) {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMounted, open, onOpenChange])

  // Lock body scroll when panel is visible
  React.useEffect(() => {
    if (!isMounted || !showContent) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [showContent, isMounted])

  // Don't render until first open
  if (!isMounted) {
    return null
  }

  const overlayClasses = cn(
    "fixed inset-0 z-modal bg-gray-800 transition-opacity duration-300",
    showContent ? "opacity-70" : "opacity-0 pointer-events-none"
  )

  const contentClasses = cn(
    "fixed z-modal bg-background shadow-xl transition-transform duration-300 ease-in-out flex h-full flex-col p-2",
    side === "left" && "inset-y-0 left-0 h-full w-full sm:max-w-lg",
    side === "right" && "inset-y-0 right-0 h-full w-full sm:max-w-lg",
    side === "top" && "inset-x-0 top-0",
    side === "bottom" && "inset-x-0 bottom-0",
    // Slide animations based on visibility
    side === "left" && (showContent ? "translate-x-0" : "-translate-x-full"),
    side === "right" && (showContent ? "translate-x-0" : "translate-x-full"),
    side === "top" && (showContent ? "translate-y-0" : "-translate-y-full"),
    side === "bottom" && (showContent ? "translate-y-0" : "translate-y-full"),
    className
  )

  return createPortal(
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={overlayClasses}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={contentClasses} role="dialog" aria-modal="true">
        {children}
      </div>
    </>,
    document.body
  )
}
PersistentPanel.displayName = "PersistentPanel"

export { PersistentPanel }
