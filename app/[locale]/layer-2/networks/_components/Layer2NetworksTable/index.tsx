"use client"
import { useTranslations } from "next-intl"

import { ExtendedRollup, FilterOption, Lang } from "@/lib/types"

import DataTable from "@/components/DataTable"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useNetworkColumns } from "./hooks/useNetworkColumns"
import { useNetworkFilters } from "./hooks/useNetworkFilters"
import NetworksNoResults from "./NetworksNoResults"
import NetworkSubComponent from "./NetworksSubComponent"

const Layer2NetworksTable = ({
  layer2Data,
  locale,
  mainnetData,
}: {
  layer2Data: ExtendedRollup[]
  locale: Lang
  mainnetData: ExtendedRollup
}) => {
  const networkFilterOptions = useNetworkFilters()
  const t = useTranslations("page-layer-2-networks")

  const networks = [mainnetData, ...layer2Data].map((network) => ({
    ...network,
    id: network.name,
  }))

  const filterFn = (
    networks: (ExtendedRollup & { id: string })[],
    filters: FilterOption[]
  ) => {
    return networks
      .filter((network) => {
        if (network.name === mainnetData.name) return true

        const maturityFilter = filters[1].items.find(
          (item) => item.filterKey === network.networkMaturity
        )
        return maturityFilter!.inputState
      })
      .filter((network) => {
        if (filters[0].items[0].inputState === "") return true
        return network.walletsSupported.includes(
          filters[0].items[0].inputState as string
        )
      })
  }

  return (
    <ProductTable<ExtendedRollup & { id: string }>
      data={networks}
      filters={networkFilterOptions}
      presetFilters={[]}
      filterFn={filterFn}
      mobileFiltersLabel={t("page-layer-2-networks-transaction-see-networks")}
    >
      {({
        filteredData,
        setMobileFiltersOpen,
        resetFilters,
        activeFiltersCount,
      }) => (
        <DataTable<ExtendedRollup & { id: string }, unknown>
          variant="product"
          data={filteredData}
          columns={useNetworkColumns}
          subComponent={(network) => <NetworkSubComponent network={network} />}
          noResultsComponent={() => (
            <NetworksNoResults
              resetFilters={() => {
                resetFilters()
                trackCustomEvent({
                  eventCategory: "Layer2NetworksTable",
                  eventAction: "Reset button",
                  eventName: "reset_click",
                })
              }}
            />
          )}
          matomoEventCategory="l2_networks"
          allDataLength={layer2Data.length}
          activeFiltersCount={activeFiltersCount}
          setMobileFiltersOpen={setMobileFiltersOpen}
          meta={{
            locale: locale,
          }}
        />
      )}
    </ProductTable>
  )
}

export default Layer2NetworksTable
