import { cn } from "@/lib/utils/cn"

const Blockquote = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <blockquote
    className={cn(
      "space-y-[1lh] border-s-2 border-accent-a bg-accent-a/10 p-6",
      className
    )}
    {...props}
  />
)

export default Blockquote
