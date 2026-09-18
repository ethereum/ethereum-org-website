import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export type AdoptionChartItem = {
  /** Already-formatted display value, e.g. "716M" */
  value: ReactNode
  label: ReactNode
}

type AdoptionChartProps = {
  /** Exactly three items, widest ring first */
  items: [AdoptionChartItem, AdoptionChartItem, AdoptionChartItem]
  className?: string
}

/**
 * Decorative "adoption is on the rise" figure: three nested half-discs
 * anchored to the bottom edge, with the value/label pairs listed beside them.
 *
 * The disc radii are illustrative and deliberately NOT proportional to the
 * values (the design reads as a stack, and 716M vs 40M would be invisible) --
 * so the figure is `aria-hidden` and the numbers live in the adjacent list,
 * which is the accessible representation. Plain SVG rather than Recharts: a
 * static shape needs no chart engine, no client bundle, and no resize observer.
 */
const AdoptionChart = ({ items, className }: AdoptionChartProps) => (
  <div
    className={cn(
      "flex flex-col gap-8 md:flex-row md:items-end md:gap-6",
      className
    )}
  >
    <ul className="m-0 flex list-none flex-col gap-6 p-0 md:shrink-0">
      {items.map(({ value, label }, idx) => (
        <li key={idx} className="border-b border-body pb-1">
          {/* `<bdi>` isolates the value: a range like "40–70M" is two numeric
              runs around a bidi-neutral dash, so in Arabic/Urdu the paragraph
              direction reorders it to "70M–40" -- a different number. */}
          <p className="text-xl font-black">
            <bdi>{value}</bdi>
          </p>
          <p className="text-body-medium">{label}</p>
        </li>
      ))}
    </ul>

    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full min-w-0 self-end"
    >
      {/* Concentric half-discs, widest first so each nests on top. One hue at
          three alphas rather than the primary-low/default/high-contrast trio:
          that trio's ramp inverts between themes, which left the outer disc at
          ~1.16:1 against the dark page. Alpha steps read the same on any
          background and keep emphasis increasing inward. */}
      <path d="M0,100 A100,100 0 0 1 200,100 Z" className="fill-primary/20" />
      <path d="M35,100 A65,65 0 0 1 165,100 Z" className="fill-primary/55" />
      <path
        d="M66.5,100 A33.5,33.5 0 0 1 133.5,100 Z"
        className="fill-primary"
      />
    </svg>
  </div>
)

export default AdoptionChart
