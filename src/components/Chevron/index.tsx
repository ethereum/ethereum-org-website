import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export const ChevronNext = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => {
  const { twFlipForRtl } = useRtlFlip()
  return <MdChevronRight className={cn(className, twFlipForRtl)} {...props} />
}

export const ChevronPrev = ({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) => {
  const { twFlipForRtl } = useRtlFlip()
  return <MdChevronLeft className={cn(className, twFlipForRtl)} {...props} />
}
