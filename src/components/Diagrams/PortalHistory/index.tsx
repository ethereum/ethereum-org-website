import { DiagramMessages } from "../diagram-messages"

import { PortalHistoryPlayer } from "./lazy-player"

export interface PortalHistoryDiagramProps {
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `portal-network-devp2p-libp2p.png`: an
 * execution client that no longer stores an old block's receipts finds them
 * in the Portal Network's History network and checks them against the header
 * it kept.
 */
const PortalHistoryDiagram = ({
  initialStep,
  fig,
  className,
}: PortalHistoryDiagramProps) => (
  <DiagramMessages prefix="portal-history">
    <PortalHistoryPlayer
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default PortalHistoryDiagram
