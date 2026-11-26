import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { FlatCoin } from "./parts"

const isoTanks = isoProjection(100, 116)

/** A glass tank on the ground at (x, y), `level` deep in water */
const GlassTank = ({
  x,
  y,
  level,
}: {
  x: number
  y: number
  level: number
}) => {
  const body = isoTanks.cylinder(x, y, 0, 24, 72)
  const water = isoTanks.cylinder(x, y, 0, 24, level)
  return (
    <g>
      <path d={body.silhouette} fill={TOP} opacity={0.45} />
      <path d={water.body} fill={LEFT} />
      <ellipse {...water.top} fill={TOP} />
      <ellipse
        {...body.top}
        fill="none"
        stroke={RIGHT}
        strokeWidth={2}
        opacity={0.6}
      />
    </g>
  )
}

/** Two tanks joined by a pipe, filled to uneven levels: a pool of two tokens */
const Tanks = () => {
  const [lx, ly] = isoTanks.P(-30, 30, 0)
  const [rx] = isoTanks.P(30, -30, 0)
  const pipeY = ly - 16
  return (
    <>
      <Shadow cx={100} cy={124} rx={78} />
      {/* the pipe runs behind both tanks, with a valve in the middle */}
      <rect x={lx} y={pipeY - 5} width={rx - lx} height={10} fill={RIGHT} />
      <rect x={lx} y={pipeY - 5} width={rx - lx} height={4} fill={LEFT} />
      <rect x={96} y={pipeY - 13} width={8} height={9} rx={1.5} fill={RIGHT} />
      <ellipse cx={100} cy={pipeY - 14} rx={11} ry={4} fill={LEFT} />
      <GlassTank x={-30} y={30} level={56} />
      <GlassTank x={30} y={-30} level={22} />
      <g className="course-art-float">
        <FlatCoin cx={152} cy={14} r={10} />
      </g>
      <g className="course-art-float-late">
        <path d="M44,10 q9,13 0,20 q-9,-7 0,-20z" fill={LEFT} />
      </g>
    </>
  )
}

export default Tanks
