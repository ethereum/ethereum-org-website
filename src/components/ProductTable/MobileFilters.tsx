import React from "react"
import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import { IoClose } from "react-icons/io5" // Add this import

import { FilterOption, TPresetFilters } from "@/lib/types"

import { FilterBurgerIcon } from "@/components/icons/wallets"
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

interface MobileFiltersProps {
  filters: FilterOption[]
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>
  presets: TPresetFilters
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
        <Button variant="outline" className="gap-4 border-0 ps-0">
          <div className="flex flex-col text-left">
            <p>{t("table-filters")}</p>
            <p className="text-body-medium">{` ${activeFiltersCount} ${t("table-active")}`}</p>
          </div>
          <FilterBurgerIcon className="h-8 w-8 stroke-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex h-full flex-col p-2">
        <div className="sticky top-0 flex items-center justify-end p-2">
          <DrawerClose asChild>
            <Button variant="ghost">
              <IoClose className="text-2xl" />
            </Button>
          </DrawerClose>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PresetFilters
            presets={presets}
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
              <Button variant="ghost" className="gap-1" onClick={resetFilters}>
                <BsArrowCounterclockwise />
                {t("table-reset-filters")}
              </Button>
            </div>
            <DrawerClose className="text-center" asChild>
              <Button className="w-full">{`${mobileFiltersLabel} (${dataCount})`}</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileFilters
