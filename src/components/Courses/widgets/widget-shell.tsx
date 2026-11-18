import { Pointer } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import { courseText } from "../theme"

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

/**
 * A widget's action buttons span its width: equal shares side by side,
 * stacked on phones
 */
export const widgetActions = "flex flex-col gap-3 sm:flex-row sm:*:flex-1"

/** How to work a step's controls, set apart from the prompt above it */
export const StepHint = ({
  children,
  id,
  className,
}: {
  children: ReactNode
  id?: string
  className?: string
}) => (
  <p
    id={id}
    className={cn(
      "m-0 flex items-start gap-2 border-s-4 border-(--course) ps-3 text-body-medium",
      className
    )}
  >
    <Pointer aria-hidden className={cn("mt-0.5 size-5 shrink-0", courseText)} />
    <span>{children}</span>
  </p>
)

export default WidgetShell
