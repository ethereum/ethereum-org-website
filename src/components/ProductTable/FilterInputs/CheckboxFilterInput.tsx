import { FilterInputState } from "@/lib/types"

import Checkbox from "@/../tailwind/ui/Checkbox"

interface CheckboxFilterInputProps {
  label: string
  filterIndex: number
  itemIndex: number
  optionIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: boolean,
    optionIndex: number
  ) => void
}

const CheckboxFilterInput = ({
  label,
  filterIndex,
  itemIndex,
  optionIndex,
  inputState,
  updateFilterState,
}: CheckboxFilterInputProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        checked={inputState as boolean}
        onCheckedChange={(e) => {
          updateFilterState(filterIndex, itemIndex, e as boolean, optionIndex)
        }}
      />
      <p>{label}</p>
    </div>
  )
}

export default CheckboxFilterInput
