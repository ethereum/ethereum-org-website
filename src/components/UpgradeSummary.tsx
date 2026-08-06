import { getLocale, getTranslations } from "next-intl/server"

import InlineLink from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { formatPartialDate } from "@/lib/utils/date"

import { type UpgradePhase, upgrades } from "@/data/upgrades"

export type UpgradeSummaryProps = {
  /** Key into `src/data/upgrades`, e.g. "glamsterdam". */
  slug: string
}

/**
 * Only phases an upgrade has actually reached get a label, because every label
 * is a translation task across all locales. A phase missing from this map
 * renders no tag rather than a raw key — add the key when an upgrade needs it.
 */
const PHASE_LABEL_KEYS: Partial<Record<UpgradePhase, string>> = {
  devnet: "page-roadmap-upgrade-status-phase-devnet",
}

/**
 * The volatile-fact block at the top of an upgrade page: phase, mainnet target,
 * next milestone, and when the facts were last checked.
 *
 * Every value comes from `src/data/upgrades` — nothing here is hardcoded, so
 * refreshing the page's facts never means editing prose. Confidence is carried
 * by the data and rendered explicitly: an unconfirmed target is a different
 * sentence from a confirmed one, never the same sentence with a softer word.
 *
 * Not to be confused with `UpgradeStatus`, the "when shipping" aside used on
 * the Beacon Chain and Merge pages.
 */
const UpgradeSummary = async ({ slug }: UpgradeSummaryProps) => {
  const upgrade = upgrades[slug]
  if (!upgrade) return null

  const t = await getTranslations("page-roadmap")
  const locale = await getLocale()

  const phaseLabelKey = PHASE_LABEL_KEYS[upgrade.phase]
  const target = upgrade["mainnet-target"]
  // `complete` milestones are behind us; `live` and everything weaker is not.
  const next = upgrade.milestones.find((m) => m.status !== "complete")

  return (
    <aside className="flow w-full rounded-base bg-tint-accent-a p-6">
      <h2 className="text-sm font-normal uppercase">
        {t("page-roadmap-upgrade-status-heading")}
      </h2>

      {phaseLabelKey && (
        <Tag status={upgrade.phase === "activated" ? "success" : "tag"}>
          {t(phaseLabelKey)}
        </Tag>
      )}

      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        <dt className="text-body-medium">
          {t("page-roadmap-upgrade-status-target")}
        </dt>
        <dd>
          {formatPartialDate(target.when, locale)}
          {/* The qualifier is its own clause, not an adjective, so it cannot
              be lost to word order in translation or read as settled. */}
          {!target.confirmed && (
            <span className="text-body-medium">
              {" · "}
              {t("page-roadmap-upgrade-status-not-confirmed")}
            </span>
          )}
        </dd>

        {next && (
          <>
            <dt className="text-body-medium">
              {t("page-roadmap-upgrade-status-next")}
            </dt>
            <dd>
              {/* Milestone names are proper nouns, rendered untranslated. */}
              {next.name}
              {", "}
              {formatPartialDate(next.when, locale)}
            </dd>
          </>
        )}

        <dt className="text-body-medium">
          {t("page-roadmap-upgrade-status-verified")}
        </dt>
        <dd>
          <time dateTime={upgrade["facts-verified"]}>
            {formatPartialDate(
              toPartialDate(upgrade["facts-verified"]),
              locale
            )}
          </time>
        </dd>
      </dl>

      <p>
        <InlineLink href={upgrade["source-url"]}>
          {t("page-roadmap-upgrade-status-track")}
        </InlineLink>
      </p>
    </aside>
  )
}

/** Split an ISO `YYYY-MM-DD` stamp into the shape `formatPartialDate` takes. */
const toPartialDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number)
  return { year, month, day }
}

export default UpgradeSummary
