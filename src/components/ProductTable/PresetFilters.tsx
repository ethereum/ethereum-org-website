import type { TPresetFilters } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

export interface PresetFiltersProps {
  presets: TPresetFilters
  activePresets: number[]
  handleSelectPreset: (index: number) => void
  showMobileSidebar?: boolean
  presetFilterCounts?: number[]
}

const PresetFilters = ({
  presets,
  activePresets,
  handleSelectPreset,
  showMobileSidebar = false,
  presetFilterCounts,
}: PresetFiltersProps) => {
  const colors = ["primary", "accent-b", "accent-c", "accent-a", "[#BEBF3B]"]

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
          const color = colors[idx]
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
                      `relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-${color}`,
                      activePresets.includes(idx) && `bg-${color}`
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
                    className={`duration-50 hyphens-auto text-left text-xl text-${color} transition-all`}
                  >
                    {preset.title}{" "}
                    <span className="font-normal">
                      ({presetFilterCounts?.[idx]})
                    </span>
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
