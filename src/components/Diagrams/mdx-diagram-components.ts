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
import TxApplyDiagram from "./TxApply"
import ValidatorKeysDiagram, { KeyDerivationDiagram } from "./ValidatorKeys"

/** Every interactive diagram, keyed by its markdown tag; spread into a layout's MDX components. */
export const mdxDiagramComponents = {
  AccountsDiagram,
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
  TxApplyDiagram,
  ValidatorKeysDiagram,
}
