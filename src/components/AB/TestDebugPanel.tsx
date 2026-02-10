"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils/cn"

/** Cookie prefix for debug overrides - must match flags.ts */
const FLAG_OVERRIDE_COOKIE_PREFIX = "flag_override_"

import { Button } from "../ui/buttons/Button"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

type ABTestDebugPanelProps = {
  testKey: string
  availableVariants: string[]
}

/** Read a cookie value by name */
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

/** Set a cookie with path=/ */
function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=86400` // 24 hours
}

/** Delete a cookie */
function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`
}

export const ABTestDebugPanel = ({
  testKey,
  availableVariants,
}: ABTestDebugPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(panelRef, () => setIsOpen(false))

  const cookieName = `${FLAG_OVERRIDE_COOKIE_PREFIX}${testKey}`

  useEffect(() => {
    setMounted(true)
    // Read current override from cookie
    const cookieValue = getCookie(cookieName)
    if (cookieValue !== null) {
      const parsed = parseInt(cookieValue, 10)
      if (!isNaN(parsed)) {
        setSelectedVariant(parsed)
      }
    }
  }, [cookieName])

  // Force variant by setting cookie and reloading (triggers middleware with new cookie)
  const forceVariant = (variantIndex: number) => {
    setCookie(cookieName, String(variantIndex))
    window.location.reload()
  }

  // Clear override and reload
  const clearOverride = () => {
    deleteCookie(cookieName)
    window.location.reload()
  }

  const panelContent = (
    <div
      ref={panelRef}
      className="fixed bottom-5 right-5 z-modal rounded-lg border-2 bg-background-low p-2.5 font-mono text-xs"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer rounded border-none bg-accent-a px-2.5 py-1 font-semibold text-white hover:bg-accent-a-hover"
      >
        🧪 {selectedVariant !== null ? `[${selectedVariant}]` : "AB"}
      </Button>

      {isOpen && (
        <div className="mt-2.5 space-y-2">
          <div>
            <strong>Experiment:</strong> {testKey}
          </div>
          {selectedVariant !== null && (
            <div className="text-warning">⚠️ Override active</div>
          )}
          <div>
            <strong>Select variant:</strong>
          </div>
          {availableVariants.map((variant, index) => (
            <Button
              key={variant}
              variant={selectedVariant === index ? "solid" : "outline"}
              isSecondary
              onClick={() => forceVariant(index)}
              className={cn(
                "my-0.5 block w-full rounded border border-gray-300 px-2 py-1",
                selectedVariant === index &&
                  "bg-success text-white hover:bg-success-dark"
              )}
            >
              {variant}
            </Button>
          ))}
          {selectedVariant !== null && (
            <Button
              variant="outline"
              onClick={clearOverride}
              className="mt-2 w-full text-error"
            >
              Clear Override
            </Button>
          )}
        </div>
      )}
    </div>
  )

  // Only render portal on client side after mount
  if (!mounted) return null

  return createPortal(panelContent, document.body)
}
