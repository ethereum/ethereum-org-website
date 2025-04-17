"use client"

import { useRef, useState } from "react"
import { SwiperRef } from "swiper/react"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { releasesData } from "@/data/roadmap/releases"

const ReleaseCarousel = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(releasesData.length - 2)

  const PreviousButton = () => {
    return (
      <Button
        variant={"outline"}
        size="xs"
        className="rounded-full"
        onClick={() => {
          swiperRef.current?.swiper.slidePrev()
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
        className="rounded-full"
        onClick={() => {
          swiperRef.current?.swiper.slideNext()
        }}
        disabled={activeSlide === releasesData.length - 1}
      >
        <ChevronNext className="h-8 w-8" />
      </Button>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl bg-background-highlight p-6">
      <div className="flex flex-row justify-between gap-2 lg:hidden">
        <PreviousButton />
        <NextButton />
      </div>
      <div className="flex max-w-full flex-row items-center justify-between gap-2">
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
                      <p className="mb-4 text-md">
                        {new Date(release.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="mb-3 text-xl font-bold">Main features</p>
                      {release.content}
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

{
  /* <div className="flex-1">
          <SwiperContainer>
            <Swiper
              navigation={{
                nextEl: ".ui-swiper-button-next-mobile, .ui-swiper-button-next-desktop",
                prevEl: ".ui-swiper-button-prev-mobile, .ui-swiper-button-prev-desktop"
              }}
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={0}
              width={null}
              initialSlide={releasesData.length - 2}
              ref={swiperRef}
              onSlideChange={(swiper) => {
                setActiveSlide(swiper.activeIndex)
              }}
              >
              {releasesData.map((release) => (
                <SwiperSlide key={release.releaseName}>
                  <div className="p-2 flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:max-w-[351px] rounded-2xl">
                      <Image src={release.image} alt={release.releaseName} className="rounded-2xl object-cover h-[240px] md:h-[266px] lg:h-[551px]" />
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-6xl font-bold">{release.releaseName}</h2>
                      <p className="text-sm text-gray-500">{release.releaseDate}</p>
                      <p className="text-sm text-gray-500">{release.releaseDescription}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
          </SwiperContainer>
        </div> */
}
