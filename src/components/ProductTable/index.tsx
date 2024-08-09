import { useState } from "react"

import type { ProductTablePresetFilters, TPresetFilters } from "@/lib/types"

import PresetFilters from "@/components/ProductTable/PresetFilters"

interface ProductTableProps<TData> {
  presetFilters: TPresetFilters<TData>[]
}

const ProductTable = ({
  presetFilters,
}: ProductTableProps<ProductTablePresetFilters>) => {
  const [activePresetIndex, setActivePresetIndex] = useState(NaN)

  return (
    <div>
      {presetFilters.length ? (
        <div className="flex">
          <PresetFilters
            presets={presetFilters}
            activePresetIndex={activePresetIndex}
            setActivePresetIndex={setActivePresetIndex}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-6 px-4 pb-6 pt-4 2xl:px-0">
        <div>Filters</div>
        <div>Table</div>
      </div>
    </div>
  )
}

export default ProductTable
