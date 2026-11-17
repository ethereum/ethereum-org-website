"use client"

import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils/cn"

import { commonControlClasses } from "./checkbox"

const radioGroupVariants = tv({
  base: "",
  variants: {
    variant: {
      /** A list of radio circles, each with its own label. */
      default: "grid gap-2",
      /**
       * Joined options in one bordered box, like a segmented control. One
       * outline for the whole group and dividers between options, so a
       * hovered option never spills over its neighbours. Pass `divide-x`
       * (row) or `divide-y` and `flex-col` (column) to set the direction.
       */
      segmented:
        "flex divide-x divide-border overflow-hidden rounded-base border border-border",
    },
  },
  defaultVariants: { variant: "default" },
})

export type RadioGroupProps = React.ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Root
> &
  VariantProps<typeof radioGroupVariants>

/**
 * Single choice from a short list, with radio semantics: one tab stop, arrow
 * keys move the selection. `variant="segmented"` joins the options into one
 * control; use `RadioGroupSegment` for its options.
 */
const RadioGroup = ({ className, variant, ...props }: RadioGroupProps) => (
  <RadioGroupPrimitive.Root
    data-slot="radio-group"
    className={cn(radioGroupVariants({ variant }), className)}
    {...props}
  />
)

/** A radio circle, for the default variant. Pair it with a `Label`. */
const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    data-slot="radio-group-item"
    className={cn(commonControlClasses, "shrink-0 rounded-full", className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="grid place-items-center">
      <span className="size-1.5 rounded-full bg-background" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
)

/**
 * One option of a segmented group: its label is the whole button. Hover
 * tints the background only (no shadow); the checked option fills.
 */
const RadioGroupSegment = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    data-slot="radio-group-segment"
    className={cn(
      "min-h-8 min-w-0 flex-1 bg-background px-3 py-1.5 text-center text-sm text-body transition-colors motion-reduce:transition-none",
      "focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-hover",
      "hover:[@media(hover:hover)_and_(pointer:fine)]:bg-background-highlight",
      "data-[state=checked]:bg-primary-low-contrast data-[state=checked]:font-bold data-[state=checked]:text-primary-high-contrast",
      "disabled:cursor-not-allowed disabled:text-disabled",
      className
    )}
    {...props}
  />
)

export { RadioGroup, RadioGroupItem, RadioGroupSegment }
