import type { ClassNameProp } from "@/lib/types"

import BentoCard from "./BentoCard"
import Title from "./Title"
import { useBentoBox } from "./useBentoBox"

import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/navigation"
import "swiper/css/pagination"

const BentoBox = ({ className }: ClassNameProp) => {
  const { items } = useBentoBox()

  return (
    <div className={className}>
      <div className="flex grid-cols-bento flex-row gap-4 lg:grid">
        <Title className="lg:col-span-12 lg:flex xl:col-span-3 xl:col-start-2" />
        {items.map((item) => (
          <BentoCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}

export default BentoBox
