import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"

import { FilterInputState, FilterOption } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/../tailwind/ui/accordion"

interface PresetFiltersProps {
  filters: FilterOption[]
  activeFiltersCount: number
  setFilters: (filterOptions: FilterOption[]) => void
  resetFilters: () => void
}

const Filters = ({
  filters,
  setFilters,
  resetFilters,
  activeFiltersCount,
}: PresetFiltersProps) => {
  const { t } = useTranslation("table")

  const updateFilterState = (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState,
    optionIndex?: number
  ) => {
    const updatedFilters = filters.map((filter, idx) => {
      if (idx !== filterIndex) return filter

      const updatedItems = filter.items.map((item, i) => {
        if (i === itemIndex) {
          if (typeof optionIndex !== "undefined") {
            const updatedOptions = item.options.map((option, j) => {
              if (j === optionIndex) {
                return {
                  ...option,
                  inputState: newInputState,
                }
              }
              return option
            })
            return {
              ...item,
              options: updatedOptions,
            }
          }
          return {
            ...item,
            inputState: newInputState,
            options: item.options.map((option) => {
              return {
                ...option,
                inputState: newInputState,
              }
            }),
          }
        }
        return item
      })
      return {
        ...filter,
        items: updatedItems,
      }
    })
    setFilters(updatedFilters)
  }

  return (
    <div className={`w-full lg:w-80`}>
      <div className="width-full sticky top-0 z-10 flex flex-row items-center justify-between border-b border-b-primary bg-background px-2 py-1.5 lg:top-[76px] lg:px-6">
        <p className="text-md font-bold">
          {t("table-filters")} ({activeFiltersCount})
        </p>
        <Button
          variant="ghost"
          className="min-h-0 gap-1 p-0"
          onClick={resetFilters}
        >
          <BsArrowCounterclockwise size={16} />
          {t("table-reset-filters")}
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="width-full flex flex-col gap-2"
        defaultValue={filters.map((_, idx) => `item ${idx}`)}
      >
        {filters.map((filter, filterIndex) => {
          if (filter.showFilterOption) {
            return (
              <AccordionItem
                key={filterIndex}
                value={`item ${filterIndex}`}
                className="bg-background-highlight p-6"
              >
                <AccordionTrigger className="border-b md:px-0">
                  <p className="text-base font-bold text-body">
                    {filter.title}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-0 md:p-0">
                  {filter.items.map((item, itemIndex) => {
                    return (
                      <div
                        key={itemIndex}
                        className={`${item.options.length ? "pb-0" : "pb-4"}`}
                      >
                        {item.input(
                          filterIndex,
                          itemIndex,
                          item.inputState,
                          updateFilterState
                        )}
                        {item.inputState === true && item.options.length ? (
                          <div className="flex flex-row gap-6 px-2 pb-4">
                            {item.options.map((option, optionIndex) => {
                              return option.input(
                                filterIndex,
                                itemIndex,
                                optionIndex,
                                option.inputState,
                                updateFilterState
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            )
          }
        })}
      </Accordion>
    </div>
  )
}

export default Filters
