"use client"

import * as RadioGroup from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"

export interface SegmentedOption<T extends string> {
  value: T
  label: string
}

export interface SegmentedControlProps<T extends string> {
  /** Accessible name for the group */
  label: string
  value: T
  options: SegmentedOption<T>[]
  onValueChange: (value: T) => void
  disabled?: boolean
  className?: string
}

/**
 * A row of mutually exclusive choices with radio semantics: Tab moves into
 * the group, arrow keys change the choice. Wraps on narrow screens.
 */
const SegmentedControl = <T extends string>({
  label,
  value,
  options,
  onValueChange,
  disabled,
  className,
}: SegmentedControlProps<T>) => (
  <RadioGroup.Root
    aria-label={label}
    value={value}
    onValueChange={(next) => onValueChange(next as T)}
    disabled={disabled}
    orientation="horizontal"
    className={cn(
      "inline-flex max-w-full flex-wrap gap-1 rounded-base border bg-background-highlight p-1",
      className
    )}
  >
    {options.map((option) => (
      <RadioGroup.Item
        key={option.value}
        value={option.value}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-semibold text-body-medium",
          "hover:text-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "data-[state=checked]:bg-background data-[state=checked]:text-body data-[state=checked]:shadow-md"
        )}
      >
        {option.label}
      </RadioGroup.Item>
    ))}
  </RadioGroup.Root>
)

export default SegmentedControl
