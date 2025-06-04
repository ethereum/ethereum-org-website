"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { innovationCards } from "./data"

export default function InnovationSwiper() {
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
                alt={card.title}
                className="mx-auto my-4 h-auto max-h-48 object-contain"
              />
              <div>
                <h3 className="mb-4">{card.title}</h3>
                <p className="text-body-secondary mb-4">{card.date}</p>
              </div>
              {card.description.map((description, index) => (
                <p key={index} className="mb-4">
                  {description}
                </p>
              ))}
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}
