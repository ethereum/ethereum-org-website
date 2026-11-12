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

/**
 * ETH glyph from its top point, `h` tall. Proportions follow
 * `src/components/icons/eth-home-icon.svg`: a four-facet upper kite and a
 * two-facet lower chevron, split by an open gap.
 */
const EthGlyph = ({ cx, y, h }: { cx: number; y: number; h: number }) => {
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

const Diamond = () => (
  <>
    <Shadow cx={100} cy={146} rx={44} />
    <g className="course-art-float">
      <EthGlyph cx={100} y={8} h={126} />
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
      {/* Glyphs float clear of the cube (its corners sit at x 48 and 152) */}
      <g className="course-art-float">
        <EthGlyph cx={177} y={13} h={34} />
      </g>
      <g className="course-art-float-late">
        <EthGlyph cx={24} y={48} h={24} />
      </g>
    </>
  )
}

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

const isoNotebook = isoProjection(0, 0)
const isoMailbox = isoProjection(100, 124)
const isoStamp = isoProjection(100, 96)
const isoVending = isoProjection(100, 114)

/** Maps flat (u, v) drawing onto a box's front-left face, from its top-left corner */
const onLeftFace = ([x, y]: [number, number]) =>
  `matrix(0.866 0.5 0 1 ${x} ${y})`

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

/** A coin seen face on, radius `r`, centred at (cx, cy), with its edge below */
const FlatCoin = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
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

const SmallKey = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y}) rotate(-30)`}>
    <circle r={8} fill={RIGHT} />
    <circle r={3.2} fill={TOP} />
    <rect x={6} y={-2.5} width={22} height={5} rx={2} fill={RIGHT} />
    <rect x={20} y={2} width={4} height={6} rx={1} fill={RIGHT} />
    <rect x={13} y={2} width={4} height={5} rx={1} fill={RIGHT} />
  </g>
)

/**
 * A mailbox on a post: a slot anyone can use and a locked glass door
 * (anyone can see inside; only the key opens it)
 */
const MailboxArt = () => {
  const [w, d, h, z] = [48, 30, 40, 36]
  const corner = isoMailbox.P(-w / 2, d / 2, z + h)
  const [flagX, flagY] = isoMailbox.P(w / 2, -2, z + h - 6)
  // The glass door's opening on the front-left face, and the cavity behind
  // it in 3D, so its inner walls follow the box's own edges
  const [x0, x1] = [-w / 2 + 7, -w / 2 + 41]
  const [zTop, zBottom] = [z + h - 15, z + h - 36]
  const [front, back] = [d / 2, d / 2 - 12]
  const { P, pts } = isoMailbox
  const opening = pts(
    P(x0, front, zTop),
    P(x1, front, zTop),
    P(x1, front, zBottom),
    P(x0, front, zBottom)
  )
  return (
    <>
      <Shadow cx={100} cy={128} rx={50} />
      <Box iso={isoMailbox} x={-4} y={-4} z={0} w={8} d={8} h={z} />
      <Box iso={isoMailbox} x={-w / 2} y={-d / 2} z={z} w={w} d={d} h={h} />
      <g transform={onLeftFace(corner)}>
        <rect x={9} y={6} width={30} height={5} rx={2.5} fill={RIGHT} />
      </g>
      {/* Inside, seen through the glass: back wall, the side wall facing
          the viewer, then the floor, clipped to the opening */}
      <clipPath id="mailbox-opening">
        <polygon points={opening} />
      </clipPath>
      <g clipPath="url(#mailbox-opening)">
        <polygon
          points={pts(
            P(x0, back, zTop),
            P(x1, back, zTop),
            P(x1, back, zBottom),
            P(x0, back, zBottom)
          )}
          fill={RIGHT}
        />
        <polygon
          points={pts(
            P(x0, front, zTop),
            P(x0, back, zTop),
            P(x0, back, zBottom),
            P(x0, front, zBottom)
          )}
          fill={LEFT}
        />
        <polygon
          points={pts(
            P(x0, front, zBottom),
            P(x1, front, zBottom),
            P(x1, back, zBottom),
            P(x0, back, zBottom)
          )}
          fill={TOP}
          opacity={0.7}
        />
      </g>
      <g transform={onLeftFace(corner)}>
        {/* the glass and the keyhole */}
        <rect
          x={7}
          y={15}
          width={34}
          height={21}
          fill={TOP}
          fillOpacity={0.2}
          stroke={TOP}
          strokeWidth={1.6}
        />
        <circle cx={35} cy={25.5} r={2.6} fill={TOP} />
        <rect x={34.2} y={26} width={1.6} height={4} fill={TOP} />
      </g>
      {/* raised flag on the side */}
      <rect x={flagX - 1.5} y={flagY - 22} width={3} height={24} fill={RIGHT} />
      <rect
        x={flagX - 1.5}
        y={flagY - 22}
        width={14}
        height={9}
        rx={1}
        fill={LEFT}
      />
      <g className="course-art-float">
        <FlatCoin cx={46} cy={36} r={11} />
      </g>
      <g className="course-art-float-late">
        <SmallKey x={146} y={44} />
      </g>
    </>
  )
}

/** Stamp with a perforated edge, `s` wide, top-left corner at (x, y) */
const PostageStamp = ({ x, y, s }: { x: number; y: number; s: number }) => {
  const h = s * 1.2
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={s}
        height={h}
        fill={RIGHT}
        stroke={RIGHT}
        strokeWidth={3.2}
        strokeDasharray="0 4"
        strokeLinecap="round"
      />
      <rect
        x={s * 0.14}
        y={s * 0.14}
        width={s * 0.72}
        height={h - s * 0.28}
        fill={TOP}
      />
      {/* a small sun over hills */}
      <circle cx={s * 0.62} cy={h * 0.36} r={s * 0.11} fill={LEFT} />
      <path
        d={`M${s * 0.14},${h * 0.76} Q${s * 0.36},${h * 0.5} ${s * 0.56},${h * 0.7} T${s * 0.86},${h * 0.62} V${h - s * 0.14} H${s * 0.14}Z`}
        fill={LEFT}
      />
    </g>
  )
}

/** An envelope standing on its edge, stamped, with a spare stamp floating by */
const Stamp = () => {
  const [w, d, h] = [92, 5, 54]
  const env = isoStamp.box(-w / 2, -d / 2, 0, w, d, h)
  const corner = isoStamp.P(-w / 2, d / 2, h)
  return (
    <>
      <Shadow cx={100} cy={128} rx={60} />
      <polygon points={env.right} fill={RIGHT} />
      <polygon points={env.top} fill={LEFT} />
      <polygon points={env.left} fill={TOP} />
      {/* the address side: three address lines and the stamp */}
      <g transform={onLeftFace(corner)}>
        {[26, 33, 40].map((v, i) => (
          <rect
            key={v}
            x={28}
            y={v}
            width={[34, 26, 30][i]}
            height={3}
            rx={1.5}
            fill={LEFT}
          />
        ))}
        <PostageStamp x={w - 24} y={6} s={16} />
        {/* postmark waves across the stamp's edge */}
        <path
          d={`M${w - 40},11 q4,-3 8,0 t8,0 M${w - 40},17 q4,-3 8,0 t8,0`}
          fill="none"
          stroke={RIGHT}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </g>
      <g className="course-art-float">
        <g transform="rotate(14 162 34)">
          <PostageStamp x={150} y={18} s={24} />
        </g>
      </g>
    </>
  )
}

/** A snack vending machine: window of snacks, keypad, coin slot and tray */
const Vending = () => {
  const [w, d, h] = [52, 36, 84]
  const corner = isoVending.P(-w / 2, d / 2, h)
  const snacks = [0, 1, 2].flatMap((row) => [0, 1].map((col) => ({ row, col })))
  return (
    <>
      <Shadow cx={100} cy={140} rx={58} />
      <Box iso={isoVending} x={-w / 2} y={-d / 2} z={0} w={w} d={d} h={h} />
      <g transform={onLeftFace(corner)}>
        {/* glass front with three shelves */}
        <rect x={5} y={8} width={30} height={48} rx={2} fill={TOP} />
        {snacks.map(({ row, col }) => (
          <rect
            key={`${row}-${col}`}
            x={9 + col * 13}
            y={12 + row * 15}
            width={9}
            height={11}
            rx={2}
            fill={(row + col) % 2 ? RIGHT : LEFT}
          />
        ))}
        {[24, 39, 54].map((v) => (
          <rect key={v} x={6} y={v} width={28} height={1.6} fill={RIGHT} />
        ))}
        {/* keypad and coin slot */}
        <rect x={39} y={8} width={9} height={20} rx={1.5} fill={TOP} />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <circle
              key={`${r}-${c}`}
              cx={41.7 + c * 3.6}
              cy={12 + r * 5.5}
              r={1.2}
              fill={RIGHT}
            />
          ))
        )}
        <rect x={42} y={33} width={3} height={10} rx={1.5} fill={RIGHT} />
        {/* pick-up tray */}
        <rect x={5} y={64} width={30} height={10} rx={2} fill={RIGHT} />
      </g>
      <g className="course-art-float">
        <g transform="translate(156 52)">
          <ellipse rx={11} ry={11} fill={RIGHT} />
          <ellipse rx={11} ry={11} fill={TOP} transform="translate(-2 -1)" />
          <ellipse
            rx={6.5}
            ry={6.5}
            fill="none"
            stroke={LEFT}
            strokeWidth={1.5}
            transform="translate(-2 -1)"
          />
        </g>
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
  notebook: Notebook,
  mailbox: MailboxArt,
  stamp: Stamp,
  vending: Vending,
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
