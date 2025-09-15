import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const inputVariants = cva(
  "rounded border placeholder:text-disabled focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:border-disabled bg-background",
  {
    variants: {
      size: {
        md: "p-2",
        sm: "p-1 text-sm",
      },
      hasError: {
        true: "border-error hover:not-disabled:border-error focus-visible:outline-error",
        false:
          "border-body hover:not-disabled:border-primary-hover focus-visible:outline-primary-hover",
      },
    },
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, hasError, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export default Input
