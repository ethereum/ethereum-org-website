import { DiagramMessages } from "../diagram-messages"

import { ZkProofGamePlayer } from "./lazy-player"
import type { ZkProofGamePresetId } from "./model"

export interface ZkProofGameDiagramProps {
  /** Who is in the cave: someone who knows the secret word, or a faker. */
  initialPreset?: ZkProofGamePresetId
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * The page's magic-door cave story as a game: each round the verifier calls
 * a side, the prover comes out of it, and a faker's odds halve per round.
 */
const ZkProofGameDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: ZkProofGameDiagramProps) => (
  <DiagramMessages prefix="zk-proof-game">
    <ZkProofGamePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default ZkProofGameDiagram
