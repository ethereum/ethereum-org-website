import React from "react"
import { BsArrowCounterclockwise } from "react-icons/bs"

import {
  FilterOption,
  ProductTablePresetFilters,
  TPresetFilters,
} from "@/lib/types"

import Button from "@/components/Buttons/Button"
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
}

const MobileFilters = ({
  filters,
  setFilters,
  presets,
  activePresets,
  handleSelectPreset,
  dataCount,
}: MobileFiltersProps<ProductTablePresetFilters>) => {
  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger>MobileFilters</DrawerTrigger>
        <DrawerContent className="flex h-full flex-col p-2">
          <div className="mt-12 flex-1 overflow-y-auto">
            <PresetFilters
              presets={presets}
              activePresets={activePresets}
              handleSelectPreset={handleSelectPreset}
              showMobileSidebar={true}
            />
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          <DrawerFooter>
            <div className="flex w-full">
              <div className="w-1/2">
                <Button variant="ghost" className="gap-1">
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
