// Adds focus trap to modal for keyboard navigation
export const useFocusTrap = (
  _querySelector: string
): ((() => void) | null)[] => {
  const focusedElement: Element | null | undefined =
    document?.querySelector(_querySelector)
  if (!focusedElement) return [null, null]

  const handleKey = (e: KeyboardEvent) => {
    const { key, shiftKey, target } = e
    if (key === "Tab") {
      const focusableElements: NodeList = focusedElement.querySelectorAll(
        "button, textarea, input, select"
      )
      if (focusableElements.length) {
        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        let isTargetOutside = true
        focusableElements.forEach((element) => {
          if (element === target) isTargetOutside = false
        })
        if (shiftKey) {
          if (target === first || isTargetOutside) {
            // shift-tab pressed on first input in dialog
            last.focus()
            e.preventDefault()
          }
        } else {
          if (target === last || isTargetOutside) {
            // tab pressed on last input in dialog
            first.focus()
            e.preventDefault()
          }
        }
      }
    }
  }

  const startTrap = (): void => {
    window.addEventListener("keydown", handleKey)
  }
  const stopTrap = (): void => {
    window.removeEventListener("keydown", handleKey)
  }
  return [startTrap, stopTrap]
}
