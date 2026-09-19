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
import { asArray } from "@/components/FilterableCatalog/utils"
import { Section } from "@/components/ui/section"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { numberFormat } from "@/lib/utils/numbers"
import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { WALLET_DEVICE_IDS, type WalletDeviceId } from "@/data/wallets/devices"
import { WALLET_PERSONAS, type WalletPersonaId } from "@/data/wallets/personas"

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

/** Built on the server: stable references keep the memoized filter groups quiet. */
export type WalletFilterOptions = Record<
  (typeof ALL_FILTER_KEYS)[number],
  WalletFilterOption[]
>

type WalletsCatalogProps = {
  locale: string
  wallets: CatalogWalletCard[]
  filterOptions: WalletFilterOptions
  personas: WalletPersonaCard[]
  /** Set by the persona pages: seeds the base filters and stays out of the query. */
  initialPersonaId?: WalletPersonaId
  labels: WalletCatalogLabels
}

function filterWallet(
  wallet: CatalogWalletCard,
  state: CatalogFilterState,
  query: string
) {
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

/**
 * A persona is a shortcut over the base filters, not a filter of its own: it
 * checks its features in the sidebar and reads as selected while they all
 * are. `hardware` is a device; every other persona feature is an advanced flag.
 */
const slotOf = (feature: string) =>
  (WALLET_DEVICE_IDS as string[]).includes(feature) ? DEVICES_KEY : ADVANCED_KEY

const PERSONA_FEATURES = {} as Record<WalletPersonaId, readonly string[]>
for (const persona of WALLET_PERSONAS) {
  PERSONA_FEATURES[persona.id] = persona.features
}

const hasPersona = (state: CatalogFilterState, id: WalletPersonaId) =>
  PERSONA_FEATURES[id].every((feature) =>
    asArray(state[slotOf(feature)]).includes(feature)
  )

const addPersona = (state: CatalogFilterState, id: WalletPersonaId) => {
  const next = { ...state }
  for (const feature of PERSONA_FEATURES[id]) {
    const slot = slotOf(feature)
    const ids = asArray(next[slot])
    if (!ids.includes(feature)) next[slot] = [...ids, feature]
  }
  return next
}

/** Drops the persona's features, except those another selected persona still needs. */
const removePersona = (state: CatalogFilterState, id: WalletPersonaId) => {
  const keep = new Set(
    WALLET_PERSONAS.filter(
      (persona) => persona.id !== id && hasPersona(state, persona.id)
    ).flatMap((persona) => persona.features)
  )
  const next = { ...state }
  for (const feature of PERSONA_FEATURES[id]) {
    if (keep.has(feature)) continue
    const slot = slotOf(feature)
    next[slot] = asArray(next[slot]).filter((existing) => existing !== feature)
  }
  return next
}

const sameSelection = (a: CatalogFilterState, b: CatalogFilterState) =>
  ALL_FILTER_KEYS.every(
    (key) =>
      String([...asArray(a[key])].sort()) ===
      String([...asArray(b[key])].sort())
  )

/** `?devices=ios,android` per group; null when none of our keys is present. */
const readQueryFilters = (
  search: string,
  options: WalletFilterOptions
): CatalogFilterState | null => {
  const params = new URLSearchParams(search)
  const state: CatalogFilterState = {}
  let explicit = false
  for (const key of ALL_FILTER_KEYS) {
    if (!params.has(key)) continue
    explicit = true
    const ids = (params.get(key) ?? "")
      .split(",")
      .filter((id) => options[key].some((option) => option.id === id))
    if (ids.length) state[key] = ids
  }
  return explicit ? state : null
}

/** Only the query moves, and only once the selection diverges from the seed. */
const buildUrl = (selection: CatalogFilterState, seed: CatalogFilterState) => {
  const { pathname, search, hash } = window.location
  // Keep params we do not own (utm_*, gclid): deferred matomo.js reads them later.
  const params = new URLSearchParams(search)
  const explicit = !sameSelection(selection, seed)
  for (const key of ALL_FILTER_KEYS) {
    const ids = asArray(selection[key])
    if (explicit && ids.length) params.set(key, ids.join(","))
    else if (explicit && asArray(seed[key]).length) params.set(key, "")
    else params.delete(key)
  }
  // Commas are legal unencoded; %2C everywhere makes a shared link unreadable.
  const query = params.toString().replace(/%2C/g, ",")
  return pathname + (query ? `?${query}` : "") + hash
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
  // What this page starts with; the query only records divergence from it.
  const seed = useMemo<CatalogFilterState>(
    () => (initialPersonaId ? addPersona({}, initialPersonaId) : {}),
    [initialPersonaId]
  )
  const [selection, setSelection] = useState(seed)
  // Seeded like the SSR pass so the persona counts hydrate without a mismatch.
  const [filtered, setFiltered] = useState(() =>
    wallets.filter((wallet) => filterWallet(wallet, selection, ""))
  )
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  // Persona pages render only their subset until interaction, so crawlers index it.
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
  // static page into client-side rendering. Filters replaceState, never push: an
  // entry per filter change would bury the previous page under history.
  useEffect(() => {
    if (!urlRead.current) {
      urlRead.current = true
      const fromUrl = readQueryFilters(window.location.search, filterOptions)
      if (fromUrl) {
        setSelection(fromUrl)
        return
      }
    }
    const url = buildUrl(selection, seed)
    const { pathname, search, hash } = window.location
    if (url !== pathname + search + hash) {
      window.history.replaceState(window.history.state, "", url)
    }
  }, [selection, seed, filterOptions])

  const selectedPersonas = useMemo(
    () =>
      personas
        .filter((persona) => hasPersona(selection, persona.id))
        .map((persona) => persona.id),
    [personas, selection]
  )

  // Old-arm semantics: how many of the currently visible wallets also fit.
  const personaCounts = useMemo(() => {
    const nf = numberFormat(locale)
    const counts = {} as Record<WalletPersonaId, string>
    for (const persona of personas) {
      counts[persona.id] = nf.format(
        filtered.filter((wallet) => wallet.personas.includes(persona.id)).length
      )
    }
    return counts
  }, [filtered, locale, personas])

  const onTogglePersona = useCallback(
    (persona: WalletPersonaCard) => {
      const selecting = !selectedPersonas.includes(persona.id)
      setSelection((prev) =>
        selecting
          ? addPersona(prev, persona.id)
          : removePersona(prev, persona.id)
      )
      // Same triple as the old preset cards so persona engagement stays comparable.
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: persona.title,
        eventName: `${persona.title} ${selecting}`,
      })
    },
    [selectedPersonas]
  )

  // Empty-state reset clears every base filter; the persona cards follow, being derived.
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

  const closeWalletModal = useCallback(() => {
    setOpenSlug(null)
    // Drop the entry we pushed, or Back would have to be pressed twice.
    if (window.history.state?.walletModal) window.history.back()
  }, [])

  // Extra entry so Back closes the modal. Pushed a frame late (pushState inside
  // the click costs +500ms INP) via the native method (Next patches the other).
  useEffect(() => {
    if (!openSlug) return
    const frame = requestAnimationFrame(() => {
      History.prototype.pushState.call(
        window.history,
        { ...window.history.state, walletModal: openSlug },
        "",
        window.location.href
      )
    })
    const close = () => setOpenSlug(null)
    window.addEventListener("popstate", close)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("popstate", close)
    }
  }, [openSlug])

  const openWallet = openSlug
    ? wallets.find((wallet) => wallet.slug === openSlug)
    : undefined

  return (
    <>
      <Section>
        <WalletPersonaCards
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
          onClose={closeWalletModal}
        />
      )}
    </>
  )
}
