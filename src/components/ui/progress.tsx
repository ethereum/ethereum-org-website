import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import * as ProgressPrimitive from "@radix-ui/react-progress"

const progressVariants = tv({
  slots: {
    root: "relative h-4 w-full overflow-hidden rounded-full",
    indicator: "relative h-full rounded-full transition-[width] duration-500",
  },
  variants: {
    color: {
      disabled: { root: "bg-body-light", indicator: "bg-disabled" },
      primary: { root: "bg-background", indicator: "bg-primary" },
    },
    // Chunky game style: a gloss stripe on the fill, and a visible nub at 0
    shine: {
      true: { indicator: "min-w-4 ease-out" },
    },
  },
  defaultVariants: {
    color: "disabled",
  },
})

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>

const Progress = ({
  className,
  value,
  color,
  shine,
  ...props
}: ProgressProps) => {
  const { root, indicator } = progressVariants({ color, shine })
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={root({ className })}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicator()}
        style={{ width: `${value || 0}%` }}
      >
        {shine && (
          <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/35" />
        )}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
