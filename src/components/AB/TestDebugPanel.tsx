"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils/cn"

import { AB_TEST_COOKIE_PREFIX } from "@/lib/constants"

import { Button } from "../ui/buttons/Button"

import { clearABTestCookie, forceABTestVariant } from "@/lib/ab-testing/actions"
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

  const cookieName = AB_TEST_COOKIE_PREFIX + testKey
  // Check if cookie exists client-side and set fallback if needed
  useEffect(() => {
    if (currentAssignment) {
      const cookieExists = document.cookie.includes(cookieName)

      if (!cookieExists) {
        console.log(`[AB Test Debug] Setting fallback cookie for ${testKey}`)
        document.cookie = `${cookieName}=${JSON.stringify(currentAssignment)}; max-age=${60 * 60 * 24 * 30}; path=/; samesite=lax`
      }
    }
  }, [cookieName, currentAssignment, testKey])

  const forceVariant = async (variantName: string) => {
    try {
      const newAssignment = await forceABTestVariant(testKey, variantName)
      setLocalAssignment(newAssignment)

      // Fallback: Set cookie client-side if server action doesn't persist
      document.cookie = `${cookieName}=${JSON.stringify(newAssignment)}; max-age=${60 * 60 * 24 * 30}; path=/; samesite=lax`

      // Use transition for smoother updates without full refresh
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error("Failed to force variant:", error)
    }
  }

  const clearCookie = async () => {
    try {
      await clearABTestCookie(testKey)

      // Fallback: Clear cookie client-side as well
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`

      setLocalAssignment(null)
      // Use transition for smoother updates without full refresh
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error("Failed to clear cookie:", error)
    }
  }

  const resetAllTests = () => {
    // Clear all AB test cookies and reload page
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=")
      if (name.trim().startsWith(AB_TEST_COOKIE_PREFIX)) {
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      }
    })
    window.location.reload()
  }

  return (
    <div className="fixed bottom-5 right-5 z-sticky rounded-lg border-2 bg-background-low p-2.5 font-mono text-xs">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer rounded border-none bg-accent-a px-2.5 py-1 font-semibold text-white hover:bg-accent-a-hover"
      >
        🧪 AB Test Debug
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
          <div className="mt-1 text-2xs">
            <strong>Cookie:</strong>{" "}
            {typeof window !== "undefined" &&
            document.cookie.includes(AB_TEST_COOKIE_PREFIX + testKey)
              ? "✓ Set"
              : "✗ Missing"}
          </div>
          <div className="mt-2.5">
            <div>
              <strong>Force Variant:</strong>
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
            <div className="mt-2.5 flex gap-1">
              <Button
                onClick={clearCookie}
                disabled={isPending}
                className={cn(
                  "flex-1 rounded border-none bg-warning px-2 py-1 text-xs text-black hover:bg-warning-dark",
                  isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                )}
                title="Clear this test's cookie and get new random assignment"
              >
                🔄 Reset Test
              </Button>
              <Button
                onClick={resetAllTests}
                disabled={isPending}
                className={cn(
                  "flex-1 rounded border-none bg-error px-2 py-1 text-xs text-white hover:bg-error-dark",
                  isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                )}
                title="Clear all AB test cookies and reload page"
              >
                🗑️ Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
