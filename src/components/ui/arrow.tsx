import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils/cn"

const ArrowNext = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => (
  <ArrowRight className={cn("rtl:-scale-x-100", className)} {...props} />
)

const ArrowPrev = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => (
  <ArrowLeft className={cn("rtl:-scale-x-100", className)} {...props} />
)

export { ArrowNext, ArrowPrev }
