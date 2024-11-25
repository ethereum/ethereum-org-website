import { useMemo, useState } from "react"

import { ExtendedRollup, FilterOption, Lang } from "@/lib/types"

import { useNetworkColumns } from "@/components/Layer2NetworksTable/hooks/useNetworkColumns"
import { useNetworkFilters } from "@/components/Layer2NetworksTable/hooks/useNetworkFilters"
import NetworkSubComponent from "@/components/Layer2NetworksTable/NetworksSubComponent"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

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
  const [filters, setFilters] = useState<FilterOption[]>(networkFilterOptions)

  const filteredData = useMemo(() => {
    const filteredData = layer2Data
      .filter((network) => {
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

    return [mainnetData, ...filteredData]
  }, [layer2Data, mainnetData, filters])

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
