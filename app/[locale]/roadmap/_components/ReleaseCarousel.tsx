"use client"

import { useRef, useState } from "react"
import { SwiperRef } from "swiper/react"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

import { releasesData } from "@/data/roadmap/releases"

const formatReleaseDate = (date: string) => {
  if (/^\d{4}$/.test(date)) {
    return date
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const ReleaseCarousel = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const swiperRef2 = useRef<SwiperRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(releasesData.length - 2)
  const pastReleases = releasesData.filter(
    (release) => release.releaseDate < new Date().toISOString().split("T")[0]
  )

  const PreviousButton = () => {
    return (
      <Button
        variant={"outline"}
        size="xs"
        className="h-8 w-8 rounded-full"
        onClick={() => {
          swiperRef.current?.swiper.slidePrev()
          swiperRef2.current?.swiper.slidePrev()
        }}
        disabled={activeSlide === 0}
      >
        <ChevronPrev className="h-8 w-8" />
      </Button>
    )
  }

  const NextButton = () => {
    return (
      <Button
        variant={"outline"}
        size="xs"
        className="h-8 w-8 rounded-full"
        onClick={() => {
          swiperRef.current?.swiper.slideNext()
          swiperRef2.current?.swiper.slideNext()
        }}
        disabled={activeSlide === releasesData.length - 1}
      >
        <ChevronNext className="h-8 w-8" />
      </Button>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl bg-background-highlight p-6">
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <div className="flex lg:hidden">
          <PreviousButton />
        </div>
        <SwiperContainer className="w-full overflow-hidden" ref={containerRef2}>
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            ref={swiperRef2}
            initialSlide={activeSlide}
            centeredSlides={true}
          >
            {releasesData.map((release, index) => (
              <SwiperSlide
                key={release.releaseName}
                className="!w-1/3 items-center justify-center text-center"
              >
                <div className="h-6">
                  {pastReleases[pastReleases.length - 1].releaseDate ===
                    release.releaseDate && (
                    <div className="font-mono text-sm text-body-medium">
                      We are here
                    </div>
                  )}
                </div>
                <div className="flex w-full items-center justify-center text-center">
                  <div
                    className={cn(
                      "flex flex-1 border-2",
                      index !== 0 ? "border-primary" : "border-transparent"
                    )}
                  />
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full",
                      release.releaseDate <
                        new Date().toISOString().split("T")[0]
                        ? "bg-primary"
                        : "bg-primary-low-contrast"
                    )}
                  />
                  <div
                    className={cn(
                      "flex flex-1 border-2",
                      index !== releasesData.length - 1
                        ? "border-primary"
                        : "border-transparent"
                    )}
                  />
                </div>
                <p className="text-md font-bold">{release.releaseName}</p>
                <p className="font-mono text-sm text-body-medium">
                  {formatReleaseDate(release.releaseDate)}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <div className="flex lg:hidden">
          <NextButton />
        </div>
      </div>
      <div className="flex max-w-full flex-row items-center justify-between gap-8">
        <div className="hidden lg:flex">
          <PreviousButton />
        </div>
        <SwiperContainer className="w-full overflow-hidden" ref={containerRef}>
          <Swiper
            slidesPerView="auto"
            ref={swiperRef}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex)
            }}
            initialSlide={activeSlide}
          >
            {releasesData.map((release) => (
              <SwiperSlide key={release.releaseName}>
                <div className="flex w-full flex-col gap-6 lg:flex-row">
                  <div className="w-full rounded-2xl lg:max-w-[351px]">
                    <Image
                      src={release.image}
                      alt={release.releaseName}
                      className="h-[240px] rounded-2xl object-cover md:h-[266px] lg:h-[551px]"
                    />
                  </div>
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="text-4xl font-bold lg:text-6xl">
                        {release.releaseName}
                      </h2>
                      <p className="text-md">
                        {formatReleaseDate(release.releaseDate)}
                      </p>
                    </div>

                    <div>
                      <p className="mb-3 text-xl font-bold">Main features</p>
                      <div className="flex flex-col gap-4">
                        {release.content.map((item) => item)}
                      </div>
                    </div>
                    <ButtonLink href={release.href} className="w-full lg:w-fit">
                      Learn more
                    </ButtonLink>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <div className="hidden lg:flex">
          <NextButton />
        </div>
      </div>
    </div>
  )
}

export default ReleaseCarousel
