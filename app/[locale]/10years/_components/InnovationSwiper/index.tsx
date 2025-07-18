"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import type { InnovationCard } from "../types"

type InnovationSwiperProps = {
  innovationCards: InnovationCard[]
}
const InnovationSwiper = ({ innovationCards }: InnovationSwiperProps) => (
  <div className="w-[100%]">
    <SwiperContainer className="mx-auto w-full max-w-[550px] xl:max-w-[700px]">
      <Swiper
        className="mx-auto w-full max-w-[550px] xl:max-w-[700px]"
        spaceBetween={32}
      >
        {innovationCards.map(
          ({ image, title, date, description1, description2 }, index) => (
            <SwiperSlide
              key={index}
              className="mx-auto flex w-full max-w-[550px] flex-col gap-4 rounded-lg bg-card-gradient-secondary p-4 sm:p-6 xl:max-w-[700px]"
            >
              <Image
                src={image}
                alt={title}
                className="mx-auto my-4 h-auto max-h-48 object-contain"
              />
              <div>
                <h3 className="mb-4">{title}</h3>
                <p className="text-body-secondary mb-4">{date}</p>
              </div>
              <p className="mb-4">{description1}</p>
              <p className="mb-4">{description2}</p>
            </SwiperSlide>
          )
        )}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  </div>
)

export default InnovationSwiper
