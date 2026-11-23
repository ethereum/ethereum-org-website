/**
 * Plain model for `WebErasDiagram` on /web3/ (replaces web1.png, web2.png
 * and web3.png). Answers follow the page's own claims, including its
 * limitations section: web3 is no single owner, not "no one can ever block you".
 */

/** viewBox of the drawing. */
export const WEB_ERAS_SIZE = { width: 480, height: 256 }

export const ERA_IDS = ["web1", "web2", "web3"] as const
export type EraId = (typeof ERA_IDS)[number]

export const WEB_ERAS_PARTS = [
  "server",
  "platform",
  "ads",
  "network",
  "users",
  "accounts",
] as const
export type WebErasPart = (typeof WEB_ERAS_PARTS)[number]

/** Parts drawn in each era, in label priority order. */
export const ERA_PARTS: Record<EraId, WebErasPart[]> = {
  web1: ["server", "users"],
  web2: ["platform", "users", "ads"],
  web3: ["network", "users", "accounts"],
}

/** One step per question; same order and wording in every era. */
export const WEB_ERAS_STEPS = ["idle", "data", "access", "money"] as const
export type WebErasStep = (typeof WEB_ERAS_STEPS)[number]
export const WEB_ERAS_LAST_STEP = WEB_ERAS_STEPS.length - 1
export const QUESTIONS = WEB_ERAS_STEPS.slice(1) as Exclude<
  WebErasStep,
  "idle"
>[]

export const USER_COUNT = 3
/** web3 nodes drawn; the real network has thousands. */
export const NODE_COUNT = 5

/**
 * Links the rig draws. `host-<n>`: server or platform to user n;
 * `ads`: advertisers to platform; `mesh-<a>-<b>`: node to node;
 * `user-<n>-<node>`: a user to the node it uses.
 */
export type LinkId = string

export interface Flow {
  link: LinkId
  hue: "entity" | "gas"
  /** Run against the link's drawn direction. */
  reverse?: boolean
  delay?: number
}

export interface WebErasView {
  era: EraId
  step: number
  motion: WebErasStep
  /** Caption key suffix. */
  key: string
  litPart: WebErasPart | null
  flows: Flow[]
  /** A link cut in the lock-out step. */
  cut: LinkId | null
  /** web1: the site's owner takes a page down. */
  pageRemoved: boolean
  /** web3: the node each user is connected to. */
  userNode: number[]
  /** Questions answered so far, for the readout. */
  answered: number
}

/** Node ring, clockwise from the top; users 0 and 2 sit under nodes 3 and 2. */
export const MESH: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [0, 2],
  [0, 3],
  [1, 4],
]
const USER_NODE = [3, 3, 2]
/** web3 lock-out: user 1 is turned away by node 3 and connects to node 2 instead. */
const REROUTE = { user: 1, from: 3, to: 2 }
const PAY = { from: 0, to: 2 }

const ERA_LIT: Record<EraId, Record<WebErasStep, WebErasPart | null>> = {
  web1: { idle: null, data: "server", access: "server", money: "server" },
  web2: { idle: null, data: "platform", access: "platform", money: "ads" },
  web3: { idle: null, data: "network", access: "accounts", money: "accounts" },
}

const usersTo = (hue: Flow["hue"], reverse = false): Flow[] =>
  Array.from({ length: USER_COUNT }, (_, i) => ({
    link: `host-${i}`,
    hue,
    reverse,
    delay: i * 120,
  }))

const flowsFor = (era: EraId, motion: WebErasStep): Flow[] => {
  if (motion === "idle") return []
  if (era === "web1") return motion === "data" ? usersTo("entity") : []
  if (era === "web2") {
    if (motion === "data") return usersTo("entity", true)
    if (motion === "money")
      return [
        ...usersTo("entity", true),
        { link: "ads", hue: "gas", delay: 500 },
      ]
    return []
  }
  if (motion === "data")
    return MESH.map(([a, b], i) => ({
      link: `mesh-${a}-${b}`,
      hue: "entity",
      delay: (i % 3) * 150,
    }))
  if (motion === "access")
    return [
      {
        link: `user-${REROUTE.user}-${REROUTE.to}`,
        hue: "entity",
        delay: 400,
      },
    ]
  return [
    { link: `user-${PAY.from}-${USER_NODE[PAY.from]}`, hue: "gas" },
    {
      link: `mesh-${USER_NODE[PAY.to]}-${USER_NODE[PAY.from]}`,
      hue: "gas",
      reverse: true,
      delay: 450,
    },
    {
      link: `user-${PAY.to}-${USER_NODE[PAY.to]}`,
      hue: "gas",
      reverse: true,
      delay: 900,
    },
  ]
}

export const getWebErasView = (
  era: EraId,
  requestedStep: number
): WebErasView => {
  const step = Math.min(Math.max(requestedStep, 0), WEB_ERAS_LAST_STEP)
  const motion = WEB_ERAS_STEPS[step]
  const lockOut = motion === "access"
  const userNode = [...USER_NODE]
  if (era === "web3" && lockOut) userNode[REROUTE.user] = REROUTE.to
  return {
    era,
    step,
    motion,
    key: motion === "idle" ? "idle" : `${motion}-${era}`,
    litPart: ERA_LIT[era][motion],
    flows: flowsFor(era, motion),
    cut: !lockOut
      ? null
      : era === "web2"
        ? "host-2"
        : era === "web3"
          ? `user-${REROUTE.user}-${REROUTE.from}`
          : null,
    pageRemoved: era === "web1" && lockOut,
    userNode,
    answered: step,
  }
}
