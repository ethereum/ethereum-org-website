/**
 * Plain model for the node diagrams: one rig (a node running an execution
 * client and a consensus client side by side, joined by the Engine API,
 * each with its own peer-to-peer network, plus a wallet or app calling the
 * node's APIs) and the figures built on it.
 *
 * - `NodeClientsDiagram` replaces nodes-and-clients/eth1eth2client.png: which
 *   client serves which API, and how the two clients work together.
 * - `NodeArchitectureDiagram` replaces
 *   nodes-and-clients/node-architecture/node-architecture-text-background.png:
 *   a new block, or a new transaction, followed through the node.
 *
 * - `NodeAccessDiagram` replaces nodes-and-clients/nodes.png: a wallet using
 *   your own node, from a balance query to a transaction and the block that
 *   includes it.
 * - `ClientSetupDiagram` replaces nodes-and-clients/run-a-node/diagram.png:
 *   the connections you configure (Engine API with its JWT secret, peers,
 *   validator client, JSON-RPC) and their default ports.
 * - `NodeNetworksDiagram` replaces networking-layer/cons_client_net_layer.png
 *   and exe_client_net_layer.png: which network carries each step when a node
 *   receives a block and when it proposes one.
 *
 * The rig draws only from `NodeRigView`, so a new figure on the node is a new
 * step list here, not a new drawing.
 *
 * Sources (checked October 2026):
 * - Execution client: gossips transactions, keeps the transaction pool,
 *   executes in the EVM, holds state, serves JSON-RPC. Consensus client:
 *   gossips blocks and attestations, runs fork choice, keeps track of the
 *   head. /developers/docs/nodes-and-clients/node-architecture/ (text and
 *   comparison table) and /developers/docs/nodes-and-clients/.
 * - Beacon API is the consensus client's HTTP API: run-a-node ("The consensus
 *   clients all expose a Beacon API", status and blocks) and
 *   /developers/docs/apis/json-rpc/; https://ethereum.github.io/beacon-APIs
 *   (GET /eth/v1/node/syncing).
 * - eth_ JSON-RPC methods are served by the execution client:
 *   /developers/docs/apis/json-rpc/ (eth_blockNumber).
 * - New-block flow (gossip, pre-validate, payload over the local RPC
 *   connection, execute and check the header, reply, add to head):
 *   /developers/docs/networking-layer/#connecting-clients.
 * - Block production: the consensus client calls engine_forkchoiceUpdated
 *   with payload attributes, the execution client builds a payload from its
 *   pool, and engine_getPayload returns it (execution-apis
 *   src/engine/paris.md and later forks). Proposer duties are computed from
 *   the beacon state, not received from peers.
 * - Gossip names: beacon_block and beacon_attestation_{subnet_id} gossipsub
 *   topics (consensus-specs phase0/p2p-interface.md); the eth protocol's
 *   Transactions message (devp2p caps/eth.md).
 * - Default ports: JSON-RPC 8545, authenticated Engine API 8551, execution
 *   peer-to-peer 30303 TCP and UDP (/developers/docs/nodes-and-clients/
 *   run-a-node/). Consensus and validator client ports differ by client, so
 *   the figure leaves them out. The validator client talks to the consensus
 *   client over the Beacon API.
 * - Engine API method names: https://github.com/ethereum/execution-apis
 *   src/engine/ (engine_newPayloadV*, engine_forkchoiceUpdatedV*; reply status
 *   VALID). The version suffix changes with network upgrades (Prague/Osaka
 *   use engine_newPayloadV4 and engine_forkchoiceUpdatedV3, and later specs
 *   are drafted), so the figures name the method families without it.
 */

/** viewBox of the drawing. */
export const NODE_CLIENTS_SIZE = { width: 490, height: 320 }

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const NODE_PARTS = [
  "deck",
  "cl",
  "el",
  "engine",
  "app",
  "rpc",
  "beacon",
  "cl-net",
  "el-net",
  "mempool",
  "evm",
  "validator",
] as const
export type NodePart = (typeof NODE_PARTS)[number]

/**
 * Message paths. Each has a forward direction: rpc and beacon from the app
 * into a client, engine from the consensus client to the execution client,
 * the peer links from a peer into the node, the meshes round the peers, vc
 * from the validator client into the consensus client.
 */
export const NODE_LINKS = [
  "rpc",
  "beacon",
  "engine",
  "cl-peer",
  "el-peer",
  "cl-mesh",
  "el-mesh",
  "vc",
] as const
export type NodeLink = (typeof NODE_LINKS)[number]
export type LinkFlow = "forward" | "back"

/** `clients`: the two clients only. `internals`: also the transaction pool,
 * the EVM and the consensus client's chain. */
export type NodeDetail = "clients" | "internals"

/** The newest block on the consensus client's chain. */
export type NewBlock = "none" | "pending" | "head"

/** Slots drawn in the transaction pool. */
export const POOL_SLOTS = 4

/** Everything the rig reads. */
export interface NodeRigView {
  detail: NodeDetail
  /** Links carrying a message in this step, and which way. */
  flows: Partial<Record<NodeLink, LinkFlow>>
  litPart: NodePart | null
  newBlock: NewBlock
  /** Transactions waiting in the pool (0 to POOL_SLOTS). */
  poolCount: number
  /** The newest pool entry arrived in this step. */
  poolAdded: boolean
  /** Draw a validator client beside the node, linked to the consensus
   * client. */
  validator: boolean
  /** Draw the Engine API's JWT lock. */
  jwt: boolean
}

const RIG_DEFAULTS = {
  flows: {},
  newBlock: "none",
  poolCount: 0,
  poolAdded: false,
  validator: false,
  jwt: false,
} satisfies Partial<NodeRigView>

/* ---------- Figure 1: NodeClientsDiagram (eth1eth2client.png) ---------- */

export const NODE_CLIENTS_STEPS = ["idle", "rpc", "beacon", "engine"] as const
export type NodeClientsStep = (typeof NODE_CLIENTS_STEPS)[number]
export const NODE_CLIENTS_LAST_STEP = NODE_CLIENTS_STEPS.length - 1

/** Example calls, shown as code (never translated). */
export const EXAMPLE_CALL = {
  rpc: "eth_blockNumber",
  beacon: "GET /eth/v1/node/syncing",
  engine: "engine_newPayload",
} as const

const NODE_CLIENTS_FLOWS: Record<NodeClientsStep, NodeRigView["flows"]> = {
  idle: {},
  rpc: { rpc: "forward" },
  beacon: { beacon: "forward" },
  // The Engine API call, while both clients gossip with their peers.
  engine: {
    engine: "forward",
    "cl-peer": "forward",
    "el-peer": "forward",
    "cl-mesh": "forward",
    "el-mesh": "forward",
  },
}

export interface NodeClientsView extends NodeRigView {
  step: number
  motion: NodeClientsStep
  /** The API in use, as a part id (its label names it), or null at idle. */
  api: "rpc" | "beacon" | "engine" | null
  /** The client answering the call. */
  server: "el" | "cl" | null
  call: string | null
}

export const getNodeClientsView = (requestedStep: number): NodeClientsView => {
  const step = Math.min(Math.max(requestedStep, 0), NODE_CLIENTS_LAST_STEP)
  const motion = NODE_CLIENTS_STEPS[step]
  const api = motion === "idle" ? null : motion

  return {
    ...RIG_DEFAULTS,
    detail: "clients",
    step,
    motion,
    flows: NODE_CLIENTS_FLOWS[motion],
    litPart: api,
    api,
    server: api === "beacon" ? "cl" : api ? "el" : null,
    call: api ? EXAMPLE_CALL[api] : null,
  }
}

/* ---------- Figure 2: NodeArchitectureDiagram (node-architecture) ---------- */

export const NODE_ARCHITECTURE_PRESETS = ["block", "tx"] as const
export type NodeArchitecturePreset = (typeof NODE_ARCHITECTURE_PRESETS)[number]

export const NODE_ARCHITECTURE_STEPS = {
  block: ["idle", "gossip", "payload", "execute", "forkchoice"],
  tx: ["idle", "arrive", "pool", "regossip"],
} as const satisfies Record<NodeArchitecturePreset, readonly string[]>
export type NodeArchitectureStep =
  (typeof NODE_ARCHITECTURE_STEPS)[NodeArchitecturePreset][number]

export const nodeArchitectureLastStep = (preset: NodeArchitecturePreset) =>
  NODE_ARCHITECTURE_STEPS[preset].length - 1

/** Transactions already waiting in the pool: a scenario value. */
export const POOL_BEFORE = 2

/** Engine API messages, shown as code (never translated). */
export const ENGINE_MESSAGE = {
  newPayload: "engine_newPayload",
  valid: "VALID",
  forkchoiceUpdated: "engine_forkchoiceUpdated",
} as const

export interface NodeArchitectureView extends NodeRigView {
  preset: NodeArchitecturePreset
  step: number
  motion: NodeArchitectureStep
  /** Engine API message in this step (block preset), or null. */
  engineMessage: string | null
  /** Where the block or transaction has got to (a string key suffix). */
  progress: BlockProgress | TxProgress
}

export type BlockProgress = "none" | "received" | "sent" | "valid" | "head"
export type TxProgress = "none" | "received" | "pooled" | "passed-on"

const PROGRESS: Record<NodeArchitectureStep, BlockProgress | TxProgress> = {
  idle: "none",
  gossip: "received",
  payload: "sent",
  execute: "valid",
  forkchoice: "head",
  arrive: "received",
  pool: "pooled",
  regossip: "passed-on",
}

export const getNodeArchitectureView = (
  preset: NodeArchitecturePreset,
  requestedStep: number
): NodeArchitectureView => {
  const steps: readonly NodeArchitectureStep[] = NODE_ARCHITECTURE_STEPS[preset]
  const step = Math.min(Math.max(requestedStep, 0), steps.length - 1)
  const motion = steps[step]
  const base = {
    ...RIG_DEFAULTS,
    detail: "internals" as const,
    preset,
    step,
    motion,
    poolCount: POOL_BEFORE,
    engineMessage: null,
    progress: PROGRESS[motion],
  }

  switch (motion) {
    // New block: it arrives on the consensus network, goes to the execution
    // client as a payload, is executed and checked, then becomes the head.
    case "gossip":
      return {
        ...base,
        flows: { "cl-mesh": "forward", "cl-peer": "forward" },
        litPart: "cl-net",
        newBlock: "pending",
      }
    case "payload":
      return {
        ...base,
        flows: { engine: "forward" },
        litPart: "engine",
        newBlock: "pending",
        engineMessage: ENGINE_MESSAGE.newPayload,
      }
    case "execute":
      // Executed in the EVM; the VALID reply goes back over the Engine API.
      return {
        ...base,
        flows: { engine: "back" },
        litPart: "evm",
        newBlock: "pending",
        engineMessage: ENGINE_MESSAGE.valid,
      }
    case "forkchoice":
      return {
        ...base,
        flows: { engine: "forward" },
        litPart: "cl",
        newBlock: "head",
        engineMessage: ENGINE_MESSAGE.forkchoiceUpdated,
      }
    // New transaction: in from an execution peer, checked into the pool,
    // passed on to the other peers.
    case "arrive":
      return {
        ...base,
        flows: { "el-mesh": "forward", "el-peer": "forward" },
        litPart: "el-net",
      }
    case "pool":
      return {
        ...base,
        litPart: "mempool",
        poolCount: POOL_BEFORE + 1,
        poolAdded: true,
      }
    case "regossip":
      return {
        ...base,
        flows: { "el-peer": "back", "el-mesh": "back" },
        litPart: "el-net",
        poolCount: POOL_BEFORE + 1,
      }
    default:
      return { ...base, litPart: null }
  }
}

/* ---------- Figure 3: NodeAccessDiagram (nodes.png) ---------- */

export const NODE_ACCESS_STEPS = [
  "idle",
  "query",
  "answer",
  "send",
  "gossip",
  "verify",
] as const
export type NodeAccessStep = (typeof NODE_ACCESS_STEPS)[number]
export const NODE_ACCESS_LAST_STEP = NODE_ACCESS_STEPS.length - 1

/** Messages, shown as code (never translated). */
export const ACCESS_MESSAGE = {
  query: "eth_getBalance",
  answer: "eth_getBalance",
  send: "eth_sendRawTransaction",
  gossip: "Transactions",
  verify: "beacon_block",
} as const

export interface NodeAccessView extends NodeRigView {
  step: number
  motion: NodeAccessStep
  message: string | null
  /** Where the message goes, as a part id (its label names it). */
  to: NodePart | null
}

const ACCESS: Record<
  Exclude<NodeAccessStep, "idle">,
  Pick<NodeAccessView, "flows" | "litPart" | "to">
> = {
  query: { flows: { rpc: "forward" }, litPart: "rpc", to: "el" },
  answer: { flows: { rpc: "back" }, litPart: "el", to: "app" },
  send: { flows: { rpc: "forward" }, litPart: "mempool", to: "el" },
  gossip: {
    flows: { "el-peer": "back", "el-mesh": "back" },
    litPart: "el-net",
    to: "el-net",
  },
  verify: {
    flows: { "cl-mesh": "forward", "cl-peer": "forward", engine: "forward" },
    litPart: "cl",
    to: "cl",
  },
}

export const getNodeAccessView = (requestedStep: number): NodeAccessView => {
  const step = Math.min(Math.max(requestedStep, 0), NODE_ACCESS_LAST_STEP)
  const motion = NODE_ACCESS_STEPS[step]
  const sent = step >= NODE_ACCESS_STEPS.indexOf("send")
  const base = {
    ...RIG_DEFAULTS,
    detail: "internals" as const,
    step,
    motion,
    poolCount: POOL_BEFORE + (sent ? 1 : 0),
    poolAdded: motion === "send",
    newBlock: motion === "verify" ? ("head" as const) : ("none" as const),
  }
  if (motion === "idle")
    return { ...base, litPart: null, message: null, to: null }
  return { ...base, ...ACCESS[motion], message: ACCESS_MESSAGE[motion] }
}

/* ---------- Figure 4: ClientSetupDiagram (run-a-node/diagram.png) ---------- */

export const CLIENT_SETUP_STEPS = [
  "idle",
  "engine",
  "peers",
  "validator",
  "rpc",
] as const
export type ClientSetupStep = (typeof CLIENT_SETUP_STEPS)[number]
export const CLIENT_SETUP_LAST_STEP = CLIENT_SETUP_STEPS.length - 1

/** Default ports (run-a-node), shown as code: never grouped or localized. */
export const DEFAULT_PORT = {
  rpc: "8545",
  engine: "8551",
  peers: "30303",
} as const

/** Who can reach a connection (a string key suffix). */
export type SetupAccess = "jwt" | "peers" | "local"

export interface ClientSetupView extends NodeRigView {
  step: number
  motion: ClientSetupStep
  /** The connection, as a part id (its label names it). */
  connection: NodePart | null
  port: string | null
  access: SetupAccess | null
}

const SETUP: Record<
  Exclude<ClientSetupStep, "idle">,
  Pick<ClientSetupView, "flows" | "litPart" | "connection" | "port" | "access">
> = {
  engine: {
    flows: { engine: "forward" },
    litPart: "engine",
    connection: "engine",
    port: DEFAULT_PORT.engine,
    access: "jwt",
  },
  peers: {
    flows: {
      "cl-peer": "forward",
      "el-peer": "forward",
      "cl-mesh": "forward",
      "el-mesh": "forward",
    },
    litPart: "el-net",
    connection: "el-net",
    port: DEFAULT_PORT.peers,
    access: "peers",
  },
  validator: {
    flows: { vc: "forward" },
    litPart: "validator",
    connection: "beacon",
    port: null,
    access: "local",
  },
  rpc: {
    flows: { rpc: "forward" },
    litPart: "rpc",
    connection: "rpc",
    port: DEFAULT_PORT.rpc,
    access: "local",
  },
}

export const getClientSetupView = (requestedStep: number): ClientSetupView => {
  const step = Math.min(Math.max(requestedStep, 0), CLIENT_SETUP_LAST_STEP)
  const motion = CLIENT_SETUP_STEPS[step]
  const base = {
    ...RIG_DEFAULTS,
    detail: "clients" as const,
    validator: true,
    jwt: true,
    step,
    motion,
  }
  if (motion === "idle")
    return {
      ...base,
      litPart: null,
      connection: null,
      port: null,
      access: null,
    }
  return { ...base, ...SETUP[motion] }
}

/* ---------- Figure 5: NodeNetworksDiagram (networking-layer) ---------- */

export const NODE_NETWORKS_PRESETS = ["receive", "propose"] as const
export type NodeNetworksPreset = (typeof NODE_NETWORKS_PRESETS)[number]

export const NODE_NETWORKS_STEPS = {
  receive: ["idle", "gossip", "payload", "valid", "attest"],
  propose: ["idle", "fill", "build", "get", "broadcast"],
} as const satisfies Record<NodeNetworksPreset, readonly string[]>
export type NodeNetworksStep =
  (typeof NODE_NETWORKS_STEPS)[NodeNetworksPreset][number]

export const nodeNetworksLastStep = (preset: NodeNetworksPreset) =>
  NODE_NETWORKS_STEPS[preset].length - 1

/** The network a step uses (a string key suffix). */
export type NodeNetwork = "cl" | "engine" | "el"

export interface NodeNetworksView extends NodeRigView {
  preset: NodeNetworksPreset
  step: number
  motion: NodeNetworksStep
  network: NodeNetwork | null
  /** Message, gossip topic or Engine API method, shown as code. */
  message: string | null
}

const NETWORKS: Record<
  Exclude<NodeNetworksStep, "idle">,
  Pick<
    NodeNetworksView,
    "flows" | "litPart" | "network" | "message" | "newBlock"
  > &
    Partial<Pick<NodeNetworksView, "poolCount" | "poolAdded">>
> = {
  // Receive: the networking-layer page's "not block producer" flow.
  gossip: {
    flows: { "cl-mesh": "forward", "cl-peer": "forward" },
    litPart: "cl-net",
    network: "cl",
    message: "beacon_block",
    newBlock: "pending",
  },
  payload: {
    flows: { engine: "forward" },
    litPart: "engine",
    network: "engine",
    message: ENGINE_MESSAGE.newPayload,
    newBlock: "pending",
  },
  valid: {
    flows: { engine: "back" },
    litPart: "evm",
    network: "engine",
    message: ENGINE_MESSAGE.valid,
    newBlock: "pending",
  },
  attest: {
    flows: { "cl-peer": "back", "cl-mesh": "back" },
    litPart: "cl",
    network: "cl",
    message: "beacon_attestation_{subnet_id}",
    newBlock: "head",
  },
  // Propose: the "block producer" flow.
  fill: {
    flows: { "el-mesh": "forward", "el-peer": "forward" },
    litPart: "mempool",
    network: "el",
    message: "Transactions",
    newBlock: "none",
    poolCount: POOL_BEFORE + 1,
    poolAdded: true,
  },
  build: {
    flows: { engine: "forward" },
    litPart: "engine",
    network: "engine",
    message: ENGINE_MESSAGE.forkchoiceUpdated,
    newBlock: "none",
  },
  get: {
    flows: { engine: "back" },
    litPart: "evm",
    network: "engine",
    message: "engine_getPayload",
    newBlock: "pending",
  },
  broadcast: {
    flows: { "cl-peer": "back", "cl-mesh": "back" },
    litPart: "cl-net",
    network: "cl",
    message: "beacon_block",
    newBlock: "head",
  },
}

export const getNodeNetworksView = (
  preset: NodeNetworksPreset,
  requestedStep: number
): NodeNetworksView => {
  const steps: readonly NodeNetworksStep[] = NODE_NETWORKS_STEPS[preset]
  const step = Math.min(Math.max(requestedStep, 0), steps.length - 1)
  const motion = steps[step]
  const base = {
    ...RIG_DEFAULTS,
    detail: "internals" as const,
    preset,
    step,
    motion,
    // Proposing: the pool keeps the new transaction once it has arrived.
    poolCount: POOL_BEFORE + (preset === "propose" && step >= 1 ? 1 : 0),
  }
  if (motion === "idle")
    return { ...base, litPart: null, network: null, message: null }
  return { ...base, ...NETWORKS[motion] }
}
