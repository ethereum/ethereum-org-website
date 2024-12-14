import { ReactElement } from "react"
import type { IconType } from "react-icons"

import { FilterInputState } from "@/lib/types"

import Switch from "@/../tailwind/ui/Switch"

interface SwitchFilterInputProps {
  Icon?: IconType
  label: string
  description?: string | ReactElement
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
  Icon,
  label,
  description,
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: SwitchFilterInputProps) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 border-t py-4">
        <div className="flex flex-row items-center">
          <div className="h-8 w-8">
            {Icon && <Icon className="mt-0.5 size-7" aria-hidden />}
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
      <p className="ms-8 text-body-medium">{description}</p>
    </>
  )
}

export default SwitchFilterInput
