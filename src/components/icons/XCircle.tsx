import { X } from "lucide-react"

import { cn } from "@/lib/utils/cn"

export const XCircle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "my-1 grid h-fit place-items-center rounded-full bg-error/20 p-1",
      className
    )}
    {...props}
  >
    <X
      className="size-3 stroke-4 text-error"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </div>
)
