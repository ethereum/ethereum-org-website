import { DiagramMessages } from "../diagram-messages"

import { MevBoostPlayer } from "./lazy-player"

export interface MevBoostDiagramProps {
  /** Step to start on (0 = idle, 1-5), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `mev.png`: a block built outside the
 * proposer's node through MEV-Boost. The proposer registers with relays,
 * builders bid, MEV-Boost passes on the best header, the proposer signs it
 * blind, and the relay publishes the full block.
 */
const MevBoostDiagram = ({
  initialStep,
  fig,
  className,
}: MevBoostDiagramProps) => (
  <DiagramMessages prefix="mev-boost">
    <MevBoostPlayer initialStep={initialStep} fig={fig} className={className} />
  </DiagramMessages>
)

export default MevBoostDiagram
