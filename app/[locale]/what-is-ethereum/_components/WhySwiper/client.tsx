"use client"

import type { ChildOnlyProp } from "@/lib/types"

import Translation from "@/components/Translation"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useTranslation from "@/hooks/useTranslation"

const H3 = (props: ChildOnlyProp) => (
  <h3 className="text-xl font-semibold leading-xs md:text-2xl" {...props} />
)

const WhySwiper = () => {
  const { t } = useTranslation("page-what-is-ethereum")

  const slides = [
    { eventName: "Payments slide" },
    { eventName: "Time of crisis slide" },
    { eventName: "Creators slide" },
    { eventName: "Gamers slide" },
  ]

  return (
    <SwiperContainer className="rounded border bg-background p-8">
      <Swiper
        onSlideChange={({ activeIndex }) => {
          trackCustomEvent({
            eventCategory: `What is Ethereum - Slider`,
            eventAction: `Clicked`,
            eventName: slides[activeIndex].eventName,
          })
        }}
      >
        <SwiperSlide>
          <div className="space-y-8">
            <H3>{t("page-what-is-ethereum-slide-1-title")}</H3>
            <div className="mb-4 flex flex-col gap-6">
              <p>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-1-desc-1" />
              </p>
              <p>{t("page-what-is-ethereum-slide-1-desc-2")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-8">
            <H3>{t("page-what-is-ethereum-slide-2-title")}</H3>
            <div className="mb-4 flex flex-col gap-6">
              <p>{t("page-what-is-ethereum-slide-2-desc-1")}</p>
              <p>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-2-desc-2" />
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-8">
            <H3>{t("page-what-is-ethereum-slide-3-title")}</H3>
            <div className="mb-4 flex flex-col gap-6">
              <p>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-3-desc-1" />
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-8">
            <H3>{t("page-what-is-ethereum-slide-4-title")}</H3>
            <div className="mb-4 flex flex-col gap-6">
              <p>{t("page-what-is-ethereum-slide-4-desc-1")}</p>
              <p>{t("page-what-is-ethereum-slide-4-desc-2")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default WhySwiper
