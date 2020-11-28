import { useEffect } from "react"

export const useKeyPress = (targetKey, handler) => {
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      handler()
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
