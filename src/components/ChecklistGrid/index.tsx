import { CheckCircle } from "@/components/icons/CheckCircle"

import { cn } from "@/lib/utils/cn"

export type ChecklistGridItem = {
  heading: string
  description: string
}

type ChecklistGridProps = {
  items: ChecklistGridItem[]
  className?: string
}

// Tinted 2-column panel of check-marked value props. Shared by /developers and
// /community; the caller supplies already-translated copy via `items`.
const ChecklistGrid = ({ items, className }: ChecklistGridProps) => {
  return (
    <div
      className={cn(
        "rounded-4xl border border-accent-c/20",
        "grid grid-cols-1 gap-6 p-8 md:grid-cols-2 md:p-14",
        "bg-tint-accent-c from-70%",
        className
      )}
    >
      {items.map(({ heading, description }) => (
        <div className="flex gap-1.5" key={heading}>
          <CheckCircle />
          <div className="space-y-1">
            <h3 className="text-lg font-bold">{heading}</h3>
            <p className="text-body-medium">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChecklistGrid
