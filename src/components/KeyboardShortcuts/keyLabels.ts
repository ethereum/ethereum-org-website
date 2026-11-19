/**
 * Key-cap labels for the help dialog. Deliberately untranslated: these are the
 * legends printed on physical keyboards, not prose.
 */

const APPLE_MODIFIERS: Record<string, string> = {
  mod: "⌘",
  alt: "⌥",
  shift: "⇧",
}

const MODIFIERS: Record<string, string> = {
  mod: "Ctrl",
  alt: "Alt",
  shift: "Shift",
}

const KEYS: Record<string, string> = {
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  Escape: "Esc",
  " ": "Space",
}

export const isApplePlatform = () =>
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)

export const getKeyLabel = (token: string, isApple: boolean): string => {
  const modifiers = isApple ? APPLE_MODIFIERS : MODIFIERS
  if (token in modifiers) return modifiers[token]
  if (token in KEYS) return KEYS[token]
  return token.length === 1 ? token.toUpperCase() : token
}
