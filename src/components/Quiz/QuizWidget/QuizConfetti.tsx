import * as React from "react"

import { StarConfettiIcon } from "../../icons/quiz"

export const QuizConfetti = () => (
  <div className="relative h-full w-full">
    {/* Use left/right (not start/end) to keep SVG orientation correct for placement */}
    <StarConfettiIcon className="absolute left-0 max-w-44" />
    <StarConfettiIcon className="absolute right-0 max-w-44 -scale-x-100" />
  </div>
)
