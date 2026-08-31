"use client"

import { useEffect, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils/cn"
import {
  formatMilestoneLabel,
  formatUpgradeDate,
  getMainnetActivationDate,
  getNextMilestoneBeforeMainnet,
  getUpgradeStage,
  UPGRADE_STAGE_LABEL_KEYS,
  UPGRADE_STAGE_TONES,
  type UpgradeStageTone,
} from "@/lib/utils/upgrades"

import { getReleasesData } from "@/data/roadmap/releases"
import { upgrades } from "@/data/upgrades"

/**
 * Colour says how much the date can be relied on, not which stage the upgrade
 * is at — the label already carries that. Three tones, so a reader can read
 * confidence off the timeline without reading a word.
 */
const TONE_TAG_CLASSES: Record<UpgradeStageTone, string> = {
  shipped: "bg-success-light dark:bg-success-dark",
  locked: "bg-warning-light dark:bg-warning-dark",
  moving: "bg-primary-low-contrast",
}

const TONE_DOT_CLASSES: Record<UpgradeStageTone, string> = {
  shipped: "bg-primary",
  locked: "border-2 border-primary bg-background",
  moving: "bg-primary-low-contrast",
}

const ReleaseCarousel = () => {
  const locale = useLocale()
  const t = useTranslations("page-roadmap")

  /**
   * Editorial content from `releases.tsx`, volatile facts from the upgrade
   * store. A slug with no store entry keeps its prose and simply shows no
   * facts, rather than taking the page down;
   * `tests/unit/roadmap/release-carousel.spec.ts` is what stops that from
   * shipping unnoticed.
   */
  const releases = useMemo(
    () =>
      getReleasesData(t).map((release) => {
        const upgrade = upgrades[release.upgradeSlug]
        if (!upgrade) return { release, upgrade: null }

        const stage = getUpgradeStage(upgrade)
        const next = getNextMilestoneBeforeMainnet(upgrade)

        return {
          release,
          upgrade,
          stage,
          tone: UPGRADE_STAGE_TONES[stage],
          stageLabel: t(UPGRADE_STAGE_LABEL_KEYS[stage]),
          targetDate: upgrade.mainnetTarget.when
            ? formatUpgradeDate(upgrade.mainnetTarget.when, locale, t)
            : null,
          targetConfirmed: upgrade.mainnetTarget.confirmed,
          nextMilestone: next
            ? `${formatMilestoneLabel(next, t)}, ${formatUpgradeDate(next.when, locale, t)}`
            : null,
          eipCount: upgrade.eips.length,
        }
      }),
    [t, locale]
  )

  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()

  /**
   * Which release to open on. Ported from a hand-maintained-date heuristic onto
   * the store, so "shipped" now means Forkcast recorded the mainnet activation
   * rather than a date in `releases.tsx` having gone past.
   */
  const startIndex = useMemo(() => {
    const shippedCount = releases.filter(({ stage }) => stage === "live").length

    // A fork whose mainnet date can no longer move is the most useful thing to
    // land on, however far off it is.
    if (releases.some(({ stage }) => stage === "scheduled")) return shippedCount

    // Otherwise keep the freshly activated fork in view for two months, so the
    // page does not skip past an upgrade the week it ships.
    const lastShipped = releases[shippedCount - 1]
    const activatedAt =
      lastShipped?.upgrade && getMainnetActivationDate(lastShipped.upgrade)
    if (activatedAt) {
      const graceEnd = new Date(activatedAt)
      graceEnd.setMonth(graceEnd.getMonth() + 2)
      if (new Date() <= graceEnd) return shippedCount - 1
    }

    return shippedCount < releases.length ? shippedCount : shippedCount - 1
  }, [releases])

  const [currentIndex, setCurrentIndex] = useState(startIndex)

  // Index of the "now" boundary on the timeline: the number of shipped
  // releases. Everything before it reads as shipped (primary); the connecting
  // line into this node fades shipped -> upcoming.
  const boundaryIndex = useMemo(
    () => releases.filter(({ stage }) => stage === "live").length,
    [releases]
  )

  useEffect(() => {
    if (!api1 || !api2) {
      return
    }

    api1.on("select", () => {
      setCurrentIndex(api1.selectedScrollSnap())
      api2.scrollTo(api1.selectedScrollSnap())
    })

    api2.on("select", () => {
      setCurrentIndex(api2.selectedScrollSnap())
      api1.scrollTo(api2.selectedScrollSnap())
    })
  }, [api1, api2])

  return (
    <div className="flex flex-col gap-6 rounded-base bg-background-highlight py-space">
      {/* First Carousel */}
      <Carousel
        setApi={setApi1}
        className="w-full px-16"
        opts={{
          align: "center",
          containScroll: false,
          loop: false,
          startIndex,
        }}
      >
        <CarouselContent>
          {releases.map(({ release, tone, stageLabel, targetDate }, index) => (
            <CarouselItem
              key={release.releaseName}
              className="w-full md:basis-1/3"
            >
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <div className="mb-3 h-6!">
                  {stageLabel && (
                    <div
                      className={cn(
                        "w-fit rounded-lg px-2 py-1",
                        tone && TONE_TAG_CLASSES[tone],
                        currentIndex !== index && "hidden"
                      )}
                    >
                      <p className="text-sm font-bold">{stageLabel}</p>
                    </div>
                  )}
                </div>
                {/* Line-circle-line decoration —•— */}
                <div className="flex w-full items-center justify-center text-center">
                  <div
                    className={cn(
                      "h-1 flex-1",
                      index === 0
                        ? "bg-transparent"
                        : index < boundaryIndex
                          ? "bg-primary"
                          : index === boundaryIndex
                            ? "bg-linear-to-r from-primary to-primary-low-contrast rtl:bg-linear-to-l"
                            : "bg-primary-low-contrast"
                    )}
                  />
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full bg-primary-low-contrast",
                      tone && TONE_DOT_CLASSES[tone]
                    )}
                  />
                  <div
                    className={cn(
                      "h-1 flex-1",
                      index === releases.length - 1
                        ? "bg-transparent"
                        : index < boundaryIndex
                          ? "bg-primary"
                          : "bg-primary-low-contrast"
                    )}
                  />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-md font-bold">{release.releaseName}</p>
                  <p className="font-mono text-sm text-body-medium">
                    {targetDate}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="lg:hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>

      {/* Second Carousel */}
      <Carousel
        setApi={setApi2}
        className="w-full px-4 lg:px-16"
        opts={{
          align: "center",
          containScroll: false,
          loop: false,
          startIndex,
        }}
      >
        <CarouselContent>
          {releases.map(
            ({
              release,
              upgrade,
              stage,
              targetDate,
              targetConfirmed,
              nextMilestone,
              eipCount,
            }) => (
              <CarouselItem
                key={release.releaseName}
                className="flex flex-col gap-6 ps-4 lg:flex-row"
              >
                <div className="flex-1 rounded-base">
                  <Image
                    src={release.image}
                    alt={release.releaseName}
                    className="h-full rounded-base object-cover"
                    sizes="(max-width: 992px) 100vw, (max-width: 1536px) 50vw, 768px"
                  />
                </div>
                <div className="flow flex-1">
                  <div>
                    <h2 className="text-h1">{release.releaseName}</h2>

                    <dl className="mt-2 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {targetDate && (
                        <div className="grid gap-1">
                          <dt className="text-xs font-bold text-body-medium uppercase">
                            {t(
                              stage === "live"
                                ? "page-roadmap-upgrade-status-activated"
                                : "page-roadmap-upgrade-status-target"
                            )}
                          </dt>
                          <dd className="text-base">
                            {targetDate}
                            {/* Its own clause, not an adjective, so it cannot be
                                lost to word order in translation or read as
                                settled. */}
                            {!targetConfirmed && (
                              <span className="text-body-medium">
                                {" · "}
                                {t("page-roadmap-upgrade-status-not-confirmed")}
                              </span>
                            )}
                          </dd>
                        </div>
                      )}

                      {nextMilestone && (
                        <div className="grid gap-1">
                          <dt className="text-xs font-bold text-body-medium uppercase">
                            {t("page-roadmap-upgrade-status-next")}
                          </dt>
                          <dd className="text-base">{nextMilestone}</dd>
                        </div>
                      )}
                    </dl>

                    {/* Scale of the upgrade, in plain words rather than an EIP
                        list — the upgrade page owns the per-EIP detail. */}
                    {eipCount ? (
                      <p className="mt-3 text-sm text-body-medium">
                        {t(
                          stage === "live"
                            ? "page-roadmap-upgrade-eips-included"
                            : "page-roadmap-upgrade-eips-scheduled",
                          { count: eipCount }
                        )}
                      </p>
                    ) : null}
                  </div>

                  <h3 className="text-h4">
                    {t("page-roadmap-release-main-features")}
                  </h3>

                  {typeof release.content === "function"
                    ? release.content(t)
                    : release.content}

                  <div className="flex flex-row gap-4" data-flow="cta">
                    {release.href && (
                      <ButtonLink
                        href={release.href}
                        className="w-full lg:w-fit"
                      >
                        {t("page-roadmap-release-learn-more")}
                      </ButtonLink>
                    )}
                    {upgrade?.sourceUrl && (
                      <ButtonLink
                        href={upgrade.sourceUrl}
                        className="w-full lg:w-fit"
                        variant={release.href ? "outline" : "solid"}
                      >
                        {t("page-roadmap-release-forkcast")}
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="max-lg:hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}

export default ReleaseCarousel
