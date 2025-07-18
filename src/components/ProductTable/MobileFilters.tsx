import React from "react"
import { ListFilter, RotateCcw, X } from "lucide-react"

import { FilterOption, TPresetFilters } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import PresetFilters from "@/components/ProductTable/PresetFilters"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "../ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

interface MobileFiltersProps {
  filters: FilterOption[]
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>
  presets: TPresetFilters
  presetFiltersCounts?: number[]
  activePresets: number[]
  handleSelectPreset: (index: number) => void
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
  activePresets,
  handleSelectPreset,
  dataCount,
  activeFiltersCount,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  resetFilters,
  mobileFiltersLabel,
}: MobileFiltersProps) => {
  const { t } = useTranslation("table")

  return (
    <div className="border-b border-b-background-highlight">
      <Drawer
        direction="left"
        open={mobileFiltersOpen}
        onOpenChange={(open) => {
          setMobileFiltersOpen(open)
          trackCustomEvent({
            eventCategory: "MobileFilterToggle",
            eventAction: "Tap MobileFilterToggle",
            eventName: `show mobile filters ${open}`,
          })
        }}
      >
        <DrawerTrigger className="px-4" asChild>
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
        </DrawerTrigger>
        <DrawerContent className="flex h-full flex-col p-2">
          <div className="sticky top-0 flex items-center justify-end p-2">
            <DrawerClose asChild>
              <Button variant="ghost">
                <X className="text-2xl" />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex-1 overflow-y-auto">
            <PresetFilters
              presets={presets}
              presetFiltersCounts={presetFiltersCounts}
              activePresets={activePresets}
              handleSelectPreset={handleSelectPreset}
              showMobileSidebar={true}
            />
            <Filters
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
          <DrawerFooter>
            <div className="grid grid-cols-2 items-center">
              <div>
                <Button
                  variant="ghost"
                  className="gap-1"
                  onClick={resetFilters}
                >
                  <RotateCcw />
                  {t("table-reset-filters")}
                </Button>
              </div>
              <DrawerClose className="text-center" asChild>
                <Button
                  className="w-full"
                  data-testid="mobile-filters-submit-button"
                >{`${mobileFiltersLabel} (${dataCount})`}</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileFilters
