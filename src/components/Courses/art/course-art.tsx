import type { CourseArtId } from "@/data/courses"

import {
  ArtFrame,
  type ArtTone,
  Box,
  type Iso,
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

const isoPlatform = isoProjection(100, 104)

/**
 * Ethereum as a block that holds more than money: a ballot box, a coin
 * stack and a ticket on a wide slab, with the ETH glyph hovering above
 */
const Platform = () => {
  const P = isoPlatform.P
  const top = 12
  const ballot = { x: -30, y: 6, s: 20 }
  const slot = [
    P(ballot.x + 5, ballot.y + ballot.s / 2, top + ballot.s),
    P(ballot.x + ballot.s - 5, ballot.y + ballot.s / 2, top + ballot.s),
  ]
  const ticket = { x: 4, y: 14, w: 30, d: 16, h: 4 }
  const stub = isoPlatform.box(
    ticket.x,
    ticket.y,
    top,
    ticket.w,
    ticket.d,
    ticket.h
  )
  const perf = [
    P(ticket.x + 9, ticket.y, top + ticket.h),
    P(ticket.x + 9, ticket.y + ticket.d, top + ticket.h),
  ]
  return (
    <>
      <Shadow cx={100} cy={146} rx={72} />
      <Box iso={isoPlatform} x={-40} y={-40} z={0} w={80} d={80} h={top} />
      <g className="course-art-float">
        <EthGlyph cx={100} y={0} h={46} />
      </g>
      {/* ballot box with its slot */}
      <Box
        iso={isoPlatform}
        x={ballot.x}
        y={ballot.y}
        z={top}
        w={ballot.s}
        d={ballot.s}
        h={ballot.s}
      />
      <line
        x1={slot[0][0]}
        y1={slot[0][1]}
        x2={slot[1][0]}
        y2={slot[1][1]}
        stroke={RIGHT}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {/* coin stack */}
      {[0, 1, 2].map((i) => {
        const c = isoPlatform.cylinder(26, -14, top + i * 5, 10, 5)
        return (
          <g key={i}>
            <path d={c.body} fill={RIGHT} />
            <ellipse {...c.top} fill={TOP} />
            {i === 2 && (
              <ellipse
                cx={c.top.cx}
                cy={c.top.cy}
                rx={c.top.rx * 0.6}
                ry={c.top.ry * 0.6}
                fill="none"
                stroke={LEFT}
                strokeWidth={1.5}
              />
            )}
          </g>
        )
      })}
      {/* ticket with a perforated stub, darker than the slab it lies on */}
      <polygon points={stub.left} fill={RIGHT} />
      <polygon points={stub.right} fill={RIGHT} />
      <polygon points={stub.top} fill={LEFT} />
      <line
        x1={perf[0][0]}
        y1={perf[0][1]}
        x2={perf[1][0]}
        y2={perf[1][1]}
        stroke={TOP}
        strokeWidth={1.6}
        strokeDasharray="2 2.5"
      />
    </>
  )
}

const isoValidators = isoProjection(116, 98)

/** A validator: a server tower with drive slots and a status light */
const ValidatorTower = ({ x, y }: { x: number; y: number }) => {
  const [w, d, h] = [24, 24, 50]
  return (
    <>
      <Box iso={isoValidators} x={x} y={y} z={0} w={w} d={d} h={h} />
      <g transform={onLeftFace(isoValidators.P(x, y + d, h))}>
        {[8, 16, 24].map((v) => (
          <rect key={v} x={4} y={v} width={12} height={3} rx={1.5} fill={TOP} />
        ))}
        <circle cx={19} cy={9.5} r={2} fill={TOP} />
      </g>
    </>
  )
}

/** Three validators behind a block they've voted for, with its check mark */
const Validators = () => (
  <>
    <Shadow cx={98} cy={138} rx={72} />
    {[-58, -22, 14].map((x) => (
      <ValidatorTower key={x} x={x} y={-6} />
    ))}
    <g className="course-art-float">
      <Box iso={isoValidators} x={-16} y={42} z={8} w={30} d={30} h={30} />
      <g transform="translate(36 58)">
        <circle r={13} fill={RIGHT} />
        <path
          d="M-6,0 L-1.5,4.5 L6.5,-4.5"
          fill="none"
          stroke={TOP}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </>
)

const isoUpgrade = isoProjection(84, 92)

/**
 * A chain of blocks that forks: the upgraded branch carries on, the
 * old-rules branch fades out
 */
const Upgrade = () => {
  const s = 22
  const cube = (x: number, y: number) => (
    <Box iso={isoUpgrade} x={x} y={y} z={0} w={s} d={s} h={s} />
  )
  // Links join a block's far face to the next block, at mid height
  const linkX = (x: number, gap: number) => (
    <Box iso={isoUpgrade} x={x + s} y={-3} z={8} w={gap} d={6} h={6} />
  )
  return (
    <>
      <Shadow cx={96} cy={122} rx={74} />
      {/* the old-rules branch: one block, then nothing */}
      <g opacity={0.35}>
        {cube(-6, -53)}
        <Box iso={isoUpgrade} x={2} y={-31} z={8} w={6} d={20} h={6} />
      </g>
      {cube(-70, -11)}
      {linkX(-70, 10)}
      {cube(-38, -11)}
      {linkX(-38, 10)}
      {cube(-6, -11)}
      {/* the upgraded branch carries on */}
      {linkX(-6, 20)}
      {cube(36, -11)}
      {linkX(36, 20)}
      {cube(78, -11)}
    </>
  )
}

const isoWallet = isoProjection(96, 112)

/** Shield outline with a check, centred on (cx, cy), `s` wide */
const CheckShield = ({ cx, cy, s }: { cx: number; cy: number; s: number }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s / 24})`}>
    <path
      d="M0,-14 L12,-9 V0 C12,8 6,13 0,15 C-6,13 -12,8 -12,0 V-9 Z"
      fill={RIGHT}
    />
    <path d="M0,-14 L12,-9 V0 C12,8 6,13 0,15 Z" fill={LEFT} />
    <path
      d="M-5,0 L-1,4 L6,-4"
      fill="none"
      stroke={TOP}
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
)

/**
 * A wallet standing on its edge with a checklist of rules on its face, a
 * guarding shield and a spare key: an account that follows rules you choose
 */
const SmartAccount = () => {
  const [w, d, h] = [74, 20, 58]
  const body = isoWallet.box(-w / 2, -d / 2, 0, w, d, h)
  const flap = isoWallet.box(-w / 2, -d / 2 - 1, h - 16, w, d + 2, 16)
  const corner = isoWallet.P(-w / 2, d / 2, h)
  return (
    <>
      <Shadow cx={98} cy={130} rx={64} />
      <polygon points={body.right} fill={RIGHT} />
      <polygon points={body.top} fill={TOP} />
      <polygon points={body.left} fill={LEFT} />
      <polygon points={flap.right} fill={RIGHT} />
      <polygon points={flap.top} fill={TOP} />
      <polygon points={flap.left} fill={RIGHT} />
      <g transform={onLeftFace(corner)}>
        {/* clasp on the flap */}
        <rect x={w - 16} y={9} width={10} height={10} rx={3} fill={TOP} />
        {/* three rules, each ticked */}
        {[22, 31, 40].map((v, i) => (
          <g key={v}>
            <rect x={8} y={v} width={6} height={6} rx={1.5} fill={TOP} />
            <path
              d={`M9.3,${v + 3} l1.4,1.4 l2.2,-2.6`}
              fill="none"
              stroke={RIGHT}
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x={18}
              y={v + 1.5}
              width={[30, 38, 24][i]}
              height={3}
              rx={1.5}
              fill={TOP}
            />
          </g>
        ))}
      </g>
      <g className="course-art-float">
        <CheckShield cx={40} cy={38} s={34} />
      </g>
      <g className="course-art-float-late">
        <SmallKey x={150} y={36} />
      </g>
    </>
  )
}

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
      <path d={body.body} fill={TOP} opacity={0.45} />
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

const isoLure = isoProjection(132, 128)

/** A fishing hook dangling a shiny coin in front of a mailbox */
const Lure = () => {
  const [w, d, h, z] = [40, 26, 32, 30]
  const corner = isoLure.P(-w / 2, d / 2, z + h)
  // Flag pole planted on the right face, so it reads as attached
  const [flagX, flagY] = isoLure.P(w / 2, -2, z + h - 14)
  const sparkle = (x: number, y: number, s: number) =>
    `M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s}Z`
  return (
    <>
      <Shadow cx={132} cy={130} rx={44} />
      <Shadow cx={62} cy={140} rx={20} />
      <Box iso={isoLure} x={-4} y={-4} z={0} w={8} d={8} h={z} />
      <Box iso={isoLure} x={-w / 2} y={-d / 2} z={z} w={w} d={d} h={h} />
      <g transform={onLeftFace(corner)}>
        <rect x={7} y={6} width={26} height={5} rx={2.5} fill={RIGHT} />
        <rect x={9} y={16} width={22} height={12} rx={1.5} fill={TOP} />
      </g>
      <rect x={flagX - 1.5} y={flagY - 28} width={3} height={30} fill={TOP} />
      <rect
        x={flagX - 1.5}
        y={flagY - 28}
        width={12}
        height={8}
        rx={1}
        fill={LEFT}
      />
      <g className="course-art-float">
        {/* line, hook with its barb, and the coin hanging from a ring */}
        <line
          x1={62}
          y1={-8}
          x2={62}
          y2={58}
          stroke={RIGHT}
          strokeWidth={1.5}
        />
        <path
          d="M62,58 V74 A8,8 0 0 1 46,74 V69 M46,69 l3.5,4"
          fill="none"
          stroke={RIGHT}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={54}
          cy={83}
          r={3.5}
          fill="none"
          stroke={LEFT}
          strokeWidth={2}
        />
        <FlatCoin cx={54} cy={100} r={14} />
        <path d={sparkle(76, 92, 6)} fill={TOP} />
        <path d={sparkle(34, 108, 4)} fill={TOP} />
        <path d={sparkle(70, 116, 3.5)} fill={LEFT} />
      </g>
    </>
  )
}

const isoScale = isoProjection(100, 124)
const isoLeftPan = isoProjection(46, 92)
const isoRightPan = isoProjection(154, 92)

/** A shallow pan hanging from three cords, centred at (cx, cy) */
const Pan = ({ cx, cy, top }: { cx: number; cy: number; top: number }) => (
  <g>
    {[-24, 0, 24].map((dx) => (
      <line
        key={dx}
        x1={cx}
        y1={top}
        x2={cx + dx}
        y2={cy - (dx ? 2 : 6)}
        stroke={RIGHT}
        strokeWidth={1.4}
      />
    ))}
    <path
      d={`M${cx - 30},${cy} a30,9 0 0 0 60,0 l-3,6 a27,8 0 0 1 -54,0 z`}
      fill={RIGHT}
    />
    <ellipse cx={cx} cy={cy} rx={30} ry={9} fill={TOP} />
    <ellipse
      cx={cx}
      cy={cy}
      rx={25}
      ry={7}
      fill="none"
      stroke={LEFT}
      strokeWidth={1.4}
    />
  </g>
)

/**
 * A level balance scale: a stack of coins on one pan, the reserve crate
 * that backs them on the other
 */
const Scale = () => {
  const [w, h] = [22, 20]
  const crate = isoRightPan.box(-w / 2, -w / 2, 0, w, w, h)
  const crateCorner = isoRightPan.P(-w / 2, w / 2, h)
  const [beamY, panY] = [30, 90]
  return (
    <>
      <Shadow cx={100} cy={134} rx={58} />
      <Box iso={isoScale} x={-16} y={-16} z={0} w={32} d={32} h={8} />
      <Box iso={isoScale} x={-4} y={-4} z={8} w={8} d={8} h={86} />
      {/* beam and pivot */}
      <rect x={40} y={beamY - 3} width={120} height={6} rx={3} fill={RIGHT} />
      <rect x={40} y={beamY - 3} width={120} height={3} rx={1.5} fill={TOP} />
      <circle cx={100} cy={beamY} r={7} fill={LEFT} />
      <circle cx={100} cy={beamY} r={3} fill={TOP} />
      <Pan cx={46} cy={panY} top={beamY} />
      <Pan cx={154} cy={panY} top={beamY} />
      {/* coins on the left pan */}
      {[0, 1, 2, 3].map((i) => {
        const c = isoLeftPan.cylinder(0, 0, i * 5, 11, 5)
        return (
          <g key={i}>
            <path d={c.body} fill={RIGHT} />
            <ellipse {...c.top} fill={TOP} />
            <ellipse
              cx={c.top.cx}
              cy={c.top.cy}
              rx={c.top.rx * 0.6}
              ry={c.top.ry * 0.6}
              fill="none"
              stroke={LEFT}
              strokeWidth={1.2}
            />
          </g>
        )
      })}
      {/* the reserve crate on the right pan, with plank lines */}
      <polygon points={crate.left} fill={LEFT} />
      <polygon points={crate.right} fill={RIGHT} />
      <polygon points={crate.top} fill={TOP} />
      <g transform={onLeftFace(crateCorner)}>
        <rect
          x={1.5}
          y={1.5}
          width={w - 3}
          height={h - 3}
          fill="none"
          stroke={RIGHT}
          strokeWidth={1.4}
        />
        <path
          d={`M1.5,1.5 L${w - 1.5},${h - 1.5}`}
          stroke={RIGHT}
          strokeWidth={1.4}
        />
      </g>
      <g className="course-art-float">
        <g transform="translate(172 20)">
          <ellipse rx={9} ry={9} fill={RIGHT} transform="translate(0 1.6)" />
          <ellipse rx={9} ry={9} fill={TOP} />
          <ellipse
            rx={5.4}
            ry={5.4}
            fill="none"
            stroke={LEFT}
            strokeWidth={1.4}
          />
        </g>
      </g>
    </>
  )
}

const isoFrame = isoProjection(104, 108)

/**
 * A framed one-of-a-kind tile on a plinth with a numbered ID tag, beside a
 * name plate on a stand
 */
const Frame = () => {
  const { P, box } = isoFrame
  const plinth = { x: -22, y: -18, w: 44, d: 36, h: 24 }
  const tile = { x: -20, y: -4, w: 40, d: 6, h: 56 }
  const tz = plinth.h
  const t = box(tile.x, tile.y, tz, tile.w, tile.d, tile.h)
  const face = P(tile.x, tile.y + tile.d, tz + tile.h)
  // stand and plate to the front-left of the plinth
  const post = { x: -2, y: 50, w: 4, d: 4, h: 20 }
  const plate = { x: -12, y: 52, w: 24, d: 3, h: 15 }
  const pz = post.h
  const pl = box(plate.x, plate.y, pz, plate.w, plate.d, plate.h)
  const plateFace = P(plate.x, plate.y + plate.d, pz + plate.h)
  const [ax, ay] = P(tile.x + tile.w, tile.y + tile.d, tz + tile.h - 4)
  return (
    <>
      <Shadow cx={96} cy={136} rx={76} />
      <Box iso={isoFrame} {...plinth} z={0} />
      <polygon points={t.right} fill={RIGHT} />
      <polygon points={t.top} fill={LEFT} />
      <polygon points={t.left} fill={TOP} />
      <g transform={onLeftFace(face)}>
        <rect x={4} y={4} width={tile.w - 8} height={tile.h - 8} fill={RIGHT} />
        <rect x={7} y={7} width={tile.w - 14} height={tile.h - 14} fill={TOP} />
        <circle cx={tile.w * 0.64} cy={18} r={5} fill={LEFT} />
        <path
          d={`M7,${tile.h - 15} Q15,${tile.h - 30} 23,${tile.h - 20} T${tile.w - 7},${tile.h - 25} V${tile.h - 7} H7Z`}
          fill={LEFT}
        />
      </g>
      {/* numbered ID tag hanging from the frame's corner */}
      <path
        d={`M${ax},${ay} q6,4 9,14`}
        fill="none"
        stroke={RIGHT}
        strokeWidth={1.4}
      />
      <g transform={`translate(${ax + 9} ${ay + 14}) rotate(62)`}>
        <path d="M0,0 L6,-9 H30 V9 H6 Z" fill={RIGHT} />
        <path d="M2,0 L7,-7.5 H28.5 V7.5 H7 Z" fill={TOP} />
        <circle cx={6.5} cy={0} r={1.8} fill={RIGHT} />
        <g transform="rotate(-62 19 0)">
          <path
            d="M16.5,-4.5 V4.5 M20.5,-4.5 V4.5 M14.5,-1.5 H22.5 M14.5,2 H22.5"
            stroke={RIGHT}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </g>
      </g>
      {/* name plate on its stand */}
      <Box iso={isoFrame} {...post} z={0} />
      <polygon points={pl.right} fill={RIGHT} />
      <polygon points={pl.top} fill={LEFT} />
      <polygon points={pl.left} fill={TOP} />
      <g transform={onLeftFace(plateFace)}>
        <rect x={3} y={5} width={11} height={2.6} rx={1.3} fill={RIGHT} />
        <rect x={15.5} y={5} width={5} height={2.6} rx={1.3} fill={LEFT} />
        <rect x={3} y={9.5} width={14} height={2} rx={1} fill={LEFT} />
      </g>
    </>
  )
}

const isoCrate = isoProjection(100, 92)

/** A slab standing for Ethereum: wide, low, with a groove round its side */
const BaseSlab = ({ iso, s, h }: { iso: Iso; s: number; h: number }) => {
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
    <>
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
    </>
  )
}

const isoRollup = isoProjection(100, 92)

/**
 * A rollup's batch: a stack of transaction sheets on the base slab, stamped
 * with a proof seal, with an hourglass for the challenge period
 */
const RollupArt = () => {
  const [w, d, sheet] = [44, 34, 5]
  const sheets = Array.from({ length: 7 }, (_, i) => i)
  const seal = isoRollup.cylinder(0, 0, 12 + sheets.length * sheet, 12, 5)
  const incoming = isoRollup.box(12, -58, 50, 26, 20, 3)
  return (
    <>
      <Shadow cx={100} cy={114} rx={84} />
      <BaseSlab iso={isoRollup} s={88} h={12} />
      {sheets.map((i) => {
        const b = isoRollup.box(-w / 2, -d / 2, 12 + i * sheet, w, d, sheet)
        // Edges alternate shade so the stack reads as many sheets
        return (
          <g key={i}>
            <polygon points={b.left} fill={i % 2 ? TOP : LEFT} />
            <polygon points={b.right} fill={i % 2 ? LEFT : RIGHT} />
            <polygon points={b.top} fill={TOP} />
          </g>
        )
      })}
      <path d={seal.body} fill={RIGHT} />
      <ellipse {...seal.top} fill={LEFT} />
      <path
        d={`M${seal.top.cx - 6},${seal.top.cy} l4,3 l8,-6`}
        fill="none"
        stroke={TOP}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="course-art-float-late">
        <g transform="translate(38 30)">
          <rect x={-12} y={-2} width={24} height={4} rx={2} fill={RIGHT} />
          <rect x={-12} y={38} width={24} height={4} rx={2} fill={RIGHT} />
          <path d="M-9,2 H9 L1.5,20 L9,38 H-9 L-1.5,20 Z" fill={TOP} />
          <path d="M-5,10 H5 L1,18 H-1 Z" fill={LEFT} />
          <path d="M-7,38 L0,28 L7,38 Z" fill={LEFT} />
        </g>
      </g>
      {/* one more transaction sheet on its way into the batch */}
      <g className="course-art-float">
        <polygon points={incoming.left} fill={LEFT} />
        <polygon points={incoming.right} fill={RIGHT} />
        <polygon points={incoming.top} fill={TOP} />
      </g>
    </>
  )
}

const ART: Record<CourseArtId, () => React.JSX.Element> = {
  upgrade: Upgrade,
  "smart-account": SmartAccount,
  diamond: Diamond,
  blocks: Blocks,
  coins: Coins,
  vault: Vault,
  tank: Tank,
  validators: Validators,
  contract: Contract,
  notebook: Notebook,
  mailbox: MailboxArt,
  stamp: Stamp,
  vending: Vending,
  crate: Crate,
  rollup: RollupArt,
  scale: Scale,
  frame: Frame,
  tanks: Tanks,
  lure: Lure,
  platform: Platform,
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
