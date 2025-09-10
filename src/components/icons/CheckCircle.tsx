import { Check } from "lucide-react"

import { cn } from "@/lib/utils/cn"

export const CheckCircle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "my-1 grid h-fit place-items-center rounded-full bg-success/20 p-1",
      className
    )}
    {...props}
  >
    <Check
      className="size-3 stroke-[4] text-success"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </div>
)
