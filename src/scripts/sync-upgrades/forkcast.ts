/**
 * Reads the upstream ethereum/forkcast dataset.
 *
 * Forkcast publishes no API covering upgrades (`/api/eip-stage-changes.json`
 * carries only the 10 most recent stage changes), so we snapshot the repo
 * tarball. `upgrades.ts` has to be parsed as text; everything else is JSON.
 * If upstream restructures, the parser throws and the caller reports it as a
 * sync failure rather than emitting a half-empty store.
 */
import { execFileSync } from "node:child_process"
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

export const FORKCAST_REPO = "ethereum/forkcast"

const TARBALL_URL = `https://api.github.com/repos/${FORKCAST_REPO}/tarball/main`

export interface ForkcastActivationDetails {
  blockNumber: number
  epochNumber: number
  slotNumber: number
}

export interface ForkcastUpgrade {
  id: string
  name: string
  status: string
  activationDate: string | null
  activationDetails: ForkcastActivationDetails | null
  disabled: boolean
  path: string | null
}

export interface ForkcastStatusEntry {
  status: string
  call: string | null
  date: string | null
}

export interface ForkcastEipRelationship {
  eipId: number
  forkName: string
  statusHistory: ForkcastStatusEntry[]
}

export interface ForkcastDevnetLaunch {
  version: number
  dateISO: string
}

export interface ForkcastTestnet {
  name: string
  status: string
  projectedDate: string | null
}

/**
 * A phase of an upgrade's lifecycle. `mainnet-deployment` carries the target
 * date at the precision Forkcast actually states it — usually a quarter, which
 * `upgrades.ts` flattens to a bare year.
 */
export interface ForkcastPhase {
  phaseId: string
  status: string
  projectedDate: string | null
  actualEndDate: string | null
  testnets: ForkcastTestnet[]
}

export interface ForkcastSource {
  commit: string
  upgrades: ForkcastUpgrade[]
  relationships: ForkcastEipRelationship[]
  devnetLaunches: Record<string, ForkcastDevnetLaunch[]>
  phases: Record<string, ForkcastPhase[]>
}

export class ForkcastSyncError extends Error {}

const download = async (): Promise<{ root: string; cleanup: () => void }> => {
  const dir = mkdtempSync(join(tmpdir(), "forkcast-"))
  const cleanup = () => rmSync(dir, { recursive: true, force: true })

  const token = process.env.GITHUB_TOKEN_READ_ONLY ?? process.env.GITHUB_TOKEN
  const res = await fetch(TARBALL_URL, {
    headers: {
      "User-Agent": "ethereum-org-website-upgrade-sync",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    cleanup()
    throw new ForkcastSyncError(
      `Tarball fetch failed: ${res.status} ${res.statusText}`
    )
  }

  const archive = join(dir, "forkcast.tar.gz")
  writeFileSync(archive, Buffer.from(await res.arrayBuffer()))
  execFileSync("tar", ["xzf", archive, "-C", dir])

  const extracted = readdirSync(dir).find((n) =>
    n.startsWith("ethereum-forkcast-")
  )
  if (!extracted) {
    cleanup()
    throw new ForkcastSyncError(
      "Tarball did not contain an expected root directory"
    )
  }
  return { root: join(dir, extracted), cleanup }
}

/**
 * `upgrades.ts` is a TypeScript literal, so it gets split on top-level record
 * boundaries and read field by field. Deliberately strict: a record missing
 * `name` or `status` throws rather than being silently skipped.
 */
const parseUpgrades = (source: string): ForkcastUpgrade[] => {
  const start = source.indexOf("export const networkUpgrades")
  if (start === -1) {
    throw new ForkcastSyncError(
      "networkUpgrades export not found in upgrades.ts"
    )
  }

  const blocks = source
    .slice(start)
    .split(/\n {2}\{\n/)
    .slice(1)
  if (!blocks.length) {
    throw new ForkcastSyncError("No upgrade records parsed from upgrades.ts")
  }

  return blocks.map((block) => {
    const str = (key: string) => {
      const m = block.match(new RegExp(`\\b${key}: '((?:[^'\\\\]|\\\\.)*)'`))
      return m ? m[1].replace(/\\'/g, "'") : null
    }
    const id = str("id")
    const name = str("name")
    const status = str("status")
    if (!id || !name || !status) {
      throw new ForkcastSyncError(
        `Upgrade record missing id/name/status near: ${block.slice(0, 80)}`
      )
    }

    const detailsBlock =
      block.match(/activationDetails: \{([^}]*)\}/)?.[1] ?? ""
    const detail = (key: string) => {
      const m = detailsBlock.match(new RegExp(`${key}: ([\\d\\s*]+)`))
      if (!m) return null
      // slotNumber is written as an expression, e.g. `411392 * 32`
      return m[1]
        .split("*")
        .map((p) => Number(p.trim()))
        .reduce((a, b) => a * b, 1)
    }

    const blockNumber = detail("blockNumber")
    const epochNumber = detail("epochNumber")
    const slotNumber = detail("slotNumber")

    return {
      id,
      name,
      status,
      activationDate: str("activationDate"),
      activationDetails:
        blockNumber && epochNumber && slotNumber
          ? { blockNumber, epochNumber, slotNumber }
          : null,
      disabled: /\bdisabled: true/.test(block),
      path: str("path"),
    } satisfies ForkcastUpgrade
  })
}

/**
 * `timeline-phases.ts` holds one `ForkProgress` literal per fork, keyed by a
 * `forkName` field. Parsed by locating each `forkName` and splitting the phase
 * objects that follow it.
 *
 * Note the `devnets` arrays here are NOT read: they go stale (Devnet-7 was
 * still marked `upcoming` weeks after launching). `devnet-launches.json` is
 * generated and stays authoritative for devnets.
 */
const parsePhases = (source: string): Record<string, ForkcastPhase[]> => {
  const result: Record<string, ForkcastPhase[]> = {}

  const forkBlocks = [...source.matchAll(/forkName:\s*'([^']+)'/g)]
  if (!forkBlocks.length) {
    throw new ForkcastSyncError(
      "No forkName entries found in timeline-phases.ts"
    )
  }

  for (const [i, match] of forkBlocks.entries()) {
    const start = match.index
    const end = forkBlocks[i + 1]?.index ?? source.length
    const block = source.slice(start, end)

    const phases: ForkcastPhase[] = []
    const phaseMatches = [...block.matchAll(/phaseId:\s*'([^']+)'/g)]

    for (const [j, phaseMatch] of phaseMatches.entries()) {
      const pStart = phaseMatch.index
      const pEnd = phaseMatches[j + 1]?.index ?? block.length
      const phaseBlock = block.slice(pStart, pEnd)

      const field = (key: string) =>
        phaseBlock.match(new RegExp(`\\b${key}:\\s*'([^']*)'`))?.[1] ?? null

      const testnets: ForkcastTestnet[] = []
      const testnetsBlock = phaseBlock.match(/testnets:\s*\[([\s\S]*?)\]/)?.[1]
      if (testnetsBlock) {
        for (const entry of testnetsBlock.split("},")) {
          const name = entry.match(/name:\s*'([^']+)'/)?.[1]
          if (!name) continue
          testnets.push({
            name,
            status: entry.match(/status:\s*'([^']+)'/)?.[1] ?? "unknown",
            projectedDate:
              entry.match(/projectedDate:\s*'([^']+)'/)?.[1] ?? null,
          })
        }
      }

      phases.push({
        phaseId: phaseMatch[1],
        // `status` appears on nested milestones too; the phase's own is first.
        status: field("status") ?? "unknown",
        projectedDate: field("projectedDate"),
        actualEndDate: field("actualEndDate"),
        testnets,
      })
    }

    result[match[1].toLowerCase()] = phases
  }

  return result
}

const parseRelationships = (root: string): ForkcastEipRelationship[] => {
  const dir = join(root, "src/data/eips")
  const files = readdirSync(dir).filter((n) => n.endsWith(".json"))
  if (!files.length) {
    throw new ForkcastSyncError("No EIP records found in src/data/eips")
  }

  return files.flatMap((file) => {
    const eip = JSON.parse(readFileSync(join(dir, file), "utf8"))
    const relationships = Array.isArray(eip.forkRelationships)
      ? eip.forkRelationships
      : []
    return relationships
      .filter((r: { statusHistory?: unknown[] }) => r.statusHistory?.length)
      .map((r: { forkName: string; statusHistory: ForkcastStatusEntry[] }) => ({
        eipId: Number(eip.id),
        forkName: r.forkName,
        statusHistory: r.statusHistory,
      }))
  })
}

export const readForkcastSource = async (): Promise<ForkcastSource> => {
  const { root, cleanup } = await download()
  try {
    const upgrades = parseUpgrades(
      readFileSync(join(root, "src/data/upgrades.ts"), "utf8")
    )
    const devnetLaunches = JSON.parse(
      readFileSync(
        join(root, "src/data/generated/devnet-launches.json"),
        "utf8"
      )
    )
    return {
      commit: root.split("ethereum-forkcast-")[1] ?? "unknown",
      upgrades,
      relationships: parseRelationships(root),
      devnetLaunches,
      phases: parsePhases(
        readFileSync(join(root, "src/constants/timeline-phases.ts"), "utf8")
      ),
    }
  } finally {
    cleanup()
  }
}
