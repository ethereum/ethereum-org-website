import { IconBase, type IconBaseProps } from "react-icons/lib"

import { cn } from "@/lib/utils/cn"

export const CorrectIcon = ({ className, ...props }: IconBaseProps) => (
  <IconBase viewBox="0 0 20 16" className={cn("h-4 w-5", className)} {...props}>
    <path d="M8 16L0 9.05375L2.75437 7.06313L7.49875 11.4325L16.8531 0L20 2L8 16Z" />
  </IconBase>
)

CorrectIcon.displayName = "CorrectIcon"
