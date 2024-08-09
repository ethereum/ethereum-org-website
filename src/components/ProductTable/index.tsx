import { useState } from "react"

import type { TPresetFilters } from "@/lib/types"

import PresetFilters from "@/components/ProductTable/PresetFilters"

interface ProductTableProps<TData> {
  presetFilters: TPresetFilters<TData>[]
}

const ProductTable = ({ presetFilters }: ProductTableProps<object>) => {
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
      <div className="flex">
        <div>Filters</div>
        <div>Table</div>
      </div>
    </div>
  )
}

export default ProductTable
