import AccountsDiagram from "./Accounts"
import AttestationsDiagram from "./Attestations"
import BlockStateDiagram from "./BlockState"
import EvmZonesDiagram from "./EvmZones"
import GasEvmDiagram from "./GasEvm"
import GasTxDiagram from "./GasTx"
import NodeClientsDiagram, { NodeArchitectureDiagram } from "./NodeClients"
import TxApplyDiagram from "./TxApply"

/** Every interactive diagram, keyed by its markdown tag; spread into a layout's MDX components. */
export const mdxDiagramComponents = {
  AccountsDiagram,
  AttestationsDiagram,
  BlockStateDiagram,
  EvmZonesDiagram,
  GasEvmDiagram,
  GasTxDiagram,
  NodeArchitectureDiagram,
  NodeClientsDiagram,
  TxApplyDiagram,
}
