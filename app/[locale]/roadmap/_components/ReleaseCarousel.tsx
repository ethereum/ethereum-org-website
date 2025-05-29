"use client"

// TODO: Extract intl strings
// TODO: Fix RTL compatibility; currenly forced to LTR flow
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
import { formatDate } from "@/lib/utils/date"

import { Release, releasesData } from "@/data/roadmap/releases"

const ReleaseCarousel = () => {
  const locale = useLocale()

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

    // Upcoming: has a releaseDate, but is in the future
    const upcomingReleases = releasesData.filter((release) => {
      if (!("releaseDate" in release) || !release.releaseDate) return false
      const releaseDate = new Date(release.releaseDate)
      return releaseDate > now
    })

    // If upcoming releases exist, start index after production releases
    if (upcomingReleases.length > 0) return productionReleases.length

    // If no upcoming releases, start at the last production release
    return productionReleases.length - 1
  }, [])

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

  const getDisplayDate = (release: Release): string => {
    if (!("releaseDate" in release || "plannedReleaseYear" in release))
      return ""

    if ("plannedReleaseYear" in release && release.plannedReleaseYear)
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
      }).format(new Date(Number(release.plannedReleaseYear), 0, 1))

    if ("releaseDate" in release && release.releaseDate)
      return formatDate(release.releaseDate)

    return ""
  }

  return (
    <div className="w-full max-w-[100vw] overflow-hidden" dir="ltr">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6">
        <div className="w-full rounded-2xl bg-background-highlight py-6">
          <div className="flex flex-col gap-6">
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
                        <div className="mb-3 !h-6">
                          {status === "prod" && (
                            <div
                              className={cn(
                                "w-fit rounded-lg bg-primary-low-contrast px-2 py-1",
                                currentIndex !== index && "hidden"
                              )}
                            >
                              <p className="text-sm font-bold">In production</p>
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
                                Coming soon
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
                                In development
                              </p>
                            </div>
                          )}
                        </div>
                        {/* Line-circle-line decoration —•— */}
                        <div className="flex w-full items-center justify-center text-center">
                          <div
                            className={cn(
                              "flex h-1 flex-1",
                              index !== 0
                                ? status === "soon"
                                  ? "bg-gradient-to-r from-primary to-primary-low-contrast"
                                  : status === "prod"
                                    ? "bg-primary"
                                    : "bg-primary-low-contrast"
                                : "bg-transparent"
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
                              "flex h-1 flex-1",
                              index < startIndex
                                ? "bg-primary"
                                : "bg-primary-low-contrast",
                              index === releasesData.length - 1 &&
                                "bg-transparent"
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                          <p className="text-md font-bold">
                            {release.releaseName}
                          </p>
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
                {releasesData.map((release) => (
                  <CarouselItem
                    key={release.releaseName}
                    className="w-full pl-4"
                  >
                    <div className="flex w-full flex-col gap-6 lg:flex-row">
                      <div className="w-full flex-1 rounded-2xl">
                        <Image
                          src={release.image}
                          alt={release.releaseName}
                          className="h-[240px] rounded-2xl object-cover md:h-[266px] lg:h-[551px]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-8">
                        <div>
                          <h2 className="text-4xl font-bold lg:text-6xl">
                            {release.releaseName}
                          </h2>
                          <p className="text-md">{getDisplayDate(release)}</p>
                        </div>

                        <div>
                          <p className="mb-3 text-xl font-bold">
                            Main features
                          </p>
                          <div className="flex flex-col gap-4">
                            {release.content}
                          </div>
                        </div>
                        <ButtonLink
                          href={release.href}
                          className="w-full lg:w-fit"
                        >
                          Learn more
                        </ButtonLink>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden lg:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReleaseCarousel
