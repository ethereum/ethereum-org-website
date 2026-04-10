"use client"

import { ReactNode } from "react"

import { Carousel, CarouselItem } from "@/components/ui/carousel"

interface AppsSwiperProps {
  cards: ReactNode[]
}

const AppsSwiper = ({ cards }: AppsSwiperProps) => {
  return (
    <Carousel className="md:hidden">
      {cards.map((card, index) => (
        <CarouselItem
          key={index}
          className="ms-4 w-[calc(66%-1rem)] sm:w-[calc(50%-1rem)]"
        >
          {card}
        </CarouselItem>
      ))}
    </Carousel>
  )
}

export default AppsSwiper
