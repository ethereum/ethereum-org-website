import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

const isoTank = isoProjection(100, 100)

const Tank = () => {
  const body = isoTank.cylinder(20, 20, 0, 36, 76)
  const level = isoTank.cylinder(20, 20, 0, 36, 44)
  return (
    <g transform="translate(0 -8)">
      <Shadow cx={body.base.cx} cy={body.base.cy + 18} rx={62} />
      <path d={body.silhouette} fill={TOP} opacity={0.45} />
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
    </g>
  )
}

export default Tank
