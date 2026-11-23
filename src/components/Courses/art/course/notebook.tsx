import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

const isoNotebook = isoProjection(0, 0)

/** An open spiral notebook lying flat, `w` wide across both pages */
const OpenNotebook = ({ x, y }: { x: number; y: number }) => {
  const [w, d] = [56, 40]
  const at = (px: number, py: number, pz: number) => {
    const [sx, sy] = isoNotebook.P(px, py, pz)
    return [sx + x, sy + y] as const
  }
  const shift = (pts: string) =>
    pts
      .split(" ")
      .map((pt) => {
        const [px, py] = pt.split(",").map(Number)
        return `${Math.round((px + x) * 10) / 10},${Math.round((py + y) * 10) / 10}`
      })
      .join(" ")
  const cover = isoNotebook.box(-3, -3, 0, w + 6, d + 6, 4)
  const half = w / 2
  const pages = [
    isoNotebook.box(0, 0, 4, half - 1, d, 4),
    isoNotebook.box(half + 1, 0, 4, half - 1, d, 4),
  ]
  // Ruled lines across each page, the same on every copy
  const rows = [8, 15, 22, 29]
  const lengths = [
    [20, 24, 16, 22],
    [24, 14, 22, 18],
  ]
  return (
    <g>
      <polygon points={shift(cover.left)} fill={LEFT} />
      <polygon points={shift(cover.right)} fill={RIGHT} />
      <polygon points={shift(cover.top)} fill={RIGHT} />
      {pages.map((page, i) => (
        <g key={i}>
          <polygon points={shift(page.left)} fill={TOP} />
          <polygon points={shift(page.right)} fill={TOP} />
          <polygon points={shift(page.top)} fill={TOP} />
        </g>
      ))}
      {[0, 1].map((side) =>
        rows.map((row, i) => {
          const x0 = side ? half + 4 : 3
          const [x1, y1] = at(x0, row, 8)
          const [x2, y2] = at(x0 + lengths[side][i], row, 8)
          return (
            <line
              key={`${side}-${row}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={LEFT}
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          )
        })
      )}
      {(() => {
        const [[x1, y1], [x2, y2]] = [at(half, 0, 8), at(half, d, 8)]
        return (
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={RIGHT}
            strokeWidth={1.2}
          />
        )
      })()}
      {/* spiral rings along the spine */}
      {[5, 12, 19, 26, 33].map((row) => {
        const [cx, cy] = at(half, row, 9)
        return (
          <ellipse
            key={row}
            cx={cx}
            cy={cy}
            rx={2.4}
            ry={3.2}
            fill="none"
            stroke={RIGHT}
            strokeWidth={1.5}
          />
        )
      })}
    </g>
  )
}

/** Identical copies of one notebook, floating at different heights */
const Notebook = () => (
  <>
    <Shadow cx={100} cy={137} rx={68} />
    <g className="course-art-float-late">
      <OpenNotebook x={45} y={34} />
    </g>
    <g className="course-art-float">
      <OpenNotebook x={141} y={34} />
    </g>
    <g className="course-art-float-late">
      <OpenNotebook x={93} y={80} />
    </g>
  </>
)

export default Notebook
