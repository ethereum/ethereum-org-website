import { cn } from "@/lib/utils/cn"

import HoldersFigure from "./crypto-holders-chart.svg"

export type CryptoHoldersCallout = {
  key: string
  /** Locale-formatted value, e.g. "40%" */
  display: string
  label: string
}

type CryptoHoldersChartProps = {
  /** Exactly two callouts: current share first, expected share second */
  callouts: [CryptoHoldersCallout, CryptoHoldersCallout]
  className?: string
}

/**
 * The design's pie with its two callouts, exported from the Figma frame
 * (node 399:451). Drawn as one figure rather than a Recharts pie beside a list
 * of values: the design's leader lines run from each figure back to the pie's
 * edge, and keeping that join correct across breakpoints meant pinning the
 * text to the wedge it points at -- which is exactly what the export already
 * encodes.
 *
 * The labels are baked in as outlined glyphs, so every locale shows the
 * English text and the figures cannot be selected. They are therefore repeated
 * in the `sr-only` list below, which is the accessible representation and
 * keeps them translatable.
 *
 * The wedge colours come from the wrapper. The frame's own purples only work
 * on a white page -- `purple-800` sinks into a black one -- so each wedge
 * takes a custom property with a dark value, the same per-theme mapping the
 * Recharts version carried. Text and leader lines inherit `currentColor`.
 */
const CryptoHoldersChart = ({
  callouts,
  className,
}: CryptoHoldersChartProps) => (
  <div className={cn("min-w-0", className)}>
    <HoldersFigure
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-auto w-full text-body",
        "[--holders-deep:hsla(var(--purple-800))] dark:[--holders-deep:hsla(var(--purple-300))]",
        "[--holders-mid:hsla(var(--purple-600))] dark:[--holders-mid:hsla(var(--purple-500))]",
        "[--holders-pale:hsla(var(--purple-100))] dark:[--holders-pale:hsla(var(--purple-700))]"
      )}
    />

    <dl className="sr-only">
      {callouts.map(({ key, display, label }) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd>{display}</dd>
        </div>
      ))}
    </dl>
  </div>
)

export default CryptoHoldersChart
