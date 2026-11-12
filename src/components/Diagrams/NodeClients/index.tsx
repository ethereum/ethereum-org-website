import { DiagramMessages } from "../diagram-messages"

import {
  ClientSetupPlayer,
  NodeAccessPlayer,
  NodeArchitecturePlayer,
  NodeClientsPlayer,
  NodeNetworksPlayer,
} from "./lazy-player"
import type { NodeArchitecturePreset, NodeNetworksPreset } from "./model"

export interface NodeClientsDiagramProps {
  /** Step to start on (0 = idle, 1-3), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `eth1eth2client.png` ("Two clients, one
 * node"): an app calls the execution client's JSON-RPC API and the consensus
 * client's Beacon API, and the consensus client drives the execution client
 * over the Engine API while each gossips with its own peers.
 */
const NodeClientsDiagram = ({
  initialStep,
  fig,
  className,
}: NodeClientsDiagramProps) => (
  <DiagramMessages prefix="node-clients">
    <NodeClientsPlayer
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export interface NodeArchitectureDiagramProps {
  /** Scenario to start on, for static stories. */
  initialPreset?: NodeArchitecturePreset
  /** Step to start on (0 = idle, then 1-4 for a block, 1-3 for a
   * transaction), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `node-architecture-text-background.png`
 * ("Inside a node"), on the same drawing: a new block followed from
 * consensus gossip through the Engine API and the EVM to fork choice, or a
 * new transaction from execution gossip into the transaction pool and on to
 * other peers.
 */
export const NodeArchitectureDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: NodeArchitectureDiagramProps) => (
  <DiagramMessages prefix="node-clients">
    <NodeArchitecturePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export interface NodeStepDiagramProps {
  /** Step to start on (0 = idle), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `nodes.png` ("Using Ethereum through your own
 * node"), on the same drawing: a wallet queries your node, sends a
 * transaction through it to the node's peers, and your node verifies a new
 * block itself.
 */
export const NodeAccessDiagram = (props: NodeStepDiagramProps) => (
  <DiagramMessages prefix="node-clients">
    <NodeAccessPlayer {...props} />
  </DiagramMessages>
)

/**
 * Interactive replacement for run-a-node's `diagram.png` ("Client setup"),
 * on the same drawing with a validator client: the Engine API and its JWT
 * secret, the peer-to-peer port, the validator client's Beacon API link and
 * JSON-RPC, with their default ports.
 */
export const ClientSetupDiagram = (props: NodeStepDiagramProps) => (
  <DiagramMessages prefix="node-clients">
    <ClientSetupPlayer {...props} />
  </DiagramMessages>
)

export interface NodeNetworksDiagramProps extends NodeStepDiagramProps {
  /** Scenario to start on, for static stories. */
  initialPreset?: NodeNetworksPreset
}

/**
 * Interactive replacement for `cons_client_net_layer.png` and
 * `exe_client_net_layer.png` ("Which network carries each step"), on the
 * same drawing: a node receiving a block, or proposing one, with the network
 * each step uses.
 */
export const NodeNetworksDiagram = (props: NodeNetworksDiagramProps) => (
  <DiagramMessages prefix="node-clients">
    <NodeNetworksPlayer {...props} />
  </DiagramMessages>
)

export default NodeClientsDiagram
