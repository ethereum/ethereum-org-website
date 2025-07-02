"use client"

import { useRef, useState } from "react"

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
  const [selectedVariant, setSelectedVariant] = useLocalStorage<number | null>(
    `ab-test-${testKey}`,
    null
  )
  const panelRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(panelRef, () => setIsOpen(false))

  const forceVariant = (variantIndex: number) =>
    setSelectedVariant(variantIndex)

  return (
    <div
      ref={panelRef}
      className="fixed bottom-5 right-5 z-modal rounded-lg border-2 bg-background-low p-2.5 font-mono text-xs"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer rounded border-none bg-accent-a px-2.5 py-1 font-semibold text-white hover:bg-accent-a-hover"
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
                  "bg-success text-white hover:bg-success-dark"
              )}
            >
              {variant}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
