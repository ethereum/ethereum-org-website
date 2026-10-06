import { cn } from "@/lib/utils/cn"

export type CryptoHoldersCallout = {
  /** Share of all holders, 0-100 */
  value: number
  /** Locale-formatted value, e.g. "40%" */
  display: string
  label: string
}

type CryptoHoldersChartProps = {
  /** Smaller share first; both wedges start from the same edge */
  callouts: [CryptoHoldersCallout, CryptoHoldersCallout]
  className?: string
}

// viewBox units, from the Figma frame (node 399:451)
const WIDTH = 567
const HEIGHT = 400
const R = 200
const CX = R
const CY = R
const START = 180 // degrees, the 9 o'clock edge; wedges sweep down through 6

const point = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const
}

const wedge = (share: number) => {
  const sweep = (share / 100) * 360
  const [x0, y0] = point(START)
  const [x1, y1] = point(START - sweep)
  return `M${CX} ${CY}L${x0} ${y0}A${R} ${R} 0 ${sweep > 180 ? 1 : 0} 0 ${x1} ${y1}Z`
}

/** Leader line: horizontal from the inline-end edge into the band it labels */
const leader = (fromShare: number, toShare: number) => {
  const mid = START - ((fromShare + toShare) / 2 / 100) * 360
  const [x, y] = point(mid, R * 0.7)
  return { x, y }
}

const pct = (n: number, of: number) => `${(n / of) * 100}%`

/**
 * Two overlapping shares of one whole: the full disc is all holders, each wedge
 * is drawn to scale from the same edge, and each leader line lands in the band
 * only its own share covers.
 */
const CryptoHoldersChart = ({
  callouts,
  className,
}: CryptoHoldersChartProps) => {
  const [inner, outer] = callouts
  const leaders = [leader(0, inner.value), leader(inner.value, outer.value)]

  return (
    <figure
      className={cn(
        "@container relative m-0 aspect-567/400 min-w-0 text-body",
        className
      )}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full rtl:-scale-x-100"
      >
        <circle cx={CX} cy={CY} r={R} className="fill-primary/20" />
        <path d={wedge(outer.value)} className="fill-primary/55" />
        <path d={wedge(inner.value)} className="fill-primary" />
        {leaders.map(({ x, y }) => (
          <line
            key={y}
            x1={x}
            x2={WIDTH}
            y1={y}
            y2={y}
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <dl className="m-0">
        {callouts.map(({ display, label }, idx) => (
          <div
            key={label}
            className="absolute end-0 flex max-w-[40%] flex-col items-end pb-1 text-end"
            style={{ bottom: pct(HEIGHT - leaders[idx].y, HEIGHT) }}
          >
            <dd className="order-first m-0 text-lg leading-tight font-bold @lg:text-2xl">
              <bdi>{display}</bdi>
            </dd>
            <dt className="text-sm leading-snug @lg:text-md">{label}</dt>
          </div>
        ))}
      </dl>
    </figure>
  )
}

export default CryptoHoldersChart
