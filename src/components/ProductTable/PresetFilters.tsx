"use client"

import { useCallback, useId, useMemo } from "react"
import { Check } from "lucide-react"

import type { FilterOption, TPresetFilters } from "@/lib/types"

import Checkbox from "@/components/ui/checkbox"
import {
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useTranslation } from "@/hooks/useTranslation"
import { getActivePresets } from "@/lib/product-table"

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

interface PresetCardProps {
  preset: TPresetFilters[number]
  idx: number
  isActive: boolean
  presetFiltersCount?: number
  showMobileSidebar: boolean
  onSelect: (idx: number) => void
}

const PresetCard = ({
  preset,
  idx,
  isActive,
  presetFiltersCount,
  showMobileSidebar,
  onSelect,
}: PresetCardProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const id = useId()
  const descriptionId = !showMobileSidebar ? `${id}-description` : undefined
  const colorIdx = colors.text[idx] ? idx : idx % colors.text.length

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid double-toggle when clicks on the label area already forward to the checkbox
    if ((e.target as HTMLElement).closest("label")) return
    onSelect(idx)
  }

  return (
    <div className={showMobileSidebar ? "w-full" : "grid-rows-1 pb-5"}>
      <div
        onClick={handleCardClick}
        className={cn(
          "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border p-3 shadow-svg-button-link transition-all duration-50 hover:bg-background-highlight lg:h-full lg:p-6",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-primary-hover",
          isActive ? "border-primary" : "border-primary-low-contrast",
          showMobileSidebar && "h-full"
        )}
      >
        <FieldLabel
          htmlFor={id}
          className="items-top flex w-full gap-2 px-1.5 text-base leading-normal font-normal has-data-[state=checked]:bg-transparent dark:has-data-[state=checked]:bg-transparent"
        >
          <Checkbox
            id={id}
            className="sr-only"
            aria-describedby={descriptionId}
            checked={isActive}
            onCheckedChange={() => onSelect(idx)}
          />
          <span
            aria-hidden
            className={cn(
              "relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
              colors.border[colorIdx],
              isActive && colors.bg[colorIdx]
            )}
          >
            {isActive && (
              <Check className="size-4 stroke-[3] text-background" />
            )}
          </span>
          <span
            className={cn(
              "text-left text-xl hyphens-auto transition-all duration-50",
              colors.text[colorIdx]
            )}
          >
            {preset.title}
            {presetFiltersCount && (
              <>
                <span aria-hidden="true" className="font-normal">
                  {" "}
                  ({presetFiltersCount})
                </span>
                <span className="sr-only">
                  {" "}
                  {t(
                    "page-wallets-find-wallet:page-find-wallet-persona-count-available",
                    { count: presetFiltersCount }
                  )}
                </span>
              </>
            )}
          </span>
        </FieldLabel>
        {!showMobileSidebar && (
          <FieldDescription
            id={descriptionId}
            className="p-2 text-left text-sm leading-normal font-normal text-body transition-colors duration-500"
          >
            {preset.description}
          </FieldDescription>
        )}
      </div>
    </div>
  )
}

const PresetFilters = ({
  presets,
  filters,
  setFilters,
  showMobileSidebar = false,
  presetFiltersCounts,
}: PresetFiltersProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const activePresets = useMemo(() => {
    return getActivePresets(presets, filters)
  }, [presets, filters])

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
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">
        {t("page-find-wallet-persona-legend")}
      </FieldLegend>
      <div
        className={`lg:pb-11 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2 pb-5"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
        data-testid="preset-filters-container"
      >
        {presets.map((preset, idx) => (
          <PresetCard
            key={idx}
            preset={preset}
            idx={idx}
            isActive={activePresets.includes(idx)}
            presetFiltersCount={presetFiltersCounts?.[idx]}
            showMobileSidebar={showMobileSidebar}
            onSelect={handleSelectPreset}
          />
        ))}
      </div>
    </FieldSet>
  )
}

export default PresetFilters
