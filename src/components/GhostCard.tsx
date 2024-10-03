import React from "react"

import { cn } from "@/lib/utils/cn"

import { Card } from "./ui/card"

interface GhostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const GhostCard: React.FC<GhostCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative self-stretch", className)}>
      <div className="absolute bottom-2 left-2 -z-10 h-full w-full rounded-sm border-[1px] border-border bg-background-highlight dark:bg-gray-400" />
      <Card
        className={cn(
          "text-card-foreground z-10 h-full w-full rounded-sm border-[1px] border-border bg-white p-6 text-left dark:bg-gray-600"
        )}
        {...props}
      >
        {children}
      </Card>
    </div>
  )
}

export default GhostCard
