"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils/cn"

import { Button } from "../ui/buttons/Button"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"

type ABTestDebugPanelProps = {
  testKey: string
  availableVariants: string[]
}

export const ABTestDebugPanel = ({
  testKey,
  availableVariants,
}: ABTestDebugPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedVariant, setSelectedVariant] = useLocalStorage<number | null>(
    `ab-test-${testKey}`,
    null
  )
  const panelRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(panelRef, () => setIsOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  const forceVariant = (variantIndex: number) =>
    setSelectedVariant(variantIndex)

  const panelContent = (
    <div
      ref={panelRef}
      className="z-modal bg-background-low fixed right-5 bottom-5 rounded-lg border-2 p-2.5 font-mono text-xs"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent-a hover:bg-accent-a-hover w-full cursor-pointer rounded border-none px-2.5 py-1 font-semibold text-white"
      >
        🧪 AB Test Switcher
      </Button>

      {isOpen && (
        <div className="mt-2.5">
          <div>
            <strong>Experiment:</strong> {testKey}
          </div>
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
                  "bg-success hover:bg-success-dark text-white"
              )}
            >
              {variant}
            </Button>
          ))}
        </div>
      )}
    </div>
  )

  // Only render portal on client side after mount
  if (!mounted) return null

  return createPortal(panelContent, document.body)
}
