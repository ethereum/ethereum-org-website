import { Fragment, memo } from "react"

import { FilterInputState, FilterOption } from "@/lib/types"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FilterProps {
  filter: FilterOption
  filterIndex: number
  onChange: (updatedFilter: FilterOption, filterIndex: number) => void
}

const Filter = ({ filter, filterIndex, onChange }: FilterProps) => {
  const handleChange = (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState,
    optionIndex?: number
  ) => {
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

    const updatedFilter = {
      ...filter,
      items: updatedItems,
    }

    onChange(updatedFilter, filterIndex)
  }

  if (!filter.showFilterOption) {
    return null
  }

  return (
    <AccordionItem
      value={`item ${filterIndex}`}
      className="bg-background-highlight p-6"
    >
      <AccordionTrigger className="border-b md:px-0">
        <p className="text-base font-bold text-body">{filter.title}</p>
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
                handleChange
              )}
              {item.inputState === true && item.options.length ? (
                <div className="flex flex-row gap-6 px-2 pb-4">
                  {item.options.map((option, optionIndex) => {
                    return (
                      <Fragment key={optionIndex}>
                        {option.input(
                          filterIndex,
                          itemIndex,
                          optionIndex,
                          option.inputState,
                          handleChange
                        )}
                      </Fragment>
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

export default memo(Filter)
