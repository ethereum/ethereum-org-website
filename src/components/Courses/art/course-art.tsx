import type { CourseArtId } from "@/data/courses"

import {
  ArtFrame,
  type ArtTone,
  Box,
  isoProjection,
  LEFT,
  RIGHT,
  Shadow,
  TOP,
} from "./shared"

/** One hero illustration per course; see `scenery.tsx` for path decorations */

const isoBlocks = isoProjection(100, 70)
const isoCoins = isoProjection(100, 80)
const isoVault = isoProjection(100, 70)
const isoTank = isoProjection(100, 100)
const isoContract = isoProjection(84, 104)

const Coin = ({ x, y, z }: { x: number; y: number; z: number }) => {
  const c = isoCoins.cylinder(x, y, z, 16, 6)
  return (
    <g>
      <path d={c.body} fill={RIGHT} />
      <ellipse {...c.top} fill={TOP} />
      <ellipse
        cx={c.top.cx}
        cy={c.top.cy}
        rx={c.top.rx * 0.6}
        ry={c.top.ry * 0.6}
        fill="none"
        stroke={LEFT}
        strokeWidth={1.5}
      />
    </g>
  )
}

const Diamond = () => (
  <>
    <Shadow cx={100} cy={146} rx={44} />
    <g className="course-art-float">
      {/* back faces */}
      <polygon points="100,12 56,78 100,62" fill={TOP} />
      <polygon points="100,12 100,62 144,78" fill={LEFT} />
      {/* front upper */}
      <polygon points="100,12 56,78 100,94" fill={LEFT} />
      <polygon points="100,12 100,94 144,78" fill={RIGHT} />
      {/* front lower */}
      <polygon points="56,84 100,100 100,134" fill={TOP} />
      <polygon points="144,84 100,100 100,134" fill={LEFT} />
    </g>
  </>
)

const Blocks = () => (
  <>
    <Shadow cx={104} cy={136} rx={70} />
    <g className="course-art-float">
      <Box iso={isoBlocks} x={-48} y={0} z={0} w={34} d={34} h={34} />
    </g>
    <g className="course-art-float-late">
      <Box iso={isoBlocks} x={-4} y={0} z={8} w={34} d={34} h={34} />
    </g>
    <g className="course-art-float">
      <Box iso={isoBlocks} x={40} y={0} z={16} w={34} d={34} h={34} />
    </g>
  </>
)

const Coins = () => (
  <>
    <Shadow cx={100} cy={124} rx={64} />
    {[
      { x: -20, y: 20, n: 3 },
      { x: 20, y: 0, n: 6 },
      { x: 30, y: 40, n: 2 },
    ].map(({ x, y, n }) => (
      <g key={`${x}-${y}`}>
        {Array.from({ length: n }, (_, i) => (
          <Coin key={i} x={x} y={y} z={i * 7} />
        ))}
      </g>
    ))}
    <g className="course-art-float">
      <Coin x={-10} y={-30} z={40} />
    </g>
  </>
)

const Vault = () => {
  const [ex, ey] = isoVault.P(30, 60, 30)
  return (
    <>
      <Shadow cx={100} cy={136} rx={66} />
      <Box iso={isoVault} x={0} y={0} z={0} w={60} d={60} h={60} />
      {/* door on the front-left face */}
      <g transform={`matrix(0.866 0.5 0 1 ${ex} ${ey})`}>
        <circle r={20} fill={TOP} />
        <circle r={13} fill="none" stroke={RIGHT} strokeWidth={3} />
        <path
          d="M-13,0H13M0,-13V13"
          stroke={RIGHT}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle r={4} fill={RIGHT} />
      </g>
      {/* Gems float clear of the cube (its corners sit at x 48 and 152) */}
      <g className="course-art-float">
        <Gem cx={177} cy={30} rx={11} ry={17} />
      </g>
      <g className="course-art-float-late">
        <Gem cx={24} cy={60} rx={8} ry={12} />
      </g>
    </>
  )
}

/** Two-tone floating gem: a light left facet and a darker right one */
const Gem = ({
  cx,
  cy,
  rx,
  ry,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
}) => (
  <>
    <polygon
      points={`${cx},${cy - ry} ${cx - rx},${cy} ${cx},${cy + ry}`}
      fill={TOP}
    />
    <polygon
      points={`${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry}`}
      fill={LEFT}
    />
  </>
)

const Tank = () => {
  const body = isoTank.cylinder(20, 20, 0, 36, 76)
  const level = isoTank.cylinder(20, 20, 0, 36, 44)
  return (
    <>
      <Shadow cx={body.base.cx} cy={body.base.cy + 4} rx={62} />
      <path d={body.body} fill={TOP} opacity={0.45} />
      <path d={level.body} fill={LEFT} />
      <ellipse {...level.top} fill={TOP} />
      <ellipse
        {...body.top}
        fill="none"
        stroke={RIGHT}
        strokeWidth={2}
        opacity={0.6}
      />
      <g className="course-art-float">
        <path
          d={`M${body.top.cx},${body.top.cy - 30} q 10,14 0,22 q -10,-8 0,-22z`}
          fill={LEFT}
        />
      </g>
    </>
  )
}

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

const ART: Record<CourseArtId, () => React.JSX.Element> = {
  diamond: Diamond,
  blocks: Blocks,
  coins: Coins,
  vault: Vault,
  tank: Tank,
  contract: Contract,
}

interface CourseArtProps {
  id: CourseArtId
  tone?: ArtTone
  className?: string
}

const CourseArt = ({ id, tone, className }: CourseArtProps) => {
  const Art = ART[id]
  return (
    <ArtFrame tone={tone} className={className}>
      <Art />
    </ArtFrame>
  )
}

export default CourseArt
