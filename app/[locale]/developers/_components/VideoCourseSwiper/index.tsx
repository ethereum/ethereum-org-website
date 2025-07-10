"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import type { VideoCourse } from "../../types"
import VideoCourseCard from "../VideoCourseCard"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

type VideoCourseSwiperProps = {
  courses: VideoCourse[]
}

const VideoCourseSwiper = ({ courses }: VideoCourseSwiperProps) => {
  const slidesPerView = useBreakpointValue({
    base: 1.25,
    sm: 1.6,
    md: 2.7,
    lg: 4.4,
    xl: 5,
  })
  const spaceBetween = useBreakpointValue({
    base: 16,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  })

  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={slidesPerView}>
      {courses.map((course, idx) => (
        <SwiperSlide
          key={idx}
          className="max-xl:first:ms-8 max-xl:[&:last-child_div]:pe-16"
        >
          <VideoCourseCard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default VideoCourseSwiper
