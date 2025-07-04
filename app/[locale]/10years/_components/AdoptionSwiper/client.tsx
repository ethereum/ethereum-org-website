"use client"

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

import { AdoptionCard } from "../types"

type AdoptionCardProps = {
  adoptionCards: AdoptionCard[]
  adoptionStyles: string[]
}

const AdoptionSwiper = ({
  adoptionCards,
  adoptionStyles,
}: AdoptionCardProps) => (
  <div className="flex flex-1 flex-col gap-6 md:hidden">
    <SwiperContainer className="mx-auto w-full max-w-[550px]">
      <Swiper spaceBetween={32}>
        {adoptionCards.map(({ image, linkText, href, title }, index) => {
          return (
            <SwiperSlide key={title}>
              <div
                className={cn("h-full rounded-2xl p-8", adoptionStyles[index])}
              >
                <Image
                  src={image}
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
                <ButtonLink href={href} hideArrow variant="outline">
                  {linkText}
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

export default AdoptionSwiper
