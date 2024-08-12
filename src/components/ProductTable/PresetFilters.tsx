import type { ProductTablePresetFilters, TPresetFilters } from "@/lib/types"

export interface PresetFiltersProps<TPreset> {
  presets: TPresetFilters<TPreset>[]
  activePresetIndex: number
  setActivePresetIndex: (index: number) => void
}

const PresetFilters = ({
  presets,
  activePresetIndex,
  setActivePresetIndex,
}: PresetFiltersProps<ProductTablePresetFilters>) => {
  const handleSelectPreset = (idx: number) => {
    if (idx === activePresetIndex) {
      setActivePresetIndex(NaN)
    } else {
      setActivePresetIndex(idx)
    }
  }

  return (
    <div className="mb-2 grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto lg:auto-cols-fr">
      {presets.map((preset, idx) => {
        return (
          <div key={idx} className="grid-rows-1">
            <div
              className={`flex h-full flex-col items-start border-2 p-2 ${activePresetIndex === idx ? "border-primary" : "border-transparent"} duration-50 group cursor-pointer rounded bg-background-highlight transition-all hover:border-primary-hover`}
              onClick={() => {
                handleSelectPreset(idx)
              }}
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
                  checked={activePresetIndex === idx}
                  onChange={() => handleSelectPreset(idx)}
                />
                <label
                  htmlFor={`radio-${idx}`}
                  className={`custom-radio h-5 w-5 ${activePresetIndex === idx ? "bg-primary" : ""} rounded-full border-4 border-background-highlight outline outline-1 outline-primary`}
                />
                <h3 className="duration-50 text-xl text-primary transition-all group-hover:text-primary-hover">
                  {preset.title}
                </h3>
              </div>
              <p className="p-2 text-sm">{preset.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PresetFilters
