"use client"

import { RotateCcw } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/buttons/Button"
import { FieldLegend, FieldSet } from "@/components/ui/field"

import { FilterCheckbox, FilterSwitch } from "./FilterInputs"
import LanguageSelect from "./LanguageSelect"
import Layer2Select from "./Layer2Select"
import type {
  FindWalletsStrings,
  WalletFilterGroupConfig,
  WalletFilterItemConfig,
  WalletLanguageOption,
  WalletNetworkOption,
} from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

const FilterItem = ({
  item,
  languages,
  networks,
  strings,
}: {
  item: WalletFilterItemConfig
  languages: WalletLanguageOption[]
  networks: WalletNetworkOption[]
  strings: FindWalletsStrings
}) => {
  const { state } = useWalletFilters()

  if (item.kind === "language") {
    return (
      <LanguageSelect
        languages={languages}
        searchPlaceholder={strings.searchLanguages}
        popularLabel={strings.popularLanguages}
      />
    )
  }

  if (item.kind === "layer2") {
    return <Layer2Select networks={networks} />
  }

  const hasOptions = !!item.options?.length
  return (
    <div className={hasOptions ? "pb-0" : "pb-4"}>
      <FilterSwitch
        filterKey={item.key}
        label={item.label}
        description={item.description}
      />
      {state.toggles[item.key] && hasOptions ? (
        <FieldSet className="flex flex-row flex-wrap gap-x-6 gap-y-2 px-2 pb-4">
          {item.optionsLegend && (
            <FieldLegend className="sr-only">{item.optionsLegend}</FieldLegend>
          )}
          {item.options!.map((option) => (
            <FilterCheckbox
              key={option.key}
              filterKey={option.key}
              label={option.label}
            />
          ))}
        </FieldSet>
      ) : null}
    </div>
  )
}

const FilterPanel = ({
  groups,
  languages,
  networks,
  strings,
}: {
  groups: WalletFilterGroupConfig[]
  languages: WalletLanguageOption[]
  networks: WalletNetworkOption[]
  strings: FindWalletsStrings
}) => {
  const { activeFiltersCount } = useWalletFilters()
  const { resetFilters } = useWalletFilterActions()

  return (
    <div className="w-full lg:w-80" data-testid="filters-container">
      <div className="width-full sticky top-0 z-10 mb-2 flex flex-row items-center justify-between border-b border-b-background-highlight bg-background px-2 py-1.5 lg:top-[76px] lg:px-6">
        <p className="text-md font-bold">
          {strings.filters} ({activeFiltersCount})
        </p>
        <Button
          variant="ghost"
          className="min-h-0 gap-1 p-0"
          onClick={resetFilters}
        >
          <RotateCcw className="size-4 text-base" />
          {strings.resetFilters}
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="width-full flex flex-col gap-2"
        defaultValue={groups.map((group) => group.id)}
      >
        {groups.map((group) => (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="bg-background-highlight p-6"
          >
            <AccordionTrigger className="border-b md:px-0">
              <p className="text-base font-bold text-body">{group.title}</p>
            </AccordionTrigger>
            <AccordionContent className="p-0 md:p-0">
              <FieldSet className="gap-0">
                <FieldLegend className="sr-only">{group.title}</FieldLegend>
                {group.items.map((item) => (
                  <FilterItem
                    key={item.key}
                    item={item}
                    languages={languages}
                    networks={networks}
                    strings={strings}
                  />
                ))}
              </FieldSet>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FilterPanel
