import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace } from "./parts"

const isoStamp = isoProjection(100, 96)

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
    <g transform="translate(-6 15)">
      <Shadow cx={110} cy={116} rx={60} />
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
    </g>
  )
}

export default Stamp
