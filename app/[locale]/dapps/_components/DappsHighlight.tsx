"use client"

import { DappData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { getDappSlug } from "@/lib/utils/dapps"

import DappCard from "./DappCard"

interface DappsHighlightProps {
  dapps: DappData[]
}

const DappsHighlight = ({ dapps }: DappsHighlightProps) => {
  return (
    <div className="flex flex-col gap-8">
      <SwiperContainer>
        <Swiper
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {dapps.map((dapp, index) => (
            <SwiperSlide key={index}>
              <LinkBox className="group w-full rounded-xl p-3 hover:bg-background-highlight">
                <LinkOverlay
                  href={`/dapps/${getDappSlug(dapp.name)}`}
                  className="no-underline"
                >
                  <div className="relative mb-2 aspect-[2/1] w-full">
                    <Image
                      src={dapp.bannerImage}
                      alt={`${dapp.name} application banner showing the main interface`}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div className="mb-4 text-body">
                    <p className="text-body">{dapp.description}</p>
                  </div>
                  <DappCard dapp={dapp} imageSize={16} disableLink />
                </LinkOverlay>
              </LinkBox>
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default DappsHighlight
