"use client"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

import { AdoptionCard } from "./types"

type AdoptionCardProps = {
  adoptionCards: AdoptionCard[]
  adoptionStyles: string[]
}
const AdoptionSwiper = ({
  adoptionCards,
  adoptionStyles,
}: AdoptionCardProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6 md:hidden">
      <SwiperContainer className="mx-auto w-full max-w-[550px]">
        <Swiper>
          {adoptionCards.map((card, index) => (
            <SwiperSlide key={card.title}>
              <div
                className={cn("h-full rounded-2xl p-8", adoptionStyles[index])}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="mx-auto mb-4 h-36 object-contain"
                />
                <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                {card.description}
                <ButtonLink href={card.href} hideArrow variant="outline">
                  {card.linkText}
                </ButtonLink>
              </div>
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default AdoptionSwiper
