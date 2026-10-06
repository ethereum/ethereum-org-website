import { getLocale, getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"
import { normalizeIntlSpaces } from "@/lib/utils/intl"
import { numberFormat } from "@/lib/utils/numbers"

// TODO(data): confirm each figure against the NCA report (or its own source)
const OWNERS = 716_000_000
const ADDRESSES = 181_000_000
const USERS_RANGE = [40_000_000, 70_000_000] as const

// Geometry from the Figma frame (node 400:498), in viewBox units. Three
// concentric half-discs on one baseline; each leader line ends inside its ring.
const WIDTH = 648
const HEIGHT = 287
const CX = 362
const RINGS = [
  { r: 286, opacity: 0.2, lineY: 83, lineEnd: 196 },
  { r: 186, opacity: 0.55, lineY: 177, lineEnd: 230 },
  { r: 96, opacity: 1, lineY: 267, lineEnd: 296 },
] as const

const halfDisc = (r: number) =>
  `M${CX - r} ${HEIGHT}A${r} ${r} 0 0 1 ${CX + r} ${HEIGHT}Z`

const pct = (n: number, of: number) => `${(n / of) * 100}%`

type AdoptionChartProps = {
  className?: string
}

const AdoptionChart = async ({ className }: AdoptionChartProps) => {
  const locale = await getLocale()
  const t = await getTranslations("page-organizations")

  const compact = numberFormat(locale, { notation: "compact" })
  const items = [
    {
      value: compact.format(OWNERS),
      label: t("page-organizations-adoption-owners-label"),
    },
    {
      value: compact.format(ADDRESSES),
      label: t("page-organizations-adoption-addresses-label"),
    },
    {
      value: normalizeIntlSpaces(compact.formatRange(...USERS_RANGE)),
      label: t("page-organizations-adoption-users-label"),
    },
  ]

  return (
    <figure
      className={cn(
        "@container relative m-0 aspect-648/287 min-w-0 text-body",
        className
      )}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full rtl:-scale-x-100"
      >
        {RINGS.map(({ r, opacity }) => (
          <path
            key={r}
            d={halfDisc(r)}
            className="fill-primary"
            fillOpacity={opacity}
          />
        ))}
        {RINGS.map(({ lineY, lineEnd }) => (
          <line
            key={lineY}
            x1={0}
            x2={lineEnd}
            y1={lineY}
            y2={lineY}
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Labels sit on their leader lines and grow upward, so longer
          translations wrap without drifting off the ring they point at. */}
      <dl className="m-0">
        {items.map(({ value, label }, idx) => (
          <div
            key={idx}
            className="absolute start-0 flex flex-wrap items-baseline gap-x-2 pb-1 @lg:flex-col @lg:items-start"
            style={{
              bottom: pct(HEIGHT - RINGS[idx].lineY, HEIGHT),
              maxWidth: pct(Math.max(RINGS[idx].lineEnd, WIDTH * 0.45), WIDTH),
            }}
          >
            <dd className="order-first m-0 text-lg leading-tight font-bold @lg:text-2xl">
              {/* `<bdi>` keeps a range's digits in order inside RTL text */}
              <bdi>{value}</bdi>
            </dd>
            <dt className="text-sm leading-snug @lg:text-md">{label}</dt>
          </div>
        ))}
      </dl>
    </figure>
  )
}

export default AdoptionChart
