import { useTranslation } from "react-i18next"

import type { TPresetFilters } from "@/lib/types"

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
      <h3
        className={`mb-3 text-xl font-bold ${showMobileSidebar ? "" : "px-4"}`}
      >
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
                className={`flex h-full w-full flex-col items-start border-2 p-2 ${
                  activePresets.includes(idx)
                    ? "border-primary"
                    : "border-transparent"
                } duration-50 group cursor-pointer rounded bg-background-highlight transition-all hover:border-primary-hover`}
                onClick={() => handleSelectPreset(idx)}
              >
                <div className="flex items-center gap-2 px-1.5">
                  <input
                    type="checkbox"
                    id={`checkbox-${idx}`}
                    aria-label={`${preset.title} filter`}
                    className="hidden"
                    checked={activePresets.includes(idx)}
                    onChange={() => handleSelectPreset(idx)}
                  />
                  <label
                    htmlFor={`checkbox-${idx}`}
                    className={`custom-checkbox h-5 w-5 ${
                      activePresets.includes(idx) ? "" : ""
                    } flex items-center justify-center rounded border-2 border-primary`}
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
                        className="h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </label>
                  <h3 className="duration-50 text-xl text-primary transition-all group-hover:text-primary-hover">
                    {preset.title}
                  </h3>
                </div>
                {!showMobileSidebar && (
                  <p className="p-2 text-left text-sm text-body-medium">
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
