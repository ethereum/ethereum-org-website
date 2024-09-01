import { useTranslation } from "next-i18next"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Keyboard, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { ClassNameProp, RSSItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber } from "@/lib/utils/screen"

import PostPreviewCard from "../Homepage/PostPreviewCard"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type PostsSwiperProps = ClassNameProp & {
  items: RSSItem[]
}
const PostsSwiper = ({ className, items }: PostsSwiperProps) => {
  const { t } = useTranslation("page-developers-docs")
  return (
    <div className={cn("css-posts-swiper h-fit", className)}>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        a11y={{
          prevSlideMessage: t("previous"),
          nextSlideMessage: t("next"),
        }}
        pagination={{ clickable: true }}
        keyboard
        spaceBetween={32}
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          [breakpointAsNumber.sm]: { slidesPerView: 2, slidesPerGroup: 2 },
          [breakpointAsNumber.lg]: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
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
}

export default PostsSwiper
