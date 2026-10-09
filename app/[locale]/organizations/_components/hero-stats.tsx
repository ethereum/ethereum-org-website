import type { ReactNode } from "react"

import BigNumber from "@/components/BigNumber"

export type HeroStat = {
  /** Formatted display value; omit to render the error dash */
  value?: ReactNode
  label: ReactNode
  sourceName?: string
  sourceUrl?: string
  lastUpdated?: number | string
}

/** Row of hero KPIs, rendered inside a `PageHero` description */
const HeroStats = ({ stats }: { stats: HeroStat[] }) => (
  <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap">
    {stats.map(({ label, ...stat }, idx) => (
      <BigNumber
        key={idx}
        variant="ruled"
        center={false}
        // Share the row and let labels wrap; wrap the cell below ~11rem
        className="md:min-w-44 md:flex-1 md:pe-4"
        {...stat}
      >
        {label}
      </BigNumber>
    ))}
  </div>
)

export default HeroStats
