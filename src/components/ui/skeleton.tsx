import { cn } from "@/lib/utils/cn"

import { Card, CardBanner, CardContent } from "../ui/card"

// Pseudo-random list of skeleton widths for multiple lines
const widths = [
  "w-1/3",
  "w-1/5",
  "w-4",
  "w-1/4",
  "w-1/2",
  "w-1/6",
  "w-8",
  "w-1/4",
  "w-1/3",
  "w-1/5",
  "w-1/6",
  "w-4",
  "w-1/4",
  "w-1/3",
  "w-1/2",
  "w-1/5",
]

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "h-4 animate-pulse-light rounded bg-disabled opacity-5 dark:opacity-60",
        className
      )}
      {...props}
    />
  )
}

type SkeletonLinesProps = React.HTMLAttributes<HTMLDivElement> & {
  noOfLines?: number
}

const SkeletonLines = ({
  className,
  noOfLines = 1,
  ...props
}: SkeletonLinesProps) => (
  <div
    className={cn("flex !h-full flex-col gap-4 px-4 pt-8", className)}
    {...props}
  >
    {Array(noOfLines)
      .fill(0)
      .map((_, idx) => (
        <Skeleton
          key={idx}
          className={cn("h-3", widths[idx % widths.length])}
        />
      ))}
  </div>
)

type SkeletonCardProps = {
  className?: string
}

const SkeletonCardContent = ({ className }: SkeletonCardProps) => (
  <CardContent className={cn("cursor-default space-y-3", className)}>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-1/3" />
  </CardContent>
)

const SkeletonCard = ({ className }: SkeletonCardProps) => (
  <Card className={cn("cursor-default", className)}>
    <CardBanner />
    <SkeletonCardContent />
  </Card>
)

type SkeletonCardGridProps = {
  className?: string
}

const SkeletonCardGrid = ({ className }: SkeletonCardGridProps) => (
  <div className={`${className} grid gap-8 sm:grid-cols-2 lg:grid-cols-3`}>
    <SkeletonCard />
    <SkeletonCard className="hidden sm:block" />
    <SkeletonCard className="hidden lg:block" />
  </div>
)

export {
  Skeleton,
  SkeletonCard,
  SkeletonCardContent,
  SkeletonCardGrid,
  SkeletonLines,
}
