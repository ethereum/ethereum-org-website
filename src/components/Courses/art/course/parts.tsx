/** Pieces drawn by more than one course illustration */

import { type Iso, LEFT, RIGHT, TOP } from "../shared"

/**
 * ETH glyph from its top point, `h` tall. Proportions follow
 * `src/components/icons/eth-home-icon.svg`: a four-facet upper kite and a
 * two-facet lower chevron, split by an open gap.
 */
export const EthGlyph = ({
  cx,
  y,
  h,
}: {
  cx: number
  y: number
  h: number
}) => {
  const p = (dx: number, dy: number) =>
    `${Math.round((cx + dx * h) * 10) / 10},${Math.round((y + dy * h) * 10) / 10}`
  const [top, inner, waist, tip] = [p(0, 0), p(0, 0.367), p(0, 0.687), p(0, 1)]
  const [cornerL, cornerR] = [p(-0.314, 0.507), p(0.314, 0.507)]
  const [chevronL, chevronR, notch] = [
    p(-0.311, 0.568),
    p(0.311, 0.568),
    p(0, 0.749),
  ]
  return (
    <>
      <polygon points={`${top} ${cornerL} ${inner}`} fill={LEFT} />
      <polygon points={`${top} ${inner} ${cornerR}`} fill={RIGHT} />
      <polygon points={`${inner} ${cornerL} ${waist}`} fill={TOP} />
      <polygon points={`${inner} ${waist} ${cornerR}`} fill={LEFT} />
      <polygon points={`${chevronL} ${notch} ${tip}`} fill={TOP} />
      <polygon points={`${notch} ${chevronR} ${tip}`} fill={LEFT} />
    </>
  )
}

/** Maps flat (u, v) drawing onto a box's front-left face, from its top-left corner */
export const onLeftFace = ([x, y]: [number, number]) =>
  `matrix(0.866 0.5 0 1 ${x} ${y})`

/** A coin seen face on, radius `r`, centred at (cx, cy), with its edge below */
export const FlatCoin = ({
  cx,
  cy,
  r,
}: {
  cx: number
  cy: number
  r: number
}) => (
  <g>
    <circle cx={cx} cy={cy + r * 0.18} r={r} fill={RIGHT} />
    <circle cx={cx} cy={cy} r={r} fill={TOP} />
    <circle
      cx={cx}
      cy={cy}
      r={r * 0.6}
      fill="none"
      stroke={LEFT}
      strokeWidth={1.5}
    />
  </g>
)

export const SmallKey = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y}) rotate(-30)`}>
    <circle r={8} fill={RIGHT} />
    <circle r={3.2} fill={TOP} />
    <rect x={6} y={-2.5} width={22} height={5} rx={2} fill={RIGHT} />
    <rect x={20} y={2} width={4} height={6} rx={1} fill={RIGHT} />
    <rect x={13} y={2} width={4} height={5} rx={1} fill={RIGHT} />
  </g>
)

/** A slab standing for Ethereum: wide, low, with a groove round its side */
export const BaseSlab = ({ iso, s, h }: { iso: Iso; s: number; h: number }) => {
  const b = iso.box(-s / 2, -s / 2, 0, s, s, h)
  const { P } = iso
  const groove = (z: number) => {
    const [a, c, e] = [
      P(-s / 2, s / 2, z),
      P(s / 2, s / 2, z),
      P(s / 2, -s / 2, z),
    ]
    return `M${a.join(",")} L${c.join(",")} L${e.join(",")}`
  }
  return (
    <g>
      <polygon points={b.left} fill={LEFT} />
      <polygon points={b.right} fill={RIGHT} />
      <polygon points={b.top} fill={TOP} />
      <path
        d={groove(h * 0.45)}
        fill="none"
        stroke={TOP}
        strokeOpacity={0.45}
        strokeWidth={1.2}
      />
    </g>
  )
}
