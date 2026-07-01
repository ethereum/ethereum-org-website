"use client"

// TODO: Fix RTL compatibility; currently forced to LTR flow
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocale } from "next-intl"

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
import { dateTimeFormat, formatDate } from "@/lib/utils/date"

import { getReleasesData, Release } from "@/data/roadmap/releases"

import { useTranslation } from "@/hooks/useTranslation"

const ReleaseCarousel = () => {
  const locale = useLocale()
  const { t } = useTranslation("page-roadmap")

  const releasesData = useMemo(() => getReleasesData(t), [t])

  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()

  const startIndex = useMemo(() => {
    const now = new Date()

    // Production: has a releaseDate in the past
    const productionReleases = releasesData.filter((release) => {
      if (!("releaseDate" in release) || !release.releaseDate) return false
      const releaseDate = new Date(release.releaseDate)
      return releaseDate <= now
    })

    // Case 1: A release with a future releaseDate exists — show it
    const hasUpcomingRelease = releasesData.some((release) => {
      if (!("releaseDate" in release) || !release.releaseDate) return false
      const releaseDate = new Date(release.releaseDate)
      return releaseDate > now
    })
    if (hasUpcomingRelease) return productionReleases.length

    // Case 2: Last production release is within 2-month grace period — still show it
    const lastProd = productionReleases[productionReleases.length - 1]
    if (lastProd && "releaseDate" in lastProd && lastProd.releaseDate) {
      const gracePeriodEnd = new Date(lastProd.releaseDate)
      gracePeriodEnd.setMonth(gracePeriodEnd.getMonth() + 2)
      if (now <= gracePeriodEnd) {
        return productionReleases.length - 1
      }
    }

    // Case 3: Grace period expired — show first planned/unscheduled release
    if (productionReleases.length < releasesData.length) {
      return productionReleases.length
    }

    // Fallback: last production release
    return productionReleases.length - 1
  }, [releasesData])

  const [currentIndex, setCurrentIndex] = useState(startIndex)

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

  const getStatus = useCallback((release: Release) => {
    if (!("releaseDate" in release) || !release.releaseDate) return "dev"
    if (new Date(release.releaseDate) <= new Date()) return "prod"
    return "soon"
  }, [])

  // Index of the "now" boundary on the timeline: the number of shipped
  // (production) releases. Everything before it reads as shipped (primary);
  // the connecting line into this node fades shipped -> upcoming.
  const boundaryIndex = useMemo(
    () =>
      releasesData.filter((release) => getStatus(release) === "prod").length,
    [releasesData, getStatus]
  )

  const getDisplayDate = (release: Release): string => {
    if ("displayDate" in release && release.displayDate)
      return release.displayDate

    if (!("releaseDate" in release || "plannedReleaseYear" in release))
      return ""

    if ("plannedReleaseYear" in release && release.plannedReleaseYear)
      return dateTimeFormat(locale, {
        year: "numeric",
      }).format(new Date(Number(release.plannedReleaseYear), 0, 1))

    if ("releaseDate" in release && release.releaseDate)
      return formatDate(release.releaseDate, locale, { timeZone: "UTC" })

    return ""
  }

  return (
    <div className="flex flex-col gap-6 rounded-base bg-background-highlight py-space">
      {/* First Carousel */}
      <Carousel
        setApi={setApi1}
        className="w-full px-16"
        opts={{
          align: "center",
          containScroll: false,
          direction: "ltr",
          loop: false,
          startIndex,
        }}
      >
        <CarouselContent>
          {releasesData.map((release, index) => {
            const status = getStatus(release)
            const displayDate = getDisplayDate(release)
            return (
              <CarouselItem
                key={release.releaseName}
                className="w-full md:basis-1/3"
              >
                <div className="flex w-full flex-col items-center justify-center gap-3">
                  <div className="mb-3 h-6!">
                    {status === "prod" && (
                      <div
                        className={cn(
                          "w-fit rounded-lg bg-primary-low-contrast px-2 py-1",
                          currentIndex !== index && "hidden"
                        )}
                      >
                        <p className="text-sm font-bold">
                          {t("page-roadmap-release-status-prod")}
                        </p>
                      </div>
                    )}
                    {status === "soon" && (
                      <div
                        className={cn(
                          "w-fit rounded-lg bg-warning-light px-2 py-1",
                          currentIndex !== index && "hidden"
                        )}
                      >
                        <p className="text-sm font-bold text-black">
                          {t("page-roadmap-release-status-soon")}
                        </p>
                      </div>
                    )}
                    {status === "dev" && (
                      <div
                        className={cn(
                          "w-fit rounded-lg bg-card-gradient-secondary-hover px-2 py-1",
                          currentIndex !== index && "hidden"
                        )}
                      >
                        <p className="text-sm font-bold">
                          {t("page-roadmap-release-status-dev")}
                        </p>
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
                              ? "bg-linear-to-r from-primary to-primary-low-contrast"
                              : "bg-primary-low-contrast"
                      )}
                    />
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full",
                        status === "prod"
                          ? "bg-primary"
                          : "bg-primary-low-contrast",
                        status === "soon" &&
                          "border-2 border-primary bg-background"
                      )}
                    />
                    <div
                      className={cn(
                        "h-1 flex-1",
                        index === releasesData.length - 1
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
                      {displayDate}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
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
          direction: "ltr",
          loop: false,
          startIndex,
        }}
      >
        <CarouselContent>
          {releasesData.map((release: Release) => (
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
                  <p className="text-body-medium">{getDisplayDate(release)}</p>
                </div>

                <h3 className="text-h4">
                  {t("page-roadmap-release-main-features")}
                </h3>

                {typeof release.content === "function"
                  ? release.content(t)
                  : release.content}

                <div className="flex flex-row gap-4" data-flow="cta">
                  {release.href && (
                    <ButtonLink href={release.href} className="w-full lg:w-fit">
                      {t("page-roadmap-release-learn-more")}
                    </ButtonLink>
                  )}
                  {release.forkcast_href && (
                    <ButtonLink
                      href={release.forkcast_href}
                      className="w-full lg:w-fit"
                      variant={release.href ? "outline" : "solid"}
                    >
                      {t("page-roadmap-release-forkcast")}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
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
