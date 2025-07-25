import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const textareaVariants = cva(
  "focus-visible:outline focus-visible:outline-primary-hover focus-visible:outline-[3px] focus-visible:-outline-offset-2 flex min-h-[200px] w-full rounded border border-body bg-background px-3 py-2 text-base ring-offset-background placeholder:text-disabled disabled:cursor-not-allowed disabled:opacity-50 hover:not-disabled:border-primary-hover",
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

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
