import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const inputVariants = cva(
  "rounded border border-body placeholder:text-disabled hover:not-disabled:border-primary-hover focus-visible:outline focus-visible:outline-primary-hover focus-visible:outline-[3px] focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:border-disabled bg-background",
  {
    variants: {
      size: {
        md: "p-2",
        sm: "p-1 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export default Input
