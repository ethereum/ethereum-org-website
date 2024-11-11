import { useMemo, useState } from "react"

import { FilterOption, Lang } from "@/lib/types"

import { useNetworkColumns } from "@/components/Layer2NetworksTable/hooks/useNetworkColumns"
import { useNetworkFilters } from "@/components/Layer2NetworksTable/hooks/useNetworkFilters"
import NetworkSubComponent from "@/components/Layer2NetworksTable/NetworksSubcomponent"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { Rollups } from "@/data/layer-2/layer-2"

const Layer2NetworksTable = ({
  layer2Data,
  locale,
}: {
  layer2Data: Rollups
  locale: Lang
}) => {
  // const walletPersonas = useWalletPersonaPresets()
  // TODO: Implement
  const networkFilterOptions = useNetworkFilters()
  const [filters, setFilters] = useState<FilterOption[]>(networkFilterOptions)

  const filteredData = useMemo(() => {
    return layer2Data.filter((network) => {
      const maturityFilter = filters[0].items.find(
        (item) => item.filterKey === network.networkMaturity
      )
      return maturityFilter.inputState
    })
  }, [layer2Data, filters])

  const resetFilters = () => {
    setFilters(networkFilterOptions)
    trackCustomEvent({
      eventCategory: "Layer2NetworksTable",
      eventAction: "Reset button",
      eventName: "reset_click",
    })
  }

  return (
    <ProductTable
      meta={{
        locale: locale,
      }}
      columns={useNetworkColumns}
      data={filteredData}
      allDataLength={layer2Data.length}
      filters={filters}
      presetFilters={[]}
      resetFilters={resetFilters}
      setFilters={setFilters}
      subComponent={(network) => {
        return <NetworkSubComponent network={network} />
      }}
      noResultsComponent={() => <></>}
      mobileFiltersLabel={"See networks"}
    />
  )
}

export default Layer2NetworksTable
