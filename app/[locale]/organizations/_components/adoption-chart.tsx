import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

import AdoptionFigure from "./adoption-chart.svg"

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
 * "Adoption is on the rise" figure, exported from the Figma frame (node
 * 400:498) so the leader lines land exactly on each ring edge -- geometry that
 * is fiddly to keep correct in hand-written markup across breakpoints.
 *
 * The export carries its own labels as outlined glyphs, so they are baked in:
 * every locale shows the English text, and the figures cannot be selected or
 * re-flowed. The values therefore also live in the `sr-only` list below, which
 * is the accessible representation and keeps them translatable.
 *
 * Colours are rebound rather than exported: the frame is a light-mode design,
 * and its literal `#EDE2FF` outer ring reads as a bright slab on the dark
 * page. The rings take `--adoption-ring` at three alphas -- one hue, so the
 * ramp holds in both themes, which the flat trio did not -- and text and rules
 * inherit `currentColor`. SVGO strips ids, so the paint sits on the elements.
 */
const AdoptionChart = ({ items, className }: AdoptionChartProps) => (
  <div className={cn("min-w-0", className)}>
    <AdoptionFigure
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full text-body [--adoption-ring:hsla(var(--primary))]"
    />

    <dl className="sr-only">
      {items.map(({ value, label }, idx) => (
        <div key={idx}>
          <dt>{label}</dt>
          {/* `<bdi>` isolates the value: a range like "40–70M" is two numeric
              runs around a bidi-neutral dash, so in Arabic/Urdu the paragraph
              direction reorders it to "70M–40" -- a different number. */}
          <dd>
            <bdi>{value}</bdi>
          </dd>
        </div>
      ))}
    </dl>
  </div>
)

export default AdoptionChart
