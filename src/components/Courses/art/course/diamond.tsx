import { Shadow } from "../shared"

import { EthGlyph } from "./parts"

const Diamond = () => (
  <>
    <Shadow cx={100} cy={146} rx={44} />
    <g className="course-art-float">
      <EthGlyph cx={100} y={8} h={126} />
    </g>
  </>
)

export default Diamond
