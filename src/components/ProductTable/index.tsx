import { useEffect, useState } from "react"

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
  const [activePresets, setActivePresets] = useState<number[]>([])
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions)

  const handleSelectPreset = (idx: number) => {
    if (activePresets.includes(idx)) {
      setActivePresets(activePresets.filter((item) => item !== idx))
    } else {
      setActivePresets(activePresets.concat(idx))
    }
  }

  useEffect(() => {
    const combinedPresetFilters = activePresets.reduce((combined, preset) => {
      const updatedFilters = { ...combined }
      Object.entries(presetFilters[preset].presetFilters).forEach(
        ([name, value]) => {
          if (!updatedFilters[name]) {
            updatedFilters[name] = value
          }
          if (value === true) {
            updatedFilters[name] = value
          }
        }
      )
      return updatedFilters
    }, {})

    const filtersUpdated = [...filters]
    filtersUpdated.forEach((group) => {
      group.items.forEach((item) => {
        if (item.options.length) {
          item.options.forEach((option) => {
            option.inputState = combinedPresetFilters[option.filterKey]
          })
        } else {
          item.inputState = combinedPresetFilters[item.filterKey]
        }
      })
    })

    setFilters(filtersUpdated)
  }, [presetFilters, activePresets])

  return (
    <div className="px-4">
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          activePresets={activePresets}
          handleSelectPreset={handleSelectPreset}
        />
      ) : (
        <></>
      )}
      <div className="flex gap-6 pb-6 pt-4 2xl:px-0">
        <Filters filters={filters} setFilters={setFilters} />
        <div>Columns and data driven heref</div>
      </div>
    </div>
  )
}

export default ProductTable
