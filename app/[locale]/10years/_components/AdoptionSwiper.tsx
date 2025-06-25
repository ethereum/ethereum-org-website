"use client"

import type { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

type AdoptionCardProps = {
  adoptionCards: { image: StaticImageData; href: string }[]
  adoptionStyles: string[]
}

const AdoptionSwiper = ({
  adoptionCards,
  adoptionStyles,
}: AdoptionCardProps) => {
  const t = useTranslations("page-10-year-anniversary")

  return (
    <div className="flex flex-1 flex-col gap-6 md:hidden">
      <SwiperContainer className="mx-auto w-full max-w-[550px]">
        <Swiper spaceBetween={32}>
          {adoptionCards.map((card, index) => {
            const title = t(`page-10-year-adoption-card-${index + 1}-title`)
            return (
              <SwiperSlide key={title}>
                <div
                  className={cn(
                    "h-full rounded-2xl p-8",
                    adoptionStyles[index]
                  )}
                >
                  <Image
                    src={card.image}
                    alt={title}
                    className="mx-auto mb-4 h-36 object-contain"
                  />
                  <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                  <p className="mb-8">
                    <Translation
                      id={`page-10-year-adoption-card-${index + 1}-description`}
                      ns="page-10-year-anniversary"
                    />
                  </p>
                  <ButtonLink href={card.href} hideArrow variant="outline">
                    {t(`page-10-year-adoption-card-${index + 1}-link-text`)}
                  </ButtonLink>
                </div>
              </SwiperSlide>
            )
          })}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default AdoptionSwiper
