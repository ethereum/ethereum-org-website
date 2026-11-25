import { DiagramMessages } from "../diagram-messages"

import { MerkleProofPlayer } from "./lazy-player"
import type { MerkleProofPresetId } from "./model"

export interface MerkleProofDiagramProps {
  /** Value to prove: C, F, or a changed C whose proof fails. */
  initialPreset?: MerkleProofPresetId
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `tree.png` and `proof-c.png`: an eight-leaf
 * Merkle tree, one value's proof combined with it level by level, and the
 * computed root compared with the stored one.
 */
const MerkleProofDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: MerkleProofDiagramProps) => (
  <DiagramMessages prefix="merkle-proof">
    <MerkleProofPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default MerkleProofDiagram
