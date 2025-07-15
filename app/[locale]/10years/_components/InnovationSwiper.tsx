"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { innovationCards } from "./data"

import { useTranslation } from "@/hooks/useTranslation"

export default function InnovationSwiper() {
  const { t } = useTranslation("page-10-year-anniversary")

  return (
    <div className="w-[100%]">
      <SwiperContainer className="mx-auto w-full max-w-[550px] xl:max-w-[700px]">
        <Swiper
          className="mx-auto w-full max-w-[550px] xl:max-w-[700px]"
          spaceBetween={32}
        >
          {innovationCards.map((card, index) => (
            <SwiperSlide
              key={index}
              className="mx-auto flex w-full max-w-[550px] flex-col gap-4 rounded-lg bg-card-gradient-secondary p-4 sm:p-6 xl:max-w-[700px]"
            >
              <Image
                src={card.image}
                alt={t(`page-10-year-innovation-card-${index + 1}-title`)}
                className="mx-auto my-4 h-auto max-h-48 object-contain"
              />
              <div>
                <h3 className="mb-4">
                  {t(`page-10-year-innovation-card-${index + 1}-title`)}
                </h3>
                <p className="text-body-secondary mb-4">
                  {t(`page-10-year-innovation-card-${index + 1}-date`)}
                </p>
              </div>
              <p className="mb-4">
                {t(`page-10-year-innovation-card-${index + 1}-description-1`)}
              </p>
              <p className="mb-4">
                {t(`page-10-year-innovation-card-${index + 1}-description-2`)}
              </p>
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}
