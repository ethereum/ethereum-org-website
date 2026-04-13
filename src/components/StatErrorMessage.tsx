import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

import Translation from "./Translation"

const StatErrorMessage = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("leading-xs text-3xl", className)} {...props}>
    <Translation id="loading-error-refresh" />
  </span>
)

export default StatErrorMessage
