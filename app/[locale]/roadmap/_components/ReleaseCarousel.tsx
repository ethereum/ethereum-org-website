"use client"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"

const ReleaseCarousel = () => {
  // const swiperRef = useRef<Swiper>(null)
  // const [activeSlide, setActiveSlide] = useState(releasesData.length - 2)

  const PreviousButton = () => {
    return (
      <Button variant="secondary" size="icon" className="rounded-full">
        <ChevronPrev className="h-10 w-10" />
      </Button>
    )
  }

  const NextButton = () => {
    return (
      <Button variant="secondary" size="icon" className="rounded-full">
        <ChevronNext className="h-10 w-10" />
      </Button>
    )
  }

  return (
    <div className="flex w-full flex-col rounded-2xl bg-background-highlight p-4">
      <div className="flex flex-row justify-between gap-2 lg:hidden">
        <PreviousButton />
        <NextButton />
      </div>
      <div className="flex max-w-full flex-row items-center justify-between gap-2">
        <div className="hidden lg:flex">
          <PreviousButton />
        </div>
        <div className="hidden lg:flex">
          <NextButton />
        </div>
      </div>
    </div>
  )
}

export default ReleaseCarousel

{
  /* <div className="flex-1">
          <SwiperContainer>
            <Swiper
              navigation={{
                nextEl: ".ui-swiper-button-next-mobile, .ui-swiper-button-next-desktop",
                prevEl: ".ui-swiper-button-prev-mobile, .ui-swiper-button-prev-desktop"
              }}
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={0}
              width={null}
              initialSlide={releasesData.length - 2}
              ref={swiperRef}
              onSlideChange={(swiper) => {
                setActiveSlide(swiper.activeIndex)
              }}
              >
              {releasesData.map((release) => (
                <SwiperSlide key={release.releaseName}>
                  <div className="p-2 flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:max-w-[351px] rounded-2xl">
                      <Image src={release.image} alt={release.releaseName} className="rounded-2xl object-cover h-[240px] md:h-[266px] lg:h-[551px]" />
                    </div>
                    <div>
                      <h2 className="text-4xl lg:text-6xl font-bold">{release.releaseName}</h2>
                      <p className="text-sm text-gray-500">{release.releaseDate}</p>
                      <p className="text-sm text-gray-500">{release.releaseDescription}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
          </SwiperContainer>
        </div> */
}
