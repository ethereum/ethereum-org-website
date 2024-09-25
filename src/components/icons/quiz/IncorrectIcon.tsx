import { IconBase, type IconBaseProps } from "react-icons/lib"

import { cn } from "@/lib/utils/cn"

export const IncorrectIcon = ({ className, ...props }: IconBaseProps) => (
  <IconBase className={cn(className, "size-5")} viewBox="0 0 20 20" {...props}>
    <path d="M17.5002 0L9.99912 7.49934L2.49978 0L0 2.49978L7.49934 9.99911L0 17.4984L2.49978 19.9982L9.99912 12.4989L17.5002 19.9982L20 17.4984L12.5007 9.99911L20 2.49978L17.5002 0Z" />
  </IconBase>
)

IncorrectIcon.displayName = "IncorrectIcon"
