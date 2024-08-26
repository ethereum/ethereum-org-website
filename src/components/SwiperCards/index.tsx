import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import type { ClassNameProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import BentoCard from "../BentoBox/BentoCard"
import Title from "../BentoBox/Title"
import { useBentoBox } from "../BentoBox/useBentoBox"

import "swiper/css"
import "swiper/css/effect-cards"
// import "swiper/css/navigation"
// import "swiper/css/pagination"

// TODO: Fix height constraints on
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
        className="mx-auto mt-4 h-fit max-w-128"
        effect="cards"
        grabCursor
        cssMode
        modules={[EffectCards]}
      >
        {items.map(({ className, ...item }) => (
          <SwiperSlide key={item.title}>
            <BentoCard
              imgHeight={220}
              className={cn(className, "bg-background text-body")}
              {...item}
              imgWidth={undefined} // Intentionally last to override box
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperCards
