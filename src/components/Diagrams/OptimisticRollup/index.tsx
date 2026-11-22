import { DiagramMessages } from "../diagram-messages"

import { OptimisticRollupPlayer } from "./lazy-player"
import type { OptimisticRollupPresetId } from "./model"

export interface OptimisticRollupDiagramProps {
  /** Scenario to start on: an honest batch, or an invalid state root. */
  initialPreset?: OptimisticRollupPresetId
  /** Step to start on (0 = idle, 1-5), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * One optimistic rollup batch: the sequencer executes it and posts its data
 * and state root to L1, then either the challenge window elapses and the
 * root is final, or a challenger disputes it, bisection narrows the dispute
 * to one step, L1 re-executes it and the root is deleted.
 */
const OptimisticRollupDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: OptimisticRollupDiagramProps) => (
  <DiagramMessages prefix="optimistic-rollup">
    <OptimisticRollupPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default OptimisticRollupDiagram
