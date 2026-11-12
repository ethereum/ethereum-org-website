import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import * as ProgressPrimitive from "@radix-ui/react-progress"

const progressVariants = tv({
  slots: {
    root: "relative h-4 w-full overflow-hidden rounded-full",
    indicator: "h-full rounded-full transition-[width] duration-500",
  },
  variants: {
    color: {
      disabled: { root: "bg-body-light", indicator: "bg-disabled" },
      primary: { root: "bg-background", indicator: "bg-primary" },
    },
  },
  defaultVariants: {
    color: "disabled",
  },
})

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants>

const Progress = ({ className, value, color, ...props }: ProgressProps) => {
  const { root, indicator } = progressVariants({ color })
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
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
