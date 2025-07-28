import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const textareaVariants = cva(
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-2 flex min-h-[200px] w-full rounded border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-disabled disabled:cursor-not-allowed disabled:opacity-50",
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

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, hasError, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
