import {
  DEFAULT_LOCALE,
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
  WALLETS_FILTERS_DEFAULT,
} from "@/lib/constants"

import { parseQueryParams } from "@/lib/product-table"

// Pure filtering logic for the find-wallet page. This module is imported by
// client components, so it must stay free of wallet-data imports — the full
// dataset only exists on the server; the client receives compact
// WalletFilterEntry records instead.

export type WalletToggleKey = keyof typeof WALLETS_FILTERS_DEFAULT

/**
 * Parent switches that group platform checkboxes. They live in UI state (and
 * URL params) but are never matched against wallet fields — toggling them
 * cascades to their child keys instead.
 */
export const WALLET_PARENT_FILTERS = {
  mobile: ["android", "ios"],
  desktop: ["linux", "windows", "macOS"],
  browser: ["chromium", "firefox"],
} as const satisfies Record<string, readonly WalletToggleKey[]>

export type WalletParentFilterKey = keyof typeof WALLET_PARENT_FILTERS

export type WalletFilterEntry = {
  id: string
  languages_supported: string[]
  supported_chains: string[]
} & Record<WalletToggleKey, boolean>

export type WalletFilterState = {
  toggles: Record<string, boolean>
  language: string
  layer2: string[]
}

export const WALLET_PERSONA_PRESETS = [
  {
    titleKey: "page-find-wallet-new-to-crypto-title",
    descriptionKey: "page-find-wallet-new-to-crypto-desc",
    filterKeys: NEW_TO_CRYPTO_FEATURES,
  },
  {
    titleKey: "page-find-wallet-nfts-title",
    descriptionKey: "page-find-wallet-nfts-desc",
    filterKeys: NFTS_FEATURES,
  },
  {
    titleKey: "page-find-wallet-hodler-title",
    descriptionKey: "page-find-wallet-hodler-desc",
    filterKeys: LONG_TERM_FEATURES,
  },
  {
    titleKey: "page-find-wallet-finance-title",
    descriptionKey: "page-find-wallet-finance-desc",
    filterKeys: FINANCE_FEATURES,
  },
  {
    titleKey: "page-find-wallet-developer-title",
    descriptionKey: "page-find-wallet-developer-desc",
    filterKeys: DEVELOPER_FEATURES,
  },
] as const

export const createDefaultWalletFilterState = (): WalletFilterState => ({
  toggles: {},
  language: DEFAULT_LOCALE,
  layer2: [],
})

/** Toggle keys that match wallet fields (parents excluded). */
export const getActiveToggleKeys = (state: WalletFilterState): string[] =>
  Object.keys(state.toggles).filter(
    (key) => state.toggles[key] && !(key in WALLET_PARENT_FILTERS)
  )

export const getVisibleWalletIds = (
  entries: WalletFilterEntry[],
  state: WalletFilterState
): Set<string> => {
  const activeKeys = getActiveToggleKeys(state)

  const visible = new Set<string>()
  for (const entry of entries) {
    const matchesLanguage = entry.languages_supported.includes(state.language)
    const matchesLayer2 =
      state.layer2.length === 0 ||
      state.layer2.every((chain) => entry.supported_chains.includes(chain))
    const matchesToggles = activeKeys.every((key) => entry[key])

    if (matchesLanguage && matchesLayer2 && matchesToggles) {
      visible.add(entry.id)
    }
  }
  return visible
}

/** Language select is excluded — it always has a value. */
export const countActiveFilters = (state: WalletFilterState): number =>
  getActiveToggleKeys(state).length + (state.layer2.length > 0 ? 1 : 0)

export const getActivePresetIndexes = (state: WalletFilterState): number[] =>
  WALLET_PERSONA_PRESETS.reduce<number[]>((acc, preset, idx) => {
    if (preset.filterKeys.every((key) => state.toggles[key])) acc.push(idx)
    return acc
  }, [])

export const applyPresetToState = (
  state: WalletFilterState,
  presetIdx: number
): WalletFilterState => {
  const toggles = { ...state.toggles }
  for (const key of WALLET_PERSONA_PRESETS[presetIdx].filterKeys) {
    toggles[key] = true
  }
  return { ...state, toggles }
}

/**
 * Deselecting a preset clears its keys unless another active preset also
 * requires them.
 */
export const removePresetFromState = (
  state: WalletFilterState,
  presetIdx: number
): WalletFilterState => {
  const otherActive = getActivePresetIndexes(state).filter(
    (idx) => idx !== presetIdx
  )
  const keptKeys = new Set(
    otherActive.flatMap((idx) => WALLET_PERSONA_PRESETS[idx].filterKeys)
  )
  const toggles = { ...state.toggles }
  for (const key of WALLET_PERSONA_PRESETS[presetIdx].filterKeys) {
    if (!keptKeys.has(key)) toggles[key] = false
  }
  return { ...state, toggles }
}

/**
 * Hydrate state from URL search params (e.g. ?android=true&layer_2_support=[...]).
 * Same key set as the previous implementation so shared links keep working.
 */
export const walletFilterStateFromQuery = (
  search: string,
  base: WalletFilterState
): WalletFilterState => {
  const query = Object.fromEntries(new URLSearchParams(search).entries())
  if (Object.keys(query).length === 0) return base

  const toggles = { ...base.toggles }
  const allToggleKeys = [
    ...Object.keys(WALLETS_FILTERS_DEFAULT),
    ...Object.keys(WALLET_PARENT_FILTERS),
  ]
  for (const key of allToggleKeys) {
    const parsed = parseQueryParams(query[key])
    if (typeof parsed === "boolean") toggles[key] = parsed
  }

  const layer2 = parseQueryParams(query["layer_2_support"])

  return {
    ...base,
    toggles,
    layer2: Array.isArray(layer2) ? layer2 : base.layer2,
  }
}
