"use client"

import {
  createContext,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  applyPresetToState,
  countActiveFilters,
  createDefaultWalletFilterState,
  getActivePresetIndexes,
  getVisibleWalletIds,
  removePresetFromState,
  WALLET_PARENT_FILTERS,
  WALLET_PERSONA_PRESETS,
  type WalletFilterEntry,
  type WalletFilterState,
  walletFilterStateFromQuery,
} from "@/lib/utils/findWalletFilters"

type WalletFilterContextValue = {
  locale: string
  state: WalletFilterState
  visibleIds: Set<string>
  visibleCount: number
  activeFiltersCount: number
  activePresets: number[]
  presetCounts: number[]
}

type WalletFilterActions = {
  setToggle: (key: string, value: boolean) => void
  setLanguage: (language: string) => void
  setLayer2: (chains: string[]) => void
  togglePreset: (presetIdx: number) => void
  resetFilters: () => void
}

const WalletFilterContext = createContext<WalletFilterContextValue | null>(null)
const WalletFilterActionsContext = createContext<WalletFilterActions | null>(
  null
)

export const useWalletFilters = () => {
  const ctx = useContext(WalletFilterContext)
  if (!ctx) throw new Error("useWalletFilters requires WalletFilterProvider")
  return ctx
}

export const useWalletFilterActions = () => {
  const ctx = useContext(WalletFilterActionsContext)
  if (!ctx)
    throw new Error("useWalletFilterActions requires WalletFilterProvider")
  return ctx
}

const WalletFilterProvider = ({
  locale,
  entries,
  children,
}: {
  locale: string
  entries: WalletFilterEntry[]
  children: ReactNode
}) => {
  const [state, setState] = useState<WalletFilterState>(
    createDefaultWalletFilterState
  )

  // Hydrate filters from URL params once on mount. Reads window.location.search
  // directly (not useSearchParams) to avoid Next's CSR bailout on this SSG page.
  useEffect(() => {
    setState((prev) => walletFilterStateFromQuery(window.location.search, prev))
  }, [])

  // All updates go through a transition: recomputing visibility and
  // re-rendering both filter panels is deferrable work that must not block
  // the tap's next paint (INP)
  const setToggle = useCallback((key: string, value: boolean) => {
    startTransition(() => {
      setState((prev) => {
        const toggles = { ...prev.toggles, [key]: value }
        // Parent platform switches cascade to their children
        const children =
          WALLET_PARENT_FILTERS[key as keyof typeof WALLET_PARENT_FILTERS]
        if (children) {
          for (const child of children) toggles[child] = value
        }
        return { ...prev, toggles }
      })
    })
  }, [])

  const setLanguage = useCallback((language: string) => {
    startTransition(() => {
      setState((prev) => ({ ...prev, language }))
    })
  }, [])

  const setLayer2 = useCallback((chains: string[]) => {
    startTransition(() => {
      setState((prev) => ({ ...prev, layer2: chains }))
    })
  }, [])

  const togglePreset = useCallback((presetIdx: number) => {
    startTransition(() => {
      setState((prev) =>
        getActivePresetIndexes(prev).includes(presetIdx)
          ? removePresetFromState(prev, presetIdx)
          : applyPresetToState(prev, presetIdx)
      )
    })
  }, [])

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setState(createDefaultWalletFilterState())
    })
  }, [])

  const actions = useMemo(
    () => ({ setToggle, setLanguage, setLayer2, togglePreset, resetFilters }),
    [setToggle, setLanguage, setLayer2, togglePreset, resetFilters]
  )

  const value = useMemo<WalletFilterContextValue>(() => {
    const visibleIds = getVisibleWalletIds(entries, state)
    const activePresets = getActivePresetIndexes(state)
    const presetCounts = WALLET_PERSONA_PRESETS.map(
      (preset) =>
        entries.filter(
          (entry) =>
            visibleIds.has(entry.id) &&
            preset.filterKeys.every((key) => entry[key])
        ).length
    )
    return {
      locale,
      state,
      visibleIds,
      visibleCount: visibleIds.size,
      activeFiltersCount: countActiveFilters(state),
      activePresets,
      presetCounts,
    }
  }, [locale, entries, state])

  return (
    <WalletFilterContext.Provider value={value}>
      <WalletFilterActionsContext.Provider value={actions}>
        {children}
      </WalletFilterActionsContext.Provider>
    </WalletFilterContext.Provider>
  )
}

export default WalletFilterProvider
