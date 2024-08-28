import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { ClassNameProp, RSSItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import PostPreviewCard from "../Homepage/PostPreviewCard"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type PostsSwiperProps = ClassNameProp & {
  items: RSSItem[]
}
const PostsSwiper = ({ className, items }: PostsSwiperProps) => (
  <div className={cn("h-fit gap-8", className)}>
    <Swiper
      // cssMode
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      keyboard
      spaceBetween={32}
      modules={[Navigation, Pagination]}
    >
      {items.map((item) => (
        <SwiperSlide key={item.title}>
          <PostPreviewCard {...item} />
        </SwiperSlide>
      ))}

      <MdChevronLeft className="swiper-button-prev" />
      <div className="swiper-pagination" />
      <MdChevronRight className="swiper-button-next" />
    </Swiper>
  </div>
)

export default PostsSwiper
