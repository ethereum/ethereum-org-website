import { useEffect } from "react"
import type { Decorator } from "@storybook/react"

function VisualTestWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("visual-test-mode")
    return () => document.body.classList.remove("visual-test-mode")
  }, [])

  return <>{children}</>
}

export const withVisualTest: Decorator = (Story) => (
  <VisualTestWrapper>
    <Story />
  </VisualTestWrapper>
)
