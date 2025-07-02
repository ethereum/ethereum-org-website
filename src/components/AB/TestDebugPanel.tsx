"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils/cn"

import { Button } from "../ui/buttons/Button"

import { forceABTestVariant } from "@/lib/ab-testing/actions"
import { ABTestAssignment } from "@/lib/ab-testing/types"

type ABTestDebugPanelProps = {
  testKey: string
  currentAssignment: ABTestAssignment | null
  availableVariants: string[]
}

export function ABTestDebugPanel({
  testKey,
  currentAssignment,
  availableVariants,
}: ABTestDebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [localAssignment, setLocalAssignment] = useState(currentAssignment)
  const router = useRouter()

  // Sync local state when server state changes
  useEffect(() => {
    setLocalAssignment(currentAssignment)
  }, [currentAssignment])

  const forceVariant = async (variantName: string) => {
    try {
      const newAssignment = await forceABTestVariant(testKey, variantName)
      setLocalAssignment(newAssignment)

      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error("Failed to force variant:", error)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-modal rounded-lg border-2 bg-background-low p-2.5 font-mono text-xs">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer rounded border-none bg-accent-a px-2.5 py-1 font-semibold text-white hover:bg-accent-a-hover"
      >
        🧪 AB Test Switcher
      </Button>

      {isOpen && (
        <div className="mt-2.5">
          <div>
            <strong>Test:</strong> {testKey}
          </div>
          <div>
            <strong>Current:</strong> {localAssignment?.variant || "None"}
            {isPending && (
              <span className="ml-2 text-xs text-gray-500">Loading...</span>
            )}
          </div>
          <div className="mt-2.5">
            <div>
              <strong>Force variant:</strong>
            </div>
            {availableVariants.map((variant) => (
              <Button
                key={variant}
                variant={
                  localAssignment?.variant === variant ? "solid" : "outline"
                }
                isSecondary
                onClick={() => forceVariant(variant)}
                disabled={isPending}
                className={cn(
                  "my-0.5 block w-full rounded border border-gray-300 px-2 py-1 transition-opacity",
                  localAssignment?.variant === variant &&
                    "bg-success text-white hover:bg-success-dark",
                  isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                )}
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
