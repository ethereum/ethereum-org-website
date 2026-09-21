import { SECTION_LABELS } from "@/lib/constants"

/**
 * Canonical registry of every keyboard shortcut the site exposes to users.
 *
 * Consumers bind against an entry with `useKeyboardShortcut`, and the `?` help
 * dialog renders the whole registry. Adding a shortcut anywhere in the app
 * means adding it here first, so the dialog can never drift from reality.
 */

/**
 * A single chord. `mod` resolves to Cmd on Apple platforms and Ctrl elsewhere;
 * `alt` and `shift` are literal. Every other token is a `KeyboardEvent.key`
 * value ("k", "\\", "Escape", "ArrowUp", ...).
 */
export type KeyCombo = readonly string[]

export type ShortcutGroup = "general" | "navigation" | "search" | "display"

export type Shortcut = {
  /** Chords that all trigger this action. Matched in order. */
  combos: readonly KeyCombo[]
  /** `common`-namespace key describing what the shortcut does. */
  labelKey: string
  group: ShortcutGroup
  /**
   * Shown in the help dialog instead of `combos`, for bindings that cover a
   * contiguous range too long to list key by key.
   */
  displayCombos?: readonly KeyCombo[]
  /** How the dialog joins multiple combos. `range` renders an en dash. */
  separator?: "or" | "range"
  /**
   * The binding lives outside our code (DocSearch, Radix), so nothing calls
   * `useKeyboardShortcut` for it -- the entry exists to document the behavior.
   * These are not counted by the hook's Matomo event either.
   */
  documentedOnly?: boolean
  /** Only bound on viewports that render the desktop nav. */
  desktopOnly?: boolean
}

// One digit per top-level nav section, so the range tracks the menu itself.
const NAV_SECTION_COMBOS = SECTION_LABELS.map((_, index) => [String(index + 1)])

export const KEYBOARD_SHORTCUTS = {
  help: {
    combos: [["?"]],
    labelKey: "shortcut-show-shortcuts",
    group: "general",
  },
  closeDialog: {
    combos: [["Escape"]],
    labelKey: "shortcut-close-dialog",
    group: "general",
    documentedOnly: true,
  },
  skipToContent: {
    combos: [["Tab"]],
    labelKey: "skip-to-main-content",
    group: "navigation",
    documentedOnly: true,
  },
  navSections: {
    combos: NAV_SECTION_COMBOS,
    displayCombos: [["1"], [String(SECTION_LABELS.length)]],
    separator: "range",
    labelKey: "shortcut-nav-sections",
    group: "navigation",
    desktopOnly: true,
  },
  search: {
    combos: [["mod", "k"], ["/"]],
    labelKey: "shortcut-open-search",
    group: "navigation",
    // DocSearch's `useDocSearchKeyboardEvents` owns the behavior (and the
    // Escape that closes the modal). Search registers this entry anyway, with
    // no handler, so the keypress still lands in the shortcut count.
  },
  searchNavigate: {
    combos: [["ArrowUp"], ["ArrowDown"]],
    labelKey: "shortcut-search-navigate",
    group: "search",
    documentedOnly: true,
  },
  searchSelect: {
    combos: [["Enter"]],
    labelKey: "shortcut-search-select",
    group: "search",
    documentedOnly: true,
  },
  theme: {
    combos: [["mod", "\\"]],
    labelKey: "shortcut-toggle-theme",
    group: "display",
  },
  language: {
    combos: [["\\"]],
    labelKey: "shortcut-open-language-picker",
    group: "display",
    desktopOnly: true,
  },
} satisfies Record<string, Shortcut>

export type ShortcutId = keyof typeof KEYBOARD_SHORTCUTS

/** Group order in the help dialog, paired with their `common` heading keys. */
export const SHORTCUT_GROUPS: { id: ShortcutGroup; labelKey: string }[] = [
  { id: "general", labelKey: "shortcut-group-general" },
  { id: "navigation", labelKey: "shortcut-group-navigation" },
  { id: "search", labelKey: "shortcut-group-search" },
  { id: "display", labelKey: "shortcut-group-display" },
]

export const getShortcutsByGroup = (group: ShortcutGroup): Shortcut[] =>
  Object.values(KEYBOARD_SHORTCUTS).filter(
    (shortcut) => shortcut.group === group
  )
