"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import type { Feature } from "../types"

import FeatureCard from "./FeatureCard"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const FeaturesSwiper = ({ features }: { features: Feature[] }) => {
  const slidesPerView = useBreakpointValue({
    base: 1.1,
    sm: 1.5,
  })

  return (
    <Swiper spaceBetween={8} slidesPerView={slidesPerView}>
      {features.map((feature) => (
        <SwiperSlide
          key={feature.header}
          className="first:ms-4 [&:last-child_div]:me-8"
        >
          <FeatureCard feature={feature} className="h-full !shadow-none" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default FeaturesSwiper
