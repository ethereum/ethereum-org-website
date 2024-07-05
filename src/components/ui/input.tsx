import * as React from "react"

import { cn } from "@/lib/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "eth-flex eth-h-10 eth-w-full eth-rounded-md eth-border eth-border-input eth-bg-background eth-px-3 eth-py-2 eth-text-sm eth-ring-offset-background file:eth-border-0 file:eth-bg-transparent file:eth-text-sm file:eth-font-medium placeholder:eth-text-muted-foreground focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-cursor-not-allowed disabled:eth-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
