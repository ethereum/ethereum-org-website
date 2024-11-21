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
      <div className="absolute bottom-2 left-2 z-hide h-full w-full rounded-sm border-border-high-contrast bg-background-medium" />
      <Card
        className={cn(
          "text-card-foreground z-10 h-full w-full rounded-sm border bg-background-highlight p-6 text-left"
        )}
        {...props}
      >
        {children}
      </Card>
    </div>
  )
}

export default GhostCard
