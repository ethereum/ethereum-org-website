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

/*
 * Small props that sit beside the lesson path. Shared by every course (the
 * course colour tints them) and deliberately distinct from the hero art, so
 * the banner illustration never repeats down the page.
 */

const isoNode = isoProjection(100, 90)
const isoLock = isoProjection(100, 96)
const isoStairs = isoProjection(100, 100)
const isoPot = isoProjection(100, 118)

const Node = () => {
  const led = (z: number) => {
    const [a, b] = [isoNode.P(-24, 22, z), isoNode.P(-14, 22, z)]
    return (
      <>
        <circle cx={a[0]} cy={a[1]} r={2.6} fill={TOP} />
        <circle cx={b[0]} cy={b[1]} r={2.6} fill={TOP} />
      </>
    )
  }
  const slot = (z: number) => {
    const [a, b] = [isoNode.P(0, 22, z), isoNode.P(22, 22, z)]
    return (
      <path
        d={`M${a[0]},${a[1]} L${b[0]},${b[1]}`}
        stroke={TOP}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    )
  }
  return (
    <>
      <Shadow cx={100} cy={122} rx={58} />
      <Box iso={isoNode} x={-30} y={-22} z={0} w={60} d={44} h={20} />
      {led(10)}
      {slot(10)}
      <Box iso={isoNode} x={-30} y={-22} z={24} w={60} d={44} h={20} />
      {led(34)}
      {slot(34)}
      <g className="course-art-float">
        <polygon points="150,10 156,20 150,30 144,20" fill={LEFT} />
      </g>
    </>
  )
}

const Lock = () => {
  // Skewed into an x-z plane, so the shackle and keyhole read upright
  const plane = (y: number, z: number) => {
    const [fx, fy] = isoLock.P(0, y, z)
    return `matrix(0.866 0.5 0 1 ${fx} ${fy})`
  }
  return (
    <>
      <Shadow cx={100} cy={126} rx={54} />
      <Box iso={isoLock} x={-28} y={-12} z={0} w={56} d={24} h={44} />
      <g transform={plane(0, 44)}>
        <path
          d="M-17,2 V-12 A17,17 0 0 1 17,-12 V2"
          fill="none"
          stroke={RIGHT}
          strokeWidth={8}
          strokeLinecap="round"
        />
      </g>
      <g transform={plane(12, 22)}>
        <circle cy={-4} r={5.5} fill={RIGHT} />
        <rect x={-2.5} y={-2} width={5} height={13} rx={2} fill={RIGHT} />
      </g>
      <g className="course-art-float-late">
        <polygon points="44,36 48,43 44,50 40,43" fill={LEFT} />
      </g>
    </>
  )
}

const KeyShape = ({ fill }: { fill: string }) => (
  <>
    <circle cx={64} cy={70} r={20} fill="none" stroke={fill} strokeWidth={12} />
    <rect x={82} y={64} width={70} height={12} rx={6} fill={fill} />
    <rect x={128} y={70} width={9} height={18} rx={3} fill={fill} />
    <rect x={142} y={70} width={9} height={24} rx={3} fill={fill} />
  </>
)

const Key = () => (
  <>
    <Shadow cx={104} cy={134} rx={56} />
    <g className="course-art-float">
      <g transform="rotate(-24 104 76)">
        <g transform="translate(3 5)">
          <KeyShape fill={RIGHT} />
        </g>
        <KeyShape fill={LEFT} />
        <path
          d="M52,58 a16,16 0 0 1 18,-4"
          fill="none"
          stroke={TOP}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <rect x={90} y={66} width={40} height={3} rx={1.5} fill={TOP} />
      </g>
    </g>
  </>
)

const Chain = () => (
  <>
    <Shadow cx={100} cy={132} rx={60} />
    <g className="course-art-float">
      <g transform="rotate(-28 100 76)">
        <rect
          x={34}
          y={58}
          width={78}
          height={36}
          rx={18}
          fill="none"
          stroke={LEFT}
          strokeWidth={11}
        />
        <rect
          x={88}
          y={58}
          width={78}
          height={36}
          rx={18}
          fill="none"
          stroke={RIGHT}
          strokeWidth={11}
        />
        {/* Redraw the first link's crossing so the two read as interlocked */}
        <path
          d="M112,76 A18,18 0 0 1 94,94"
          fill="none"
          stroke={LEFT}
          strokeWidth={11}
        />
        <path
          d="M48,62 a14,14 0 0 1 14,-1"
          fill="none"
          stroke={TOP}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>
    </g>
  </>
)

const Stairs = () => (
  <>
    <Shadow cx={100} cy={132} rx={64} />
    {[0, 1, 2, 3].map((i) => (
      <Box
        key={i}
        iso={isoStairs}
        x={-48 + i * 24}
        y={-20}
        z={0}
        w={24}
        d={40}
        h={12 * (4 - i)}
      />
    ))}
    <g className="course-art-float">
      <polygon points="150,30 156,40 150,50 144,40" fill={LEFT} />
    </g>
  </>
)

const Plant = () => {
  const pot = isoPot.cylinder(0, 0, 0, 24, 28)
  const soil = pot.top
  const base = soil.cy
  const leaf = (angle: number, length: number, fill: string) => (
    <ellipse
      cx={100}
      cy={base - length}
      rx={9}
      ry={length}
      fill={fill}
      transform={`rotate(${angle} 100 ${base})`}
    />
  )
  return (
    <>
      <Shadow cx={100} cy={pot.base.cy + 6} rx={46} />
      <g className="course-art-float-late">
        {leaf(-38, 26, LEFT)}
        {leaf(34, 24, RIGHT)}
        {leaf(-12, 34, TOP)}
        {leaf(14, 30, LEFT)}
      </g>
      <path d={pot.body} fill={RIGHT} />
      <ellipse {...soil} fill={LEFT} />
      <ellipse
        cx={soil.cx}
        cy={soil.cy}
        rx={soil.rx}
        ry={soil.ry}
        fill="none"
        stroke={TOP}
        strokeWidth={3}
      />
    </>
  )
}

const SCENERY = {
  node: Node,
  lock: Lock,
  key: Key,
  chain: Chain,
  stairs: Stairs,
  plant: Plant,
} satisfies Record<string, () => React.JSX.Element>

export type SceneryId = keyof typeof SCENERY

export const SCENERY_IDS = Object.keys(SCENERY) as SceneryId[]

/** `count` pieces, starting at an offset so neighbouring courses differ */
export const sceneryFor = (offset: number, count: number): SceneryId[] =>
  Array.from(
    { length: count },
    (_, i) => SCENERY_IDS[(offset + i) % SCENERY_IDS.length]
  )

interface SceneryProps {
  id: SceneryId
  tone?: ArtTone
  className?: string
}

const Scenery = ({ id, tone, className }: SceneryProps) => {
  const Piece = SCENERY[id]
  return (
    <ArtFrame tone={tone} className={className}>
      <Piece />
    </ArtFrame>
  )
}

export default Scenery
