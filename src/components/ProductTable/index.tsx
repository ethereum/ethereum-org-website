import { useEffect, useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"

import type {
  FilterOption,
  ProductTableColumnDefs,
  ProductTablePresetFilters,
  ProductTableRow,
  TPresetFilters,
} from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import MobileFilters from "@/components/ProductTable/MobileFilters"
import PresetFilters from "@/components/ProductTable/PresetFilters"
import Table from "@/components/ProductTable/Table"

interface ProductTableProps<TData, TValue, TPreset> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterOptions: FilterOption[]
  presetFilters: TPresetFilters<TPreset>[]
  subComponent?: React.FC<TData>
}

const ProductTable = ({
  columns,
  data,
  filterOptions,
  presetFilters,
  subComponent,
}: ProductTableProps<
  ProductTableRow,
  ProductTableColumnDefs,
  ProductTablePresetFilters
>) => {
  const [activePresets, setActivePresets] = useState<number[]>([])
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions)

  const handleSelectPreset = (idx: number) => {
    if (activePresets.includes(idx)) {
      setActivePresets(activePresets.filter((item) => item !== idx))
    } else {
      setActivePresets(activePresets.concat(idx))
    }
  }

  // TODO: Fix this, its currently not applying presets correctly when there are none applied
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
        }
        item.inputState = combinedPresetFilters[item.filterKey]
      })
    })

    setFilters(filtersUpdated)
  }, [presetFilters, activePresets])

  const activeFiltersCount = useMemo(() => {
    return filters.reduce((count, filter) => {
      return (
        count +
        filter.items.reduce((itemCount, item) => {
          if (item.options && item.options.length > 0) {
            return (
              itemCount +
              item.options.filter((option) => option.inputState).length
            )
          }
          return itemCount + (item.inputState ? 1 : 0)
        }, 0)
      )
    }, 0)
  }, [filters])

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
      <div className="flex flex-col gap-6 pb-6 pt-4 lg:flex-row 2xl:px-0">
        <div className="block lg:hidden">
          <MobileFilters
            filters={filters}
            setFilters={setFilters}
            presets={presetFilters}
            activePresets={activePresets}
            handleSelectPreset={handleSelectPreset}
            dataCount={data.length}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        <div className="hidden lg:block">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1">
          <Table columns={columns} data={data} subComponent={subComponent} />
        </div>
      </div>
    </div>
  )
}

export default ProductTable
