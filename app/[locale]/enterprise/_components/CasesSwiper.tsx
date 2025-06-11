"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import type { Case } from "../types"

import CaseCard from "./CaseCard"

const CasesSwiper = ({ cases }: { cases: Case[] }) => (
  <Swiper spaceBetween={8} slidesPerView={1.2}>
    {cases.map((caseStudy) => (
      <SwiperSlide
        key={caseStudy.name}
        className="first:ms-4 [&:last-child_div]:w-[calc(100%-2rem)]"
      >
        <CaseCard
          caseStudy={caseStudy}
          className="h-full w-full !shadow-none"
        />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default CasesSwiper
