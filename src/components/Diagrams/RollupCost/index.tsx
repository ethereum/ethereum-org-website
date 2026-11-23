import { DiagramMessages } from "../diagram-messages"

import { RollupCostPlayer } from "./lazy-player"
import type { BatchSize } from "./model"

export interface RollupCostDiagramProps {
  /** Transactions in the batch: 1, 10, 100 or 1,000. */
  initialPreset?: BatchSize
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * The rollup "carpool" on /layer-2/learn/: transactions gather in a batch on
 * layer 2, the batch is posted to layer 1 as one transaction, and its cost
 * is split between everyone in it.
 */
const RollupCostDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: RollupCostDiagramProps) => (
  <DiagramMessages prefix="rollup-cost">
    <RollupCostPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default RollupCostDiagram
