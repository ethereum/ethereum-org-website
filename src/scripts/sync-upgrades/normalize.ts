/**
 * Maps Forkcast's shapes onto our contract.
 *
 * The mapping is intentionally 1:1 and boring — it is the artifact reviewers
 * check. The single deliberate collapse is Forkcast's "Networking", which is a
 * category rather than a confidence level and so becomes `scheduled` plus a
 * flag. Status expresses confidence; kind gets its own field.
 */
import type {
  EipStatus,
  Milestone,
  MilestoneKind,
  PartialDate,
  Quarter,
  UpgradeData,
  UpgradeEip,
  UpgradeStatus,
  UpgradeStore,
} from "@/data/upgrades/types"

import type { ForkcastSource, ForkcastUpgrade } from "./forkcast"
import { ForkcastSyncError } from "./forkcast"

const UPGRADE_STATUS: Record<string, UpgradeStatus> = {
  Live: "live",
  Upcoming: "upcoming",
  Planning: "planning",
  Research: "research",
}

const EIP_STATUS: Record<string, EipStatus> = {
  Proposed: "proposed",
  Considered: "considered",
  Scheduled: "scheduled",
  Declined: "declined",
  Included: "included",
  Withdrawn: "withdrawn",
  Informational: "informational",
  Networking: "scheduled",
}

const NETWORKING_STATUS = "Networking"

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

/**
 * Parses every date shape Forkcast writes across `upgrades.ts` and
 * `timeline-phases.ts`: `2026`, `Mon D, YYYY`, `Mon YYYY`, `QN YYYY`, and
 * quarter ranges like `Q3-Q4 2026`.
 *
 * A range degrades to the year on purpose — picking either bound would assert
 * precision the source does not have.
 */
export const parsePartialDate = (value: string | null): PartialDate | null => {
  if (!value) return null
  const text = value.trim()

  const year = text.match(/^(\d{4})$/)
  if (year) return { year: Number(year[1]) }

  if (/^Q[1-4]\s*-\s*Q[1-4]\s+\d{4}$/i.test(text)) {
    return { year: Number(text.match(/(\d{4})$/)![1]) }
  }

  const quarter = text.match(/^Q([1-4])\s+(\d{4})$/i)
  if (quarter) {
    return {
      year: Number(quarter[2]),
      quarter: Number(quarter[1]) as Quarter,
    }
  }

  const full = text.match(/^([A-Za-z]{3})\w* (\d{1,2}),\s*(\d{4})$/)
  if (full) {
    const month = MONTHS.indexOf(full[1].toLowerCase()) + 1
    if (month > 0) {
      return { year: Number(full[3]), month, day: Number(full[2]) }
    }
  }

  const monthYear = text.match(/^([A-Za-z]{3})\w*\s+(\d{4})$/)
  if (monthYear) {
    const month = MONTHS.indexOf(monthYear[1].toLowerCase()) + 1
    if (month > 0) return { year: Number(monthYear[2]), month }
  }

  return null
}

/** Ranked so a more specific upstream value wins. */
const precision = (d: PartialDate): number =>
  d.day ? 3 : d.month ? 2 : d.quarter ? 1 : 0

const KIND_ORDER: Record<MilestoneKind, number> = {
  devnet: 0,
  testnet: 1,
  mainnet: 2,
}

/**
 * Missing precision sorts late, not early: "sometime in 2026" belongs after
 * every dated milestone in 2026. A quarter sorts at its closing month.
 */
const dateKey = (d: PartialDate): number =>
  (d.quarter ? d.quarter * 3 : (d.month ?? 12)) * 100 + (d.day ?? 31)

/**
 * Year, then release stage, then date. Stage outranks the date because dates
 * degrade: Hegotá's testnet forks are known only to the year while its mainnet
 * target has a quarter, and sorting on dates alone would put activation first.
 */
const byMilestoneOrder = (a: Milestone, b: Milestone) =>
  a.when.year - b.when.year ||
  KIND_ORDER[a.kind] - KIND_ORDER[b.kind] ||
  dateKey(a.when) - dateKey(b.when)

const parseIsoDate = (iso: string): PartialDate | null => {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return m
    ? { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) }
    : null
}

const MAINNET_PHASE = "mainnet-deployment"
const TESTNET_PHASE = "public-testnets"

/**
 * The mainnet target, taking whichever source states it most precisely.
 * `upgrades.ts` flattens it to a year; the phase timeline usually has the
 * quarter, and an exact date once the phase completes.
 */
const resolveMainnetTarget = (
  source: ForkcastSource,
  upgrade: ForkcastUpgrade
): PartialDate | null => {
  const headline = parsePartialDate(upgrade.activationDate)
  const phase = source.phases[upgrade.id]?.find(
    (p) => p.phaseId === MAINNET_PHASE
  )

  const stated = phase?.actualEndDate ?? phase?.projectedDate ?? null
  const fromPhase = parsePartialDate(stated)
  if (stated && !fromPhase) {
    throw new ForkcastSyncError(
      `Unparseable mainnet phase date "${stated}" on ${upgrade.id}`
    )
  }

  // An actualEndDate is a fact rather than a projection, so it outranks the
  // headline even in a different year: upstream edits the two files separately
  // and the headline can lag a cycle behind the date the phase actually ended.
  if (fromPhase && phase?.actualEndDate) return fromPhase

  if (!headline) return fromPhase
  if (!fromPhase) return headline
  // A year mismatch between two projections is drift, not a tiebreak.
  if (fromPhase.year !== headline.year) {
    throw new ForkcastSyncError(
      `Mainnet target year disagreement on ${upgrade.id}: headline projects ${headline.year}, phase timeline projects ${fromPhase.year}`
    )
  }

  return precision(fromPhase) > precision(headline) ? fromPhase : headline
}

/**
 * Public testnet forks, from the phase timeline. Deprecated networks are
 * skipped — Holešky was shut down after Fusaka and is listed only as history.
 */
const normalizeTestnets = (
  source: ForkcastSource,
  upgradeId: string
): Milestone[] => {
  const phase = source.phases[upgradeId]?.find(
    (p) => p.phaseId === TESTNET_PHASE
  )
  if (!phase) return []

  return phase.testnets.flatMap((testnet) => {
    if (testnet.status === "deprecated") return []
    const when = parsePartialDate(testnet.projectedDate)
    if (!when) {
      // No date upstream is legitimate; a date we cannot read is drift.
      if (testnet.projectedDate) {
        throw new ForkcastSyncError(
          `Unparseable testnet date "${testnet.projectedDate}" on ${upgradeId} (${testnet.name})`
        )
      }
      return []
    }
    return [
      {
        kind: "testnet",
        network: testnet.name,
        when,
        status: testnet.status === "completed" ? "complete" : "projected",
      } satisfies Milestone,
    ]
  })
}

/**
 * Only EIPs expected to ship are stored. The rest of Forkcast's vocabulary is
 * still mapped below so an unknown value fails loudly, but proposed, considered,
 * declined, withdrawn and informational entries are dropped:
 *
 * - nothing consumes them — a declined EIP should be removed from a page, not
 *   labelled, and listing proposals would make this an EIP directory
 * - they churn every ACD call during EIP selection (Hegotá alone has 55
 *   proposals), which would produce weekly diffs against data nobody reads
 *
 * Descoping stays visible: a declined EIP leaves the store, and a deletion in
 * the diff reads more clearly than a status field flipping.
 */
const STORED_STATUSES: ReadonlySet<EipStatus> = new Set([
  "scheduled",
  "included",
])

const normalizeEips = (
  source: ForkcastSource,
  forkName: string
): UpgradeEip[] =>
  source.relationships
    .filter((r) => r.forkName.toLowerCase() === forkName)
    .map((r) => {
      const latest = r.statusHistory[r.statusHistory.length - 1]
      const status = EIP_STATUS[latest.status]
      if (!status) {
        throw new ForkcastSyncError(
          `Unmapped Forkcast EIP status "${latest.status}" on EIP-${r.eipId} (${r.forkName})`
        )
      }
      return {
        id: r.eipId,
        status,
        networking: latest.status === NETWORKING_STATUS,
        decidedAt:
          latest.call || latest.date
            ? { call: latest.call ?? null, date: latest.date ?? null }
            : null,
      }
    })
    .filter((eip) => STORED_STATUSES.has(eip.status))
    .sort((a, b) => a.id - b.id)

const normalizeMilestones = (
  source: ForkcastSource,
  upgrade: ForkcastUpgrade,
  status: UpgradeStatus,
  target: PartialDate | null,
  confirmed: boolean
): Milestone[] => {
  const launches = [...(source.devnetLaunches[upgrade.id] ?? [])].sort(
    (a, b) => a.version - b.version
  )

  const milestones: Milestone[] = launches.map((launch, i) => {
    const when = parseIsoDate(launch.dateISO)
    if (!when) {
      // Dropping this would silently move `live` onto the previous devnet.
      throw new ForkcastSyncError(
        `Unparseable devnet dateISO "${launch.dateISO}" on ${upgrade.id} (Devnet-${launch.version})`
      )
    }
    const isLatest = i === launches.length - 1
    return {
      kind: "devnet",
      version: launch.version,
      when,
      // Once the fork has shipped, every devnet is history.
      status: isLatest && status !== "live" ? "live" : "complete",
    }
  })

  milestones.push(...normalizeTestnets(source, upgrade.id))

  if (target) {
    milestones.push({
      kind: "mainnet",
      when: target,
      status:
        status === "live" ? "complete" : confirmed ? "confirmed" : "projected",
    })
  }

  return milestones.sort(byMilestoneOrder)
}

/**
 * forkName/phase/devnet keys join to an upgrade id by lowercased match, and a
 * miss is silent (an empty filter, not a throw) — validate up front instead.
 */
const validateForeignKeys = (source: ForkcastSource): void => {
  const upgradeIds = new Set(source.upgrades.map((u) => u.id))

  const unknownForkNames = [
    ...new Set(
      source.relationships
        .map((r) => r.forkName.toLowerCase())
        .filter((id) => !upgradeIds.has(id))
    ),
  ]
  if (unknownForkNames.length) {
    throw new ForkcastSyncError(
      `EIP relationships reference fork name(s) with no matching upgrade: ${unknownForkNames.join(", ")}`
    )
  }

  const unknownPhaseKeys = Object.keys(source.phases).filter(
    (id) => !upgradeIds.has(id)
  )
  if (unknownPhaseKeys.length) {
    throw new ForkcastSyncError(
      `Phase timeline references fork key(s) with no matching upgrade: ${unknownPhaseKeys.join(", ")}`
    )
  }

  const unknownDevnetKeys = Object.keys(source.devnetLaunches).filter(
    (id) => !upgradeIds.has(id)
  )
  if (unknownDevnetKeys.length) {
    throw new ForkcastSyncError(
      `Devnet launches reference fork key(s) with no matching upgrade: ${unknownDevnetKeys.join(", ")}`
    )
  }
}

export const normalize = (source: ForkcastSource): UpgradeStore => {
  validateForeignKeys(source)

  const store: UpgradeStore = {}

  for (const upgrade of source.upgrades) {
    // A signpost row pointing at ethereum.org/history, not a real upgrade.
    if (!upgrade.activationDate && !upgrade.path?.startsWith("/upgrade/"))
      continue
    if (upgrade.id === "previous-upgrades") continue

    const status = UPGRADE_STATUS[upgrade.status]
    if (!status) {
      throw new ForkcastSyncError(
        `Unmapped Forkcast upgrade status "${upgrade.status}" on ${upgrade.id}`
      )
    }

    const when = resolveMainnetTarget(source, upgrade)
    if (upgrade.activationDate && !when) {
      throw new ForkcastSyncError(
        `Unparseable activationDate "${upgrade.activationDate}" on ${upgrade.id}`
      )
    }
    // A shipped fork's date cannot move, so it counts as confirmed whether or
    // not upstream kept its activation epoch — Forkcast records none for the
    // pre-Pectra forks, which would otherwise read as tentative.
    const confirmed =
      when !== null && (status === "live" || upgrade.activationDetails !== null)

    store[upgrade.id] = {
      slug: upgrade.id,
      name: upgrade.name.replace(/ Upgrade$/, ""),
      status,
      mainnetTarget: when
        ? { when, confirmed }
        : { when: null, confirmed: false },
      milestones: normalizeMilestones(source, upgrade, status, when, confirmed),
      eips: normalizeEips(source, upgrade.id),
      sourceUrl: `https://forkcast.org${upgrade.path ?? `/upgrade/${upgrade.id}`}`,
    } satisfies UpgradeData
  }

  if (!Object.keys(store).length) {
    throw new ForkcastSyncError("Normalized store is empty")
  }
  return store
}
