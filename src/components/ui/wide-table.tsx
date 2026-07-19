import { type ChildOnlyProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

type WideTableProps = ChildOnlyProp & {
  className?: string
}

const WideTable = ({ className, ...props }: WideTableProps) => (
  <div
    className={cn("[&_table]:min-w-[1100px] [&_table]:table-fixed", className)}
    {...props}
  />
)

export default WideTable
