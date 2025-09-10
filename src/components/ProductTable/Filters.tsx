import { RotateCcw } from "lucide-react"

import { FilterOption } from "@/lib/types"

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/buttons/Button"

import Filter from "./Filter"

import { useTranslation } from "@/hooks/useTranslation"

interface PresetFiltersProps {
  filters: FilterOption[]
  activeFiltersCount: number
  setFilters: (filter: FilterOption) => void
  resetFilters: () => void
}

const Filters = ({
  filters,
  setFilters,
  resetFilters,
  activeFiltersCount,
}: PresetFiltersProps) => {
  const { t } = useTranslation("table")

  return (
    <div className="w-full lg:w-80" data-testid="filters-container">
      <div className="width-full sticky top-0 z-10 mb-2 flex flex-row items-center justify-between border-b border-b-background-highlight bg-background px-2 py-1.5 lg:top-[76px] lg:px-6">
        <p className="text-md font-bold">
          {t("table-filters")} ({activeFiltersCount})
        </p>
        <Button
          variant="ghost"
          className="min-h-0 gap-1 p-0"
          onClick={resetFilters}
        >
          <RotateCcw className="size-4 text-base" />
          {t("table-reset-filters")}
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="width-full flex flex-col gap-2"
        defaultValue={filters.map((_, idx) => `item ${idx}`)}
      >
        {filters.map((filter, filterIndex) => {
          return (
            <Filter
              key={filterIndex}
              filter={filter}
              filterIndex={filterIndex}
              onChange={setFilters}
            />
          )
        })}
      </Accordion>
    </div>
  )
}

export default Filters
