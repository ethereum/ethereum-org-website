import { HTMLAttributes } from "react"

import Translation from "@/components/utilities/Translation"

import { cn } from "@/lib/utils/cn"

const StatErrorMessage = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-3xl leading-xs", className)} {...props}>
    <Translation id="loading-error-refresh" />
  </span>
)

export default StatErrorMessage
