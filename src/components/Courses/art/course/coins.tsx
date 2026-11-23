import { isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

const isoCoins = isoProjection(100, 80)

const Coin = ({ x, y, z }: { x: number; y: number; z: number }) => {
  const c = isoCoins.cylinder(x, y, z, 16, 6)
  return (
    <g>
      <path d={c.body} fill={RIGHT} />
      <ellipse {...c.top} fill={TOP} />
      <ellipse
        cx={c.top.cx}
        cy={c.top.cy}
        rx={c.top.rx * 0.6}
        ry={c.top.ry * 0.6}
        fill="none"
        stroke={LEFT}
        strokeWidth={1.5}
      />
    </g>
  )
}

const Coins = () => (
  <>
    <Shadow cx={100} cy={124} rx={64} />
    {[
      { x: -20, y: 20, n: 3 },
      { x: 20, y: 0, n: 6 },
      { x: 30, y: 40, n: 2 },
    ].map(({ x, y, n }) => (
      <g key={`${x}-${y}`}>
        {Array.from({ length: n }, (_, i) => (
          <Coin key={i} x={x} y={y} z={i * 7} />
        ))}
      </g>
    ))}
    <g className="course-art-float">
      <Coin x={-10} y={-30} z={40} />
    </g>
  </>
)

export default Coins
