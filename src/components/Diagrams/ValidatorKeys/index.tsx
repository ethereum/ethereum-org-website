import { DiagramMessages } from "../diagram-messages"

import { KeyDerivationPlayer, ValidatorKeysPlayer } from "./lazy-player"
import type { CredentialPresetId } from "./model"

export interface ValidatorKeysDiagramProps {
  /** Withdrawal credentials to start on: 0x00, 0x01 or 0x02. */
  initialPreset?: CredentialPresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `validator-key-schematic.png`: one wallet
 * stakes for three validators (one with 0x02 credentials), each with its own
 * signing key, paying out to a separate withdrawal address. Scenarios
 * compare 0x00, 0x01 and 0x02 withdrawal credentials.
 */
const ValidatorKeysDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: ValidatorKeysDiagramProps) => (
  <DiagramMessages prefix="validator-keys">
    <ValidatorKeysPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export interface KeyDerivationDiagramProps {
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `multiple-keys.png`, on the same drawing: one
 * mnemonic derives a withdrawal key and a signing key per validator along
 * the EIP-2334 paths.
 */
export const KeyDerivationDiagram = ({
  initialStep,
  fig,
  className,
}: KeyDerivationDiagramProps) => (
  <DiagramMessages prefix="validator-keys">
    <KeyDerivationPlayer
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default ValidatorKeysDiagram
