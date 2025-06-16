"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { DAPPS_HIGHLIGHT_DATA } from "@/data/dapps/index"

import DappCard from "./DappCard"

import DappHighlightImage from "@/public/images/dapps/dapp-highlight.png"

const DappsHighlight = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="hidden flex-row gap-4 md:flex">
        {DAPPS_HIGHLIGHT_DATA.map((dapp, index) => (
          <div key={index}>
            <Image
              src={DappHighlightImage}
              alt="Dapps Highlight"
              className="mb-2 rounded-xl"
            />
            <div className="mb-6">{dapp.description}</div>
            <DappCard dapp={dapp} imageSize={16} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <SwiperContainer>
          <Swiper>
            {DAPPS_HIGHLIGHT_DATA.map((dapp, index) => (
              <SwiperSlide key={index}>
                <div className="w-full">
                  <Image
                    src={DappHighlightImage}
                    alt="Dapps Highlight"
                    className="mb-2 h-auto max-h-[200px] w-full rounded-xl object-cover"
                  />
                </div>
                <div className="mb-6">{dapp.description}</div>
                <DappCard dapp={dapp} imageSize={16} />
              </SwiperSlide>
            ))}
            <SwiperNavigation />
          </Swiper>
        </SwiperContainer>
      </div>
    </div>
  )
}

export default DappsHighlight
