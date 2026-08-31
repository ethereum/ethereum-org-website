import { getLocale, getTranslations } from "next-intl/server"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import InlineLink from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import {
  formatMilestoneLabel,
  formatUpgradeDate,
  getNextMilestoneBeforeMainnet,
  getUpgradeStage,
  UPGRADE_STAGE_LABEL_KEYS,
} from "@/lib/utils/upgrades"

import { upgrades } from "@/data/upgrades"

export type UpgradeSummaryProps = {
  /** Key into `src/data/upgrades`, e.g. "glamsterdam". */
  slug: string
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

  const target = upgrade.mainnetTarget
  const mainnet = upgrade.milestones.find(
    (milestone) => milestone.kind === "mainnet"
  )
  if (mainnet?.status === "complete") return null

  const targetLabelKey = "page-roadmap-upgrade-status-target"

  // Shared with the `/roadmap` release carousel so the same upgrade cannot be
  // described two ways on two pages.
  const stageLabelKey = UPGRADE_STAGE_LABEL_KEYS[getUpgradeStage(upgrade)]
  const next = getNextMilestoneBeforeMainnet(upgrade)

  return (
    <Alert variant="info" className="items-start p-6 md:p-8">
      <AlertContent className="gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AlertTitle asChild className="text-2xl font-black">
            <h2>{t("page-roadmap-upgrade-status-heading")}</h2>
          </AlertTitle>
          <Tag size="small" status="tag">
            {t(stageLabelKey)}
          </Tag>
        </div>

        <AlertDescription className="text-base">
          <dl className="grid gap-4">
            {target.when && (
              <div className="grid gap-1">
                <dt className="text-xs font-bold text-body-medium uppercase">
                  {t(targetLabelKey)}
                </dt>
                <dd className="text-base">
                  {formatUpgradeDate(target.when, locale, t)}
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
                  {formatMilestoneLabel(next, t)}
                  {", "}
                  {formatUpgradeDate(next.when, locale, t)}
                </dd>
              </div>
            )}
          </dl>

          {upgrade.sourceUrl && (
            <div className="mt-4">
              <p className="m-0">
                <InlineLink href={upgrade.sourceUrl} className="text-sm">
                  {t("page-roadmap-upgrade-status-track")}
                </InlineLink>
              </p>
            </div>
          )}
        </AlertDescription>
      </AlertContent>
    </Alert>
  )
}

export default UpgradeSummary
