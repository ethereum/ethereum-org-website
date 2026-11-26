import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace, SmallKey } from "./parts"

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

export default SmartAccount
