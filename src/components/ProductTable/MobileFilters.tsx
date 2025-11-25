import React from "react"
import { ListFilter, RotateCcw, X } from "lucide-react"

import { FilterOption, TPresetFilters } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import PresetFilters from "@/components/ProductTable/PresetFilters"
import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "../ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

interface MobileFiltersProps {
  filters: FilterOption[]
  setFilters: (filters: FilterOption | FilterOption[]) => void
  presets: TPresetFilters
  presetFiltersCounts?: number[]
  dataCount: number
  activeFiltersCount: number
  mobileFiltersOpen: boolean
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetFilters: () => void
  mobileFiltersLabel: string
}

const MobileFilters = ({
  filters,
  setFilters,
  presets,
  presetFiltersCounts,
  dataCount,
  activeFiltersCount,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  resetFilters,
  mobileFiltersLabel,
}: MobileFiltersProps) => {
  const { t } = useTranslation("table")

  const handleOpenChange = (open: boolean) => {
    setMobileFiltersOpen(open)
    trackCustomEvent({
      eventCategory: "MobileFilterToggle",
      eventAction: "Tap MobileFilterToggle",
      eventName: `show mobile filters ${open}`,
    })
  }

  const handleClose = () => {
    handleOpenChange(false)
  }

  return (
    <div className="border-b border-b-background-highlight">
      <Sheet open={mobileFiltersOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger className="px-4" asChild>
          <Button
            variant="outline"
            className="gap-4 border-0 ps-4"
            data-testid="mobile-filters-button"
          >
            <div className="flex flex-col text-left">
              <p>{t("table-filters")}</p>
              <p className="text-body-medium">{` ${activeFiltersCount} ${t("table-active")}`}</p>
            </div>
            <div className="grid size-8 place-items-center rounded-full border border-primary text-primary">
              <ListFilter className="-mb-0.5 size-6 stroke-1" />
            </div>
          </Button>
        </SheetTrigger>
      </Sheet>

      {/* Persistent content that stays mounted after first render */}
      <PersistentPanel
        open={mobileFiltersOpen}
        side="left"
        className="flex h-full flex-col p-2"
        onOpenChange={handleOpenChange}
      >
        <div className="sticky top-0 flex items-center justify-end p-2">
          <Button variant="ghost" onClick={handleClose}>
            <X className="text-2xl" />
          </Button>
        </div>
        <div className="sr-only">
          <h2 className="text-foreground text-lg font-normal">
            {t("table-filters")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {`${activeFiltersCount} ${t("table-active")}`}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PresetFilters
            presets={presets}
            filters={filters}
            presetFiltersCounts={presetFiltersCounts}
            setFilters={setFilters}
            showMobileSidebar={true}
          />
          <Filters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <div className="grid w-full grid-cols-2 items-center sm:w-auto">
            <div>
              <Button variant="ghost" className="gap-1" onClick={resetFilters}>
                <RotateCcw />
                {t("table-reset-filters")}
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={handleClose}
              data-testid="mobile-filters-submit-button"
            >{`${mobileFiltersLabel} (${dataCount})`}</Button>
          </div>
        </div>
      </PersistentPanel>
    </div>
  )
}

export default MobileFilters
