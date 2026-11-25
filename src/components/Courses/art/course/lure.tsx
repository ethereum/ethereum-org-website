import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { FlatCoin, onLeftFace } from "./parts"

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
    <g transform="translate(0 4)">
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
    </g>
  )
}

export default Lure
