import { StarConfettiIcon } from "@/components/icons/quiz/StarConfettiIcon"

import { cn } from "@/lib/utils/cn"

export const QuizConfetti = () => {
  const commonClasses = "text-[184px] absolute top-0"
  return (
    <>
      <StarConfettiIcon className={cn(commonClasses, "left-0")} />

      <StarConfettiIcon className={cn(commonClasses, "right-0 -scale-x-100")} />
    </>
  )
}
