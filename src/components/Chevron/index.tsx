import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils/cn"

export const ChevronNext = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => (
  <ChevronRight className={cn("rtl:-scale-x-100", className)} {...props} />
)

export const ChevronPrev = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => (
  <ChevronLeft className={cn("rtl:-scale-x-100", className)} {...props} />
)
