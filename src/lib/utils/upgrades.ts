/**
 * Reader-facing derivations over the Forkcast-backed upgrade store.
 *
 * Two surfaces describe the same upgrade: the release carousel on `/roadmap`
 * and the `UpgradeSummary` block on each upgrade page. They used to disagree —
 * the carousel called Glamsterdam "In development" from a hardcoded date while
 * its own page said "Testing on devnets" from the data — so the stage, the
 * labels and the date formatting all live here rather than in either component.
 */
import type { Milestone, PartialDate, UpgradeData } from "@/data/upgrades/types"

import { formatPartialDate } from "./date"
import { numberFormat } from "./numbers"

/**
 * How far along an upgrade is, strongest claim first.
 *
 * Deliberately not `UpgradeStatus`: that field only separates live from
 * upcoming, and "testing on devnets" is the more useful thing to tell a reader
 * about a fork that will not ship for months. `scheduled` outranks the testing
 * stages because a locked-in mainnet date answers "when" better than naming
 * which network is currently forking.
 */
export type UpgradeStage =
  | "live"
  | "scheduled"
  | "testnet"
  | "devnet"
  | "development"
  | "planning"
  | "research"

/** Confidence, not stage: what the reader can rely on, in three steps. */
export type UpgradeStageTone = "shipped" | "locked" | "moving"

export const getUpgradeStage = (upgrade: UpgradeData): UpgradeStage => {
  const mainnet = upgrade.milestones.find(
    (milestone) => milestone.kind === "mainnet"
  )
  if (mainnet?.status === "complete" || upgrade.status === "live") return "live"

  if (upgrade.mainnetTarget.confirmed) return "scheduled"

  const running = upgrade.milestones.find(
    (milestone) => milestone.status === "live"
  )
  if (running?.kind === "testnet") return "testnet"
  if (running?.kind === "devnet") return "devnet"

  switch (upgrade.status) {
    case "planning":
      return "planning"
    case "research":
      return "research"
    default:
      return "development"
  }
}

/**
 * Every stage has a label because the carousel always shows one. Where a
 * string already existed for the same idea it is reused, so switching the
 * carousel onto this map costs two new translation keys rather than seven.
 */
export const UPGRADE_STAGE_LABEL_KEYS: Record<UpgradeStage, string> = {
  live: "page-roadmap-release-status-prod",
  scheduled: "page-roadmap-release-status-soon",
  testnet: "page-roadmap-upgrade-status-phase-testnet",
  devnet: "page-roadmap-upgrade-status-phase-devnet",
  development: "page-roadmap-release-status-dev",
  planning: "page-roadmap-upgrade-status-phase-planning",
  research: "page-roadmap-upgrade-status-phase-research",
}

/**
 * Three tones rather than seven: colour carries how much the reader can rely
 * on the date, and the label carries the detail. The stage an upgrade is at
 * says nothing about confidence — a devnet, a testnet and an untouched
 * research idea all have a date that can still move.
 */
export const UPGRADE_STAGE_TONES: Record<UpgradeStage, UpgradeStageTone> = {
  live: "shipped",
  scheduled: "locked",
  testnet: "moving",
  devnet: "moving",
  development: "moving",
  planning: "moving",
  research: "moving",
}

export const isUpgradeShipped = (upgrade: UpgradeData) =>
  getUpgradeStage(upgrade) === "live"

/**
 * The next milestone a reader has not seen yet, excluding mainnet activation.
 *
 * `live` is happening now rather than next, so a running devnet is not the
 * answer to "what comes next". Mainnet is excluded because both surfaces state
 * the target separately, and repeating it as the next milestone is noise.
 */
export const getNextMilestoneBeforeMainnet = (
  upgrade: UpgradeData
): Milestone | null =>
  upgrade.milestones.find(
    (milestone) =>
      milestone.status !== "complete" &&
      milestone.status !== "live" &&
      milestone.kind !== "mainnet"
  ) ?? null

/**
 * When the fork actually activated, for the carousel's grace period. Only
 * day-precise dates qualify: a quarter cannot be turned into a `Date` without
 * inventing precision, and an unshipped fork has no activation date anyway.
 */
export const getMainnetActivationDate = (upgrade: UpgradeData): Date | null => {
  const mainnet = upgrade.milestones.find(
    (milestone) => milestone.kind === "mainnet"
  )
  if (mainnet?.status !== "complete") return null
  const { year, month, day } = mainnet.when
  if (!month || !day) return null
  return new Date(Date.UTC(year, month - 1, day))
}

/** `t` from either `getTranslations` (server) or `useTranslations` (client). */
type TranslateFn = (
  key: string,
  values?: Record<string, string | number>
) => string

/**
 * A {@link PartialDate} at whatever precision it carries, with quarters going
 * through a translated pattern because `Intl` has no quarter skeleton.
 *
 * Wrapped here so both surfaces build the quarter formatter the same way —
 * ungrouped, because a year is a label and `2,026` is not a year.
 */
export const formatUpgradeDate = (
  when: PartialDate,
  locale: string,
  t: TranslateFn
) => {
  const number = numberFormat(locale, { useGrouping: false })
  return formatPartialDate(when, locale, (quarter, year) =>
    t("page-roadmap-upgrade-quarter", {
      quarter: number.format(quarter),
      year: number.format(year),
    })
  )
}

const MILESTONE_LABEL_KEYS: Record<Milestone["kind"], string> = {
  devnet: "page-roadmap-upgrade-milestone-devnet",
  testnet: "page-roadmap-upgrade-milestone-testnet",
  mainnet: "page-roadmap-upgrade-milestone-mainnet",
}

/** Milestones carry no English name, so the label is built from `kind`. */
export const formatMilestoneLabel = (milestone: Milestone, t: TranslateFn) =>
  t(MILESTONE_LABEL_KEYS[milestone.kind], {
    version: milestone.kind === "devnet" ? milestone.version : "",
    network: milestone.kind === "testnet" ? milestone.network : "",
  })
