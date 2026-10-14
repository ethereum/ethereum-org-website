import type { Answers, Severity, TodoId } from "./data"

export interface Leak {
  /** Matches `today-leak-<id>-title|learn|who` */
  id: string
  severity: Severity
  /** Plan items that help with this leak */
  todos: TodoId[]
}

/**
 * Where a setup leaks, most severe first. Pure: the same answers always give
 * the same report. Ported from the prototype's rules, with routing to-dos
 * replaced by the "learn about…" items.
 */
export const computeLeaks = (answers: Answers): Leak[] => {
  const leaks: Leak[] = []
  const add = (id: string, severity: Severity, todos: TodoId[]) =>
    leaks.push({ id, severity, todos })
  const tools = new Set(answers.tools)
  const share = new Set(answers.share)

  if (answers.ens === "linked")
    add("name-on-address", 4, ["learn-public", "split"])
  if (share.has("holdings")) add("shared-holdings", 4, ["learn-public"])
  if (answers.addrs === "one") add("one-address", 4, ["split"])
  if (answers.addrs === "some")
    add("linked-addresses", 3, ["split", "learn-pools"])
  if (answers.source === "cex")
    add("exchange-knows", answers.funding === "cex" ? 4 : 3, ["learn-exchange"])
  if (answers.funding === "main") add("funded-from-main", 3, ["learn-funding"])
  if (answers.funding === "cex")
    add("funded-from-exchange", 3, ["learn-funding", "learn-exchange"])
  if (answers.rpc === "default") add("rpc-default", 3, ["rpc", "node"])
  if (answers.rpc === "unknown") add("rpc-unknown", 3, ["rpc", "node"])
  if (answers.rpc === "nolog") add("rpc-nolog", 2, ["rpc", "node"])
  if (answers.rpc === "node" && answers.wallet === "mobile")
    add("phone-node", 2, ["node", "verify"])
  if (answers.rpc === "node") add("node-peers", 1, ["privtx"])
  if (!tools.has("pool") && !tools.has("stealth"))
    add("balance-visible", 3, ["stealth", "learn-pools"])
  if (share.has("payme") && !tools.has("stealth"))
    add("payme-public", 3, ["stealth", "learn-public"])
  if (share.has("badges")) add("badges", 2, ["learn-public", "split"])
  if (!tools.has("privtx")) add("trades-visible", 1, ["privtx"])
  if (answers.browser === "same")
    add("browser-same", answers.wallet === "ext" ? 3 : 2, ["profile"])
  if (answers.browser === "profile") add("browser-profile", 1, ["profile"])
  if (["ext", "mobile", "hw"].includes(answers.wallet))
    add("wallet-background", 2, ["settings"])
  if (answers.wallet === "hw") add("hardware-app", 1, ["rpc"])
  if (answers.wallet === "smart") add("smart-login", 2, ["verify"])

  // Stable sort keeps rule order within a severity
  return leaks
    .map((leak, index) => ({ leak, index }))
    .sort((a, b) => b.leak.severity - a.leak.severity || a.index - b.index)
    .map(({ leak }) => leak)
}

/**
 * Plan items for a report: every item a leak points to, plus "verify",
 * ranked by the most severe leak they help with.
 */
export const planFor = (leaks: Leak[]) => {
  const score = new Map<TodoId, number>()
  const helps = new Map<TodoId, string[]>()
  for (const leak of leaks) {
    for (const todo of leak.todos) {
      score.set(
        todo,
        Math.max(score.get(todo) ?? 0, leak.severity) +
          (score.has(todo) ? 0.1 : 0)
      )
      helps.set(todo, [...(helps.get(todo) ?? []), leak.id])
    }
  }
  if (!score.has("verify")) {
    score.set("verify", 0)
    helps.set("verify", [])
  }
  return { score, helps }
}
