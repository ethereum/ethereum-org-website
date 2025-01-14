import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

import Translation from "./Translation"

const StatErrorMessage = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-3xl leading-xs", className)} {...props}>
    <Translation id="loading-error-refresh" />
  </span>
)

export default StatErrorMessage
