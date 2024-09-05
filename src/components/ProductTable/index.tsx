import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useRouter } from "next/router"
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
import { Button } from "@/components/ui/buttons/Button"

interface ProductTableProps<TData, TValue, TPreset> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filters: FilterOption[]
  presetFilters: TPresetFilters<TPreset>[]
  resetFilters: () => void
  setFilters: Dispatch<SetStateAction<FilterOption[]>>
  subComponent?: FC<TData>
}

const ProductTable = ({
  columns,
  data,
  filters,
  presetFilters,
  resetFilters,
  setFilters,
  subComponent,
}: ProductTableProps<
  ProductTableRow,
  ProductTableColumnDefs,
  ProductTablePresetFilters
>) => {
  const router = useRouter()
  const [activePresets, setActivePresets] = useState<number[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Update filters based on router query
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const updatedFilters = filters.map((filter) => ({
        ...filter,
        items: filter.items.map((item) => ({
          ...item,
          inputState: Object.keys(router.query).includes(item.filterKey)
            ? true
            : item.inputState,
          options: item.options.map((option) => ({
            ...option,
            inputState: Object.keys(router.query).includes(option.filterKey)
              ? true
              : option.inputState,
          })),
        })),
      }))
      setFilters(updatedFilters)
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [router])

  // Update or remove preset filters
  const handleSelectPreset = (idx: number) => {
    if (activePresets.includes(idx)) {
      // Get filters that are true for the preset being removed
      const presetToRemove = presetFilters[idx].presetFilters
      const filtersToRemove = Object.keys(presetToRemove).filter(
        (key) => presetToRemove[key]
      )

      // Set inputState of filters to false for the filters being removed
      const updatedFilters = filters.map((filter) => ({
        ...filter,
        items: filter.items.map((item) => ({
          ...item,
          inputState: filtersToRemove.includes(item.filterKey)
            ? false
            : item.inputState,
          options: item.options.map((option) => ({
            ...option,
            inputState: filtersToRemove.includes(option.filterKey)
              ? false
              : option.inputState,
          })),
        })),
      }))
      setFilters(updatedFilters)

      setActivePresets(activePresets.filter((item) => item !== idx))
    } else {
      const newActivePresets = activePresets.concat(idx)
      setActivePresets(newActivePresets)

      // Apply the filters for the selected preset
      const combinedPresetFilters = newActivePresets.reduce((acc, idx) => {
        const preset = presetFilters[idx].presetFilters
        Object.keys(preset).forEach((key) => {
          acc[key] = acc[key] || preset[key]
        })
        return acc
      }, {})

      const updatedFilters = filters.map((filter) => ({
        ...filter,
        items: filter.items.map((item) => ({
          ...item,
          // Keep existing inputState if true, otherwise apply preset filter
          inputState:
            item.inputState ||
            (item.ignoreFilterReset
              ? item.inputState
              : combinedPresetFilters[item.filterKey] || false),
          options: item.options.map((option) => ({
            ...option,
            // Keep existing inputState if true, otherwise apply preset filter
            inputState:
              option.inputState ||
              (option.ignoreFilterReset
                ? option.inputState
                : combinedPresetFilters[option.filterKey] || false),
          })),
        })),
      }))
      setFilters(updatedFilters)
    }
  }

  // Update activePresets based on current filters
  useEffect(() => {
    const currentFilters = {}

    filters.forEach((filter) => {
      filter.items.forEach((item) => {
        if (item.inputState === true) {
          currentFilters[item.filterKey] = item.inputState
        }

        if (item.options && item.options.length > 0) {
          item.options.forEach((option) => {
            if (option.inputState === true) {
              currentFilters[option.filterKey] = option.inputState
            }
          })
        }
      })
    })

    const presetsToApply = presetFilters.reduce<number[]>(
      (acc, preset, idx) => {
        const presetFilters = preset.presetFilters
        const activePresetKeys = Object.keys(presetFilters).filter(
          (key) => presetFilters[key]
        )
        const allItemsInCurrentFilters = activePresetKeys.every(
          (key) => currentFilters[key] !== undefined
        )

        if (allItemsInCurrentFilters) {
          acc.push(idx)
        }
        return acc
      },
      []
    )

    setActivePresets((prevActivePresets) => {
      const newActivePresets = [
        ...new Set([...prevActivePresets, ...presetsToApply]),
      ]
      return newActivePresets.filter((idx) => presetsToApply.includes(idx))
    })
  }, [filters, presetFilters])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    return filters.reduce((count, filter) => {
      return (
        count +
        filter.items.reduce((itemCount, item) => {
          if (item.options && item.options.length > 0) {
            return (
              itemCount +
              item.options.filter(
                (option) =>
                  typeof option.inputState === "boolean" && option.inputState
              ).length
            )
          }
          return (
            itemCount +
            (typeof item.inputState === "boolean" && item.inputState ? 1 : 0)
          )
        }, 0)
      )
    }, 0)
  }, [filters])

  return (
    <div className="px-0 lg:px-4">
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          activePresets={activePresets}
          handleSelectPreset={handleSelectPreset}
        />
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-4 pb-6 pt-4 lg:flex-row lg:gap-6 2xl:px-0">
        <div className="block lg:hidden">
          <MobileFilters
            filters={filters}
            setFilters={setFilters}
            presets={presetFilters}
            activePresets={activePresets}
            handleSelectPreset={handleSelectPreset}
            dataCount={data.length}
            activeFiltersCount={activeFiltersCount}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            resetFilters={resetFilters}
          />
        </div>
        <div className="hidden lg:block">
          <Filters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-row items-center justify-between px-2 py-1">
            <Button
              variant="ghost"
              className="block p-0 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <p className="text-md">{`Filters (${activeFiltersCount})`}</p>
            </Button>
            <p>
              Showing all wallets (<b>{data.length}</b>)
            </p>
          </div>
          <Table
            columns={columns}
            data={data}
            subComponent={subComponent}
            resetFilters={resetFilters}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductTable
