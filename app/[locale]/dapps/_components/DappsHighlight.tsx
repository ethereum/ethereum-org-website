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

import DappCard from "./DappCard"

import DappHighlightImage from "@/public/images/dapps/dapp-highlight.png"

interface DappsHighlightProps {
  dapps: DappData[]
}

const DappsHighlight = ({ dapps }: DappsHighlightProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="hidden flex-row md:flex">
        {dapps.map((dapp, index) => (
          <LinkBox
            key={index}
            className="group flex flex-1 rounded-xl p-3 hover:bg-background-highlight"
          >
            <LinkOverlay href={dapp.url} className="no-underline">
              <Image
                src={DappHighlightImage}
                alt=""
                className="mb-2 w-full rounded-xl"
              />
              <div className="mb-6">
                <p className="text-body">{dapp.description}</p>
              </div>
              <DappCard dapp={dapp} imageSize={16} disableLink />
            </LinkOverlay>
          </LinkBox>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <SwiperContainer>
          <Swiper slidesPerView={1.5} spaceBetween={16}>
            {dapps.map((dapp, index) => (
              <SwiperSlide key={index} className="pr-4">
                <LinkBox className="group w-full rounded-xl p-2 hover:bg-background-highlight">
                  <LinkOverlay
                    href={dapp.url}
                    target="_blank"
                    className="no-underline"
                  >
                    <div className="w-full">
                      <Image
                        src={DappHighlightImage}
                        alt=""
                        className="mb-2 h-auto max-h-[200px] w-full rounded-xl object-cover"
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
    </div>
  )
}

export default DappsHighlight
