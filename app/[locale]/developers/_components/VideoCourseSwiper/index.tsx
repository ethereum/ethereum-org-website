"use client"

import { Swiper, SwiperNavigation, SwiperSlide } from "@/components/ui/swiper"

import type { VideoCourse } from "../../types"
import VideoCourseCard from "../VideoCourseCard"

type VideoCourseSwiperProps = {
  courses: VideoCourse[]
}

const VideoCourseSwiper = ({ courses }: VideoCourseSwiperProps) => (
  <Swiper spaceBetween={16} slidesPerView={1.25}>
    {courses.map((course, idx) => (
      <SwiperSlide
        key={idx}
        className="py-px max-2xl:first:ms-page max-2xl:last:pe-page-2x"
      >
        <VideoCourseCard course={course} />
      </SwiperSlide>
    ))}
    <SwiperNavigation />
  </Swiper>
)

export default VideoCourseSwiper
