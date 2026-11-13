import { DiagramMessages } from "../diagram-messages"

import { NodeArchitecturePlayer, NodeClientsPlayer } from "./lazy-player"
import type { NodeArchitecturePreset } from "./model"

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

export default NodeClientsDiagram
