import { forwardRef } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 min-h-8 text-xs uppercase transition-colors",
  {
    variants: {
      status: {
        normal: "bg-background-highlight text-body-medium border-body-medium",
        tag: "bg-primary-low-contrast text-primary-high-contrast border-primary",
        success: "bg-success-light text-success border-success-border",
        error: "bg-error-light text-error border-error-border",
        warning: "bg-warning-light text-warning-dark border-warning-border",
      },
      variant: {
        subtle: "border-transparent",
        highContrast: "border-transparent",
        solid: "border-transparent text-body-inverse",
        outline: "bg-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        status: "normal",
        className:
          "bg-body-medium focus-visible:outline-body hover:shadow-body",
      },
      {
        variant: "solid",
        status: "tag",
        className:
          "bg-primary focus-visible:outline-primary-high-contrast hover:shadow-primary-low-contrast",
      },
      {
        variant: "solid",
        status: "success",
        className:
          "bg-success text-success-light focus-visible:outline-success-dark",
      },
      {
        variant: "solid",
        status: "error",
        className: "bg-error text-error-light focus-visible:outline-error-dark",
      },
      {
        variant: "solid",
        status: "warning",
        className:
          "bg-warning text-warning-dark focus-visible:outline-warning-border",
      },
      {
        variant: "highContrast",
        status: "normal",
        className: "bg-body-light text-body",
      },
      {
        variant: "highContrast",
        status: "tag",
        className: "bg-background-highlight",
      },
      {
        variant: "highContrast",
        status: "success",
        className: "text-success-dark",
      },
      {
        variant: "highContrast",
        status: "error",
        className: "text-error-dark",
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
    VariantProps<typeof tagVariants> {
  asChild?: boolean
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ className, asChild, variant, status, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(tagVariants({ variant, status }), className)}
        {...props}
      />
    )
  }
)

Tag.displayName = "Tag"

export interface TagButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean
}

const TagButton = forwardRef<HTMLButtonElement, TagButtonProps>(
  ({ className, asChild, variant, status, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "hover:shadow-[2px_2px] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-inherit",
          tagVariants({ variant, status }),
          className
        )}
        {...props}
      />
    )
  }
)

TagButton.displayName = "TagButton"

export { Tag, TagButton }
