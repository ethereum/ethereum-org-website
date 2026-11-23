import AccountsDiagram from "./Accounts"
import AttestationsDiagram from "./Attestations"
import BlockStateDiagram from "./BlockState"
import EvmZonesDiagram from "./EvmZones"
import ExAnteReorgDiagram from "./ExAnteReorg"
import GasEvmDiagram from "./GasEvm"
import GasTxDiagram from "./GasTx"
import MevBoostDiagram from "./MevBoost"
import NodeClientsDiagram, {
  ClientSetupDiagram,
  NodeAccessDiagram,
  NodeArchitectureDiagram,
  NodeNetworksDiagram,
} from "./NodeClients"
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
  BlockStateDiagram,
  ClientSetupDiagram,
  ColumnSubnetsDiagram,
  ErasureCodingDiagram,
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
  VerkleTreeDiagram,
}
