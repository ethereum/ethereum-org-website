import { FilterOption, TPresetFilters } from "../types"

export const parseQueryParams = (queryValue: unknown) => {
  // Handle boolean values
  if (queryValue === "true") return true
  if (queryValue === "false") return false

  // Handle array values
  if (
    typeof queryValue === "string" &&
    queryValue.startsWith("[") &&
    queryValue.endsWith("]")
  ) {
    try {
      return JSON.parse(decodeURIComponent(queryValue))
    } catch {
      return undefined
    }
  }

  return undefined
}

export const getActiveFiltersCount = (filters: FilterOption[]) => {
  return filters.reduce((count, filter) => {
    return (
      count +
      filter.items.reduce((itemCount, item) => {
        if (item.options && item.options.length > 0) {
          return (
            itemCount +
            item.options.filter(
              (option) =>
                typeof option.inputState === "boolean" && option.inputState
            ).length
          )
        }
        if (Array.isArray(item.inputState) && item.inputState.length > 0) {
          return itemCount + 1
        }

        if (
          typeof item.inputState === "string" &&
          item.filterKey !== "languages"
        ) {
          return itemCount + 1
        }

        return (
          itemCount +
          (typeof item.inputState === "boolean" && item.inputState ? 1 : 0)
        )
      }, 0)
    )
  }, 0)
}

export const getActivePresets = (
  presets: TPresetFilters,
  filters: FilterOption[]
) => {
  const currentFilters = {}

  filters.forEach((filter) => {
    filter.items.forEach((item) => {
      if (item.inputState === true) {
        currentFilters[item.filterKey] = item.inputState
      }

      if (item.options && item.options.length > 0) {
        item.options.forEach((option) => {
          if (option.inputState === true) {
            currentFilters[option.filterKey] = option.inputState
          }
        })
      }
    })
  })

  const presetsToApply = presets.reduce<number[]>((acc, preset, idx) => {
    const presetFilters = preset.presetFilters
    const activePresetKeys = Object.keys(presetFilters).filter(
      (key) => presetFilters[key]
    )
    const allItemsInCurrentFilters = activePresetKeys.every(
      (key) => currentFilters[key] !== undefined
    )

    if (allItemsInCurrentFilters) {
      acc.push(idx)
    }
    return acc
  }, [])

  return presetsToApply
}
