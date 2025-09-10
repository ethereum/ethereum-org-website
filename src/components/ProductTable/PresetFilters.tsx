import { useCallback, useMemo } from "react"
import { Check } from "lucide-react"

import type { FilterOption, TPresetFilters } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

export interface PresetFiltersProps {
  presets: TPresetFilters
  filters: FilterOption[]
  setFilters: (filters: FilterOption[]) => void
  showMobileSidebar?: boolean
  presetFiltersCounts?: number[]
}

const colors = {
  text: [
    "text-primary",
    "text-accent-b",
    "text-accent-c",
    "text-accent-a",
    "text-[#BEBF3B]",
  ],
  border: [
    "border-primary",
    "border-accent-b",
    "border-accent-c",
    "border-accent-a",
    "border-[#BEBF3B]",
  ],
  bg: [
    "bg-primary",
    "bg-accent-b",
    "bg-accent-c",
    "bg-accent-a",
    "bg-[#BEBF3B]",
  ],
}

const PresetFilters = ({
  presets,
  filters,
  setFilters,
  showMobileSidebar = false,
  presetFiltersCounts,
}: PresetFiltersProps) => {
  const activePresets = useMemo(() => {
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
  }, [filters, presets])

  const handleSelectPreset = useCallback(
    (idx: number) => {
      if (activePresets.includes(idx)) {
        trackCustomEvent({
          eventCategory: "UserPersona",
          eventAction: `${presets[idx].title}`,
          eventName: `${presets[idx].title} false`,
        })
        // Get filters that are true for the preset being removed
        const presetToRemove = presets[idx].presetFilters
        const filtersToRemove = Object.keys(presetToRemove).filter(
          (key) => presetToRemove[key]
        )
        // Filter out keys that are present in other active presets
        const finalFiltersToRemove = filtersToRemove.filter((key) => {
          return !activePresets
            .filter((preset) => preset !== idx)
            .some((preset) => presets[preset].presetFilters[key])
        })
        // Set inputState of filters to false for the filters being removed
        const updatedFilters = filters.map((filter) => ({
          ...filter,
          items: filter.items.map((item) => ({
            ...item,
            inputState: finalFiltersToRemove.includes(item.filterKey)
              ? false
              : item.inputState,
            options: item.options.map((option) => ({
              ...option,
              inputState: finalFiltersToRemove.includes(option.filterKey)
                ? false
                : option.inputState,
            })),
          })),
        }))
        setFilters(updatedFilters)
      } else {
        const newActivePresets = activePresets.concat(idx)
        trackCustomEvent({
          eventCategory: "UserPersona",
          eventAction: `${presets[idx].title}`,
          eventName: `${presets[idx].title} true`,
        })
        // Apply the filters for the selected preset
        const combinedPresetFilters = newActivePresets.reduce((acc, idx) => {
          const preset = presets[idx].presetFilters
          Object.keys(preset).forEach((key) => {
            acc[key] = acc[key] || preset[key]
          })
          return acc
        }, {})
        const updatedFilters = filters.map((filter) => ({
          ...filter,
          items: filter.items.map((item) => ({
            ...item,
            // Keep existing inputState if true, otherwise apply preset filter
            inputState:
              item.inputState ||
              (item.ignoreFilterReset
                ? item.inputState
                : combinedPresetFilters[item.filterKey] || false),
            options: item.options.map((option) => ({
              ...option,
              // Keep existing inputState if true, otherwise apply preset filter
              inputState:
                option.inputState ||
                (option.ignoreFilterReset
                  ? option.inputState
                  : combinedPresetFilters[option.filterKey] || false),
            })),
          })),
        }))
        setFilters(updatedFilters)
      }
    },
    [activePresets, filters, presets, setFilters]
  )

  return (
    <div>
      <div
        className={`lg:pb-11 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2 pb-5"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
        data-testid="preset-filters-container"
      >
        {presets.map((preset, idx) => {
          const colorIdx = colors.text[idx] ? idx : idx % colors.text.length
          return (
            <div
              key={idx}
              className={showMobileSidebar ? "w-full" : "grid-rows-1 pb-5"}
            >
              <button
                className={cn(
                  "duration-50 group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-2xl border p-3 shadow-svg-button-link transition-all hover:bg-background-highlight lg:h-full lg:p-6",
                  "focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover",
                  activePresets.includes(idx)
                    ? "border-primary"
                    : "border-primary-low-contrast",
                  showMobileSidebar && "h-full"
                )}
                onClick={() => handleSelectPreset(idx)}
              >
                <div className="items-top flex gap-2 px-1.5">
                  <div
                    className={cn(
                      "relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                      colors.border[colorIdx],
                      activePresets.includes(idx) && colors.bg[colorIdx]
                    )}
                  >
                    {activePresets.includes(idx) && (
                      <Check className="size-4 stroke-[3] text-background" />
                    )}
                  </div>
                  <h3
                    className={cn(
                      "duration-50 hyphens-auto text-left text-xl transition-all",
                      colors.text[colorIdx]
                    )}
                  >
                    {preset.title}{" "}
                    {presetFiltersCounts?.[idx] && (
                      <span className="font-normal">
                        ({presetFiltersCounts[idx]})
                      </span>
                    )}
                  </h3>
                </div>
                {!showMobileSidebar && (
                  <p className="p-2 text-left text-sm text-body transition-colors duration-500">
                    {preset.description}
                  </p>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PresetFilters
