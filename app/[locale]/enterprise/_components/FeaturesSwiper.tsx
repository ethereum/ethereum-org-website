"use client"

import { Swiper, SwiperNavigation, SwiperSlide } from "@/components/ui/swiper"

import type { Feature } from "../types"

import FeatureCard from "./FeatureCard"

const FeaturesSwiper = ({
  features,
  className,
}: {
  features: Feature[]
  className?: string
}) => {
  return (
    <Swiper className={className} spaceBetween={8}>
      {features.map((feature) => (
        <SwiperSlide key={feature.header}>
          <FeatureCard {...feature} className="h-full" />
        </SwiperSlide>
      ))}
      <SwiperNavigation />
    </Swiper>
  )
}

export default FeaturesSwiper
