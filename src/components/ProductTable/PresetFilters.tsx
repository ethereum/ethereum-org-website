import type { TPresetFilters } from "@/lib/types"

export interface PresetFiltersProps<TPreset> {
  presets: TPresetFilters<TPreset>[]
  activePresetIndex: number
  setActivePresetIndex: (index: number) => void
}

const PresetFilters = ({
  presets,
  activePresetIndex,
  setActivePresetIndex,
}: PresetFiltersProps<object>) => {
  return (
    <div className="mb-2 grid auto-cols-fr grid-flow-col gap-4 overflow-x-auto">
      {presets.map((preset, idx) => {
        return (
          <div key={idx} className="grid-rows-1">
            <div
              className={`flex h-full flex-col items-start border-2 p-2 ${activePresetIndex === idx ? "border-primary" : "border-transparent"} duration-50 group cursor-pointer rounded bg-background-highlight transition-all hover:border-primary-hover`}
              onClick={() => {
                setActivePresetIndex(idx)
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setActivePresetIndex(idx)
                }
              }}
            >
              {preset.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PresetFilters
