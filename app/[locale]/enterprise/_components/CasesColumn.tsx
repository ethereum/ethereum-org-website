import { cn } from "@/lib/utils/cn"

import type { Case } from "../types"

import CaseCard from "./CaseCard"

const CasesColumn = ({
  cases,
  className,
}: {
  cases: Case[]
  className?: string
}) => (
  <div className={cn("flex w-full flex-col gap-4", className)}>
    {cases.map((caseStudy, index) => (
      <CaseCard key={index} caseStudy={caseStudy} />
    ))}
  </div>
)

export default CasesColumn
