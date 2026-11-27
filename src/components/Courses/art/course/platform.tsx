import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { EthGlyph } from "./parts"

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
      <Shadow cx={100} cy={126} rx={72} />
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

export default Platform
