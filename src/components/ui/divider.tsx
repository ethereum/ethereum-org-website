import { forwardRef } from "react"

import { cn } from "@/lib/utils/cn"

const Divider = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-16 h-1 w-[10%] bg-primary-high-contrast", className)}
    {...props}
  />
))

Divider.displayName = "Divider"

export { Divider }
