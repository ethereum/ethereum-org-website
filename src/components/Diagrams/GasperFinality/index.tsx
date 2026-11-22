import { DiagramMessages } from "../diagram-messages"

import { GasperFinalityPlayer } from "./lazy-player"
import type { GasperFinalityPresetId } from "./model"

export interface GasperFinalityDiagramProps {
  /** Scenario to start on: healthy, barely two-thirds, or short of it. */
  initialPreset?: GasperFinalityPresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Casper FFG, one epoch per step: each epoch's checkpoint, the share of the
 * stake attesting to it against the two-thirds line, and the supermajority
 * links that justify one checkpoint and finalize the one before it.
 */
const GasperFinalityDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: GasperFinalityDiagramProps) => (
  <DiagramMessages prefix="gasper-finality">
    <GasperFinalityPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default GasperFinalityDiagram
