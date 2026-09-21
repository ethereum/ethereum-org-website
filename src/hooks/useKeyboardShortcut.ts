import { isTypingTarget, matchesCombo } from "@/lib/utils/keyboard"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useEventListener } from "./useEventListener"

import { KEYBOARD_SHORTCUTS, type ShortcutId } from "@/lib/keyboard-shortcuts"

type UseKeyboardShortcutOptions = {
  enabled?: boolean
  /** Fire even while the user is typing in an input, textarea or select. */
  allowWhileTyping?: boolean
}

/**
 * Binds a handler to a shortcut declared in `@/lib/keyboard-shortcuts`. The
 * registry is the only place a chord is written down, so the `?` help dialog
 * always lists what is actually bound.
 */
export const useKeyboardShortcut = (
  id: ShortcutId,
  handler: (event: KeyboardEvent) => void,
  { enabled = true, allowWhileTyping = false }: UseKeyboardShortcutOptions = {}
) => {
  const { combos } = KEYBOARD_SHORTCUTS[id]

  useEventListener("keydown", (event) => {
    if (!enabled) return
    if (!allowWhileTyping && isTypingTarget(event.target)) return

    const combo = combos.find((candidate) => matchesCombo(event, candidate))
    if (!combo) return

    event.preventDefault()

    // Tracked here rather than per call site so every bound shortcut is
    // counted. The name carries the chord, to separate alternates like
    // mod+k vs / and one nav digit from another.
    trackCustomEvent({
      eventCategory: "keyboard shortcut",
      eventAction: id,
      eventName: combo.join("+"),
    })

    handler(event)
  })
}
