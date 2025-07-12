"use client"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

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
        className="max-xl://[&:last-child_div]:pe-16 max-2xl:first:ms-8 max-2xl:last:pe-16"
      >
        <VideoCourseCard course={course} />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default VideoCourseSwiper
