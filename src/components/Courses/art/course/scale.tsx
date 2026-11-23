import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace } from "./parts"

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

export default Scale
