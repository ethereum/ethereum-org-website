"use client"

import { Image } from "@/components/Image"
import { Carousel, CarouselItem } from "@/components/ui/carousel"

import type { InnovationCard } from "../types"

type InnovationSwiperProps = {
  innovationCards: InnovationCard[]
}
const InnovationSwiper = ({ innovationCards }: InnovationSwiperProps) => (
  <div className="w-[100%]">
    <Carousel className="mx-auto w-full max-w-[550px] xl:max-w-[700px]">
      {innovationCards.map(
        ({ image, title, date, description1, description2 }, index) => (
          <CarouselItem
            key={index}
            className="ms-6 w-[calc(100%-4rem)] max-w-[550px] xl:max-w-[700px]"
          >
            <div className="flex flex-col gap-4 rounded-lg bg-card-gradient-secondary p-4 sm:p-6">
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
            </div>
          </CarouselItem>
        )
      )}
    </Carousel>
  </div>
)

export default InnovationSwiper
