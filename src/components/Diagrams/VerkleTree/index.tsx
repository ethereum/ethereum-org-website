import { DiagramMessages } from "../diagram-messages"

import { VerkleTreePlayer } from "./lazy-player"
import type { VerkleTreePresetId } from "./model"

export interface VerkleTreeDiagramProps {
  /** Tree to start on: the Verkle tree or today's hexary Merkle trie. */
  initialPreset?: VerkleTreePresetId
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `verkle.png`: one key's lookup through the
 * stem tree, extension node, suffix tree and value halves, and the same
 * lookup in a hexary Merkle trie, to compare what each proof carries.
 */
const VerkleTreeDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: VerkleTreeDiagramProps) => (
  <DiagramMessages prefix="verkle-tree">
    <VerkleTreePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default VerkleTreeDiagram
