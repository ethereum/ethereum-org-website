"use client"

import { ReactNode } from "react"

import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"

interface AppsSwiperProps {
  cards: ReactNode[]
}

const AppsSwiper = ({ cards }: AppsSwiperProps) => {
  return (
    <EdgeScrollContainer className="md:hidden">
      {cards.map((card, index) => (
        <EdgeScrollItem
          key={index}
          className="ms-4 w-[calc(66%-1rem)] sm:w-[calc(50%-1rem)]"
        >
          {card}
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  )
}

export default AppsSwiper
