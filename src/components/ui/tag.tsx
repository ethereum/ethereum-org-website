import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 min-h-8 text-xs uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        normal: "bg-background-highlight text-body-medium border-body-medium",
        tag: "bg-primary-low-contrast text-primary border-primary",
        success: "bg-success-light text-success border-success",
        error: "bg-error-light text-error border-error",
        warning: "bg-warning-light text-warning border-warning",
      },
      variant: {
        subtle: "border-transparent",
        solid: "border-transparent text-body-inverse",
        outline: "bg-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        status: "normal",
        className: "bg-body-medium",
      },
      {
        variant: "solid",
        status: "tag",
        className: "bg-primary",
      },
      {
        variant: "solid",
        status: "success",
        className: "bg-success",
      },
      {
        variant: "solid",
        status: "error",
        className: "bg-error",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning",
      },
    ],
    defaultVariants: {
      variant: "subtle",
      status: "normal",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, status, ...props }: TagProps) {
  return (
    <div
      className={cn(tagVariants({ variant, status }), className)}
      {...props}
    />
  )
}

export { Tag }
