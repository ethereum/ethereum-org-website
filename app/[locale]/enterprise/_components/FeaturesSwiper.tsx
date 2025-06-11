"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import type { Feature } from "../types"

import FeatureCard from "./FeatureCard"

const FeaturesSwiper = ({ features }: { features: Feature[] }) => (
  <Swiper spaceBetween={8} slidesPerView={1.1}>
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

export default FeaturesSwiper
