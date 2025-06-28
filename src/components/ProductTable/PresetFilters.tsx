import { Check } from "lucide-react"

import type { TPresetFilters } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

export interface PresetFiltersProps {
  presets: TPresetFilters
  activePresets: number[]
  handleSelectPreset: (index: number) => void
  showMobileSidebar?: boolean
  presetFiltersCounts?: number[]
}

const PresetFilters = ({
  presets,
  activePresets,
  handleSelectPreset,
  showMobileSidebar = false,
  presetFiltersCounts,
}: PresetFiltersProps) => {
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

  return (
    <div>
      <div
        className={`lg:pb-11 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2 pb-5"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
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
