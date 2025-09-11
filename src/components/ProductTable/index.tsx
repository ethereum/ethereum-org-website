import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import type { FilterOption, TPresetFilters } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import MobileFilters from "@/components/ProductTable/MobileFilters"
import PresetFilters from "@/components/ProductTable/PresetFilters"

import { breakpointAsNumber } from "@/lib/utils/screen"

import MediaQuery from "../MediaQuery"

interface ProductTableProps<T extends { id: string }> {
  data: T[]
  filters: FilterOption[]
  filterFn: (data: T[], filters: FilterOption[]) => T[]
  presetFilters: TPresetFilters
  onResetFilters?: () => void
  mobileFiltersLabel: string
  children: ({
    filteredData,
    filters,
    setMobileFiltersOpen,
    resetFilters,
    activeFiltersCount,
  }: {
    filteredData: T[]
    filters: FilterOption[]
    setMobileFiltersOpen: (open: boolean) => void
    resetFilters: () => void
    activeFiltersCount: number
  }) => React.ReactNode | undefined
}

const getActiveFiltersCount = (filters: FilterOption[]) => {
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
        if (Array.isArray(item.inputState) && item.inputState.length > 0) {
          return itemCount + 1
        }

        if (
          typeof item.inputState === "string" &&
          item.filterKey !== "languages"
        ) {
          return itemCount + 1
        }

        return (
          itemCount +
          (typeof item.inputState === "boolean" && item.inputState ? 1 : 0)
        )
      }, 0)
    )
  }, 0)
}

const parseQueryParams = (queryValue: unknown) => {
  // Handle boolean values
  if (queryValue === "true") return true
  if (queryValue === "false") return false

  // Handle array values
  if (
    typeof queryValue === "string" &&
    queryValue.startsWith("[") &&
    queryValue.endsWith("]")
  ) {
    try {
      return JSON.parse(decodeURIComponent(queryValue))
    } catch {
      return undefined
    }
  }

  return undefined
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
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<FilterOption[]>(initialFilters)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Update filters based on router query
  useEffect(() => {
    const query = Object.fromEntries(searchParams?.entries() ?? [])

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

      // TODO: Fix this, removed to avoid infinite re-renders
      // router.replace(pathname, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const updateFilters = useCallback(
    (filters: FilterOption | FilterOption[]) => {
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
    },
    []
  )

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
    onResetFilters?.()
  }, [initialFilters, onResetFilters])

  // Calculated data
  const filteredData = useMemo(() => {
    return filterFn(data, filters)
  }, [data, filters, filterFn])

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

  const activeFiltersCount = useMemo(
    () => getActiveFiltersCount(filters),
    [filters]
  )

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
        <div className="flex flex-col gap-4 pb-6 pt-4 lg:flex-row lg:gap-6 2xl:px-0">
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
          <MediaQuery queries={[`(min-width: ${breakpointAsNumber.lg}px)`]}>
            <div className="hidden lg:block">
              <Filters
                filters={filters}
                setFilters={updateFilters}
                resetFilters={resetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </MediaQuery>
          <div className="flex-1">
            {children({
              filteredData,
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
