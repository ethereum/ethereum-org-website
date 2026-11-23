import { Box, isoProjection, Shadow } from "../shared"

const isoBlocks = isoProjection(100, 70)

const Blocks = () => (
  <>
    <Shadow cx={104} cy={136} rx={70} />
    <g className="course-art-float">
      <Box iso={isoBlocks} x={-48} y={0} z={0} w={34} d={34} h={34} />
    </g>
    <g className="course-art-float-late">
      <Box iso={isoBlocks} x={-4} y={0} z={8} w={34} d={34} h={34} />
    </g>
    <g className="course-art-float">
      <Box iso={isoBlocks} x={40} y={0} z={16} w={34} d={34} h={34} />
    </g>
  </>
)

export default Blocks
