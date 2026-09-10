"use client"

import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import FilterableCatalog from "@/components/FilterableCatalog"
import type { CatalogFilterState } from "@/components/FilterableCatalog/types"
import { asArray, toggleId } from "@/components/FilterableCatalog/utils"
import { Section } from "@/components/ui/section"

import { trackCustomEvent } from "@/lib/utils/matomo"
import type { CatalogWalletCard } from "@/lib/utils/walletData"

import type { WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletCard from "./WalletCard"
import WalletDetailModal, { type WalletModalLabels } from "./WalletDetailModal"
import type { WalletFilterOption } from "./WalletFilterGroup"
import WalletFilters, {
  ADVANCED_KEY,
  ALL_FILTER_KEYS,
  DEVICES_KEY,
  LANGUAGE_KEY,
  NETWORKS_KEY,
  PURCHASES_KEY,
  WalletFiltersHeader,
} from "./WalletFilters"
import WalletPersonaCards, {
  type WalletPersonaCard,
} from "./WalletPersonaCards"

const PERSONAS_KEY = "personas"

// Category kept from the old empty state for trend comparability.
const trackEmptyStateReset = () =>
  trackCustomEvent({
    eventCategory: "Wallet_empty_state",
    eventAction: "reset",
    eventName: "reset_button_clicked",
  })

/** Built on the server so no i18n runtime ships to the browser. */
export type WalletCatalogLabels = {
  catalog: {
    searchPlaceholder: string
    resultsLabel: string
    noResults: string
    noResultsDesc: string
    resetLabel: string
    filtersToggle: string
    applyLabel: string
    closeLabel: string
  }
  filter: {
    device: string
    buySell: string
    network: string
    language: string
    advanced: string
  }
  header: { filters: string; reset: string }
  personaCards: { legend: string; countAvailable: string }
  modal: WalletModalLabels
  tableTitle: string
  devices: Record<WalletDeviceId, string>
  personas: Record<WalletPersonaId, string>
}

/**
 * All option lists are built on the server: they arrive as stable references,
 * which is what lets the memoized filter groups skip re-rendering when
 * unrelated state (a persona, the modal) changes.
 */
export type WalletFilterOptions = Record<
  (typeof ALL_FILTER_KEYS)[number],
  WalletFilterOption[]
>

type WalletsCatalogProps = {
  locale: string
  wallets: CatalogWalletCard[]
  filterOptions: WalletFilterOptions
  personas: WalletPersonaCard[]
  /** Set by the persona pages; the path segment is derived from it afterwards. */
  initialPersonaId?: WalletPersonaId
  labels: WalletCatalogLabels
}

function filterWallet(
  wallet: CatalogWalletCard,
  state: CatalogFilterState,
  query: string
) {
  const personas = asArray(state[PERSONAS_KEY])
  if (
    !personas.every((persona) =>
      wallet.personas.includes(persona as WalletPersonaId)
    )
  ) {
    return false
  }

  const devices = asArray(state[DEVICES_KEY])
  if (!devices.every((device) => wallet.devices[device as WalletDeviceId])) {
    return false
  }

  const selectedNetworks = asArray(state[NETWORKS_KEY])
  if (
    !selectedNetworks.every((network) =>
      (wallet.supported_chains as string[]).includes(network)
    )
  ) {
    return false
  }

  const purchases = asArray(state[PURCHASES_KEY])
  if (
    !purchases.every((key) => wallet[key as "buy_crypto" | "withdraw_crypto"])
  ) {
    return false
  }

  const advanced = asArray(state[ADVANCED_KEY])
  if (
    !advanced.every((flag) => (wallet.advancedFlags as string[]).includes(flag))
  ) {
    return false
  }

  // OR, unlike the AND-combined groups above.
  const languages = asArray(state[LANGUAGE_KEY])
  if (
    languages.length > 0 &&
    !languages.some((code) =>
      (wallet.languages_supported as string[]).includes(code)
    )
  ) {
    return false
  }

  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return true
  const haystack = [wallet.name, wallet.descriptionStripped ?? ""]
    .join(" ")
    .toLowerCase()
  return haystack.includes(normalizedQuery)
}

/** `?devices=ios,android&networks=OP%20Mainnet` — one comma-joined param per group. */
const readQueryFilters = (
  search: string,
  options: WalletFilterOptions,
  personas: WalletPersonaCard[]
): CatalogFilterState => {
  const params = new URLSearchParams(search)
  const state: CatalogFilterState = {}
  for (const key of ALL_FILTER_KEYS) {
    const ids = (params.get(key) ?? "")
      .split(",")
      .filter((id) => options[key].some((option) => option.id === id))
    if (ids.length) state[key] = ids
  }
  const selected = (params.get(PERSONAS_KEY) ?? "")
    .split(",")
    .filter((id) => personas.some((persona) => persona.id === id))
  if (selected.length) state[PERSONAS_KEY] = selected
  return state
}

const buildUrl = (selection: CatalogFilterState) => {
  const { pathname, hash } = window.location
  const base = pathname.replace(/\/personas\/[^/]+\/?$/, "/")
  const personas = asArray(selection[PERSONAS_KEY])
  // A single persona owns an indexable path; several have no path, so they
  // travel as a query param off the index instead of being dropped.
  const path = personas.length === 1 ? `${base}personas/${personas[0]}/` : base
  const query = [
    ...(personas.length > 1
      ? [`${PERSONAS_KEY}=${personas.map(encodeURIComponent).join(",")}`]
      : []),
    ...ALL_FILTER_KEYS.flatMap((key) => {
      const ids = asArray(selection[key])
      return ids.length
        ? [`${key}=${ids.map(encodeURIComponent).join(",")}`]
        : []
    }),
  ].join("&")
  return path + (query ? `?${query}` : "") + hash
}

const WalletsResults = memo(function WalletsResults({
  wallets,
  filtered,
  revealAll,
  deviceLabels,
  personaLabels,
  onOpen,
}: {
  wallets: CatalogWalletCard[]
  filtered: CatalogWalletCard[]
  /** False until the visitor interacts: only the matches are in the DOM. */
  revealAll: boolean
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
  onOpen: (slug: string) => void
}) {
  // Once revealed, every wallet renders once and filtering toggles `hidden`:
  // no remounts.
  const visibleSlugs = useMemo(
    () => new Set(filtered.map((wallet) => wallet.slug)),
    [filtered]
  )
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
      {(revealAll ? wallets : filtered).map((wallet) => (
        <div key={wallet.slug} hidden={!visibleSlugs.has(wallet.slug)}>
          <WalletCard
            wallet={wallet}
            deviceLabels={deviceLabels}
            personaLabels={personaLabels}
            onOpen={onOpen}
          />
        </div>
      ))}
    </div>
  )
})

export default function WalletsCatalog({
  locale,
  wallets,
  filterOptions,
  personas,
  initialPersonaId,
  labels,
}: WalletsCatalogProps) {
  const [selection, setSelection] = useState<CatalogFilterState>(() =>
    initialPersonaId ? { [PERSONAS_KEY]: [initialPersonaId] } : {}
  )
  // Seeded like the SSR pass so the persona counts hydrate without a mismatch.
  const [filtered, setFiltered] = useState(() =>
    wallets.filter((wallet) => filterWallet(wallet, selection, ""))
  )
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  // A persona page renders only its own wallets until the visitor touches the
  // page. Crawlers render the HTML but never interact, so they index the
  // subset the page is about; anything time-based would defeat that.
  const [revealAll, setRevealAll] = useState(!initialPersonaId)
  const urlRead = useRef(false)

  useEffect(() => {
    if (revealAll) return
    const reveal = () => startTransition(() => setRevealAll(true))
    const options = { once: true, passive: true } as const
    window.addEventListener("pointerdown", reveal, options)
    window.addEventListener("keydown", reveal, options)
    return () => {
      window.removeEventListener("pointerdown", reveal)
      window.removeEventListener("keydown", reveal)
    }
  }, [revealAll])

  // Read from window.location, not useSearchParams: the latter would force this
  // static page into client-side rendering. replaceState, never push: a pushed
  // entry would make Back a real route change.
  useEffect(() => {
    if (!urlRead.current) {
      urlRead.current = true
      const fromUrl = readQueryFilters(
        window.location.search,
        filterOptions,
        personas
      )
      if (Object.keys(fromUrl).length) {
        setSelection((prev) => ({ ...prev, ...fromUrl }))
        return
      }
    }
    const url = buildUrl(selection)
    const { pathname, search, hash } = window.location
    if (url !== pathname + search + hash) {
      window.history.replaceState(null, "", url)
    }
  }, [selection, filterOptions, personas])

  const selectedPersonas = asArray(selection[PERSONAS_KEY]) as WalletPersonaId[]

  // Old-arm semantics: how many of the currently visible wallets also fit.
  const personaCounts = useMemo(() => {
    const counts = {} as Record<WalletPersonaId, number>
    for (const persona of personas) {
      counts[persona.id] = filtered.filter((wallet) =>
        wallet.personas.includes(persona.id)
      ).length
    }
    return counts
  }, [filtered, personas])

  const onTogglePersona = useCallback(
    (persona: WalletPersonaCard) => {
      const selecting = !selectedPersonas.includes(persona.id)
      setSelection((prev) => ({
        ...prev,
        [PERSONAS_KEY]: toggleId(asArray(prev[PERSONAS_KEY]), persona.id),
      }))
      // Same triple as the old preset cards so persona engagement stays comparable.
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: persona.title,
        eventName: `${persona.title} ${selecting}`,
      })
    },
    [selectedPersonas]
  )

  // Empty-state reset: sidebar groups and search only; personas stay.
  const onReset = useCallback(() => {
    setSelection((prev) => {
      const next = { ...prev }
      for (const key of ALL_FILTER_KEYS) delete next[key]
      return next
    })
    trackEmptyStateReset()
  }, [])

  // The click paints immediately; the Dialog and its tooltips mount in a
  // transition, like the intercepted route used to.
  const openWalletModal = useCallback(
    (slug: string) => startTransition(() => setOpenSlug(slug)),
    []
  )

  const openWallet = openSlug
    ? wallets.find((wallet) => wallet.slug === openSlug)
    : undefined

  return (
    <>
      <Section>
        <WalletPersonaCards
          locale={locale}
          personas={personas}
          counts={personaCounts}
          selected={selectedPersonas}
          onToggle={onTogglePersona}
          labels={labels.personaCards}
        />
      </Section>

      <Section id="wallets" className="mt-10 px-page lg:mt-16">
        <h2 className="sr-only select-none">{labels.tableTitle}</h2>
        <FilterableCatalog
          locale={locale}
          items={wallets}
          filterFn={filterWallet}
          selection={selection}
          onSelectionChange={setSelection}
          onFilteredChange={setFiltered}
          mobileVariant="sheet"
          labels={labels.catalog}
          onReset={onReset}
          renderSidebarHeader={({ state, setFilter }) => (
            <WalletFiltersHeader
              state={state}
              setFilter={setFilter}
              labels={labels.header}
            />
          )}
          renderSidebar={({ state, setFilter }) => (
            <WalletFilters
              locale={locale}
              state={state}
              setFilter={setFilter}
              deviceOptions={filterOptions[DEVICES_KEY]}
              purchaseOptions={filterOptions[PURCHASES_KEY]}
              networkOptions={filterOptions[NETWORKS_KEY]}
              languageOptions={filterOptions[LANGUAGE_KEY]}
              advancedOptions={filterOptions[ADVANCED_KEY]}
              labels={labels.filter}
            />
          )}
          renderResults={(filtered) => (
            <WalletsResults
              wallets={wallets}
              filtered={filtered}
              revealAll={revealAll}
              deviceLabels={labels.devices}
              personaLabels={labels.personas}
              onOpen={openWalletModal}
            />
          )}
        />
      </Section>

      {openWallet && (
        <WalletDetailModal
          wallet={openWallet}
          labels={labels.modal}
          deviceLabels={labels.devices}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  )
}
