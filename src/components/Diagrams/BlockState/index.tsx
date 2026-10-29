import { DiagramMessages } from "../diagram-messages"

import { BlockStatePlayer } from "./lazy-player"
import type { BlockStatePresetId } from "./model"

export interface BlockStateDiagramProps {
  /** Scenario to start on, for static stories. */
  initialPreset?: BlockStatePresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `tx-block.png` ("Applying a block"): a block's
 * transactions apply to the world state one at a time, in block order, each
 * to the state the previous one left, moving it from state t to t+1. Two
 * scenarios: all three succeed, or the second (a contract call) reverts and
 * still pays its fee and bumps the sender's nonce.
 */
const BlockStateDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: BlockStateDiagramProps) => (
  <DiagramMessages prefix="block-state">
    <BlockStatePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default BlockStateDiagram
