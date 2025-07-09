"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import type { DevelopersPath } from "../../types"
import BuilderCard from "../BuilderCard"
import SpeedRunCard from "../SpeedRunCard"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

type BuilderSwiperProps = {
  paths: DevelopersPath[]
  speedRunDetails: {
    title: string
    description: string
    ctaLabel: string
  }
}

const BuilderSwiper = ({ paths, speedRunDetails }: BuilderSwiperProps) => {
  const slidesPerView = useBreakpointValue({
    base: 1.15,
    sm: 1.6,
  })

  return (
    <Swiper spaceBetween={8} slidesPerView={slidesPerView}>
      {paths.map((path, idx) => (
        <SwiperSlide key={idx} className="first:ms-4 [&:last-child_div]:me-8">
          <BuilderCard path={path} />
        </SwiperSlide>
      ))}
      <SwiperSlide className="first:ms-4 [&:last-child_div]:me-8">
        <SpeedRunCard {...speedRunDetails} />
      </SwiperSlide>
    </Swiper>
  )
}

export default BuilderSwiper
