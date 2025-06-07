import * as React from "react"
import { CgSpinner } from "react-icons/cg"

const Spinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <CgSpinner className="motion-safe:animate-spin motion-reduce:animate-pulse" />
  </div>
))
Spinner.displayName = "Spinner"

export { Spinner }
