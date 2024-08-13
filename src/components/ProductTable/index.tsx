import { useState } from "react"

import type {
  FilterOption,
  ProductTablePresetFilters,
  TPresetFilters,
} from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import PresetFilters from "@/components/ProductTable/PresetFilters"

interface ProductTableProps<TData> {
  filterOptions: FilterOption[]
  presetFilters: TPresetFilters<TData>[]
}

const ProductTable = ({
  filterOptions,
  presetFilters,
}: ProductTableProps<ProductTablePresetFilters>) => {
  const [activePresetIndex, setActivePresetIndex] = useState(NaN)
  const [filters, setFilters] = useState(filterOptions)

  return (
    <div className="px-4">
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          activePresetIndex={activePresetIndex}
          setActivePresetIndex={setActivePresetIndex}
        />
      ) : (
        <></>
      )}
      <div className="flex gap-6 pb-6 pt-4 2xl:px-0">
        <Filters filters={filters} setFilters={setFilters} />
        <div>Table</div>
      </div>
    </div>
  )
}

export default ProductTable
