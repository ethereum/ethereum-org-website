import { cn } from "@/lib/utils/cn"

export const IconBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid size-20 place-items-center rounded-base border p-6 shadow-window-box [&_svg]:size-8",
      className
    )}
    {...props}
  />
)

export const HighlightStack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("divide-y *:[div]:py-8", className)} {...props} />
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
