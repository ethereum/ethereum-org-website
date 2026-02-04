import * as React from "react"
import { Loader2 } from "lucide-react"

const Spinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <Loader2 className="size-[1em] motion-safe:animate-spin motion-reduce:animate-pulse" />
  </div>
))
Spinner.displayName = "Spinner"

export { Spinner }
