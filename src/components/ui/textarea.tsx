import * as React from "react"

import { cn } from "@/lib/utils/cn"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "eth-flex eth-min-h-[80px] eth-w-full eth-rounded-md eth-border eth-border-input eth-bg-background eth-px-3 eth-py-2 eth-text-sm eth-ring-offset-background placeholder:eth-text-muted-foreground focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-cursor-not-allowed disabled:eth-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
