import { DiagramMessages } from "../diagram-messages"

import {
  AsyncVaultPlayer,
  VaultDepositPlayer,
  VaultInterfacePlayer,
} from "./lazy-player"
import type { AsyncPresetId, InterfacePresetId } from "./model"

interface FigureProps {
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

export interface VaultInterfaceDiagramProps extends FigureProps {
  /** Call to start on: deposit, mint, withdraw or redeem. */
  initialPreset?: InterfacePresetId
}

/**
 * Interactive replacement for `map-of-erc-4626.png`: for deposit, mint,
 * withdraw or redeem, the account's limit (max*), the preview, the call and
 * the conversion at the new rate, each with its scope and spec rule.
 */
const VaultInterfaceDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: VaultInterfaceDiagramProps) => (
  <DiagramMessages prefix="token-vault">
    <VaultInterfacePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

/**
 * Interactive replacement for `erc-4626-sync-flow.svg`, on the same drawing:
 * one deposit call, assets in and shares out in the same transaction.
 */
export const VaultDepositDiagram = ({
  initialStep,
  fig,
  className,
}: FigureProps) => (
  <DiagramMessages prefix="token-vault">
    <VaultDepositPlayer
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export interface AsyncVaultDiagramProps extends FigureProps {
  /** Request to start on: a deposit or a redemption. */
  initialPreset?: AsyncPresetId
}

/**
 * Interactive replacement for `erc-7540-async-flow.svg`: request, the vault
 * puts the assets to work, fulfillment at a new price, then the claim.
 */
export const AsyncVaultDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: AsyncVaultDiagramProps) => (
  <DiagramMessages prefix="token-vault">
    <AsyncVaultPlayer
      figure="async"
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

/**
 * Interactive replacement for `request-lifecycle.svg`: one request through
 * pending, claimable and claimed, with what the vault's view functions
 * return at each state.
 */
export const VaultRequestDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: AsyncVaultDiagramProps) => (
  <DiagramMessages prefix="token-vault">
    <AsyncVaultPlayer
      figure="lifecycle"
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default VaultInterfaceDiagram
