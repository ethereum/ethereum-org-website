import { DiagramMessages } from "../diagram-messages"

import { SourceVerifyPlayer } from "./lazy-player"
import type { SourceVerifyPresetId } from "./model"

export interface SourceVerifyDiagramProps {
  /** Scenario to start on: the same sources, an edited comment, or edited code. */
  initialPreset?: SourceVerifyPresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `source-code-verification.png`: recompile the
 * published sources, read the deployed code, compare the code, then the
 * metadata hashes, for an exact match, a match or no verification.
 */
const SourceVerifyDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: SourceVerifyDiagramProps) => (
  <DiagramMessages prefix="source-verify">
    <SourceVerifyPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default SourceVerifyDiagram
