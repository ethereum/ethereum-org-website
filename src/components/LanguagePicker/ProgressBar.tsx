import { ComponentPropsWithoutRef } from "react"

import { Progress } from "../ui/progress"

type ProgressBarProps = Pick<ComponentPropsWithoutRef<typeof Progress>, "value">

const ProgressBar = ({ value }: ProgressBarProps) => (
  <Progress value={value} className="h-0.5" />
)

export default ProgressBar
