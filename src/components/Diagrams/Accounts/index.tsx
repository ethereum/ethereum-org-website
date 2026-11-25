import { DiagramMessages } from "../diagram-messages"

import { AccountsPlayer } from "./lazy-player"
import type { AccountsPresetId } from "./model"

export interface AccountsDiagramProps {
  /** Scenario to start on: an externally owned or a contract account. */
  initialPreset?: AccountsPresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `accounts.png` ("An account examined"): an
 * address leads to the account state's four fields (nonce, balance,
 * storageRoot, codeHash); the two hashes point at the account's storage and
 * its EVM code. Presets compare an externally owned account (empty storage,
 * no code) with a contract account.
 */
const AccountsDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: AccountsDiagramProps) => (
  <DiagramMessages prefix="accounts">
    <AccountsPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default AccountsDiagram
