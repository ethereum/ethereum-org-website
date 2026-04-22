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
      <div className="z-hide border-border-high-contrast bg-background-medium absolute bottom-2 left-2 h-full w-full rounded-xs" />
      <Card
        className={cn(
          "text-card-foreground bg-background-highlight z-10 h-full w-full rounded-xs border p-6 text-left"
        )}
        {...props}
      >
        {children}
      </Card>
    </div>
  )
}

export default GhostCard
