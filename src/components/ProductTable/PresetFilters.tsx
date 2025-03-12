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
        className={`mb-5 lg:pb-11 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
      >
        {presets.map((preset, idx) => {
          const colorIdx = colors.text[idx] ? idx : idx % colors.text.length
          return (
            <div
              key={idx}
              className={showMobileSidebar ? "w-full" : "grid-rows-1"}
            >
              <button
                className={cn(
                  "duration-50 group flex h-full w-full cursor-pointer flex-col items-start rounded-2xl border p-6 shadow-[3px_2px_8px_0px_rgba(0,0,0,0.08)] transition-all hover:bg-background-highlight",
                  "focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover",
                  activePresets.includes(idx)
                    ? "border-primary"
                    : "border-primary-low-contrast"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 text-background`}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
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
