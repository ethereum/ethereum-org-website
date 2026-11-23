import { Box, isoProjection, Shadow } from "../shared"

const isoUpgrade = isoProjection(84, 92)

/**
 * A chain of blocks that forks: the upgraded branch carries on, the
 * old-rules branch fades out
 */
const Upgrade = () => {
  const s = 22
  const cube = (x: number, y: number) => (
    <Box iso={isoUpgrade} x={x} y={y} z={0} w={s} d={s} h={s} />
  )
  // Links join a block's far face to the next block, at mid height
  const linkX = (x: number, gap: number) => (
    <Box iso={isoUpgrade} x={x + s} y={-3} z={8} w={gap} d={6} h={6} />
  )
  return (
    <>
      <Shadow cx={96} cy={122} rx={74} />
      {/* the old-rules branch: one block, then nothing */}
      <g opacity={0.35}>
        {cube(-6, -53)}
        <Box iso={isoUpgrade} x={2} y={-31} z={8} w={6} d={20} h={6} />
      </g>
      {cube(-70, -11)}
      {linkX(-70, 10)}
      {cube(-38, -11)}
      {linkX(-38, 10)}
      {cube(-6, -11)}
      {/* the upgraded branch carries on */}
      {linkX(-6, 20)}
      {cube(36, -11)}
      {linkX(36, 20)}
      {cube(78, -11)}
    </>
  )
}

export default Upgrade
