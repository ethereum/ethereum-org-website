/**
 * Splits a store change into the part a human has to read and the part that is
 * pure data.
 *
 *   pnpm exec tsx src/scripts/sync-upgrades/classify.ts
 *
 * Prints one line per notable change, nothing at all when a sync only moved
 * data. The gate is which key moved, not how big the diff is: a devnet date
 * has no prose to contradict, a mainnet target has 25 files' worth.
 *
 * Compares a committed store against the working tree, so it runs after the
 * sync and before the commit. `SYNC_BASE_REF` picks which commit that is.
 */
import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

import type {
  MainnetTarget,
  PartialDate,
  UpgradeData,
  UpgradeEip,
  UpgradeStore,
} from "@/data/upgrades/types"

const STORE_PATH = "src/data/upgrades/generated.ts"

/** The sync branch while a data PR is unmerged, so a change is reported once. */
const BASE_REF = process.env.SYNC_BASE_REF || "HEAD"

/** Compact and unambiguous — this is read in a diff, not in a UI. */
const formatDate = (when: PartialDate): string => {
  if (when.quarter) return `${when.year}-Q${when.quarter}`
  if (!when.month) return String(when.year)
  const month = String(when.month).padStart(2, "0")
  return when.day
    ? `${when.year}-${month}-${String(when.day).padStart(2, "0")}`
    : `${when.year}-${month}`
}

const formatTarget = (target: MainnetTarget): string =>
  target.when === null
    ? "none"
    : `${formatDate(target.when)}${target.confirmed ? " confirmed" : ""}`

const byId = (eips: UpgradeEip[]) => new Map(eips.map((e) => [e.id, e]))

/**
 * Keys deliberately left out: `milestones`, `decidedAt`, `networking` and
 * `sourceUrl`. Devnets move weekly and no page states their numbers, so
 * flagging them would train everyone to ignore the issue.
 */
const compareUpgrade = (prev: UpgradeData, next: UpgradeData): string[] => {
  const changes: string[] = []

  if (prev.name !== next.name)
    changes.push(`name · ${prev.name} → ${next.name}`)

  if (prev.status !== next.status)
    changes.push(`status · ${prev.status} → ${next.status}`)

  const before = formatTarget(prev.mainnetTarget)
  const after = formatTarget(next.mainnetTarget)
  if (before !== after) changes.push(`mainnet target · ${before} → ${after}`)

  const prevEips = byId(prev.eips)
  const nextEips = byId(next.eips)
  for (const [id, eip] of nextEips) {
    const was = prevEips.get(id)
    if (!was) changes.push(`+EIP-${id} · ${eip.status}`)
    else if (was.status !== eip.status)
      changes.push(`EIP-${id} · ${was.status} → ${eip.status}`)
  }
  for (const id of prevEips.keys())
    if (!nextEips.has(id)) changes.push(`-EIP-${id} · no longer expected`)

  return changes
}

export const classify = (prev: UpgradeStore, next: UpgradeStore): string[] => {
  const slugs = [...new Set([...Object.keys(prev), ...Object.keys(next)])]
  return slugs.flatMap((slug) => {
    const was = prev[slug]
    const now = next[slug]
    if (!was) return [`${slug} · new upgrade · ${now.status}`]
    if (!now) return [`${slug} · upgrade removed`]
    return compareUpgrade(was, now).map((change) => `${slug} · ${change}`)
  })
}

/** The baseline store, loaded as a module rather than parsed as text. */
const loadCommitted = async (): Promise<UpgradeStore> => {
  const dir = mkdtempSync(join(tmpdir(), "upgrade-store-"))
  try {
    const path = join(dir, "committed.ts")
    // The store's only import is type-only, so it needs no siblings here.
    writeFileSync(
      path,
      execFileSync("git", ["show", `${BASE_REF}:${STORE_PATH}`], {
        encoding: "utf8",
      }).replace(/\s*satisfies UpgradeStore\s*$/, "")
    )
    const mod = await import(pathToFileURL(path).href)
    return mod.generated
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const main = async () => {
  const [prev, next] = await Promise.all([
    loadCommitted(),
    import(pathToFileURL(join(process.cwd(), STORE_PATH)).href).then(
      (m) => m.generated as UpgradeStore
    ),
  ])
  const changes = classify(prev, next)
  if (changes.length) console.log(changes.join("\n"))
}

if (process.argv[1]?.endsWith("classify.ts")) {
  main().catch((error) => {
    console.error(`Classify failed: ${error.message}`)
    process.exit(1)
  })
}
