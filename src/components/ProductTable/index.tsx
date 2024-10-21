import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { ColumnDef } from "@tanstack/react-table"

import type {
  FilterOption,
  ProductTableColumnDefs,
  ProductTableRow,
  TPresetFilters,
} from "@/lib/types"

import Table from "@/components/DataTable"
import Filters from "@/components/ProductTable/Filters"
import MobileFilters from "@/components/ProductTable/MobileFilters"
import PresetFilters from "@/components/ProductTable/PresetFilters"
import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

interface ProductTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  allDataLength: number
  filters: FilterOption[]
  presetFilters: TPresetFilters
  resetFilters: () => void
  setFilters: Dispatch<SetStateAction<FilterOption[]>>
  subComponent?: FC<TData>
  noResultsComponent?: React.FC
  mobileFiltersLabel: string
}

const ProductTable = ({
  columns,
  data,
  allDataLength,
  filters,
  presetFilters,
  resetFilters,
  setFilters,
  subComponent,
  noResultsComponent,
  mobileFiltersLabel,
}: ProductTableProps<ProductTableRow, ProductTableColumnDefs>) => {
  const router = useRouter()
  const { t } = useTranslation("table")
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
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: `${presetFilters[idx].title}`,
        eventName: `${presetFilters[idx].title} false`,
      })
      // Get filters that are true for the preset being removed
      const presetToRemove = presetFilters[idx].presetFilters
      const filtersToRemove = Object.keys(presetToRemove).filter(
        (key) => presetToRemove[key]
      )

      // Filter out keys that are present in other active presets
      const finalFiltersToRemove = filtersToRemove.filter((key) => {
        return !activePresets
          .filter((preset) => preset !== idx)
          .some((preset) => presetFilters[preset].presetFilters[key])
      })

      // Set inputState of filters to false for the filters being removed
      const updatedFilters = filters.map((filter) => ({
        ...filter,
        items: filter.items.map((item) => ({
          ...item,
          inputState: finalFiltersToRemove.includes(item.filterKey)
            ? false
            : item.inputState,
          options: item.options.map((option) => ({
            ...option,
            inputState: finalFiltersToRemove.includes(option.filterKey)
              ? false
              : option.inputState,
          })),
        })),
      }))
      setFilters(updatedFilters)

      setActivePresets(activePresets.filter((item) => item !== idx))
    } else {
      const newActivePresets = activePresets.concat(idx)
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: `${presetFilters[idx].title}`,
        eventName: `${presetFilters[idx].title} true`,
      })
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
    <div>
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          activePresets={activePresets}
          handleSelectPreset={handleSelectPreset}
        />
      ) : (
        <></>
      )}
      <div className="px-4">
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
              mobileFiltersLabel={mobileFiltersLabel}
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
            <div className="sticky top-[76px] z-10 flex flex-row items-center justify-between border-b border-b-primary bg-body-inverse px-2 py-2">
              <Button
                variant="ghost"
                className="block p-0 lg:hidden"
                onClick={() => {
                  trackCustomEvent({
                    eventCategory: "MobileFilterToggle",
                    eventAction: "Tap MobileFilterToggle - sticky",
                    eventName: "show mobile filters true",
                  })
                  setMobileFiltersOpen(true)
                }}
              >
                <p className="text-md">
                  {`${t("table-filters")} (${activeFiltersCount})`}
                </p>
              </Button>
              <p>
                {t("table-showing")}{" "}
                {data.length === allDataLength ? (
                  <b>{data.length}</b>
                ) : (
                  <b>
                    {data.length}/{allDataLength}
                  </b>
                )}
              </p>
            </div>
            <Table
              variant="product"
              columns={columns}
              data={data}
              subComponent={subComponent}
              noResultsComponent={noResultsComponent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
