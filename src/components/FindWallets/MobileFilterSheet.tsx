"use client"

import { useRef, useState } from "react"
import { ListFilter, RotateCcw, X } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import { PersistentPanel } from "@/components/ui/persistent-panel"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { trackCustomEvent } from "@/lib/utils/matomo"

import FilterPanel from "./FilterPanel"
import PresetCards from "./PresetCards"
import type {
  FindWalletsStrings,
  WalletFilterGroupConfig,
  WalletLanguageOption,
  WalletNetworkOption,
  WalletPersonaConfig,
} from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

const MobileFilterSheet = ({
  groups,
  personas,
  languages,
  networks,
  strings,
}: {
  groups: WalletFilterGroupConfig[]
  personas: WalletPersonaConfig[]
  languages: WalletLanguageOption[]
  networks: WalletNetworkOption[]
  strings: FindWalletsStrings
}) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { activeFiltersCount, visibleCount } = useWalletFilters()
  const { resetFilters } = useWalletFilterActions()

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    trackCustomEvent({
      eventCategory: "MobileFilterToggle",
      eventAction: "Tap MobileFilterToggle",
      eventName: `show mobile filters ${nextOpen}`,
    })
  }

  const handleClose = () => {
    handleOpenChange(false)
  }

  return (
    <div className="border-b border-b-background-highlight">
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger className="px-4" asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className="gap-4 border-0 ps-4"
            data-testid="mobile-filters-button"
          >
            <div className="flex flex-col text-left">
              <p>{strings.filters}</p>
              <p className="text-body-medium">{` ${activeFiltersCount} ${strings.active}`}</p>
            </div>
            <div className="grid size-8 place-items-center rounded-full border border-primary text-primary">
              <ListFilter className="-mb-0.5 size-6 stroke-1" />
            </div>
          </Button>
        </SheetTrigger>
      </Sheet>

      <PersistentPanel
        open={open}
        side="left"
        className="flex h-full flex-col p-2"
        onOpenChange={handleOpenChange}
        triggerRef={triggerRef}
      >
        <div className="sticky top-0 flex items-center justify-end p-2">
          <Button variant="ghost" onClick={handleClose}>
            <X className="text-2xl" />
          </Button>
        </div>
        <div className="sr-only">
          <h2 className="text-foreground text-lg font-normal">
            {strings.filters}
          </h2>
          <p className="text-muted-foreground text-sm">
            {`${activeFiltersCount} ${strings.active}`}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PresetCards
            personas={personas}
            legend={strings.personaLegend}
            showMobileSidebar
          />
          <FilterPanel
            groups={groups}
            languages={languages}
            networks={networks}
            strings={strings}
          />
        </div>
        <div className="flex flex-col-reverse pt-4 sm:flex-row sm:justify-end sm:space-x-2">
          <div className="grid w-full grid-cols-2 items-center sm:w-auto">
            <div>
              <Button variant="ghost" className="gap-1" onClick={resetFilters}>
                <RotateCcw />
                {strings.resetFilters}
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={handleClose}
              data-testid="mobile-filters-submit-button"
            >{`${strings.mobileFiltersLabel} (${visibleCount})`}</Button>
          </div>
        </div>
      </PersistentPanel>
    </div>
  )
}

export default MobileFilterSheet
