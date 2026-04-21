import { Check } from "lucide-react"

import { cn } from "@/lib/utils/cn"

export const CheckCircle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-success/20 my-1 grid h-fit place-items-center rounded-full p-1",
      className
    )}
    {...props}
  >
    <Check
      className="text-success size-3 stroke-[4]"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </div>
)
