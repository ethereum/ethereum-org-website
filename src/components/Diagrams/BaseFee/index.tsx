import { DiagramMessages } from "../diagram-messages"

import { BaseFeePlayer } from "./lazy-player"
import type { BaseFeePresetId } from "./model"

export interface BaseFeeDiagramProps {
  /** Demand scenario: a spike of full blocks, cooling off, or on target. */
  initialPreset?: BaseFeePresetId
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * EIP-1559 base fee over consecutive blocks: gas used per block against the
 * target, and the base fee each block sets for the next (at most 12.5% up or
 * down). Bars are draggable.
 */
const BaseFeeDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: BaseFeeDiagramProps) => (
  <DiagramMessages prefix="base-fee">
    <BaseFeePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default BaseFeeDiagram
