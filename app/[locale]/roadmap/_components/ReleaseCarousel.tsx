"use client"

import { useEffect, useState } from "react"

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

import { releasesData } from "@/data/roadmap/releases"

const findLatestReleaseIndex = () => {
  const today = new Date()
  const twoMonthsFromNow = new Date()
  twoMonthsFromNow.setMonth(today.getMonth() + 2)

  // First try to find a release within the next 2 months
  const upcomingReleaseIndex = releasesData.findIndex((release) => {
    const releaseDate = new Date(release.releaseDate)
    return releaseDate > today && releaseDate <= twoMonthsFromNow
  })

  // If no upcoming release found, find the most recent release up to today
  if (upcomingReleaseIndex === -1) {
    const pastReleases = releasesData.filter(
      (release) => new Date(release.releaseDate) <= today
    )
    if (pastReleases.length > 0) {
      const mostRecentRelease = pastReleases[pastReleases.length - 1]
      return releasesData.findIndex(
        (release) => release.releaseDate === mostRecentRelease.releaseDate
      )
    }
  }

  return upcomingReleaseIndex
}

const ReleaseCarousel = () => {
  const todayDate = new Date()
  const twoMonthsFromNow = new Date()
  twoMonthsFromNow.setMonth(todayDate.getMonth() + 2)

  const [api1, setApi1] = useState<CarouselApi>()
  const [api2, setApi2] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(() =>
    findLatestReleaseIndex()
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
    <div className="w-full max-w-[100vw] overflow-hidden">
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
                loop: false,
                startIndex: findLatestReleaseIndex(),
              }}
            >
              <CarouselContent>
                {releasesData.map((release, index) => {
                  const releaseDate = new Date(release.releaseDate)
                  const nextRelease =
                    releaseDate > todayDate && releaseDate <= twoMonthsFromNow
                  const labelType =
                    releaseDate < todayDate
                      ? 1
                      : releaseDate < twoMonthsFromNow
                        ? 2
                        : 3

                  return (
                    <CarouselItem
                      key={release.releaseName}
                      className="w-full md:basis-1/3"
                    >
                      <div className="flex w-full flex-col items-center justify-center gap-3">
                        <div className="mb-3 !h-6">
                          {labelType === 1 && (
                            <div
                              className={cn(
                                "w-fit rounded-lg bg-primary-low-contrast px-2 py-1",
                                currentIndex !== index && "hidden"
                              )}
                            >
                              <p className="text-sm font-bold">In production</p>
                            </div>
                          )}
                          {labelType === 2 && (
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
                          {labelType === 3 && (
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
                        <div className="flex w-full items-center justify-center text-center">
                          <div
                            className={cn(
                              "flex h-1 flex-1",
                              index !== 0
                                ? nextRelease
                                  ? "bg-gradient-to-r from-primary to-primary-low-contrast"
                                  : releaseDate.getTime() < todayDate.getTime()
                                    ? "bg-primary"
                                    : "bg-primary-low-contrast"
                                : "bg-transparent"
                            )}
                          />
                          <div
                            className={cn(
                              "h-7 w-7 rounded-full",
                              releaseDate.getTime() < todayDate.getTime()
                                ? "bg-primary"
                                : "bg-primary-low-contrast",
                              nextRelease &&
                                "border-2 border-primary bg-background"
                            )}
                          />
                          <div
                            className={cn(
                              "flex h-1 flex-1",
                              index !== releasesData.length - 1
                                ? index < findLatestReleaseIndex()
                                  ? "bg-primary"
                                  : "bg-primary-low-contrast"
                                : "bg-transparent"
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                          <p className="text-md font-bold">
                            {release.releaseName}
                          </p>
                          <p className="font-mono text-sm text-body-medium">
                            {formatDate(release.releaseDate)}
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
                loop: false,
                startIndex: findLatestReleaseIndex(),
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
                          <p className="text-md">
                            {formatDate(release.releaseDate)}
                          </p>
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
