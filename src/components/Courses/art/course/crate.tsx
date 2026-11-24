import { type Iso, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { BaseSlab } from "./parts"

const isoCrate = isoProjection(100, 92)

/** A taped parcel, `s` square and `h` tall, at (x, y, z) */
const Parcel = ({
  iso,
  x,
  y,
  z,
  s,
  h,
}: Record<"x" | "y" | "z" | "s" | "h", number> & { iso: Iso }) => {
  const b = iso.box(x, y, z, s, s, h)
  const [a, c] = [iso.P(x + s / 2, y, z + h), iso.P(x + s / 2, y + s, z + h)]
  return (
    <g>
      <polygon points={b.left} fill={LEFT} />
      <polygon points={b.right} fill={RIGHT} />
      <polygon points={b.top} fill={TOP} />
      {/* tape across the lid */}
      <path
        d={`M${a.join(",")} L${c.join(",")}`}
        stroke={RIGHT}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </g>
  )
}

/** Many small parcels packed into one crate, on a wide base slab */
const Crate = () => {
  const [cx, cy, cz, cw, ch] = [-27, -27, 12, 54, 24]
  const rim = cz + ch
  const crate = isoCrate.box(cx, cy, cz, cw, cw, ch)
  const { P, pts } = isoCrate
  // Parcels packed three by three, poking out above the rim, back to front
  const cells = [-25, -8, 9]
  const heights = [
    [16, 12, 14],
    [11, 17, 13],
    [14, 12, 10],
  ]
  const packed = cells
    .flatMap((x, i) => cells.map((y, j) => ({ x, y, h: heights[i][j] })))
    .sort((p, q) => p.x + p.y - (q.x + q.y))
  // Planks across the crate's two visible sides
  const planks = [cz + ch / 3, cz + (2 * ch) / 3]
  return (
    <g transform="translate(0 9)">
      <Shadow cx={100} cy={114} rx={84} />
      <BaseSlab iso={isoCrate} s={88} h={12} />
      {/* inside of the crate, then the parcels, then its front walls */}
      <polygon points={crate.top} fill={RIGHT} />
      {packed.map(({ x, y, h }) => (
        <Parcel
          key={`${x}-${y}`}
          iso={isoCrate}
          x={x}
          y={y}
          z={rim - 8}
          s={15}
          h={h}
        />
      ))}
      <polygon points={crate.left} fill={LEFT} />
      <polygon points={crate.right} fill={RIGHT} />
      {planks.map((z) => (
        <path
          key={z}
          d={`M${P(cx, cy + cw, z).join(",")} L${P(cx + cw, cy + cw, z).join(",")} L${P(cx + cw, cy, z).join(",")}`}
          fill="none"
          stroke={TOP}
          strokeOpacity={0.5}
          strokeWidth={1.2}
        />
      ))}
      {/* rim along the front edges */}
      <polygon
        points={pts(
          P(cx, cy + cw, rim),
          P(cx + cw, cy + cw, rim),
          P(cx + cw, cy, rim),
          P(cx + cw, cy, rim - 2.5),
          P(cx + cw, cy + cw, rim - 2.5),
          P(cx, cy + cw, rim - 2.5)
        )}
        fill={TOP}
        opacity={0.7}
      />
      {/* stragglers on their way in */}
      <g className="course-art-float">
        <Parcel iso={isoCrate} x={-62} y={8} z={34} s={15} h={13} />
      </g>
      <g className="course-art-float-late">
        <Parcel iso={isoCrate} x={14} y={-66} z={34} s={15} h={13} />
      </g>
    </g>
  )
}

export default Crate
