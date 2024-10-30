import { useState } from "react"

import { FilterOption } from "@/lib/types"

import { useNetworkFilters } from "@/components/Layer2NetworksTable/hooks/useNetworkFilters"
import ProductTable from "@/components/ProductTable"

import type { Rollups } from "@/data/layer-2/layer-2"

const Layer2NetworksTable = ({ layer2Data }: { layer2Data: Rollups }) => {
  // const walletPersonas = useWalletPersonaPresets()
  // TODO: Implement
  const networkFilterOptions = useNetworkFilters()
  const [filters, setFilters] = useState<FilterOption[]>([])

  const resetFilters = () => {
    setFilters(networkFilterOptions)

    // TODO: Add event tracking
    // trackCustomEvent({
    //   eventCategory: "Layer2NetworksTable",
    //   eventAction: "Reset button",
    //   eventName: "reset_click",
    // })
  }

  return (
    <ProductTable
      columns={[]}
      data={layer2Data}
      allDataLength={layer2Data.length}
      filters={filters}
      presetFilters={[]}
      resetFilters={resetFilters}
      setFilters={setFilters}
      subComponent={(wallet, listIdx) => {
        console.log(wallet, listIdx)
        return <></>
      }}
      noResultsComponent={() => <></>}
      mobileFiltersLabel={"See networks"}
    />
  )
}

export default Layer2NetworksTable
