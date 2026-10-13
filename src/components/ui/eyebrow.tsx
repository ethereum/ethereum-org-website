import { cn } from "@/lib/utils/cn"

const Eyebrow = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      "text-sm font-bold tracking-wide text-primary-high-contrast uppercase",
      className
    )}
    {...props}
  />
)

export default Eyebrow
