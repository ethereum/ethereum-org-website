import { DiagramMessages } from "../diagram-messages"

import { TxApplyPlayer } from "./lazy-player"

export interface TxApplyDiagramProps {
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `tx.png` ("Applying a transaction"): a signed
 * transaction moves the world state from t to t+1. Uses the page's own
 * example: Bob sends Alice 1 ETH, pays a 0.0042 ETH fee (0.00399 ETH burned,
 * 0.00021 ETH tip to the validator), and his nonce goes up by one.
 */
const TxApplyDiagram = ({
  initialStep,
  fig,
  className,
}: TxApplyDiagramProps) => (
  <DiagramMessages prefix="tx-apply">
    <TxApplyPlayer initialStep={initialStep} fig={fig} className={className} />
  </DiagramMessages>
)

export default TxApplyDiagram
