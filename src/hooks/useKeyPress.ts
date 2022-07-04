import { useEffect } from "react"

export const useKeyPress = (
  targetKey: string,
  handler: (event: KeyboardEvent) => void
) => {
  const downHandler = (event: KeyboardEvent) => {
    if (event.key === targetKey) {
      handler(event)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  })
}
