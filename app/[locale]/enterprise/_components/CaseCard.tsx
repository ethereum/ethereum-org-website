import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import type { Case } from "../types"

type CaseCardProps = {
  caseStudy: Case
  className?: string
}

const CaseCard = ({
  caseStudy: { name, content },
  className,
}: CaseCardProps) => (
  <Card
    className={cn(
      "space-y-1 rounded-4xl border bg-background p-6 shadow-window-box",
      className
    )}
  >
    <h3 className="text-xl">{name}</h3>
    <p className="text-body-medium">{content}</p>
  </Card>
)

export default CaseCard
