import { DiagramMessages } from "../diagram-messages"

import { WalletKeysPlayer } from "./lazy-player"
import type { WalletKeysPresetId } from "./model"

export interface WalletKeysDiagramProps {
  /** View to start on: forward, who can see this, or backward. */
  initialPreset?: WalletKeysPresetId
  /** Step to start on (0 = idle, 1-3), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Beginner figure for /wallets/: a recovery phrase makes a private key, which
 * makes a public key, which makes an address; every step is one-way. Views
 * show what is safe to share and that the arrows can't be run backward.
 */
const WalletKeysDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: WalletKeysDiagramProps) => (
  <DiagramMessages prefix="wallet-keys">
    <WalletKeysPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default WalletKeysDiagram
