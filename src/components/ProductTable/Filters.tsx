import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"

import { FilterInputState, FilterOption } from "@/lib/types"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/../tailwind/ui/accordion"
import Switch from "@/../tailwind/ui/Switch"

interface PresetFiltersProps {
  filters: FilterOption[]
  setFilters: (filterOptions: FilterOption[]) => void
}

const Filters = ({ filters, setFilters }: PresetFiltersProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  const updateFilterState = (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState
  ) => {
    const updatedFilters = filters.map((filter, idx) => {
      if (idx === filterIndex) {
        const updatedItems = filter.items.map((item, i) => {
          if (i === itemIndex) {
            return {
              ...item,
              inputState: newInputState,
            }
          }
          return item
        })
        return {
          ...filter,
          items: updatedItems,
        }
      }
      return filter
    })
    setFilters(updatedFilters)
  }

  return (
    <div className={`w-full md:w-80`}>
      <div className="width-full flex flex-row justify-between border-b border-b-primary px-6 py-2">
        <p className="font-bold">Filters ({0})</p>
        <div
          className="flex cursor-pointer flex-row items-center gap-1 text-primary hover:text-primary-hover"
          onClick={() => {
            console.log("RESET FILTERS")
          }}
        >
          <BsArrowCounterclockwise />
          <p className="text-xs uppercase leading-none">
            {t("page-find-wallet-reset-filters")}
          </p>
        </div>
      </div>
      <Accordion
        type="multiple"
        className="width-full flex flex-col gap-2"
        defaultValue={filters.map((_, idx) => `item ${idx}`)}
      >
        {filters.map((filter, filterIndex) => {
          return (
            <AccordionItem
              key={filterIndex}
              value={`item ${filterIndex}`}
              className="bg-background-highlight p-6"
            >
              <AccordionTrigger className="border-b border-b-border-accordion">
                <p className="text-base text-primary-high-contrast">
                  {filter.title}
                </p>
              </AccordionTrigger>
              <AccordionContent className="p-0 md:p-0">
                {filter.items.map((item, itemIndex) => {
                  console.log(item.input)
                  return (
                    <div
                      key={item.title}
                      className="flex flex-row items-center justify-between gap-2 border-t border-t-border-accordion p-3"
                    >
                      {item.input === "switch" && (
                        <>
                          <div className="flex flex-row items-center">
                            <div className="h-8 w-8">
                              {item.icon && (
                                <item.icon boxSize={7} mt={0.5} aria-hidden />
                              )}
                            </div>
                            <p>{item.title}</p>
                          </div>
                          {item.input === "switch" && (
                            <Switch
                              checked={item.inputState as boolean}
                              onCheckedChange={() => {
                                updateFilterState(
                                  filterIndex,
                                  itemIndex,
                                  !item.inputState
                                )
                              }}
                            />
                          )}
                        </>
                      )}
                      {item.input === "select" && (
                        <>
                          <p>Select</p>
                        </>
                      )}
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default Filters
