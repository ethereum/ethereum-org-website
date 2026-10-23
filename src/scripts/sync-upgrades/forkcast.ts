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

export type ForkcastDateClaim = "actual" | "proposed" | "projected"

export interface ForkcastStatedDate {
  claim: ForkcastDateClaim
  value: string
}

export interface ForkcastTestnet {
  name: string
  status: string
  stated: ForkcastStatedDate | null
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

const TESTNET_DATE_KEYS = [
  ["date", "actual"],
  ["proposedDate", "proposed"],
  ["projectedDate", "projected"],
] as const satisfies readonly (readonly [string, ForkcastDateClaim])[]

const parseTestnetDate = (
  entry: string,
  context: string
): ForkcastStatedDate | null => {
  const dateKeys = [
    ...entry.matchAll(/\b(date|[A-Za-z][A-Za-z0-9]*Date)\s*:/g),
  ].map((match) => match[1])
  const knownKeys = new Map<string, ForkcastDateClaim>(TESTNET_DATE_KEYS)
  const unknown = dateKeys.find((key) => !knownKeys.has(key))
  if (unknown) {
    throw new ForkcastSyncError(
      `Unknown testnet date key "${unknown}" on ${context}`
    )
  }
  if (dateKeys.length > 1) {
    throw new ForkcastSyncError(
      `Conflicting testnet date keys ${dateKeys.join("+")} on ${context}`
    )
  }
  if (dateKeys.length === 0) return null

  const key = dateKeys[0]
  const claim = knownKeys.get(key)
  const value = entry.match(new RegExp(`\\b${key}:\\s*'([^']*)'`))?.[1]
  if (!claim || value === undefined) {
    throw new ForkcastSyncError(
      `Testnet date key "${key}" has no string value on ${context}`
    )
  }
  return { claim, value }
}

const download = async (): Promise<{ root: string; cleanup: () => void }> => {
  const dir = mkdtempSync(join(tmpdir(), "forkcast-"))
  const cleanup = () => rmSync(dir, { recursive: true, force: true })

  // The caller can only run cleanup once this resolves, so anything that throws
  // before that has to remove the temp dir itself or CI leaks one per failure.
  try {
    const token = process.env.GITHUB_TOKEN_READ_ONLY ?? process.env.GITHUB_TOKEN
    const res = await fetch(TARBALL_URL, {
      headers: {
        "User-Agent": "ethereum-org-website-upgrade-sync",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) {
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
      throw new ForkcastSyncError(
        "Tarball did not contain an expected root directory"
      )
    }
    return { root: join(dir, extracted), cleanup }
  } catch (error) {
    cleanup()
    throw error
  }
}

/**
 * `upgrades.ts` is a TypeScript literal, so it gets split on top-level record
 * boundaries and read field by field. Deliberately strict: a record missing
 * `name` or `status` throws rather than being silently skipped.
 */
export const parseUpgrades = (source: string): ForkcastUpgrade[] => {
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
      const m = detailsBlock.match(new RegExp(`${key}: ([\\d\\s*_]+)`))
      if (!m) return null
      // slotNumber is an expression (`411392 * 32`); literals may use `_` separators.
      const value = m[1]
        .split("*")
        .map((p) => Number(p.trim().replace(/_/g, "")))
        .reduce((a, b) => a * b, 1)
      if (!Number.isFinite(value)) {
        throw new ForkcastSyncError(
          `Unparseable activationDetails.${key} "${m[1].trim()}" on ${id}`
        )
      }
      return value
    }

    const blockNumber = detail("blockNumber")
    const epochNumber = detail("epochNumber")
    const slotNumber = detail("slotNumber")

    // Compared against null rather than truthiness so a legitimate 0 survives.
    // A block carrying only some of the three is drift, not "no details yet".
    const found = [blockNumber, epochNumber, slotNumber].filter(
      (v) => v !== null
    )
    if (found.length && found.length !== 3) {
      throw new ForkcastSyncError(
        `Incomplete activationDetails on ${id}: ${detailsBlock.trim()}`
      )
    }

    return {
      id,
      name,
      status,
      activationDate: str("activationDate"),
      activationDetails:
        blockNumber !== null && epochNumber !== null && slotNumber !== null
          ? { blockNumber, epochNumber, slotNumber }
          : null,
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
export const parsePhases = (
  source: string
): Record<string, ForkcastPhase[]> => {
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

      const testnets: ForkcastTestnet[] = []
      const testnetsBlock = phaseBlock.match(/testnets:\s*\[([\s\S]*?)\]/)?.[1]

      // `status`, `projectedDate` and `actualEndDate` appear on nested testnets
      // too, so they are read from the phase with that array removed rather
      // than trusting it to come last in the upstream literal.
      const ownFields = testnetsBlock
        ? phaseBlock.replace(testnetsBlock, "")
        : phaseBlock
      const field = (key: string) =>
        ownFields.match(new RegExp(`\\b${key}:\\s*'([^']*)'`))?.[1] ?? null

      if (testnetsBlock) {
        for (const entry of testnetsBlock.split("},")) {
          // Empty fragment = empty `testnets: []`, not a malformed record.
          if (!entry.trim()) continue
          const name = entry.match(/name:\s*'([^']+)'/)?.[1]
          if (!name) {
            throw new ForkcastSyncError(
              `Testnet entry missing name in phase ${phaseMatch[1]}: ${entry.trim().slice(0, 80)}`
            )
          }
          const status = entry.match(/status:\s*'([^']+)'/)?.[1]
          if (!status) {
            throw new ForkcastSyncError(
              `Testnet "${name}" missing status in phase ${phaseMatch[1]}`
            )
          }
          testnets.push({
            name,
            status,
            stated: parseTestnetDate(entry, `${phaseMatch[1]} (${name})`),
          })
        }
      }

      phases.push({
        phaseId: phaseMatch[1],
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
    const withHistory = relationships.filter(
      (r: { statusHistory?: unknown[] }) => r.statusHistory?.length
    )
    if (!withHistory.length) return []

    // Left unchecked this reaches the store as NaN, which JSON.stringify emits
    // as `null` and only surfaces as a type error on the generated file.
    const eipId = Number(eip.id)
    if (!Number.isInteger(eipId)) {
      throw new ForkcastSyncError(`Non-numeric EIP id "${eip.id}" in ${file}`)
    }

    return withHistory.map(
      (r: { forkName: string; statusHistory: ForkcastStatusEntry[] }) => ({
        eipId,
        forkName: r.forkName,
        statusHistory: r.statusHistory,
      })
    )
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
