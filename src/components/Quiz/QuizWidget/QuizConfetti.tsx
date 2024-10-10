import * as React from "react"

import { cn } from "@/lib/utils/cn"

import { StarConfettiIcon } from "../../icons/quiz"

export const QuizConfetti = () => {
  const commonClasses = "absolute"
  return (
    <div className="relative">
      <StarConfettiIcon className={cn(commonClasses, "start-0")} />

      <StarConfettiIcon className={cn(commonClasses, "end-0 -scale-x-100")} />
    </div>
  )
}
