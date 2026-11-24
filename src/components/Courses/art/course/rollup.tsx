import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { BaseSlab } from "./parts"

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
    <g transform="translate(0 9)">
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
    </g>
  )
}

export default RollupArt
