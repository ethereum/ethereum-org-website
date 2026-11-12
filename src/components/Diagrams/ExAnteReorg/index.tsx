import { DiagramMessages } from "../diagram-messages"

import { ExAnteReorgPlayer } from "./lazy-player"
import type { ExAnteReorgPresetId } from "./model"

export interface ExAnteReorgDiagramProps {
  /** Scenario to start on: before proposer boost, or with it. */
  initialPreset?: ExAnteReorgPresetId
  /** Step to start on (0 = idle, 1-5), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `reorg-schematic.png`: the one-block ex-ante
 * reorg. The attacker withholds block B and its votes, releases them as
 * honest block C appears, and honest block D builds on B, orphaning C. With
 * proposer boost, C keeps the head and B is orphaned instead.
 */
const ExAnteReorgDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: ExAnteReorgDiagramProps) => (
  <DiagramMessages prefix="ex-ante-reorg">
    <ExAnteReorgPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default ExAnteReorgDiagram
