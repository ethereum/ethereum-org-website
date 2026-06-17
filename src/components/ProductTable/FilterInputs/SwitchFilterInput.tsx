"use client"

import { ReactElement, useId } from "react"
import type { LucideIcon } from "lucide-react"

import { FilterInputState } from "@/lib/types"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import Switch from "@/components/ui/switch"

interface SwitchFilterInputProps {
  Icon?: React.FC<React.SVGProps<SVGElement>> | LucideIcon
  label: string
  description?: string | ReactElement<unknown>
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
  const id = useId()
  const descriptionId = description ? `${id}-description` : undefined
  return (
    <Field className="gap-0 border-t py-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <FieldLabel
          htmlFor={id}
          className="flex w-fit cursor-pointer flex-row items-center gap-0 text-base leading-normal font-normal"
        >
          <span className="h-8 w-8">
            {Icon && (
              <Icon className="mt-0.5 size-7" strokeWidth={1} aria-hidden />
            )}
          </span>
          {label}
        </FieldLabel>
        <Switch
          id={id}
          aria-describedby={descriptionId}
          checked={inputState as boolean}
          onCheckedChange={(e) => {
            updateFilterState(filterIndex, itemIndex, e as boolean)
          }}
        />
      </div>
      {description && (
        <FieldDescription
          id={descriptionId}
          className="ps-8 text-base leading-normal font-normal text-body-medium"
        >
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}

export default SwitchFilterInput
