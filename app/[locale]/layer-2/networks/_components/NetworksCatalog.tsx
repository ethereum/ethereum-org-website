"use client"

import { memo, useCallback } from "react"

import type { MaturityLevel } from "@/lib/types"

import { useCatalogModal } from "@/components/CatalogDetailModal"
import FilterableCatalog, {
  type FilterableCatalogLabels,
} from "@/components/FilterableCatalog"
import CatalogFiltersHeader from "@/components/FilterableCatalog/CatalogFiltersHeader"
import type { CatalogSelectOption } from "@/components/FilterableCatalog/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import {
  filterNetwork,
  getNetworkHref,
  MAINNET_ID,
  NETWORK_FILTER_KEYS,
  type NetworkCardData,
  WALLET_KEY,
} from "@/lib/utils/networkData"

import NetworkCard from "./NetworkCard"
import NetworkDetailModal, {
  type NetworkModalLabels,
} from "./NetworkDetailModal"
import NetworkFilters, { type NetworkFiltersLabels } from "./NetworkFilters"

/** Built on the server so no i18n runtime ships to the browser. */
export type NetworksCatalogLabels = {
  catalog: FilterableCatalogLabels
  header: { filters: string; reset: string }
  filter: NetworkFiltersLabels
  modal: NetworkModalLabels
  maturity: Partial<Record<MaturityLevel, string>>
  mainNetwork: string
  walletsCount: string
}

type NetworksCatalogProps = {
  locale: string
  mainnet: NetworkCardData
  networks: NetworkCardData[]
  walletOptions: CatalogSelectOption[]
  maturityOptions: CatalogSelectOption[]
  labels: NetworksCatalogLabels
}

const trackHeaderReset = () =>
  trackCustomEvent({
    eventCategory: "l2_networks",
    eventAction: "reset",
    eventName: "reset_click",
  })

const NetworksResults = memo(function NetworksResults({
  mainnet,
  networks,
  labels,
  onOpen,
}: {
  mainnet: NetworkCardData
  networks: NetworkCardData[]
  labels: NetworksCatalogLabels
  onOpen: (id: string) => void
}) {
  const card = (network: NetworkCardData) => (
    <NetworkCard
      key={network.slug ?? MAINNET_ID}
      network={network}
      maturityLabel={
        network.maturity
          ? (labels.maturity[network.maturity] ?? "")
          : labels.mainNetwork
      }
      walletsCount={labels.walletsCount}
      href={network.slug && getNetworkHref(network.slug)}
      onOpen={() => onOpen(network.slug ?? MAINNET_ID)}
    />
  )

  // Mainnet is the pinned reference: outside the filtered list and its count.
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
      {card(mainnet)}
      {networks.map(card)}
    </div>
  )
})

export default function NetworksCatalog({
  locale,
  mainnet,
  networks,
  walletOptions,
  maturityOptions,
  labels,
}: NetworksCatalogProps) {
  const { openId, open, close } = useCatalogModal()
  const openNetwork =
    openId === MAINNET_ID
      ? mainnet
      : networks.find((network) => network.slug === openId)

  const renderResults = useCallback(
    (filtered: NetworkCardData[]) => (
      <NetworksResults
        mainnet={mainnet}
        networks={filtered}
        labels={labels}
        onOpen={open}
      />
    ),
    [mainnet, labels, open]
  )

  return (
    <>
      <FilterableCatalog
        locale={locale}
        items={networks}
        filterFn={filterNetwork}
        mobileVariant="sheet"
        urlParamKey={WALLET_KEY}
        labels={labels.catalog}
        renderSidebarHeader={({ state, setFilter }) => (
          <CatalogFiltersHeader
            state={state}
            setFilter={setFilter}
            keys={NETWORK_FILTER_KEYS}
            labels={labels.header}
            onReset={trackHeaderReset}
          />
        )}
        renderSidebar={({ state, setFilter }) => (
          <NetworkFilters
            locale={locale}
            state={state}
            setFilter={setFilter}
            walletOptions={walletOptions}
            maturityOptions={maturityOptions}
            labels={labels.filter}
          />
        )}
        renderResults={renderResults}
      />

      {openNetwork && (
        <NetworkDetailModal
          network={openNetwork}
          maturityLabel={
            openNetwork.maturity
              ? (labels.maturity[openNetwork.maturity] ?? "")
              : labels.mainNetwork
          }
          labels={labels.modal}
          fullDetailsHref={openNetwork.slug && getNetworkHref(openNetwork.slug)}
          onClose={close}
          // Radix aims focus at whatever was focused when the dialog mounted,
          // which lands on the body here; put the visitor back on the card.
          onCloseAutoFocus={(event) => {
            const card = document.querySelector<HTMLElement>(
              `[data-network-card="${openId}"]`
            )
            if (!card) return
            event.preventDefault()
            card.focus()
          }}
        />
      )}
    </>
  )
}
