import { Box, isoProjection, RIGHT, Shadow, TOP } from "../shared"

import { EthGlyph } from "./parts"

const isoVault = isoProjection(100, 70)

const Vault = () => {
  const [ex, ey] = isoVault.P(30, 60, 30)
  return (
    <g transform="translate(0 5)">
      <Shadow cx={100} cy={124} rx={66} />
      <Box iso={isoVault} x={0} y={0} z={0} w={60} d={60} h={60} />
      {/* door on the front-left face */}
      <g transform={`matrix(0.866 0.5 0 1 ${ex} ${ey})`}>
        <circle r={20} fill={TOP} />
        <circle r={13} fill="none" stroke={RIGHT} strokeWidth={3} />
        <path
          d="M-13,0H13M0,-13V13"
          stroke={RIGHT}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle r={4} fill={RIGHT} />
      </g>
      {/* Glyphs float clear of the cube (its corners sit at x 48 and 152) */}
      <g className="course-art-float">
        <EthGlyph cx={177} y={13} h={34} />
      </g>
      <g className="course-art-float-late">
        <EthGlyph cx={24} y={48} h={24} />
      </g>
    </g>
  )
}

export default Vault
