import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { onLeftFace } from "./parts"

const isoVending = isoProjection(100, 114)

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

export default Vending
