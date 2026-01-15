import { cn } from "@/lib/utils/cn"

export const IconBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid size-20 place-items-center rounded-2xl border p-6 shadow-window-box [&_svg]:size-8",
      className
    )}
    {...props}
  />
)

export const HighlightStack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "divide-y [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 [&>div]:py-8",
      className
    )}
    {...props}
  />
)

export const HighlightCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-4 pb-8 lg:flex-row", className)}
    {...props}
  />
)

export const HighlightCardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-6 text-body-medium", className)} {...props} />
)
