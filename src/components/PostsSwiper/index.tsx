import { Keyboard /* , Pagination */ } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { ClassNameProp, RSSItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import PostPreviewCard from "../Homepage/PostPreviewCard"

import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"

type PostsSwiperProps = ClassNameProp & {
  items: RSSItem[]
}
const PostsSwiper = ({ className, items }: PostsSwiperProps) => (
  <div className={cn("h-fit gap-8", className)}>
    <Swiper
      cssMode
      // navigation
      // pagination
      keyboard
      spaceBetween={32}
      modules={[
        // Navigation,
        // Pagination,
        Keyboard,
      ]}
    >
      {items.map((item) => (
        <SwiperSlide key={item.title}>
          <PostPreviewCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)

export default PostsSwiper
