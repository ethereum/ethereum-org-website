import { useState } from "react"

import type { ProductTablePresetFilters, TPresetFilters } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import PresetFilters from "@/components/ProductTable/PresetFilters"

interface ProductTableProps<TData> {
  filters: unknown
  filtersDefault: unknown
  presetFilters: TPresetFilters<TData>[]
}

const ProductTable = ({
  filters,
  filtersDefault,
  presetFilters,
}: ProductTableProps<ProductTablePresetFilters>) => {
  const [activePresetIndex, setActivePresetIndex] = useState(NaN)
  const [activeFilters, setActiveFilters] = useState(filtersDefault)

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
        <Filters
          activeFilters={activeFilters}
          filters={filters}
          setActiveFilters={setActiveFilters}
        />
        <div>Table</div>
      </div>
    </div>
  )
}

export default ProductTable
