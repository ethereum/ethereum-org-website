import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const textareaVariants = cva(
  "focus-visible:ring-ring flex min-h-[200px] w-full rounded border border-body bg-background px-3 py-2 text-base ring-offset-background placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
