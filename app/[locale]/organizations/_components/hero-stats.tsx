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
  // Row only from `lg`: three stats with a 3rem gap overflow the viewport at
  // the `md` breakpoint, and `flex-wrap` alone can't save them because
  // BigNumber's root is `shrink-0`.
  <div className="flex flex-col flex-wrap gap-6 **:data-[label=value]:text-primary lg:flex-row lg:gap-12">
    {stats.map(({ label, ...stat }, idx) => (
      <BigNumber
        key={idx}
        variant="light"
        center={false}
        // `py-0` and the start-side rule are layout context (this row sits in
        // an already-padded Section, and the rule is a column divider).
        // TODO(design-system): the purple value and the uppercase label are
        // this row's treatment, not layout -- they want a BigNumber variant
        // (e.g. `variant="stat-rule"`) instead of the descendant selector
        // above and the wrapper below.
        className="py-0 lg:border-s lg:ps-4"
        {...stat}
      >
        <span className="uppercase">{label}</span>
      </BigNumber>
    ))}
  </div>
)

export default HeroStats
