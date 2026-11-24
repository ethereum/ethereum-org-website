import { Box, isoProjection, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace } from "./parts"

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
    <Shadow cx={98} cy={125} rx={72} />
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

export default Validators
