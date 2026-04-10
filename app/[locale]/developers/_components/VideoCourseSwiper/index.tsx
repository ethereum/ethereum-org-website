"use client"

import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"

import type { VideoCourse } from "../../types"
import VideoCourseCard from "../VideoCourseCard"

type VideoCourseSwiperProps = {
  courses: VideoCourse[]
}

const VideoCourseSwiper = ({ courses }: VideoCourseSwiperProps) => (
  <EdgeScrollContainer>
    {courses.map((course, idx) => (
      <EdgeScrollItem
        key={idx}
        className="ms-4 w-[80%] sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]"
      >
        <VideoCourseCard course={course} />
      </EdgeScrollItem>
    ))}
  </EdgeScrollContainer>
)

export default VideoCourseSwiper
