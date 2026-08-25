import { getLocale, getTranslations } from "next-intl/server"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import InlineLink from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { formatPartialDate } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import {
  type Milestone,
  type MilestoneKind,
  upgrades,
  type UpgradeStatus,
} from "@/data/upgrades"

export type UpgradeSummaryProps = {
  /** Key into `src/data/upgrades`, e.g. "glamsterdam". */
  slug: string
}

/**
 * The stage an upgrade has reached, read from whichever milestone is running
 * rather than from a field: `status` only distinguishes live from upcoming, and
 * "testing on devnets" is the more useful thing to tell a reader.
 *
 * A kind missing from this map renders no tag rather than a raw key — every
 * label is a translation task across all locales, so add one when an upgrade
 * actually reaches that stage.
 */
const STAGE_LABEL_KEYS: Partial<Record<MilestoneKind, string>> = {
  devnet: "page-roadmap-upgrade-status-phase-devnet",
}

/**
 * Fallback for an upgrade with nothing running yet — Hegotá has only projected
 * milestones, so there is no stage to read and its `status` is all we have.
 */
const STATUS_LABEL_KEYS: Partial<Record<UpgradeStatus, string>> = {
  planning: "page-roadmap-upgrade-status-phase-planning",
}

const MILESTONE_LABEL_KEYS: Record<MilestoneKind, string> = {
  devnet: "page-roadmap-upgrade-milestone-devnet",
  testnet: "page-roadmap-upgrade-milestone-testnet",
  mainnet: "page-roadmap-upgrade-milestone-mainnet",
}

/**
 * The volatile-fact block at the top of an upgrade page: stage, mainnet target
 * and next milestone.
 *
 * Every value comes from `src/data/upgrades` — nothing here is hardcoded, so
 * refreshing the page's facts never means editing prose. Confidence is carried
 * by the data and rendered explicitly: an unconfirmed target gets its own
 * qualifying clause rather than a softer word.
 *
 * Not to be confused with `UpgradeStatus`, the "when shipping" aside used on
 * the Beacon Chain and Merge pages.
 */
const UpgradeSummary = async ({ slug }: UpgradeSummaryProps) => {
  const upgrade = upgrades[slug]
  if (!upgrade) return null

  const t = await getTranslations("page-roadmap")
  const locale = await getLocale()

  // A year is a label, not a quantity — grouping would render it "2,026".
  const number = numberFormat(locale, { useGrouping: false })
  const formatQuarter = (quarter: number, year: number) =>
    t("page-roadmap-upgrade-quarter", {
      quarter: number.format(quarter),
      year: number.format(year),
    })

  /** Milestones carry no English name, so the label is built from `kind`. */
  const milestoneLabel = (milestone: Milestone) =>
    t(MILESTONE_LABEL_KEYS[milestone.kind], {
      version: milestone.kind === "devnet" ? milestone.version : "",
      network: milestone.kind === "testnet" ? milestone.network : "",
    })

  const target = upgrade.mainnetTarget
  const mainnet = upgrade.milestones.find(
    (milestone) => milestone.kind === "mainnet"
  )
  const targetLabelKey =
    mainnet?.status === "complete"
      ? "page-roadmap-upgrade-status-activated"
      : "page-roadmap-upgrade-status-target"
  const running = upgrade.milestones.find((m) => m.status === "live")
  const stageLabelKey = running
    ? STAGE_LABEL_KEYS[running.kind]
    : STATUS_LABEL_KEYS[upgrade.status]

  // `live` is happening now rather than next, so a running devnet is not the
  // answer to "what comes next". The mainnet row already states the target, so
  // repeating it here as the next milestone would be noise.
  const next = upgrade.milestones.find(
    (m) =>
      m.status !== "complete" && m.status !== "live" && m.kind !== "mainnet"
  )

  return (
    <Alert variant="info" className="items-start p-6 md:p-8">
      <AlertContent className="gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AlertTitle asChild className="text-2xl font-black">
            <h2>{t("page-roadmap-upgrade-status-heading")}</h2>
          </AlertTitle>
          {stageLabelKey && (
            <Tag size="small" status="tag">
              {t(stageLabelKey)}
            </Tag>
          )}
        </div>

        <AlertDescription className="text-base">
          <dl className="grid gap-4">
            {target.when && (
              <div className="grid gap-1">
                <dt className="text-xs font-bold text-body-medium uppercase">
                  {t(targetLabelKey)}
                </dt>
                <dd className="text-base">
                  {formatPartialDate(target.when, locale, formatQuarter)}
                  {/* The qualifier is its own clause, not an adjective, so it cannot
                      be lost to word order in translation or read as settled. */}
                  {!target.confirmed && (
                    <span className="text-body-medium">
                      {" · "}
                      {t("page-roadmap-upgrade-status-not-confirmed")}
                    </span>
                  )}
                </dd>
              </div>
            )}

            {next && (
              <div className="grid gap-1">
                <dt className="text-xs font-bold text-body-medium uppercase">
                  {t("page-roadmap-upgrade-status-next")}
                </dt>
                <dd className="text-base">
                  {milestoneLabel(next)}
                  {", "}
                  {formatPartialDate(next.when, locale, formatQuarter)}
                </dd>
              </div>
            )}
          </dl>

          <p className="m-0">
            <InlineLink href={upgrade.sourceUrl}>
              {t("page-roadmap-upgrade-status-track")}
            </InlineLink>
          </p>
        </AlertDescription>
      </AlertContent>
    </Alert>
  )
}

export default UpgradeSummary
