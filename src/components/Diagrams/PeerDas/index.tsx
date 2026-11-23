import { DiagramMessages } from "../diagram-messages"

import { ColumnSubnetsPlayer, ErasureCodingPlayer } from "./lazy-player"
import type { LossPresetId, NodeId } from "./model"

interface FigureProps {
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

export interface ErasureCodingDiagramProps extends FigureProps {
  /** Which four of the eight points are lost: the data, a block or the extension. */
  initialPreset?: LossPresetId
  /** The four data values (1-9), for stories. */
  initialValues?: number[]
}

/**
 * Interactive replacement for `polynomial.png`: four data values, the cubic
 * through them, its extension to eight points, then any four lost and the
 * curve rebuilt from the other four.
 */
const ErasureCodingDiagram = ({
  initialPreset,
  initialStep,
  initialValues,
  fig,
  className,
}: ErasureCodingDiagramProps) => (
  <DiagramMessages prefix="peer-das">
    <ErasureCodingPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      initialValues={initialValues}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export interface ColumnSubnetsDiagramProps extends FigureProps {
  /** Node to follow: A (no validators), B (validators) or C (supernode). */
  initialPreset?: NodeId
}

/**
 * Interactive replacement for `subnets.png`: the extended blob matrix, a
 * subnet per column and three nodes; a node's custody, its sampling, then a
 * supernode rebuilding missing columns.
 */
export const ColumnSubnetsDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: ColumnSubnetsDiagramProps) => (
  <DiagramMessages prefix="peer-das">
    <ColumnSubnetsPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default ErasureCodingDiagram
