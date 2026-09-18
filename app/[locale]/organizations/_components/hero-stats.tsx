import type { ReactNode } from "react"

import BigNumber from "@/components/BigNumber"

export type HeroStat = {
  /** Formatted display value; pass `undefined` to render the BigNumber error dash */
  value?: ReactNode
  label: ReactNode
  sourceName?: string
  sourceUrl?: string
  lastUpdated?: number | string
}

type HeroStatsProps = {
  stats: HeroStat[]
}

/**
 * Row of headline metrics rendered directly under a `PageHero` on the
 * /organizations/ pages. Each metric is a `BigNumber` (value + label, with the
 * optional data-source tooltip) separated by a start-side rule.
 */
const HeroStats = ({ stats }: HeroStatsProps) => (
  <div className="flex flex-col gap-6 **:data-[label=value]:text-primary md:flex-row md:gap-12">
    {stats.map(({ label, ...stat }, idx) => (
      <BigNumber
        key={idx}
        variant="light"
        center={false}
        className="border-s py-0 ps-4 uppercase"
        {...stat}
      >
        {label}
      </BigNumber>
    ))}
  </div>
)

export default HeroStats
