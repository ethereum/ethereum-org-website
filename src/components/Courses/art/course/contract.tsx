import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

const isoContract = isoProjection(84, 104)

const Gear = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {Array.from({ length: 8 }, (_, i) => (
      <rect
        key={i}
        x={-r * 0.22}
        y={-r - r * 0.3}
        width={r * 0.44}
        height={r * 0.6}
        rx={r * 0.08}
        transform={`rotate(${i * 45})`}
        fill={RIGHT}
      />
    ))}
    <circle r={r} fill={RIGHT} />
    <circle r={r * 0.78} fill={LEFT} />
    <circle r={r * 0.32} fill={TOP} />
  </g>
)

/** A page of code standing on its edge, with the gears that run it */
const Contract = () => {
  const page = { x: -18, y: 22, w: 64, d: 6, h: 84 }
  const back = { x: -8, y: 12, w: 64, d: 6, h: 86 }
  const sheet = (p: typeof page, z: number) =>
    isoContract.box(p.x, p.y, z, p.w, p.d, p.h)
  const front = sheet(page, 0)
  const behind = sheet(back, 4)
  const [fx, fy] = isoContract.P(page.x, page.y + page.d, page.h)
  return (
    <>
      <Shadow cx={104} cy={138} rx={68} />
      <g className="course-art-float">
        <polygon points={behind.left} fill={LEFT} />
        <polygon points={behind.right} fill={RIGHT} />
        <polygon points={behind.top} fill={TOP} />
        <polygon points={front.right} fill={RIGHT} />
        <polygon points={front.top} fill={LEFT} />
        <polygon points={front.left} fill={TOP} />
        {/* code lines and a check seal on the front face */}
        <g transform={`matrix(0.866 0.5 0 1 ${fx} ${fy})`}>
          {[
            [0, 30],
            [8, 38],
            [16, 26],
            [8, 34],
            [0, 18],
          ].map(([indent, length], i) => (
            <rect
              key={i}
              x={9 + indent}
              y={13 + i * 10}
              width={length}
              height={4}
              rx={2}
              fill={LEFT}
            />
          ))}
          <circle cx={48} cy={70} r={8} fill={LEFT} />
          <path
            d="M44,70 l3,3 l5,-6"
            fill="none"
            stroke={TOP}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g className="course-art-float-late">
        <Gear cx={140} cy={96} r={20} />
        <Gear cx={164} cy={64} r={12} />
      </g>
    </>
  )
}

export default Contract
