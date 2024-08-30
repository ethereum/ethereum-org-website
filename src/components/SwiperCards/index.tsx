import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { EffectCards, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { ClassNameProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import BentoCard from "../BentoBox/BentoCard"
import Title from "../BentoBox/Title"
import { useBentoBox } from "../BentoBox/useBentoBox"

import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/navigation"
import "swiper/css/pagination"

const SwiperCards = ({ className }: ClassNameProp) => {
  const { items } = useBentoBox()
  return (
    <div
      className={cn(
        "-mx-4 w-[100vw] overflow-hidden px-4 sm:-mx-6 sm:px-6",
        className
      )}
    >
      <Title />
      <Swiper
        className="mx-auto mt-4 !flex h-fit max-w-128 flex-col items-center"
        effect="cards"
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCards, Pagination, Navigation]}
      >
        {items.map(({ className, ...item }) => (
          <SwiperSlide
            key={item.title}
            className="overflow-visible rounded-2xl shadow-card-hover"
          >
            <BentoCard
              imgHeight={220}
              className={cn(className, "bg-background text-body")}
              {...item}
              imgWidth={undefined} // Intentionally last to override box
            />
          </SwiperSlide>
        ))}

        <MdChevronLeft className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <MdChevronRight className="swiper-button-next" />
      </Swiper>
    </div>
  )
}

export default SwiperCards
