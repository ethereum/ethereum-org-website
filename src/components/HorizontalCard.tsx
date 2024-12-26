import React, { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import Emoji from "./Emoji"

export interface HorizontalCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  emoji: string
  emojiClassName?: string
  title?: ReactNode
  description: ReactNode
  children?: ReactNode
}

const HorizontalCard = ({
  emoji,
  emojiClassName,
  title,
  description,
  children,
  className,
  ...props
}: HorizontalCardProps) => {
  return (
    <div className={cn("flex items-center gap-8", className)} {...props}>
      <Emoji text={emoji} className={cn("text-5xl", emojiClassName)} />
      <div className="flex-shrink flex-grow-0 basis-3/4 space-y-2">
        <p className="text-lg">{title}</p>
        <p>{description}</p>
        {children}
      </div>
    </div>
  )
}

export default HorizontalCard
