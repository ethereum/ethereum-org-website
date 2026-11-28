import AccountsDiagram from "./Accounts"
import AttestationsDiagram from "./Attestations"
import BaseFeeDiagram from "./BaseFee"
import BlockStateDiagram from "./BlockState"
import EvmZonesDiagram from "./EvmZones"
import ExAnteReorgDiagram from "./ExAnteReorg"
import type { DIAGRAM_FIGURE_TEXT } from "./figure-text"
import GasEvmDiagram from "./GasEvm"
import GasperFinalityDiagram from "./GasperFinality"
import GasTxDiagram from "./GasTx"
import MerkleProofDiagram from "./MerkleProof"
import MevBoostDiagram from "./MevBoost"
import NodeClientsDiagram, {
  ClientSetupDiagram,
  NodeAccessDiagram,
  NodeArchitectureDiagram,
  NodeNetworksDiagram,
} from "./NodeClients"
import OptimisticRollupDiagram, { ZkRollupDiagram } from "./OptimisticRollup"
import ErasureCodingDiagram, { ColumnSubnetsDiagram } from "./PeerDas"
import PortalHistoryDiagram from "./PortalHistory"
import SourceVerifyDiagram from "./SourceVerify"
import VaultInterfaceDiagram, {
  AsyncVaultDiagram,
  VaultDepositDiagram,
  VaultRequestDiagram,
} from "./TokenVault"
import TxApplyDiagram from "./TxApply"
import ValidatorKeysDiagram, { KeyDerivationDiagram } from "./ValidatorKeys"
import VerkleTreeDiagram from "./VerkleTree"

/** Every interactive diagram, keyed by its markdown tag; spread into a layout's MDX components. */
export const mdxDiagramComponents = {
  AccountsDiagram,
  AsyncVaultDiagram,
  AttestationsDiagram,
  BaseFeeDiagram,
  BlockStateDiagram,
  ClientSetupDiagram,
  ColumnSubnetsDiagram,
  ErasureCodingDiagram,
  EvmZonesDiagram,
  ExAnteReorgDiagram,
  GasEvmDiagram,
  GasperFinalityDiagram,
  GasTxDiagram,
  KeyDerivationDiagram,
  MerkleProofDiagram,
  MevBoostDiagram,
  NodeAccessDiagram,
  NodeArchitectureDiagram,
  NodeClientsDiagram,
  NodeNetworksDiagram,
  OptimisticRollupDiagram,
  PortalHistoryDiagram,
  SourceVerifyDiagram,
  TxApplyDiagram,
  ValidatorKeysDiagram,
  VaultDepositDiagram,
  VaultInterfaceDiagram,
  VaultRequestDiagram,
  VerkleTreeDiagram,
  ZkRollupDiagram,
  // Each tag also reads as text in the agent-facing markdown.
} satisfies Record<keyof typeof DIAGRAM_FIGURE_TEXT, unknown>
