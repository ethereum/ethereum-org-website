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
 * The rig draws only from `NodeRigView`, so later figures (run-a-node's
 * diagram.png, the networking-layer schematics) are new step lists here, not
 * new drawings.
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
] as const
export type NodePart = (typeof NODE_PARTS)[number]

/** Parts drawn only at the `internals` level of detail. */
export const NODE_INTERNAL_PARTS: readonly NodePart[] = ["mempool", "evm"]

/**
 * Message paths. Each has a forward direction: rpc and beacon from the app
 * into a client, engine from the consensus client to the execution client,
 * the peer links from a peer into the node, the meshes round the peers.
 */
export const NODE_LINKS = [
  "rpc",
  "beacon",
  "engine",
  "cl-peer",
  "el-peer",
  "cl-mesh",
  "el-mesh",
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
}

const RIG_DEFAULTS = {
  flows: {},
  newBlock: "none",
  poolCount: 0,
  poolAdded: false,
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
