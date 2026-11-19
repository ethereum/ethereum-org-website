import AccountsDiagram from "./Accounts"
import AttestationsDiagram from "./Attestations"
import BlockStateDiagram from "./BlockState"
import EvmZonesDiagram from "./EvmZones"
import ExAnteReorgDiagram from "./ExAnteReorg"
import type { DIAGRAM_FIGURE_TEXT } from "./figure-text"
import GasEvmDiagram from "./GasEvm"
import GasTxDiagram from "./GasTx"
import MevBoostDiagram from "./MevBoost"
import NodeClientsDiagram, {
  ClientSetupDiagram,
  NodeAccessDiagram,
  NodeArchitectureDiagram,
  NodeNetworksDiagram,
} from "./NodeClients"
import PortalHistoryDiagram from "./PortalHistory"
import SourceVerifyDiagram from "./SourceVerify"
import VaultInterfaceDiagram, {
  AsyncVaultDiagram,
  VaultDepositDiagram,
  VaultRequestDiagram,
} from "./TokenVault"
import TxApplyDiagram from "./TxApply"
import ValidatorKeysDiagram, { KeyDerivationDiagram } from "./ValidatorKeys"

/** Every interactive diagram, keyed by its markdown tag; spread into a layout's MDX components. */
export const mdxDiagramComponents = {
  AccountsDiagram,
  AsyncVaultDiagram,
  AttestationsDiagram,
  BlockStateDiagram,
  ClientSetupDiagram,
  EvmZonesDiagram,
  ExAnteReorgDiagram,
  GasEvmDiagram,
  GasTxDiagram,
  KeyDerivationDiagram,
  MevBoostDiagram,
  NodeAccessDiagram,
  NodeArchitectureDiagram,
  NodeClientsDiagram,
  NodeNetworksDiagram,
  PortalHistoryDiagram,
  SourceVerifyDiagram,
  TxApplyDiagram,
  ValidatorKeysDiagram,
  VaultDepositDiagram,
  VaultInterfaceDiagram,
  VaultRequestDiagram,
  // Each tag also reads as text in the agent-facing markdown.
} satisfies Record<keyof typeof DIAGRAM_FIGURE_TEXT, unknown>
