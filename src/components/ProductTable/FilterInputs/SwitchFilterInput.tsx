import { Icon } from "@chakra-ui/react"

import { FilterInputState } from "@/lib/types"

import Switch from "@/../tailwind/ui/Switch"

interface SwitchFilterInputProps {
  icon?: typeof Icon
  label: string
  description?: string
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
  description,
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: SwitchFilterInputProps) => {
  return (
    <div className="p-3">
      <div className="flex flex-row items-center justify-between gap-2 border-t border-t-border-accordion">
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
      <p className="ms-8">{description}</p>
    </div>
  )
}

export default SwitchFilterInput
