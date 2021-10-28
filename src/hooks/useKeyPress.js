import { useEffect } from "react"

export const useKeyPress = (targetKey, handler) => {
  const downHandler = (event) => {
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
