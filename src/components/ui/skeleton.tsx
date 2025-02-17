import { cn } from "@/lib/utils/cn"

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

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("h-4 animate-pulse rounded bg-disabled", className)}
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

export { Skeleton, SkeletonLines }
