import type { KeyCombo } from "@/lib/keyboard-shortcuts"

/** Editable targets own every keystroke; single-key shortcuts must stay out. */
export const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)
  )
}

const MODIFIER_TOKENS = ["mod", "alt", "shift"]

/**
 * `mod` matches Cmd or Ctrl. Shift is only asserted when the combo names it,
 * since the printed character already encodes it on most layouts ("?" is
 * Shift+/ on a US keyboard but arrives as `event.key === "?"`).
 */
export const matchesCombo = (
  event: KeyboardEvent,
  combo: KeyCombo
): boolean => {
  const key = combo.find((token) => !MODIFIER_TOKENS.includes(token))
  if (!key || event.key.toLowerCase() !== key.toLowerCase()) return false
  if (combo.includes("mod") !== (event.metaKey || event.ctrlKey)) return false
  if (combo.includes("alt") !== event.altKey) return false
  if (combo.includes("shift") && !event.shiftKey) return false
  return true
}
