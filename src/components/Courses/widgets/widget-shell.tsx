import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

/** Common frame for lesson widgets */
const WidgetShell = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={cn(
      "flex flex-col gap-5 rounded-3xl border-2 border-(--course-soft) bg-(--course-softer) p-4 md:p-6",
      className
    )}
  >
    {children}
  </div>
)

export default WidgetShell
