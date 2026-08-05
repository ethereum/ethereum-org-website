import { cn } from "@/lib/utils/cn"

const KBD = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cn(
      "rounded-xs border-2 border-primary px-2 py-0.5 align-middle",
      className
    )}
    {...props}
  />
)

export default KBD
