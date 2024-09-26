import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 min-h-8 text-xs uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        normal: "bg-background-highlight text-body-medium border-body-medium",
        tag: "bg-primary-low-contrast text-primary border-primary",
        success: "bg-success-light text-success border-success-border",
        error: "bg-error-light text-error border-error-border",
        warning: "bg-warning-light text-warning-dark border-warning-border",
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
        className: "bg-success text-success-light",
      },
      {
        variant: "solid",
        status: "error",
        className: "bg-error text-error-light",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning text-warning-light",
      },
      {
        variant: "outline",
        status: "success",
        className: "text-success-border",
      },
      {
        variant: "outline",
        status: "error",
        className: "text-error-border",
      },
      {
        variant: "outline",
        status: "warning",
        className: "text-warning-border",
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
