"use client"

import { Carousel, CarouselItem } from "@/components/ui/carousel"

import type { VideoCourse } from "../../types"
import VideoCourseCard from "../VideoCourseCard"

type VideoCourseSwiperProps = {
  courses: VideoCourse[]
}

const VideoCourseSwiper = ({ courses }: VideoCourseSwiperProps) => (
  <Carousel>
    {courses.map((course, idx) => (
      <CarouselItem
        key={idx}
        className="ms-4 w-[80%] sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
      >
        <VideoCourseCard course={course} />
      </CarouselItem>
    ))}
  </Carousel>
)

export default VideoCourseSwiper
