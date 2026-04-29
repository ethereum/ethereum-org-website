import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react"

import type { FilterOption, TPresetFilters } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import MobileFilters from "@/components/ProductTable/MobileFilters"
import PresetFilters from "@/components/ProductTable/PresetFilters"

import { getActiveFiltersCount, parseQueryParams } from "@/lib/product-table"

interface ProductTableProps<T extends { id: string }> {
  data: T[]
  filters: FilterOption[]
  filterFn: (data: T[], filters: FilterOption[]) => T[]
  presetFilters: TPresetFilters
  onResetFilters?: () => void
  mobileFiltersLabel: string
  children: ({
    data,
    filteredData,
    matchedIds,
    filters,
    setMobileFiltersOpen,
    resetFilters,
    activeFiltersCount,
  }: {
    data: T[]
    filteredData: T[]
    matchedIds: Set<string>
    filters: FilterOption[]
    setMobileFiltersOpen: (open: boolean) => void
    resetFilters: () => void
    activeFiltersCount: number
  }) => React.ReactNode | undefined
}

const ProductTable = <T extends { id: string }>({
  data,
  filters: initialFilters,
  filterFn,
  presetFilters,
  onResetFilters,
  mobileFiltersLabel,
  children,
}: ProductTableProps<T>) => {
  const [filters, setFilters] = useState<FilterOption[]>(initialFilters)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Update filters based on router query. Reads window.location.search instead
  // of useSearchParams() to avoid CSR-bailout in this statically generated page.
  useEffect(() => {
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    )

    if (Object.keys(query).length > 0) {
      const updatedFilters = filters.map((filter) => ({
        ...filter,
        items: filter.items.map((item) => ({
          ...item,
          inputState:
            parseQueryParams(query[item.filterKey]) || item.inputState,
          options: item.options.map((option) => ({
            ...option,
            inputState:
              parseQueryParams(query[option.filterKey]) || option.inputState,
          })),
        })),
      }))
      setFilters(updatedFilters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateFilters = useCallback(
    (filters: FilterOption | FilterOption[]) => {
      startTransition(() => {
        setFilters((prevFilters) => {
          return prevFilters.map((prevFilter) => {
            const filter = Array.isArray(filters)
              ? filters.find((f) => f.title === prevFilter.title)
              : filters.title === prevFilter.title
                ? filters
                : prevFilter
            if (!filter) return prevFilter
            return filter
          })
        })
      })
    },
    []
  )

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setFilters(initialFilters)
    })
    onResetFilters?.()
  }, [initialFilters, onResetFilters])

  // Calculated data
  const filteredData = useMemo(() => {
    return filterFn(data, filters)
  }, [data, filters, filterFn])

  // Stable Set of currently-matching IDs. Consumers can render every row
  // unconditionally and toggle visibility via this Set instead of mounting
  // and unmounting subtrees on every filter change.
  const matchedIds = useMemo(() => {
    return new Set(filteredData.map((item) => item.id))
  }, [filteredData])

  const presetFiltersCounts = useMemo(() => {
    return presetFilters.map((persona) => {
      const activeFilters = Object.entries(persona.presetFilters).filter(
        ([, value]) => value === true
      )

      return filteredData.filter((item) => {
        return activeFilters.every(([feature]) => item[feature] === true)
      }).length
    })
  }, [filteredData, presetFilters])

  const activeFiltersCount = useDeferredValue(getActiveFiltersCount(filters))

  return (
    <div>
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          filters={filters}
          setFilters={updateFilters}
          presetFiltersCounts={presetFiltersCounts}
        />
      ) : (
        <></>
      )}
      <div className="px-4">
        <div className="flex flex-col gap-4 pt-4 pb-6 lg:flex-row lg:gap-6 2xl:px-0">
          <div className="block lg:hidden">
            <MobileFilters
              filters={filters}
              setFilters={updateFilters}
              presets={presetFilters}
              presetFiltersCounts={presetFiltersCounts}
              dataCount={filteredData.length}
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
              setFilters={updateFilters}
              resetFilters={resetFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
          <div className="flex-1">
            {children({
              data,
              filteredData,
              matchedIds,
              filters,
              setMobileFiltersOpen,
              resetFilters,
              activeFiltersCount,
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
