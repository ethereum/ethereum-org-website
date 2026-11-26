import { Box, isoProjection, LEFT, RIGHT, Shadow, TOP } from "../shared"

import { FlatCoin, onLeftFace, SmallKey } from "./parts"

const isoMailbox = isoProjection(100, 124)

/**
 * A mailbox on a post: a slot anyone can use and a locked glass door
 * (anyone can see inside; only the key opens it)
 */
const MailboxArt = () => {
  const [w, d, h, z] = [48, 30, 40, 36]
  const corner = isoMailbox.P(-w / 2, d / 2, z + h)
  const [flagX, flagY] = isoMailbox.P(w / 2, -2, z + h - 6)
  // The glass door's opening on the front-left face, and the cavity behind
  // it in 3D, so its inner walls follow the box's own edges
  const [x0, x1] = [-w / 2 + 7, -w / 2 + 41]
  const [zTop, zBottom] = [z + h - 15, z + h - 36]
  const [front, back] = [d / 2, d / 2 - 12]
  const { P, pts } = isoMailbox
  const opening = pts(
    P(x0, front, zTop),
    P(x1, front, zTop),
    P(x1, front, zBottom),
    P(x0, front, zBottom)
  )
  return (
    <g transform="translate(0 6)">
      <Shadow cx={100} cy={128} rx={50} />
      <Box iso={isoMailbox} x={-4} y={-4} z={0} w={8} d={8} h={z} />
      <Box iso={isoMailbox} x={-w / 2} y={-d / 2} z={z} w={w} d={d} h={h} />
      <g transform={onLeftFace(corner)}>
        <rect x={9} y={6} width={30} height={5} rx={2.5} fill={RIGHT} />
      </g>
      {/* Inside, seen through the glass: back wall, the side wall facing
          the viewer, then the floor, clipped to the opening */}
      <clipPath id="mailbox-opening">
        <polygon points={opening} />
      </clipPath>
      <g clipPath="url(#mailbox-opening)">
        <polygon
          points={pts(
            P(x0, back, zTop),
            P(x1, back, zTop),
            P(x1, back, zBottom),
            P(x0, back, zBottom)
          )}
          fill={RIGHT}
        />
        <polygon
          points={pts(
            P(x0, front, zTop),
            P(x0, back, zTop),
            P(x0, back, zBottom),
            P(x0, front, zBottom)
          )}
          fill={LEFT}
        />
        <polygon
          points={pts(
            P(x0, front, zBottom),
            P(x1, front, zBottom),
            P(x1, back, zBottom),
            P(x0, back, zBottom)
          )}
          fill={TOP}
          opacity={0.7}
        />
      </g>
      <g transform={onLeftFace(corner)}>
        {/* the glass and the keyhole */}
        <rect
          x={7}
          y={15}
          width={34}
          height={21}
          fill={TOP}
          fillOpacity={0.2}
          stroke={TOP}
          strokeWidth={1.6}
        />
        <circle cx={35} cy={25.5} r={2.6} fill={TOP} />
        <rect x={34.2} y={26} width={1.6} height={4} fill={TOP} />
      </g>
      {/* raised flag on the side */}
      <rect x={flagX - 1.5} y={flagY - 22} width={3} height={24} fill={RIGHT} />
      <rect
        x={flagX - 1.5}
        y={flagY - 22}
        width={14}
        height={9}
        rx={1}
        fill={LEFT}
      />
      <g className="course-art-float">
        <FlatCoin cx={46} cy={36} r={11} />
      </g>
      <g className="course-art-float-late">
        <SmallKey x={146} y={44} />
      </g>
    </g>
  )
}

export default MailboxArt
