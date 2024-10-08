import { useTranslation } from "next-i18next"

import type { TPresetFilters } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

export interface PresetFiltersProps {
  presets: TPresetFilters
  activePresets: number[]
  handleSelectPreset: (index: number) => void
  showMobileSidebar?: boolean
}

const PresetFilters = ({
  presets,
  activePresets,
  handleSelectPreset,
  showMobileSidebar = false,
}: PresetFiltersProps) => {
  const { t } = useTranslation("table")

  return (
    <div>
      <h3 className={cn("mb-3 text-xl font-bold", "px-4")}>
        {t("table-what-are-you-looking-for")}
      </h3>
      <div
        className={`mb-2 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
      >
        {presets.map((preset, idx) => {
          return (
            <div
              key={idx}
              className={showMobileSidebar ? "w-full" : "grid-rows-1"}
            >
              <button
                className={cn(
                  "duration-50 group flex h-full w-full cursor-pointer flex-col items-start rounded border-2 bg-background-highlight p-2 transition-all hover:border-primary-hover",
                  "focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover",
                  activePresets.includes(idx)
                    ? "border-primary"
                    : "border-transparent"
                )}
                onClick={() => handleSelectPreset(idx)}
              >
                <div className="items-top flex gap-2 px-1.5">
                  <div className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-primary">
                    {activePresets.includes(idx) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <h3 className="duration-50 hyphens-auto text-left text-xl text-primary transition-all group-hover:text-primary-hover">
                    {preset.title}
                  </h3>
                </div>
                {!showMobileSidebar && (
                  <p
                    className={cn(
                      "p-2 text-left text-sm transition-colors duration-500",
                      activePresets.includes(idx)
                        ? "text-body"
                        : "text-body-medium"
                    )}
                  >
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
