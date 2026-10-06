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
  <div className="flex flex-col md:flex-row">
    {stats.map(({ label, ...stat }, idx) => (
      <BigNumber key={idx} variant="ruled" center={false} {...stat}>
        {label}
      </BigNumber>
    ))}
  </div>
)

export default HeroStats
