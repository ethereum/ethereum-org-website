import { cn } from "@/lib/utils/cn"

export const IconBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "shadow-window-box grid size-20 place-items-center rounded-2xl border p-6 [&_svg]:size-8",
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
      "divide-y [&>div]:py-8 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0",
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
  <div className={cn("text-body-medium space-y-6", className)} {...props} />
)
