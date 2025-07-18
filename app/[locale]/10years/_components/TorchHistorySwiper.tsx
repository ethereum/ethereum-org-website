"use client"

import { EffectCoverflow, Navigation } from "swiper/modules"
import { SwiperSlide } from "swiper/react"
import { Address } from "viem"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
} from "@/components/ui/swiper"

import TorchHistoryCard from "./TorchHistoryCard"

import { getAvatarImage, type TorchHolderEvent } from "@/lib/torch"

type TorchHistorySwiperProps = {
  holders: TorchHolderEvent[]
  currentHolderAddress: Address
}

const TorchHistorySwiper = ({
  holders,
  currentHolderAddress,
}: TorchHistorySwiperProps) => {
  const currentHolderIndex = holders.findIndex(
    (holder) => holder.address === currentHolderAddress
  )

  // Create an array of 10 items, filling with placeholders for future holders
  const totalCards = 10
  const allCards = Array.from({ length: totalCards }, (_, index) => {
    if (index < holders.length) {
      // Use actual holder data
      return {
        ...holders[index],
        isPlaceholder: false,
      }
    } else {
      // Create placeholder for future holder
      return {
        address: `placeholder-${index}` as Address,
        name: `Future Bearer ${index + 1}`,
        role: "Coming soon...",
        twitter: "",
        event: {
          from: "0x0000000000000000000000000000000000000000" as Address,
          to: `placeholder-${index}` as Address,
          blockNumber: BigInt(0),
          transactionHash: "",
          timestamp: 0,
        },
        isPlaceholder: true,
      }
    }
  })

  return (
    <SwiperContainer className="w-full">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        initialSlide={
          currentHolderIndex >= 0 ? currentHolderIndex : holders.length - 1
        }
        coverflowEffect={{
          rotate: 0,
          stretch: -50,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="w-full"
      >
        {allCards.map((card, idx) => (
          <SwiperSlide
            key={idx}
            className="flex !min-h-[400px] !w-60 justify-center"
          >
            <TorchHistoryCard
              className="!min-h-[400px]"
              name={card.name}
              role={card.role}
              avatar={
                card.isPlaceholder
                  ? "/images/10-year-anniversary/torch-cover.webp"
                  : getAvatarImage(card)
              }
              from={card.event.timestamp}
              to={card.event.timestamp}
              transactionHash={card.event.transactionHash}
              isCurrentHolder={
                !card.isPlaceholder && card.address === currentHolderAddress
              }
              isPlaceholder={card.isPlaceholder}
            />
          </SwiperSlide>
        ))}
        <SwiperNavigation className="mt-8" />
      </Swiper>
    </SwiperContainer>
  )
}

export default TorchHistorySwiper
