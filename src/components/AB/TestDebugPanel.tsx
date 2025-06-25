"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

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

  const forceVariant = async (variantName: string) => {
    try {
      const newAssignment = await forceABTestVariant(testKey, variantName)
      setLocalAssignment(newAssignment)
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
      if (name.trim().startsWith("_pk_abtest")) {
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      }
    })
    window.location.reload()
  }

  if (IS_PROD && !IS_PREVIEW_DEPLOY) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        backgroundColor: "#f0f0f0",
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "12px",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#007acc",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🧪 AB Test Debug
      </button>

      {isOpen && (
        <div style={{ marginTop: "10px" }}>
          <div>
            <strong>Test:</strong> {testKey}
          </div>
          <div>
            <strong>Current:</strong> {localAssignment?.variant || "None"}
            {isPending && (
              <span className="ml-2 text-xs text-gray-500">Loading...</span>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <div>
              <strong>Force Variant:</strong>
            </div>
            {availableVariants.map((variant) => (
              <button
                key={variant}
                onClick={() => forceVariant(variant)}
                disabled={isPending}
                style={{
                  display: "block",
                  margin: "2px 0",
                  padding: "4px 8px",
                  backgroundColor:
                    localAssignment?.variant === variant
                      ? "#4CAF50"
                      : "#f9f9f9",
                  color:
                    localAssignment?.variant === variant ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  cursor: isPending ? "not-allowed" : "pointer",
                  opacity: isPending ? 0.6 : 1,
                  width: "100%",
                }}
              >
                {variant}
              </button>
            ))}
            <div style={{ marginTop: "10px", display: "flex", gap: "4px" }}>
              <button
                onClick={clearCookie}
                disabled={isPending}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: isPending ? "not-allowed" : "pointer",
                  opacity: isPending ? 0.6 : 1,
                  fontSize: "11px",
                }}
                title="Clear this test's cookie and get new random assignment"
              >
                🔄 Reset Test
              </button>
              <button
                onClick={resetAllTests}
                disabled={isPending}
                style={{
                  flex: 1,
                  padding: "4px 8px",
                  backgroundColor: "#ff8800",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: isPending ? "not-allowed" : "pointer",
                  opacity: isPending ? 0.6 : 1,
                  fontSize: "11px",
                }}
                title="Clear all AB test cookies and reload page"
              >
                🗑️ Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
