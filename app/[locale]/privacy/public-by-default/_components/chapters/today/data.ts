/**
 * Structure for the "Where will you leak?" self-assessment (#today). All text
 * lives in page-privacy-public-by-default under `today-q-<id>-*`,
 * `today-leak-<id>-*` and `today-todo-<id>-*`.
 */

export const QUESTIONS = [
  { id: "wallet", type: "radio", options: ["ext", "mobile", "hw", "smart"] },
  {
    id: "rpc",
    type: "radio",
    options: ["default", "nolog", "node", "unknown"],
    hint: true,
  },
  { id: "source", type: "radio", options: ["cex", "earned", "person"] },
  { id: "addrs", type: "radio", options: ["one", "some", "apart"] },
  { id: "ens", type: "radio", options: ["linked", "unlinked", "none"] },
  {
    id: "funding",
    type: "radio",
    options: ["main", "cex", "private", "never"],
  },
  {
    id: "tools",
    type: "check",
    options: ["pool", "stealth", "privtx"],
    hint: true,
  },
  {
    id: "share",
    type: "check",
    options: ["holdings", "badges", "payme"],
    hint: true,
  },
  { id: "browser", type: "radio", options: ["same", "profile", "hardened"] },
] as const

export type Question = (typeof QUESTIONS)[number]
export type QuestionId = Question["id"]

export interface Answers {
  wallet: string
  rpc: string
  source: string
  addrs: string
  ens: string
  funding: string
  tools: string[]
  share: string[]
  browser: string
}

/** A typical setup, so the report has something to show before the reader answers */
export const EXAMPLE_ANSWERS: Answers = {
  wallet: "ext",
  rpc: "default",
  source: "cex",
  addrs: "some",
  ens: "linked",
  funding: "main",
  tools: [],
  share: ["badges", "payme"],
  browser: "same",
}

/** Stored answers come from an earlier visit; keep only known option ids. */
export const normalizeAnswers = (raw: unknown): Answers => {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >
  const result = { ...EXAMPLE_ANSWERS } as Record<string, string | string[]>
  for (const question of QUESTIONS) {
    const valid: readonly string[] = question.options
    const value = source[question.id]
    if (question.type === "check") {
      result[question.id] = Array.isArray(value)
        ? valid.filter((option) => value.includes(option))
        : [...(EXAMPLE_ANSWERS[question.id] as string[])]
    } else {
      result[question.id] =
        typeof value === "string" && valid.includes(value)
          ? value
          : (EXAMPLE_ANSWERS[question.id] as string)
    }
  }
  return result as unknown as Answers
}

/** 0 = 5 minutes, 1 = an afternoon, 2 = a weekend */
export type Horizon = 0 | 1 | 2
export const HORIZONS = ["minutes", "afternoon", "weekend"] as const

export type TodoId =
  | "settings"
  | "learn-public"
  | "profile"
  | "privtx"
  | "rpc"
  | "split"
  | "learn-funding"
  | "stealth"
  | "verify"
  | "node"
  | "learn-pools"
  | "learn-exchange"

export interface Todo {
  id: TodoId
  horizon: Horizon
  steps: number
  /** hrefs for <link> tags, by step number */
  links?: Partial<Record<number, string>>
}

export const TODOS: Todo[] = [
  { id: "settings", horizon: 0, steps: 4 },
  { id: "learn-public", horizon: 0, steps: 4 },
  { id: "profile", horizon: 0, steps: 3, links: { 3: "/privacy/online/" } },
  { id: "privtx", horizon: 0, steps: 3 },
  { id: "rpc", horizon: 1, steps: 4 },
  { id: "split", horizon: 1, steps: 4 },
  {
    id: "learn-funding",
    horizon: 1,
    steps: 3,
    links: { 3: "/privacy/ethereum/" },
  },
  { id: "stealth", horizon: 1, steps: 3 },
  { id: "verify", horizon: 1, steps: 2 },
  { id: "node", horizon: 2, steps: 4, links: { 1: "/run-a-node/" } },
  {
    id: "learn-pools",
    horizon: 2,
    steps: 3,
    links: { 1: "/privacy/ethereum/" },
  },
  { id: "learn-exchange", horizon: 2, steps: 3 },
]

export const TODO_IDS = new Set<string>(TODOS.map(({ id }) => id))

export const severityKey = {
  4: "critical",
  3: "high",
  2: "medium",
  1: "low",
} as const

export type Severity = keyof typeof severityKey

/**
 * "Spot the leaks": a wallet's network log right after unlocking. Hosts are
 * reserved .example names; addresses are the lesson persona's.
 */
export const SPOT_ROWS = [
  { method: "GET", target: "chrome-extension://…/home.html", leak: false },
  {
    method: "POST",
    target: "rpc.example eth_getBalance(0x7a3f…c21d)",
    leak: true,
  },
  {
    method: "POST",
    target: "rpc.example [batch: eth_getBalance ×4]",
    leak: true,
  },
  { method: "GET", target: "prices.example/v3/price?ids=…", leak: true },
  {
    method: "GET",
    target: "chrome-extension://…/images/logo.svg",
    leak: false,
  },
  { method: "GET", target: "nft-images.example/t/88213.png", leak: true },
  { method: "POST", target: "analytics.example/v1/track", leak: true },
  { method: "POST", target: "localhost:8545 eth_blockNumber", leak: false },
] as const
