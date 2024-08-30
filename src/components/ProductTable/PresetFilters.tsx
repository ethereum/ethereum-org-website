import type { ProductTablePresetFilters, TPresetFilters } from "@/lib/types"

export interface PresetFiltersProps<TPreset> {
  presets: TPresetFilters<TPreset>[]
  activePresets: number[]
  handleSelectPreset: (index: number) => void
  showMobileSidebar?: boolean
}

const PresetFilters = ({
  presets,
  activePresets,
  handleSelectPreset,
  showMobileSidebar = false,
}: PresetFiltersProps<ProductTablePresetFilters>) => {
  return (
    <div
      className={`mb-2 ${
        showMobileSidebar
          ? "grid grid-cols-2 gap-2"
          : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto lg:auto-cols-fr"
      }`}
    >
      {presets.map((preset, idx) => {
        return (
          <div
            key={idx}
            className={showMobileSidebar ? "w-full" : "grid-rows-1"}
          >
            <div
              className={`flex h-full flex-col items-start border-2 p-2 ${
                activePresets.includes(idx)
                  ? "border-primary"
                  : "border-transparent"
              } duration-50 group cursor-pointer rounded bg-background-highlight transition-all hover:border-primary-hover`}
              onClick={() => handleSelectPreset(idx)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSelectPreset(idx)
                }
              }}
            >
              <div className="flex items-center gap-2 px-1.5">
                <input
                  type="radio"
                  id={`radio-${idx}`}
                  aria-label={`${preset.title} filter`}
                  className="hidden"
                  checked={activePresets.includes(idx)}
                  onChange={() => handleSelectPreset(idx)}
                />
                <label
                  htmlFor={`radio-${idx}`}
                  className={`custom-radio h-5 w-5 ${
                    activePresets.includes(idx) ? "bg-primary" : ""
                  } rounded-full border-4 border-background-highlight outline outline-1 outline-primary`}
                />
                <h3 className="duration-50 text-xl text-primary transition-all group-hover:text-primary-hover">
                  {preset.title}
                </h3>
              </div>
              {!showMobileSidebar && (
                <p className="p-2 text-sm">{preset.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PresetFilters
