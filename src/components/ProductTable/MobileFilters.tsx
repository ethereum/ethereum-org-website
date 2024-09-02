import React from "react"
import { useTranslation } from "react-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"

import {
  FilterOption,
  ProductTablePresetFilters,
  TPresetFilters,
} from "@/lib/types"

import Button from "@/components/Buttons/Button"
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

interface MobileFiltersProps<TPreset> {
  filters: FilterOption[]
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>
  presets: TPresetFilters<TPreset>[]
  activePresets: number[]
  handleSelectPreset: (index: number) => void
  dataCount: number
  activeFiltersCount: number
  mobileFiltersOpen: boolean
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetFilters: () => void
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
}: MobileFiltersProps<ProductTablePresetFilters>) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <>
      <Drawer
        direction="left"
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
      >
        <DrawerTrigger className="px-4">
          <Button
            rightIcon={<FilterBurgerIcon />}
            variant="outline"
            border="none"
            ps={0}
            gap={4}
            sx={{
              svg: {
                boxSize: 8,
                line: { stroke: "primary.base" },
                circle: { stroke: "primary.base" },
              },
            }}
          >
            <div className="flex flex-col text-left">
              <p>{t("page-find-wallet-filters")}</p>
              <p className="text-body-medium">{` ${activeFiltersCount} ${t("page-find-wallet-active")}`}</p>
            </div>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex h-full flex-col p-2">
          <div className="mt-12 flex-1 overflow-y-auto">
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
            <div className="flex w-full">
              <div className="w-1/2">
                <Button
                  variant="ghost"
                  className="gap-1"
                  onClick={resetFilters}
                >
                  <BsArrowCounterclockwise size={16} />
                  Reset
                </Button>
              </div>
              <DrawerClose className="w-1/2 text-center">
                <Button width="100%">{`See wallets (${dataCount})`}</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileFilters
