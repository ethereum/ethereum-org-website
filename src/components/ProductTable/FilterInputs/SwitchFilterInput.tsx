import { Icon } from "@chakra-ui/react"

import { FilterInputState } from "@/lib/types"

import Switch from "@/../tailwind/ui/Switch"

interface SwitchFilterInputProps {
  icon?: typeof Icon
  label: string
  filterIndex: number
  itemIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: boolean
  ) => void
}

const SwitchFilterInput = ({
  icon,
  label,
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: SwitchFilterInputProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 border-t border-t-border-accordion p-3">
      <div className="flex flex-row items-center">
        <div className="h-8 w-8">
          {icon && <Icon as={icon} boxSize={7} mt={0.5} aria-hidden />}
        </div>
        <p>{label}</p>
      </div>
      <Switch
        checked={inputState as boolean}
        onCheckedChange={(e) => {
          updateFilterState(filterIndex, itemIndex, e as boolean)
        }}
      />
    </div>
  )
}

export default SwitchFilterInput
