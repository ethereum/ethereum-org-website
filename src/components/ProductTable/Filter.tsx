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
  onChange: (updatedFilter: FilterOption) => void
}

const arePropsEqual = (prevProps: FilterProps, nextProps: FilterProps) => {
  if (prevProps.filterIndex !== nextProps.filterIndex) return false
  if (prevProps.filter.title !== nextProps.filter.title) return false
  if (prevProps.filter.showFilterOption !== nextProps.filter.showFilterOption)
    return false

  const prevItems = prevProps.filter.items
  const nextItems = nextProps.filter.items

  if (prevItems.length !== nextItems.length) return false

  for (let i = 0; i < prevItems.length; i++) {
    const prevItem = prevItems[i]
    const nextItem = nextItems[i]

    if (prevItem.filterKey !== nextItem.filterKey) return false
    if (prevItem.inputState !== nextItem.inputState) return false

    if (prevItem.options.length !== nextItem.options.length) return false

    for (let j = 0; j < prevItem.options.length; j++) {
      if (prevItem.options[j].filterKey !== nextItem.options[j].filterKey)
        return false
      if (prevItem.options[j].inputState !== nextItem.options[j].inputState)
        return false
    }
  }

  return true
}

const Filter = ({ filter, filterIndex, onChange }: FilterProps) => {
  const handleChange = (
    _: number,
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

    onChange(updatedFilter)
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

export default memo(Filter, arePropsEqual)
