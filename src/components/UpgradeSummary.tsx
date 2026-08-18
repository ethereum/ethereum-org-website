import { getLocale, getTranslations } from "next-intl/server"

import InlineLink from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { formatPartialDate } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { type Milestone, type MilestoneKind, upgrades } from "@/data/upgrades"

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
  const running = upgrade.milestones.find((m) => m.status === "live")
  const stageLabelKey = running && STAGE_LABEL_KEYS[running.kind]

  // `live` is happening now rather than next, so a running devnet is not the
  // answer to "what comes next". The mainnet row already states the target, so
  // repeating it here as the next milestone would be noise.
  const next = upgrade.milestones.find(
    (m) =>
      m.status !== "complete" && m.status !== "live" && m.kind !== "mainnet"
  )

  return (
    <aside className="flow w-full rounded-base bg-tint-accent-a p-6">
      <h2 className="text-sm font-normal uppercase">
        {t("page-roadmap-upgrade-status-heading")}
      </h2>

      {stageLabelKey && <Tag status="tag">{t(stageLabelKey)}</Tag>}

      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        {target.when && (
          <>
            <dt className="text-body-medium">
              {t("page-roadmap-upgrade-status-target")}
            </dt>
            <dd>
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
          </>
        )}

        {next && (
          <>
            <dt className="text-body-medium">
              {t("page-roadmap-upgrade-status-next")}
            </dt>
            <dd>
              {milestoneLabel(next)}
              {", "}
              {formatPartialDate(next.when, locale, formatQuarter)}
            </dd>
          </>
        )}
      </dl>

      <p>
        <InlineLink href={upgrade.sourceUrl}>
          {t("page-roadmap-upgrade-status-track")}
        </InlineLink>
      </p>
    </aside>
  )
}

export default UpgradeSummary
