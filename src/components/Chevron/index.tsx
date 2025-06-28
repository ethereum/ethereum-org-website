import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export const ChevronNext = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => {
  const { twFlipForRtl } = useRtlFlip()
  return <ChevronRight className={cn(className, twFlipForRtl)} {...props} />
}

export const ChevronPrev = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => {
  const { twFlipForRtl } = useRtlFlip()
  return <ChevronLeft className={cn(className, twFlipForRtl)} {...props} />
}
