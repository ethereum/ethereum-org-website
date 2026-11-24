import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace } from "./parts"

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
      <Shadow cx={96} cy={127} rx={76} />
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

export default Frame
