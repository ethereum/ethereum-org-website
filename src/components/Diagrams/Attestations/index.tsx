import { DiagramMessages } from "../diagram-messages"

import { AttestationsPlayer } from "./lazy-player"
import type { AttestationsPresetId } from "./model"

export interface AttestationsDiagramProps {
  /** Scenario to start on: the next slot proposed, or missed. */
  initialPreset?: AttestationsPresetId
  /** Step to start on (0 = idle, 1-5), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `attestation_schematic.png` ("Attestation
 * lifecycle"): the page's five stages, generation, propagation, aggregation,
 * propagation of the aggregate and inclusion, for two committees. Scenarios
 * contrast inclusion in the next slot with a missed slot (inclusion delay 2).
 */
const AttestationsDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: AttestationsDiagramProps) => (
  <DiagramMessages prefix="attestations">
    <AttestationsPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default AttestationsDiagram
