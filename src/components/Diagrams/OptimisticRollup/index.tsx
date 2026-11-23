import { DiagramMessages } from "../diagram-messages"

import { OptimisticRollupPlayer, ZkRollupPlayer } from "./lazy-player"
import type { OptimisticRollupPresetId, ZkRollupPresetId } from "./model"

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

export interface ZkRollupDiagramProps {
  /** Scenario to start on: a valid batch, or an invalid state transition. */
  initialPreset?: ZkRollupPresetId
  /** Step to start on (0 = idle, 1-5), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * The same batch on a ZK-rollup: a prover generates a validity proof, the
 * verifier contract checks it on L1, and the state root is recorded and
 * final at once, or the call reverts and the root is never recorded.
 */
export const ZkRollupDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: ZkRollupDiagramProps) => (
  <DiagramMessages prefix="zk-rollup">
    <ZkRollupPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default OptimisticRollupDiagram
