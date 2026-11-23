import { DiagramMessages } from "../diagram-messages"

import { WebErasPlayer } from "./lazy-player"
import type { EraId } from "./model"

export interface WebErasDiagramProps {
  /** Era shown first: web1, web2 or web3. */
  initialPreset?: EraId
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `web1.png`, `web2.png` and `web3.png` on
 * /web3/: each era's architecture, and who stores your data, who can lock
 * you out and where the money goes.
 */
const WebErasDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: WebErasDiagramProps) => (
  <DiagramMessages prefix="web-eras">
    <WebErasPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default WebErasDiagram
